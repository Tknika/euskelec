---
title: Competition
translationKey: competition
eyebrow: 10th edition · 2026-2027
description: All the details about the championship, its phases, venues and dates.
weight: 10
wide: true
menus:
  main:
    weight: 10
# Phases of the current edition. An empty `dates` or `place` shows "Coming soon".
# The competition in a glance ({{< competition-intro >}}): how it works, goals, what it drives
intro:
  # The car beside the lead: a 3D model turning on itself (static/models/), with a still picture of it for loading and without WebGL. Without `model`, the photo of the home page.
  model:
    src: models/eusk26-menditech.glb
    still: images/eusk26-menditech.png
  lead: "Euskelec is a competition in which students from vocational training centres in the Basque Country design and build **a 100% electric vehicle** using the same driving base. The goal is to encourage teamwork and to establish experimentation and creation as a teaching strategy."
  steps:
    - title: "Starting point: a common base"
      text: "All the teams start from the same base, which they are given. It is made up of three elements:"
      items: [Motor, Motor controller, Batteries]
    - title: "Vocational training students"
      text: "Students from vocational training centres in the Basque Country design and build the vehicle from that base."
    - title: "100% electric vehicle"
  goals_title: Goals
  goals:
    - Encourage students to work as a team
    - Experimentation and creation as a teaching strategy
    - Technical knowledge of electric vehicles
  platform_title: A platform to
  platform_text: "The contest is a platform for training technicians specialised in electric vehicles, with an eye on the needs of new transport and industrialisation models."
  platform:
    - Train and promote technicians specialised in electric vehicles
    - Experiment with new manufacturing techniques and new materials
    - Meet the needs of new transport and industrialisation models
phases:
  - title: Technical and creative aspects
    image: images/galeria/phases/phase-1-still-09.jpg
    image_alt: "A team presents its project to the jury (2026)"
    description: A presentation detailing the work undertaken on the Euskelec project by the participating teams and how the project has evolved, compiled in a project report and presented before an expert panel.
    dates: ""
    place: ""
    challenges: [Design, Innovation, Communication]
  - title: Dynamic testing event
    image: images/galeria/phases/8k6b1800.jpg
    image_position: "50% 75%"
    image_alt: "A marshal waves the green flag as the vehicles set off on an urban circuit lined with spectators (2026)"
    description: The performance, features and design of the vehicles are assessed via slalom, acceleration, maximum braking and resistance tests.
    dates: "16 May 2027, 18:00"
    place: Vitoria-Gasteiz
    tests:
      - name: Acceleration test
        icon: images/icons/speedometer.svg
      - name: Slalom test
        icon: images/icons/traffic-cone.svg
      - name: Braking test
        icon: images/icons/disc-brake.svg
      - name: Classification
        icon: images/icons/podium.svg
      - name: Resistance test
        icon: images/icons/racing.svg
---

{{< competition-intro >}}

## Phases

The competition comprises two phases. The first, technical and creative, sets challenges in design, innovation and communication, compiled in a project report and presented before an expert panel. In the second, the dynamic phase, the performance, features and design of the vehicles are assessed, and the tests lead to prizes that recognise the excellence of the teams.

{{< phases >}}

The rules and challenges are in [Technical documentation](/technical-documentation/).

## Participants in the 10th edition

{{< participants "X" >}}
