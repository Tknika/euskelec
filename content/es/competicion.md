---
title: Competición
translationKey: competition
eyebrow: X edición · 2026-2027
description: Todos los detalles sobre el campeonato, sus fases, la localización y las fechas.
weight: 10
wide: true
menus:
  main:
    weight: 10
# Phases of the current edition. An empty `dates` or `place` shows "Próximamente".
# The competition in a glance ({{< competition-intro >}}): how it works, goals, what it drives
intro:
  # The car beside the lead: a 3D model turning on itself (static/models/), with a still picture of it for loading and without WebGL. Without `model`, the photo of the home page.
  model:
    src: models/eusk26-menditech.glb
    still: images/eusk26-menditech.png
  lead: "Euskelec es una competición en la que alumnos de centros de formación profesional del País Vasco diseñan y construyen **un vehículo 100 % eléctrico** sobre una base motriz común. El objetivo es potenciar el trabajo en equipo y fundamentar la actividad experimental y creativa como elemento pedagógico."
  steps:
    - title: "Punto de partida: una base común"
      text: "Todos los equipos parten de la misma base, que se les entrega. La forman tres elementos:"
      items: [Motor, Controlador de motor, Baterías]
    - title: "Alumnado de formación profesional"
      text: "Alumnos de centros de formación profesional del País Vasco diseñan y construyen el vehículo a partir de esa base."
    - title: "Vehículo 100 % eléctrico"
  goals_title: Objetivos
  goals:
    - Potenciar el trabajo en equipo del alumnado
    - La actividad experimental y creativa como elemento pedagógico
    - El conocimiento técnico de los vehículos eléctricos
  platform_title: Una plataforma para
  platform_text: "El campeonato es una plataforma para la capacitación de técnicos especializados en vehículos de tracción eléctrica, atenta a las necesidades de los nuevos modelos de movilidad e industrialización."
  platform:
    - Capacitar y promocionar técnicos especializados en vehículos de tracción eléctrica
    - Experimentar con nuevas técnicas de fabricación y nuevos materiales
    - Responder a las necesidades de nuevos modelos de movilidad e industrialización
phases:
  - title: Ámbito técnico y creativo
    image: images/galeria/phases/phase-1-still-09.jpg
    image_alt: "Un equipo presenta su proyecto ante el jurado (2026)"
    description: Presentación del proyecto, donde se refleja el trabajo y la evolución del proyecto Euskelec de los equipos participantes, en una memoria del proyecto y ante un jurado experto.
    dates: ""
    place: ""
    challenges: [Diseño, Innovación, Comunicación]
  - title: Evento de pruebas dinámicas
    image: images/galeria/phases/8k6b1800.jpg
    image_position: "50% 75%"
    image_alt: "Un comisario agita la bandera verde y los vehículos arrancan en un circuito urbano lleno de público (2026)"
    description: Se evalúan las prestaciones, características y diseño de los vehículos mediante las pruebas de slalom, aceleración, frenada máxima y resistencia.
    dates: "16 de mayo de 2027, 18:00"
    place: Vitoria-Gasteiz
    tests:
      - name: Prueba de aceleración
        icon: images/icons/speedometer.svg
      - name: Prueba de slalom
        icon: images/icons/traffic-cone.svg
      - name: Prueba de frenada
        icon: images/icons/disc-brake.svg
      - name: Clasificación
        icon: images/icons/podium.svg
      - name: Prueba de resistencia
        icon: images/icons/racing.svg
---

{{< competition-intro >}}

## Fases

La competición consta de dos fases. La primera, técnica y creativa, plantea desafíos de diseño, innovación y comunicación, recogidos en una memoria del proyecto y presentados ante un jurado experto. En la segunda, la fase dinámica, se evalúan las prestaciones, características y diseño de los vehículos, y de sus pruebas derivan premios que resaltan la excelencia de los equipos.

{{< phases >}}

El reglamento y los desafíos están en [Documentación técnica](/documentacion-tecnica/).

## Participantes de la X edición

{{< participants "X" >}}
