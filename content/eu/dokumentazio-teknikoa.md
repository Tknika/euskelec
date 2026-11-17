---
title: Dokumentazio teknikoa
translationKey: docs
layout: technical-docs
eyebrow: X. edizioa · 2026-2027
description: Lehiaketaren araudia eta erronkak, deskargatzeko.
weight: 30
menus:
  main:
    weight: 30

# Drawn by layouts/technical-docs.html. Everything below is a summary of the two PDFs (X edition,
# ref. 9-2026): when a PDF changes, update this page in the three languages.
documents:
  - file: docs/euskelec-x-araudia.pdf
    label: Araudia
    title: Lehiaketaren arauzko oinarriak
    text: Sarrera eta sariak, administrazio-araudia, araudi orokorra, araudi teknikoa eta ekitaldiaren araudia.
    pages: 53
  - file: docs/euskelec-x-erronkak.pdf
    label: Erronkak
    title: Erronken definizioa eta laburpena
    text: "1. faseko erronkak, nahitaezkoak eta aukerakoak: zer entregatu, noiz eta nola, eta zenbat puntu ematen dituen bakoitzak."
    pages: 16
summary_note: Orri honetan dokumentuen laburpena duzu. Zalantzarik izanez gero, PDFak dira testu ofiziala.

calendar:
  eyebrow: 2026ko iraila – 2027ko maiatza
  title: Erronken egutegia
  text: Nahitaezko erronkak entregatu behar dira 2. fasera igarotzeko; aukerakoek puntu gehigarriak ematen dituzte. Erronka bakoitza Moodle plataforman gaituko da, bere epe eta datekin.
  years:
    - {label: "2026", span: 4}
    - {label: "2027", span: 5}
  months: [Ira, Urr, Aza, Abe, Urt, Ots, Mar, Api, Mai]
  rows:   # months: columns of `months`, from 1
    - {name: Izen-ematea, required: true, months: [1, 2]}
    - {name: Taldearen aurkezpena eta komunikazio-plana, required: true, months: [2, 3, 8]}
    - {name: Proiektu metodologikoa eta baloreak, required: true, months: [3, 8]}
    - {name: Diseinuaren deskribapena, months: [4]}
    - {name: "Txasisa, ergonomia eta karrozeria", months: [5]}
    - {name: "Direkzioa, esekidura eta balaztak", months: [6]}
    - {name: Powertrain, months: [7]}
    - {name: Memoria + berrikuntza + 3D fabrikazio gehigarria, required: true, months: [8]}
    - {name: 1. faseko aurkezpena, required: true, months: [9]}
    - {name: 2. fasea, required: true, months: [9]}

scoring:
  eyebrow: Puntuazio-sistema
  title: 1000 puntu, bi fasetan
  text: Proba bakoitza bere aldetik puntuatzen da. Fase bakoitzeko puntuak batzen dira, eta bi faseetakoak batuta ateratzen da talde bakoitzaren azken puntuazioa.
  phases:
    - name: Eremu teknikoa eta sortzailea
      items:
        - {name: Taldearen aurkezpena eta komunikazio-plana, points: 70}
        - {name: Diseinuaren deskribapena, points: 60}
        - {name: "Txasisa, ergonomia eta karrozeria", points: 60}
        - {name: "Direkzioa, esekidura eta balaztak", points: 60}
        - {name: Powertrain, points: 40}
        - {name: Berrikuntza + fabrikazio gehigarria, points: 70}
        - {name: Memoria, points: 40}
        - {name: Aurkezpena, points: 50}
        - {name: Proiektu metodologikoa eta baloreak, points: 200}
        - {name: Aurre-egiaztapenetara joatea, points: 50}
    - name: Proba dinamikoak
      items:
        - {name: Balaztatzea, points: 80}
        - {name: Azelerazioa, points: 60}
        - {name: Slaloma, points: 60}
        - {name: Energia-efizientzia, points: 100}

vehicle:
  eyebrow: Araudi teknikoa
  title: Ibilgailuaren neurriak
  text: Talde bakoitzak bere txasisa diseinatu eta fabrikatzen du, eta antolakuntzak emandako potentzia-kita muntatzen du gainean. Hauek dira araudiak ezartzen dituen neurri kritikoak.
  image: images/docs/vehicle-dimensions.jpg
  image_alt: "Araudiko neurri-eskema: ibilgailua aurretik, alboan eta goitik ikusita, neurri kritikoekin."
  caption: Araudiaren 1. irudia (orientagarria).
  figures:
    - {label: Luzera, value: 2200–2500 mm}
    - {label: Zabalera, value: 1000–1200 mm, note: Ardatz zabaleneko gurpilen kanpoaldetik}
    - {label: Ardatzen artean, value: 900 mm, note: Gutxienez}
    - {label: Bide-zabalera, value: 780 mm, note: Gutxienez}
    - {label: Altuera, value: 1010 mm, note: "Gehienez, segurtasun-arkua kontuan hartu gabe"}
    - {label: Zorutik, value: 70–100 mm, note: Punturik baxuenera}
    - {label: Pisua, value: 150–250 kg, note: "Martxan, pilotua barruan dela"}
    - {label: Gurpilak, value: Ø 390–450 mm, note: "Lau berdin, gehienez 10″-ko hagunak"}
  kit_title: Antolakuntzak emandako potentzia-kita
  kit_text: Elementu hauek ezin dira inola ere aldatu.
  kit:
    - Iman iraunkorren motor trifasikoa EUS21
    - Guilera motor-kontrolagailua EUS21
    - Alterity litio-bateria EUS20
    - Bateria-kargagailua EUS20
    - Trakzioko kontaktorea EUS20
    - Azeleratze-pedal osoa EUS20
    - Alterity konexio elektrikoen arnesa fabrikatzeko kita EUS210
    - Display adierazlea eta display-kableatua EUS20
    - Mantentze-lanetarako eskuzko deskonektagailua EUS20
---
