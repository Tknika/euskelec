// Prints a web page to PDF like the browser's print dialog (CSS @page size, backgrounds, no header or footer), with
// headless Chrome or Edge driven over the DevTools protocol (Page.printToPDF). Used by scripts/build-dossier.sh.
//
//   node scripts/print-pdf.mjs <browser.exe> <url> <out.pdf>
//
// Needs Node 22 or newer (global fetch and WebSocket). It writes the PDF only when printing worked, and always closes the
// browser at the end, so no headless browser is left running. (Chrome's own --print-to-pdf flag stopped writing the file
// on Windows in November 2026, with Chrome 157 and Edge: it exits without an error and without a PDF.)
import { spawn } from 'node:child_process';
import { writeFileSync, rmSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [, , browser, url, out] = process.argv;
if (!browser || !url || !out) { console.error('usage: node scripts/print-pdf.mjs <browser> <url> <out.pdf>'); process.exit(2); }
const port = 9400 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), 'euskelec-pdf-'));   // a throwaway profile: never the one of an open browser
spawn(browser, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const wait = ms => new Promise(r => setTimeout(r, ms));

let ok = false;
let ws;
try {
  let tabs;
  for (let i = 0; i < 80 && !tabs?.find(t => t.type === 'page'); i++) {
    try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await wait(250); }
  }
  const page = tabs?.find(t => t.type === 'page');
  if (!page) throw new Error('the browser did not start');
  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, e) => { ws.onopen = r; ws.onerror = e; });
  let id = 0; const pending = {};
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending[m.id]) pending[m.id](m); };
  const send = (method, params = {}, ms = 60000) => new Promise((resolve, reject) => {
    const n = ++id; pending[n] = m => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result));
    ws.send(JSON.stringify({ id: n, method, params }));
    setTimeout(() => reject(new Error(`${method}: timed out`)), ms);
  });
  await send('Page.enable');
  await send('Page.navigate', { url });
  await wait(3000);
  // Fonts, and every image (the lazy ones too: they would not load in print otherwise), at most 10 s
  await send('Runtime.evaluate', {
    awaitPromise: true,
    expression: `document.fonts.ready.then(() => Promise.race([
      Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }); })),
      new Promise(r => setTimeout(r, 10000))]))`,
  });
  await wait(1000);
  const pdf = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 });
  const bytes = Buffer.from(pdf.data, 'base64');
  writeFileSync(out, bytes);
  const pages = (bytes.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`${bytes.length} bytes, ${pages} pages`);
  ok = true;
} catch (e) {
  console.error(`FAILED: ${e.message}`);
} finally {
  try { ws?.close(); } catch {}
  try {   // close the whole browser (killing the launcher process would leave its children running on Windows)
    const v = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
    const b = new WebSocket(v.webSocketDebuggerUrl);
    await new Promise(r => { b.onopen = r; });
    b.send(JSON.stringify({ id: 1, method: 'Browser.close' }));
    await wait(1000);
  } catch {}
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  process.exit(ok ? 0 : 1);
}
