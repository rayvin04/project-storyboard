# Project Storyboard

A focused script-to-storyboard demo. Paste a complete narration, generate a scene-by-scene storyboard with the AWS n8n workflow, review all eight animator handoff columns, and download the CSV.

## What it does

- Sends one complete script to the storyboard-only n8n workflow.
- Uses the connected EverythingProfessor storyboard examples and structured output parser.
- Displays the returned scene plan in a horizontally scrollable table.
- Downloads the storyboard CSV using a filename based on the script title.
- Supports light and dark themes, follows the device preference on first visit, and remembers the selected theme in the browser.

This project does not generate background images, upload files to Drive, or send team notifications.

## Evprof references

- [Script-writing analysis](docs/evprof-script-writing-style-analysis.md) describes observed narration and storytelling patterns.
- [Storyboard-style analysis](docs/evprof-storyboard-style-analysis.md) compares the supplied storyboard examples and proposes animator-facing prompt changes that still need matched-script testing.
- The original storyboard-analysis DOCX is retained at `docs/Evprof_Storyboard_Style_Analysis.docx`.

Keep script-understanding guidance separate from storyboard depiction guidance. The analysis documents do not establish the channel’s complete animation, character, composition, or motion rules.

## Runtime integration status

The web app sends the unchanged `{ title, script, mode: "storyboardOnly" }` request to the AWS n8n webhook configured in `app.js`. The workflow definition is not stored in this repository. The n8n connection available during this change exposed separate, inactive Heroku workflows with different webhook paths; it did not expose the AWS `project-storyboard` endpoint. Because those are different runtime targets, this repository change does not claim that the deployed AWS planner has loaded the new storyboard guidance. The matching AWS workflow still needs to load the reference through its supported prompt/context mechanism.

## Run locally

Serve this folder with any static web server. For example:

```sh
python -m http.server 4173
```

Open `http://localhost:4173`. The page posts to the AWS n8n webhook configured in `app.js`.

## Deploy

The repository root is a static site. The GitHub repository is connected to the `project-storyboard` Vercel project, so a push to `main` triggers a production deployment. The n8n webhook must allow the deployed Vercel origin in its CORS settings.

The browser sends the complete script to the AWS webhook at `/webhook/project-storyboard` as a JSON payload with a simple `text/plain` content type. A successful response contains the storyboard CSV and scene count; background image generation is outside this project.

## Storyboard columns

`Scene`, `Timestamp`, `Voiceover`, `What's happening`, `Background`, `Hand-drawn characters & props`, `On-screen text`, and `Transitions/Motion`.

