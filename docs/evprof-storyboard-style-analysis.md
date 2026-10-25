# Evprof Storyboard Style Analysis

## Purpose

This analysis compares Fred’s approved Everything Professor (Evprof) storyboards with four AI-generated storyboard examples. It identifies practical differences that may make generated storyboards feel generic, then proposes prompt changes to test. The goal is to make each row specific to its narration and useful to an animator, not to make every field shorter or copy individual scene choices from Fred’s references.

This document concerns how narration is translated into storyboard rows. The separate [Evprof script-writing style analysis](evprof-script-writing-style-analysis.md) concerns how the narration is written and what the audience experiences. Neither analysis alone establishes the channel’s complete visual style.

## Scope and evidence limits

The two Fred benchmark files contain *Every Weird Body Glitch You Can’t Explain* (81 scenes) and *The Strangest Things Your Body Does to Keep You Alive* (166 scenes). The AI-generated examples are *City Water* (38 scenes), *Raindrop* (17), *Honeybee* (15), and *Plastic Bottle* (28).

The AI examples cover different topics from Fred’s two benchmark storyboards. The comparison can identify structural differences and recurring habits, but it cannot establish direct scene-by-scene quality differences for the same script. A matched-script test is still needed.

The observations below describe the supplied storyboard files. They do not establish Fred’s full shot selection, framing, character acting, visual jokes, transitions, scene layouts, or animator handoff conventions. Those require comparison with approved storyboards and videos, ideally with Fred or the person who makes the storyboards.

## Observed patterns in Fred’s storyboards

### Pacing and detail vary by video

Fred does not use one fixed scene length or one fixed level of detail. *Weird Body Glitch* often groups longer stretches of narration and several visual actions into one row. *The Strangest Things* breaks narration into shorter beats, often with a very short action description.

| Benchmark | Scenes | Median scene length | Median voiceover words per row |
| --- | ---: | ---: | ---: |
| *Weird Body Glitch* | 81 | 11 seconds | 31 words |
| *The Strangest Things* | 166 | 5 seconds | 14 words |

These figures come from the supplied examples. They are evidence of different pacing in these videos, not target limits for future scripts.

### Action notes are often concise and literal

Examples from Fred’s files include:

- “Guy feels leg buzz, checks phone, sees nothing.”
- “Man rubbing head.”
- “Flashing siren.”
- “Girl sneezes on coworker.”

These notes name what is visible instead of explaining the narration’s full meaning. The voiceover, surrounding scenes, and chosen visual can carry the rest of the explanation.

### Background descriptions can be shorthand

Examples include “White,” “Gray room, brown cabinet,” “Green office,” “Street,” and “Gray room, bookshelf.” Fred’s Background field is not always a detailed image-generation prompt. It can be a quick setting cue for an animator who already understands the channel’s visual language. A long cinematic description is not automatically more useful.

### Blank fields are normal

In *The Strangest Things*, about 58% of On-screen text cells and 56% of Transitions/Motion cells are blank. In *Weird Body Glitch*, about 36% of On-screen text cells are blank. The examples show that blank cells do not automatically mean the storyboard is incomplete.

Text overlays, special transitions, and motion notes should be included when they help communicate the scene. A normal cut, continuing action, or static shot may not need a written instruction in every row.

### A recurring character is not universal

The *Weird Body Glitch* storyboard frequently uses the Professor and a chalkboard. *The Strangest Things* does not use that same pattern. The character may be useful when it fits, but these examples do not support requiring the Professor in every topic or scene.

## Observed differences in the AI examples

| Area | Fred’s examples | AI-generated examples |
| --- | --- | --- |
| What's happening | Often short shorthand, such as “Man rubbing head.” | For example, “Professor gestures to a simple flow diagram showing bottle turning into raw material.” |
| Background | Often brief, such as “Gray room, bookshelf.” | For example, “City skyline with river, water-treatment plant, covered storage tanks, and distant neighborhoods; wide aerial composition. Style: fred-background-style-v1.” |
| Props | Brief entries such as “Man, pills.” | Often long lists of objects, arrows, labels, diagrams, and precise actions. |
| Motion | Sometimes blank or one short action. | Often a complete instruction, such as “Hard cut. Icons fade in sequentially.” |

City Water, Honeybee, and Plastic Bottle fill every column in every row. Raindrop leaves most On-screen text cells blank, but still supplies detailed scene, background, prop, and motion notes for almost every row. This can make scenes feel equally important and equally planned when a simpler note might be enough.

Other recurring habits in the supplied examples:

- Labels, arrows, diagrams, and text appear often. Examples include “From river → treatment → tanks → pipes” and “Trophallaxis: transfer to receiver.” These can explain a process, but are not the only visual option.
- The Professor appears repeatedly in the Honeybee and Plastic Bottle examples, including for process explanations and closing summaries.
- The Plastic Bottle storyboard uses “Hard cut” in 18 of its 28 scenes. A hard cut can be appropriate, but writing the same transition in nearly every row can feel mechanical.
- Some descriptions use formal production-brief language or add detail that may repeat another column or exceed what the animator needs.

## Possible reasons an output may feel generic or AI-generated

The following are hypotheses suggested by the examples, not proven causes:

