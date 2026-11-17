---
title: Documentación técnica
translationKey: docs
layout: technical-docs
eyebrow: X edición · 2026-2027
description: El reglamento y los desafíos de la competición, para descargar.
weight: 30
menus:
  main:
    weight: 30

# Drawn by layouts/technical-docs.html. Everything below is a summary of the two PDFs (X edition,
# ref. 9-2026): when a PDF changes, update this page in the three languages.
documents:
  - file: docs/euskelec-x-reglamento.pdf
    label: Reglamento
    title: Bases reglamentarias del campeonato
    text: Introducción y premios, reglamento administrativo, reglamento general, reglamento técnico y reglamento del evento.
    pages: 55
  - file: docs/euskelec-x-desafios.pdf
    label: Desafíos
    title: Desafíos y valores
    text: "Los desafíos de la fase 1, obligatorios y opcionales: qué entregar, cuándo y cómo, y cuántos puntos da cada uno."
    pages: 16
summary_note: En esta página tienes un resumen de los documentos. En caso de duda, el texto oficial es el de los PDF.

calendar:
  eyebrow: Septiembre 2026 – mayo 2027
  title: Calendario de los desafíos
  text: Los desafíos obligatorios hay que entregarlos para pasar a la fase 2; los opcionales suman puntos extra. Cada desafío se abre en la plataforma Moodle con su plazo y sus fechas.
  years:
    - {label: "2026", span: 4}
    - {label: "2027", span: 5}
  months: [Sep, Oct, Nov, Dic, Ene, Feb, Mar, Abr, May]
  rows:   # months: columns of `months`, from 1
    - {name: Inscripciones, required: true, months: [1, 2]}
    - {name: Presentación del equipo y plan de comunicación, required: true, months: [2, 3, 8]}
    - {name: Proyecto metodológico y valores, required: true, months: [3, 8]}
    - {name: Descripción de diseño, months: [4]}
    - {name: "Chasis, ergonomía y carrocería", months: [5]}
    - {name: "Dirección, suspensión y frenos", months: [6]}
    - {name: Powertrain, months: [7]}
    - {name: Memoria + innovación + fabricación aditiva 3D, required: true, months: [8]}
    - {name: Presentación de la fase 1, required: true, months: [9]}
    - {name: Fase 2, required: true, months: [9]}

scoring:
  eyebrow: Sistema de puntuación
  title: 1000 puntos en dos fases
  text: Cada prueba se puntúa por separado. Se suman los puntos de cada fase y, con los de las dos fases, sale la puntuación final de cada equipo.
  phases:
    - name: Ámbito técnico y creativo
      items:
        - {name: Presentación del equipo y plan de comunicación, points: 70}
        - {name: Descripción de diseño, points: 60}
        - {name: "Chasis, ergonomía y carrocería", points: 60}
        - {name: "Dirección, suspensión y frenos", points: 60}
        - {name: Powertrain, points: 40}
        - {name: Innovación + fabricación aditiva, points: 70}
        - {name: Memoria, points: 40}
        - {name: Presentación, points: 50}
        - {name: Proyecto metodológico y valores, points: 200}
        - {name: Asistencia a las preverificaciones, points: 50}
    - name: Pruebas dinámicas
      items:
        - {name: Frenada, points: 80}
        - {name: Aceleración, points: 60}
        - {name: Slalom, points: 60}
        - {name: Eficiencia energética, points: 100}

vehicle:
  eyebrow: Reglamento técnico
  title: Las medidas del vehículo
  text: Cada equipo diseña y fabrica su propio chasis y monta sobre él el kit de potencia que entrega la organización. Estas son las medidas críticas que fija el reglamento.
  image: images/docs/vehicle-dimensions.jpg
  image_alt: "Esquema de dimensiones del reglamento: el vehículo visto de frente, de lado y desde arriba, con sus medidas críticas."
  caption: Ilustración 1 del reglamento (orientativa).
  figures:
    - {label: Longitud, value: 2200–2500 mm}
    - {label: Anchura, value: 1000–1200 mm, note: Por fuera de las ruedas del eje más ancho}
    - {label: Entre ejes, value: 900 mm, note: Mínimo}
    - {label: Ancho de vía, value: 780 mm, note: Mínimo}
    - {label: Altura, value: 1010 mm, note: "Máximo, sin contar el arco de seguridad"}
    - {label: Altura al suelo, value: 70–100 mm, note: Hasta el punto más bajo}
    - {label: Peso, value: 150–250 kg, note: En marcha y con el piloto dentro}
    - {label: Ruedas, value: Ø 390–450 mm, note: "Cuatro iguales, llantas de hasta 10″"}
  kit_title: El kit de potencia que entrega la organización
  kit_text: Estos elementos no pueden ser modificados en ninguna circunstancia.
  kit:
    - Motor trifásico de imanes permanentes EUS21
    - Controladora de motor Guilera EUS21
    - Batería de litio Alterity EUS20
    - Cargador de baterías EUS20
    - Contactor tracción EUS20
    - Pedal de acelerador completo EUS20
    - Kit fabricación de arnés de conexionado eléctrico Alterity EUS210
    - Display indicador y cableado de display EUS20
    - Desconectador manual de mantenimiento EUS20
---
