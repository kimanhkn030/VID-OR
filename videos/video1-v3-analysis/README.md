# Video 1 — Version 3 editorial package

Priority editorial/transcript/voice package for the 92.322 s source `video 1.mp4`.

## Deliverables

- `SOURCE_ANALYSIS.md` — source metadata, full cut/timing inventory, audio evidence, and supported-claim ledger.
- `TRANSCRIPT_STATUS.md` — timestamped speech-segment skeleton and the exact reason a verified Vietnamese transcript is still blocked.
- `REFERENCE_STYLE_NOTES.md` — style-only observations from `Video 4.mp4`; its footage is prohibited from reuse.
- `REWRITE_SCRIPT_DRAFT.md` — stronger Vietnamese narrative draft limited to visible source evidence. It is explicitly provisional until source VO transcription is available.
- `PROOF_15S_PLAN.md` — exact 15-second proof edit, source ranges, captions, VO, and audio plan.
- `FULL_STORYBOARD.md` — full 92-second value-first storyboard based only on the original footage.
- `voicestudio-proof-request.template.json` — VoiceStudio request template using a discovered neutral Vietnamese voice ID; no identity imitation.
- `VOICESTUDIO_RUNBOOK.md` — preflight, discovery, transcription, and proof-VO commands.

## Evidence assets

- `assets/video1-voice.wav` — mono 16 kHz PCM extraction of the original 92.322 s soundtrack.
- `assets/video1-scene-metadata-030.txt` — scene cuts detected at score > 0.30.
- `assets/video1-scene-metadata.txt` — more sensitive scene cuts detected at score > 0.12.
- `assets/reference-scene-metadata.txt` — reference-only cut timing analysis.
- `contact-sheets/video1-every3s-01.jpg` and `-02.jpg` — full-source visual review at 3 s intervals.
- `contact-sheets/video1-scene-cuts-030.jpg` — ordered source cut frames.
- `contact-sheets/reference-video4-every3s.jpg` — reference-only style inspection sheet.

## Current blocker

VoiceStudio is not installed/running and `http://localhost:3900/health` refused the connection. `whisper-cli` is installed, but no multilingual Whisper model is present. No model was downloaded. A verified transcript and generated proof VO therefore remain pending explicit model/backend availability.

