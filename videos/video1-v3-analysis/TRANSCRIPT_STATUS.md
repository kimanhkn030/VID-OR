# Transcript status — original 92.322 s Vietnamese VO

## Status

**Blocked, not fabricated.** An accurate timestamped transcript could not be generated in this run because:

1. `GET http://localhost:3900/health` failed: VoiceStudio is not running/installed.
2. No VoiceStudio voice/transcription contracts could therefore be discovered from `/openapi.json` or `/v1/audio/voices`.
3. `whisper-cli` exists at `/opt/homebrew/bin/whisper-cli`, but no multilingual Whisper model file is installed.
4. No model was silently downloaded.

The complete source soundtrack has been prepared at `assets/video1-voice.wav` (mono, 16 kHz PCM, 92.322 s), ready for VoiceStudio or local Whisper transcription.

## Recommended local model if approval is granted

- `ggml-large-v3-turbo-q5_0.bin`
- Disk download: **547 MiB**
- Multilingual; appropriate for Vietnamese; quantized for practical local use.
- Lower-download fallback: `ggml-small.bin`, **466 MiB**, but the larger turbo model is preferred for names and industrial terminology.

## Timestamped speech-segment skeleton

This is **not a text transcript**. It only maps audible runs using silence detection at −35 dB for ≥0.35 s, so a future STT result can be checked against the original timing.

| Segment | Approx. audible range | Visual context |
|---:|---|---|
| 1 | 00:00.754–00:03.038 | Factory-wide opening |
| 2 | 00:03.516–00:04.895 | Factory-wide opening |
| 3 | 00:06.721–00:07.554 | Coil-processing line begins |
| 4 | 00:08.015–00:09.236 | Coil-processing line |
| 5 | 00:09.694–00:10.465 | Coil-processing line |
| 6 | 00:10.916–00:13.708 | Coil-processing line |
| 7 | 00:14.182–00:21.847 | Warehouse racks and aisle |
| 8 | 00:22.414–00:22.933 | Machine controls |
| 9 | 00:23.378–00:24.863 | Machine controls |
| 10 | 00:25.313–00:26.954 | Sheet cutting |
| 11 | 00:27.411–00:30.662 | Sheet cutting |
| 12 | 00:31.136–00:35.100 | Cut output handling |
| 13 | 00:37.951–00:43.129 | Fast coil/roller montage |
| 14 | 00:43.633–00:50.597 | Coil processing and ring stock |
| 15 | 00:51.559–00:56.074 | Mechanical machining |
| 16 | 00:56.539–00:58.466 | Mechanical machining |
| 17 | 01:01.316–01:08.999 | Treatment chamber/equipment montage |
| 18 | 01:09.546–01:11.418 | Vacuum-nitriding label/equipment |
| 19 | 01:11.787–01:15.642 | Treatment-to-warehouse transition |
| 20 | 01:16.050–01:19.443 | Control console and packing |
| 21 | 01:20.302–01:24.421 | Warehouse inventory |
| 22 | 01:25.114–01:27.366 | Forklift/dispatch |
| 23 | 01:28.112–01:31.567 | Truck loading and logo transition |

## Acceptance criteria for the eventual transcript

- Vietnamese language forced or verified, not auto-translated.
- Verbose JSON/SRT timestamps retained.
- Proper noun `ORISTAR` checked manually.
- Industrial terms checked against visible source: cuộn/tấm kim loại, cắt, gia công cơ khí, thấm nitơ chân không.
- Any uncertain phrase marked `[không rõ]` rather than guessed.
- Transcript segments reconciled with the pause map above and the exact 92.322 s duration.

