# VoiceStudio transcription and proof-VO runbook

No call below was claimed successful in this run. The backend was unavailable.

## 1. Preflight and discovery

```sh
curl --fail-with-body --show-error http://localhost:3900/health
curl --fail-with-body --show-error http://localhost:3900/openapi.json \
  --output openapi.json
curl --fail-with-body --show-error http://localhost:3900/v1/audio/voices \
  --output voices.json
```

Inspect the actual schema and select a saved/licensed Vietnamese voice or a neutral designed Vietnamese profile. Do not use a real person’s identity or clone without explicit permission.

## 2. Transcribe the original soundtrack

```sh
curl --fail-with-body --show-error http://localhost:3900/v1/audio/transcriptions \
  -F file=@assets/video1-voice.wav \
  -F model=whisper-1 \
  -F response_format=verbose_json \
  --output original-vo.verbose.json
```

If the live OpenAPI schema supports language selection, set Vietnamese (`vi`). Do not invent an unsupported field; follow the discovered contract.

## 3. Generate the 15-second proof VO

Copy `voicestudio-proof-request.template.json` to `voicestudio-proof-request.json` and replace the placeholder with the **discovered** neutral Vietnamese voice profile ID.

```sh
curl --fail-with-body --show-error http://localhost:3900/v1/audio/speech \
  -H 'Content-Type: application/json' \
  --data-binary @voicestudio-proof-request.json \
  --output proof-vo.wav
```

## 4. Verification

```sh
ffprobe -v error \
  -show_entries format=duration,format_name,size \
  -of json proof-vo.wav
```

Confirm the output decodes as WAV and measure its real duration before fitting the edit. If the narration is longer than 15 s, shorten wording or select a modest supported speed; do not chipmunk/time-stretch the identity.

## Local Whisper fallback requiring approval

Recommended file: `ggml-large-v3-turbo-q5_0.bin` (**547 MiB**). Once legitimately present:

```sh
whisper-cli \
  -m /approved/path/ggml-large-v3-turbo-q5_0.bin \
  -l vi \
  -ojf -osrt \
  -of original-vo \
  assets/video1-voice.wav
```

