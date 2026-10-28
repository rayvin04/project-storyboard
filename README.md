# Project Storyboard

A focused script-to-storyboard demo. Paste a complete narration, generate a scene-by-scene storyboard with the AWS n8n workflow, review all eight animator handoff columns, and download the CSV.

## What it does

- Sends one complete script to the storyboard-only n8n workflow.
- Uses the connected EverythingProfessor storyboard examples and structured output parser.
- Displays the returned scene plan in a horizontally scrollable table.
- Downloads the storyboard CSV using a filename based on the script title.
- Saves each successfully packaged CSV as a uniquely named file in the [Storyboard Only - No Images Google Drive folder](https://drive.google.com/drive/folders/1hiwy8D0GWx61tweE636SqqkktvWOABgY).
- Uses a script-title slug, processing timestamp, and n8n execution ID in each filename; narration-warning results are marked `potentially-incomplete`.
- Shows whether the Drive backup succeeded, and keeps the CSV download available if it did not.
- Supports light and dark themes, follows the device preference on first visit, and remembers the selected theme in the browser.

This project is storyboard-only. It does not generate background images or send team notifications.

## Evprof references

- [Script-writing analysis](docs/evprof-script-writing-style-analysis.md) describes observed narration and storytelling patterns.
- [Storyboard-style analysis](docs/evprof-storyboard-style-analysis.md) compares the supplied storyboard examples and proposes animator-facing prompt changes that still need matched-script testing.
- The original storyboard-analysis DOCX is retained at `docs/Evprof_Storyboard_Style_Analysis.docx`.

Keep script-understanding guidance separate from storyboard depiction guidance. The analysis documents do not establish the channel’s complete animation, character, composition, or motion rules.

## Runtime integration

The web app sends `{ title, script, mode: "storyboardOnly" }` to the AWS n8n webhook configured in `app.js`. The workflow plans the storyboard, validates and packages the eight-column CSV, saves the CSV to Google Drive, and returns the storyboard to the UI. A `driveSave` response field reports the backup result; a Drive failure does not hide the storyboard or disable the CSV download.

The workflow definition and credentials remain in n8n, not in this repository. The saved-storyboards button opens the configured Drive folder in a new tab.

## Run locally

Serve this folder with any static web server. For example:

```sh
python -m http.server 4173
```

Open `http://localhost:4173`. The page posts to the AWS n8n webhook configured in `app.js`.

## Deploy

The repository root is a static site. The GitHub repository is connected to the `project-storyboard` Vercel project, so a push to `main` triggers a production deployment. The n8n webhook must allow the deployed Vercel origin in its CORS settings.

The browser sends the complete script to the AWS webhook at `/webhook/project-storyboard` as a JSON payload with a simple `text/plain` content type. The response includes the storyboard CSV, scene count, and Drive save status; background image generation is outside this project.

## Storyboard columns

`Scene`, `Timestamp`, `Voiceover`, `What's happening`, `Background`, `Hand-drawn characters & props`, `On-screen text`, and `Transitions/Motion`.