- Every row feels equally complete because every field gets a tidy instruction, even when the scene does not need one.
- Repeated production-brief wording, such as “wide aerial composition,” “diagram-style montage,” or “icons fade in sequentially,” can make different scenes sound alike.
- Long lists of props, labels, arrows, and background details can bury the one action an animator needs to show.
- Safe, predictable choices such as a title card, the Professor, a labelled diagram, process arrows, or a summary montage can replace a more specific visual beat.
- Treating each narration line as a tidy lesson can miss a literal action, reaction, odd visual, quick cut, or continuation in the current setting.
- More words can be mistaken for greater accuracy, although additional detail does not guarantee a closer match to Fred’s intended scene or the channel’s full style.

## Prompt recommendations to test

These recommendations come from the supplied analysis and remain candidates for testing. They are not final rules proven by a matched comparison.

1. Write for an animator, not an image generator. Use plain, direct language and name the visible action rather than summarizing the narration.
2. Keep the columns distinct: **What’s happening** says what the viewer sees; **Background** names the setting; **Hand-drawn characters & props** lists drawn elements; **On-screen text** contains only text that should appear; **Transitions/Motion** records motion only when it is useful.
3. Use the shortest description that makes the scene clear. Add detail when it affects the drawing, framing, continuity, or action.
4. Do not fill a field just to avoid leaving it blank. Leave On-screen text or Transitions/Motion blank when no meaningful overlay or special instruction is needed.
5. Do not add the Professor, chalkboard, arrows, labels, or diagrams unless the narration and the video’s established style make that choice useful.
6. Avoid default title cards and recap montages. Use them when the references support them or the script calls for them.
7. Choose scene breaks by visual changes, actions, reactions, reveals, and pacing rather than a fixed word count or duration. A row may hold a connected sequence of quick actions when the reference handles the beat that way; split it when the animator needs a distinct shot or visual change.
8. Vary the visual approach according to the narration. Depending on the beat, consider an action, reaction, object, setting change, close-up, visual comparison, diagram, or short sequence. These are options, not a checklist to fill.
9. Preserve the exact narration in the Voiceover column, split at sensible points. Do not rewrite it into a generic summary.
10. Use the reference storyboards as evidence of working habits, but do not copy one video’s character, setting, or visual device into every new topic.

### Candidate prompt text

The source analysis proposes adding this instruction to the planner prompt:

> Write storyboard rows as practical notes for an animator who already knows the channel. Be direct and specific. Describe the visible action, not a general summary of the narration. Keep background and prop notes short unless extra detail is necessary. Do not force every field to contain text. Add on-screen text, labels, arrows, diagrams, Professor appearances, or special transitions only when they genuinely help the scene. Do not make every scene a polished educational infographic. Vary the visual approach according to the narration: action, reaction, object, setting change, close-up, visual comparison, diagram, or a short sequence. Follow the script’s actual pacing and preserve the exact voiceover wording. The examples show different scene rhythms, so do not enforce one fixed scene length or description length.

This candidate text describes storyboard depiction choices. It should remain separate from guidance that analyzes the writing and intended audience experience of the script. The supplied evidence also does not establish the channel’s full character, framing, composition, motion, or transition rules.

## Questions for Fred or the storyboard creator

- When do they start a new scene instead of continuing the current one?
- How do they choose between a literal action, visual metaphor, diagram, and reaction shot?
- When should the Professor appear, and when should the scene focus on the subject alone?
- How much background and prop detail do animators need?
- Which visual jokes, exaggerations, or unexpected choices are common in the channel?
- Which transitions are normally implied and do not need to be written?
- Are there conventions for character continuity, repeated locations, camera framing, or reusing a background?

## Matched-script test

Generate a storyboard from one of Fred’s original scripts using the revised prompt, then compare it with Fred’s actual storyboard for that same script. Review a sample side by side and classify differences with this checklist:

| Check | Question |
| --- | --- |
| Scene choice | Did the AI choose the same kind of visual beat, or a generic substitute? |
| Scene split | Did it break the narration at a useful moment? |
| Action | Can an animator tell what to draw without guessing? |
| Specificity | Does the row include the right details without unnecessary wording? |
| Style habits | Did it add a Professor, label, arrow, diagram, or transition without a clear reason? |
| Continuity | Do characters, props, and locations stay consistent where needed? |

A matched script is more informative than comparing outputs about unrelated topics. Until this test is done, prompt changes should not be described as proven improvements.

## Bottom line

In the reviewed files, AI storyboards are often more polished, wordy, and consistent in their formatting than Fred’s examples. Fred’s rows vary: some are tiny, some detailed, some fields blank, and the visual treatment changes with the narration. The prompt should help the planner make those choices rather than merely produce a complete-looking table.

## Source files reviewed

The unchanged source DOCX is retained in this repository as `docs/Evprof_Storyboard_Style_Analysis.docx`.

- Fred: `01_every_weird_body_glitch.csv(1).xlsx`
- Fred: `03_strangest_things_your_body_does.csv.xlsx`
- AI: `how-a-city-turns-river-water-into-drinking-water-storyboard.csv`
- AI: `how-a-raindrop-travels-through-a-city-storyboard.csv`
- AI: `how-a-honeybee-turns-nectar-into-honey-storyboard.csv`
- AI: `how-a-plastic-bottle-gets-a-second-life-storyboard.csv`

