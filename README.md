# Project Storyboard

A focused script-to-storyboard demo. Paste a complete narration, generate a scene-by-scene storyboard with the AWS n8n workflow, review all eight animator handoff columns, and download the CSV.

## What it does

- Sends one complete script to the storyboard-only n8n workflow.
- Uses the connected EverythingProfessor storyboard examples and structured output parser.
- Displays the returned scene plan in a horizontally scrollable table.
- Downloads the storyboard CSV using a filename based on the script title.
- Supports light and dark themes, follows the device preference on first visit, and remembers the selected theme in the browser.

This project does not generate background images, upload files to Drive, or send team notifications.

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

