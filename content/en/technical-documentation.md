---
title: Technical documentation
translationKey: docs
layout: technical-docs
eyebrow: 10th edition · 2026-2027
description: The rules and challenges of the competition, to download.
weight: 30
menus:
  main:
    weight: 30

# Drawn by layouts/technical-docs.html. Everything below is a summary of the two PDFs (X edition,
# ref. 9-2026): when a PDF changes, update this page in the three languages.
# There is no English challenges PDF yet: the Spanish one is linked (see AGENTS.md).
documents:
  - file: docs/euskelec-x-rules.pdf
    label: Rules
    title: Championship regulations
    text: Introduction and awards, administrative regulations, general regulations, technical regulations and event regulations.
    pages: 55
  - file: docs/euskelec-x-desafios.pdf
    label: Challenges
    title: Challenges and values
    text: "The phase 1 challenges, required and optional: what to hand in, when and how, and how many points each one gives."
    pages: 16
    note: in Spanish
summary_note: This page summarises the documents. If in doubt, the PDFs are the official text.

calendar:
  eyebrow: September 2026 – May 2027
  title: Challenge calendar
  text: The required challenges must be handed in to go on to phase 2; the optional ones add extra points. Each challenge opens on the Moodle platform with its deadline and dates.
  years:
    - {label: "2026", span: 4}
    - {label: "2027", span: 5}
  months: [Sep, Oct, Nov, Dec, Jan, Feb, Mar, Apr, May]
  rows:   # months: columns of `months`, from 1
    - {name: Registration, required: true, months: [1, 2]}
    - {name: Team presentation and communication plan, required: true, months: [2, 3, 8]}
    - {name: Methodological project and values, required: true, months: [3, 8]}
    - {name: Design description, months: [4]}
    - {name: "Chassis, ergonomics and bodywork", months: [5]}
    - {name: "Steering, suspension and brakes", months: [6]}
    - {name: Powertrain, months: [7]}
    - {name: Report + innovation + 3D additive manufacturing, required: true, months: [8]}
    - {name: Phase 1 presentation, required: true, months: [9]}
    - {name: Phase 2, required: true, months: [9]}

scoring:
  eyebrow: Scoring system
  title: 1,000 points across two phases
  text: Each test is scored on its own. The points of each phase are added up, and both phases together give each team's final score.
  phases:
    - name: Technical and creative aspects
      items:
        - {name: Team presentation and communication plan, points: 70}
        - {name: Design description, points: 60}
        - {name: "Chassis, ergonomics and bodywork", points: 60}
        - {name: "Steering, suspension and brakes", points: 60}
        - {name: Powertrain, points: 40}
        - {name: Innovation + additive manufacturing, points: 70}
        - {name: Report, points: 40}
        - {name: Presentation, points: 50}
        - {name: Methodological project and values, points: 200}
        - {name: Pre-inspection attendance, points: 50}
    - name: Dynamic tests
      items:
        - {name: Braking, points: 80}
        - {name: Acceleration, points: 60}
        - {name: Slalom, points: 60}
        - {name: Energy efficiency, points: 100}

vehicle:
  eyebrow: Technical regulations
  title: The vehicle's dimensions
  text: Each team designs and builds its own chassis and mounts on it the powertrain kit provided by the organisers. These are the critical dimensions set by the rules.
  image: images/docs/vehicle-dimensions.jpg
  image_alt: "Dimension drawing from the rules: the vehicle seen from the front, the side and above, with its critical measurements."
  caption: Figure 1 of the rules (for guidance).
  figures:
    - {label: Length, value: 2200–2500 mm}
    - {label: Width, value: 1000–1200 mm, note: Outside the wheels of the widest axle}
    - {label: Wheelbase, value: 900 mm, note: Minimum}
    - {label: Track width, value: 780 mm, note: Minimum}
    - {label: Height, value: 1010 mm, note: "Maximum, roll bar excluded"}
    - {label: Ground clearance, value: 70–100 mm, note: To the lowest point}
    - {label: Weight, value: 150–250 kg, note: "Running, with the driver inside"}
    - {label: Wheels, value: Ø 390–450 mm, note: "Four identical ones, rims up to 10″"}
  kit_title: The powertrain kit provided by the organisers
  kit_text: These elements cannot be modified under any circumstance.
  kit:
    - EUS21 three-phase permanent-magnet motor
    - EUS21 Guilera motor controller
    - EUS20 Alterity lithium battery
    - EUS20 battery charger
    - EUS20 traction contactor
    - EUS20 complete accelerator pedal
    - EUS210 Alterity electrical wiring harness assembly kit
    - EUS20 display and display wiring
    - EUS20 manual maintenance disconnect switch
---
