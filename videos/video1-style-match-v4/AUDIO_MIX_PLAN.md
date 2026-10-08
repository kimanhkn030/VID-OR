# Video 1 Style Match V4 — Audio Integration and Mix Plan

## Locked intent

- Keep `video 1.mp4` as the only picture/source-audio master. Its embedded audio stays at unity, in sync, and receives no trim, replacement, time-stretch, EQ, compression, gate, or loudness normalization.
- Use `Video 4.mp4` only as a sound-design density/style reference. Do not extract or reuse its soundtrack.
- Added audio consists only of one fast, rising industrial bed plus the approved whoosh, impact, and tick accents. The bed is accelerated 8% with pitch preservation and shaped into a stronger curiosity-building arc. All added sound is gone by `01:31.000`; the original source audio continues with the source video through `01:32.322`.
- The voice must remain the foreground element. Do not chase the reference's loudness.

## Measurement baseline

Measurements are from the decoded files with FFmpeg `ebur128=peak=true` and `volumedetect`.

| File | Duration / format | Integrated loudness | True peak | Decision |
|---|---:|---:|---:|---|
| `video 1.mp4` embedded audio | 92.321995 s, AAC, 44.1 kHz stereo | -24.0 LUFS | -4.5 dBTP | Preserve exactly at `data-volume="1"`; this is the mix anchor. |
| `Video 4.mp4` embedded audio | 78.135147 s, AAC, 44.1 kHz stereo | -14.8 LUFS | +0.1 dBTP | Style reference only. Its density/loudness is specifically not a target. |
| `bgm_001.wav` / `industrial-pulse.wav` | 100.360 s, PCM 16-bit, 44.1 kHz stereo | -23.9 LUFS | -12.3 dBTP | Reuse; it is long enough for one continuous, loop-free bed. |
| `sfx_001.mp3` (whoosh) | 0.574688 s | -15.2 LUFS | -2.0 dBTP | Reuse for light section launches/swishes. Measured peak lag: about 0.160 s. |
| `sfx_002.mp3` / `opening-impact.mp3` | 2.115906 s | -6.5 LUFS | -0.4 dBTP | Reuse at very low gain for opening/keyword/sub hits. Measured peak lag: about 0.070 s. |
| `sfx_003.mp3` / `metal-tick.mp3` | 0.365688 s | too short for meaningful gated LUFS; RMS -30.7 dBFS | -4.8 dBTP | Reuse for checks and locks. Measured peak lag: about 0.050 s. |

Source-audio silence detection at -42 dBFS confirms the three planned bed-lift windows: `04.911–06.707`, `35.106–37.946`, and `58.475–61.311`. These are real low-level gaps, not transcript guesses.

## Reuse and provenance decision

Do not resolve or generate new audio. The workspace already contains semantically correct, licensed/local candidates.

| Destination role | Canonical source | SHA-256 | Provenance |
|---|---|---|---|
| Industrial bed | `../video1-director-v3/.media/audio/bgm/industrial-pulse.wav` | `c526a79347aecbfe9d030ba228badb94d6eb92d86b34779d76c18aafb9dae302` | Reused from V1 resolved local media; director manifest marks it workspace-local. Byte-identical to V1 `bgm_001.wav`. |
| Opening/low impact | `../video1-director-v3/.media/audio/sfx/opening-impact.mp3` | `634d5eda5eb7b501aca98393a64f3815eccf24157cd1d95df55aaec1b5000bd7` | Bundled SFX, library key `impact-bass-1`; byte-identical to V1 `sfx_002.mp3`. |
| Metal/confirmation tick | `../video1-director-v3/.media/audio/sfx/metal-tick.mp3` | `075e17bdac5c13662a1c9530050e0046f81d4138e00eb3bf30427a7b4404103d` | Bundled SFX, library key `click`; byte-identical to V1 `sfx_003.mp3`. |
| Short whoosh/swish | `../video1-hyperframes-v1/.media/audio/sfx/sfx_001.mp3` | `c2efd9d902a59bf9ec5019035d7deadd17762136896b6e3cb6dd99ea50997a30` | Bundled SFX, library key `whoosh`. Unique useful candidate in the inspected sets. |

At implementation time, copy/freeze these exact bytes into this project's own `.media/audio/{bgm,sfx}/` tree and add explicit `reused-explicit` manifest records. Do not hotlink sibling-project paths in the final composition. Preserve the hashes and original provider/library-key fields. No fresh provider call is warranted.

There is no suitable dark-rise candidate. Beat 17 should therefore use the bed's measured-gap lift/re-entry and deliberate restraint, not a reversed or mislabeled whoosh. The single tick asset also has no true alternate-pitch version; vary level and spacing only rather than claiming a pitch change that the source does not contain.

## Track architecture

1. **Source / voice:** keep the existing `#a-roll` video audible with `data-has-audio="true"`, `data-volume="1"`, no `muted`, no `data-automation`, and no `data-fx-chain`. Add `data-audio-group="voiceover"` only so the bed can reference a durable voice group. Do not add an `<hf-audio-group>` processor for the source.
2. **Music:** one `<audio id="music-bed">`, `data-start="0"`, `data-duration="91"`, `data-media-start="0"`, `data-playback-rate="1.08"`, `data-volume="1"`. Its volume is authored exclusively by the lane below. The faster playback remains pitch-preserved in preview/render and the 100.36 s source still covers the full 91 s authored window.
3. **SFX:** individual `<audio>` clips with unique ids and the full intrinsic file duration. Put every accent in `data-audio-group="sfx"`. A shared `<hf-audio-group id="sfx" data-volume="1">` is optional but useful as one emergency trim; it must contain no voice or music.
4. **Composition:** retain the exact master duration `92.322` s. No added audio element may begin at or after `91.000` s.

## Music level, fades, and voiceover carve

The volume lane is clip-local; because the bed starts at zero, these are also composition times. Keep `data-volume="1"` and encode all level movement in one `volume` lane—never also tween `volume` in GSAP.

```json
{
  "version": 1,
  "lanes": [
    {
      "target": "volume",
      "points": [
        { "t": 0.000, "v": 0.000 },
        { "t": 0.250, "v": 0.180 },
        { "t": 0.800, "v": 0.220 },
        { "t": 2.250, "v": 0.300 },
        { "t": 4.000, "v": 0.380 },
        { "t": 5.050, "v": 0.440 },
        { "t": 6.700, "v": 0.320 },
        { "t": 14.200, "v": 0.340 },
        { "t": 22.400, "v": 0.380 },
        { "t": 26.000, "v": 0.340 },
        { "t": 28.800, "v": 0.390 },
        { "t": 34.900, "v": 0.340 },
        { "t": 35.200, "v": 0.430 },
        { "t": 37.700, "v": 0.430 },
        { "t": 38.000, "v": 0.340 },
        { "t": 51.500, "v": 0.380 },
        { "t": 58.650, "v": 0.420 },
        { "t": 61.000, "v": 0.420 },
        { "t": 61.300, "v": 0.360 },
        { "t": 69.500, "v": 0.430 },
        { "t": 72.000, "v": 0.380 },
        { "t": 77.500, "v": 0.420 },
        { "t": 80.800, "v": 0.390 },
        { "t": 85.000, "v": 0.460 },
        { "t": 88.800, "v": 0.420 },
        { "t": 90.350, "v": 0.340 },
        { "t": 91.000, "v": 0.000 }
      ]
    }
  ]
}
```

- The working bed range is `0.320–0.460` (about -9.90 to -6.74 dB before carve), intentionally more present than the first restrained mix.
- Energy rises across the hook, process sections, heat-treatment reveal and CTA, then fades from `0.340` to digital zero by `01:31.000`.
- The initial fade is 450 ms. The final 650 ms fade reaches digital zero exactly at `01:31.000`.

Music under speech must also receive a **dynamic voiceover carve**; the volume lane alone is not the finished duck. Put `data-fx-carve` on `#music-bed`, never on the source video or on a bus:

```json
{ "enabled": true, "sources": ["voiceover"], "strength": 0.52 }
```

`0.52` keeps the faster, louder bed present while still carving the narrator's key bands. Generate the actual `fromCarve` peaking nodes, gain stage, and speech-following automation from the real placed files; do not hand-invent those lanes. The carve must recover between phrases and must not leave the bed audibly hollow.

## SFX cue sheet

`Land` is the intended visual/transient peak. `Clip start` already subtracts the measured file peak lag (impact 0.070 s, whoosh 0.160 s, tick 0.050 s). Use full intrinsic duration so the source's own tail/silence ends naturally. Gains are linear `data-volume` values; no SFX processing is required.

| Land | Clip start | Asset | Gain | Approx. isolated peak after gain | Purpose |
|---:|---:|---|---:|---:|---|
| 00:00.200 | 00:00.130 | impact | 0.060 | -24.8 dBTP | Soft opening impact. |
| 00:02.550 | 00:02.390 | whoosh | 0.080 | -23.9 dBTP | `ĐỦ DẢI KÍCH THƯỚC` line settle. |
| 00:04.800 | 00:04.730 | impact | 0.045 | -27.3 dBTP | Low lock on `1 TẤM`. |
| 00:09.120 | 00:09.070 | tick | 0.070 | -27.9 dBTP | Beat 04: `ĐÚNG MÁC`, aligned to the verified word cue. |
| 00:10.400 | 00:10.350 | tick | 0.080 | -26.7 dBTP | Beat 04: `ĐÚNG DẠNG`, aligned to the verified word cue. |
| 00:11.090 | 00:11.040 | tick | 0.075 | -27.3 dBTP | Beat 05: `ĐÚNG KÍCH THƯỚC`, aligned to the verified word cue. |
| 00:11.620 | 00:11.570 | tick | 0.085 | -26.2 dBTP | Beat 05: `ĐÚNG QUY CÁCH`, aligned to the verified word cue. |
| 00:14.500 | 00:14.340 | whoosh | 0.090 | -22.9 dBTP | Material-range section launch. |
| 00:22.700 | 00:22.540 | whoosh | 0.070 | -25.1 dBTP | Mechanical wipe for sheet material. |
| 00:31.420 | 00:31.370 | tick | 0.075 | -27.3 dBTP | Beat 09: `KÍCH THƯỚC`, aligned to the verified word cue. |
| 00:32.030 | 00:31.980 | tick | 0.085 | -26.2 dBTP | Beat 09: `DUNG SAI`, aligned to the verified word cue. |
| 00:35.333 | 00:35.173 | whoosh | 0.090 | -22.9 dBTP | Beat 11: `XẺ CUỘN` launch, aligned to the verified phrase onset. |
| 00:38.170 | 00:38.120 | tick | 0.050 | -30.8 dBTP | Beat 12: muted tick on `KHỔ RỘNG`. |
| 00:39.060 | 00:39.010 | tick | 0.055 | -30.0 dBTP | Beat 12: muted tick on `CHIỀU DÀI`. |
| 00:39.880 | 00:39.830 | tick | 0.060 | -29.2 dBTP | Beat 12: muted tick on `KHỐI LƯỢNG`. |
| 00:46.680 | 00:46.630 | tick | 0.090 | -25.7 dBTP | Beat 13: one confirmation at the end of `BỀ MẶT`. |
| 00:47.000 | 00:46.840 | whoosh | 0.060 | -26.4 dBTP | Beat 14: soft swish at the `ĐÓNG GÓI` phrase onset. |
| 00:51.500 | 00:51.430 | impact | 0.040 | -28.4 dBTP | Precision-machining section hit. |
| 00:54.850 | 00:54.800 | tick | 0.055 | -30.0 dBTP | Machining proof 1. |
| 00:55.600 | 00:55.550 | tick | 0.060 | -29.2 dBTP | Machining proof 2. |
| 00:56.350 | 00:56.300 | tick | 0.065 | -28.5 dBTP | Machining proof 3. |
| 00:64.850 | 00:64.800 | tick | 0.055 | -30.0 dBTP | Heat-treatment proof 1. |
| 00:65.850 | 00:65.800 | tick | 0.060 | -29.2 dBTP | Heat-treatment proof 2. |
| 00:66.850 | 00:66.800 | tick | 0.065 | -28.5 dBTP | Heat-treatment proof 3. |
| 00:69.800 | 00:69.730 | impact | 0.035 | -29.5 dBTP | Beat 19: restrained sub hit on the baked-in vacuum-nitriding title; no added overlay. |
| 00:76.950 | 00:76.900 | tick | 0.100 | -24.8 dBTP | Single confirmation at end of proof cluster. |
| 00:77.800 | 00:77.640 | whoosh | 0.080 | -23.9 dBTP | Upward quantity-range transition. |
| 00:85.300 | 00:85.140 | whoosh | 0.090 | -22.9 dBTP | CTA/question launch. |
| 00:89.150 | 00:89.100 | tick | 0.100 | -24.8 dBTP | Hotline number lock. Last added SFX ends by 89.466 s. |

Do not add SFX to beats 07, 10, 17, or 22. Their deliberate absence keeps the track from becoming a sound-per-word treatment. Beat 19 is source-title-only visually; its low sub hit supports the title already baked into the footage and must not imply a second overlay. If visual landing times move during animation polish, move the corresponding SFX start by the same delta; preserve the peak offsets above.

The corrected beat-12 words occur at `38.170`, `39.060`, and `39.880`, so their true VO-synchronous span is 1.710 s. Follow these word cues even though the current animation-map prose also says “total stagger under 0.5 seconds”; those two instructions cannot both be true, and input accuracy takes precedence.

## Peak and loudness safety

- Do **not** apply `loudnorm`, a source-track limiter, or any master gain increase. The previous proof FFmpeg chain (`loudnorm=I=-16...`) is not appropriate for this source-preserving version.
- Expected full-mix integrated loudness remains voice-led, approximately -24.0 to -21.0 LUFS. This is an observation window, not a normalization target.
- Final hard acceptance: `Peak <= -1.0 dBTP`, no clipping, no audible pumping, and voice intelligibility unchanged. The source's -4.5 dBTP peak provides useful headroom; the planned added assets peak roughly 18–26 dB below it.
- If the rendered true peak exceeds -1.0 dBTP, first trim the `sfx` group in 1 dB steps. If the overage occurs outside an SFX cue, reduce the bed lane values proportionally. Never reduce/process the source video merely to make room for optional design sound.
- If the carve sounds notched, lower strength from `0.52` to `0.46`; if speech is masked, first verify the correct `voiceover` group and regenerated carve before increasing strength. Do not replace the carve with a broad manual duck.

## Implementation and validation commands

Run from `videos/video1-style-match-v4` after the composition and frozen project-local assets exist.

```bash
# 1. Confirm exact reused bytes.
shasum -a 256 \
  .media/audio/bgm/industrial-pulse.wav \
  .media/audio/sfx/opening-impact.mp3 \
  .media/audio/sfx/metal-tick.mp3 \
  .media/audio/sfx/short-whoosh.mp3

# 2. Confirm duration/sample layout; the bed must remain longer than 91 s.
ffprobe -v error -select_streams a:0 \
  -show_entries stream=codec_name,sample_rate,channels,duration:format=duration \
  -of default=nw=1 .media/audio/bgm/industrial-pulse.wav

# 3. Inspect the real carve decision without writing, then write it once approved.
node /Users/kim/.agents/skills/hyperframes-audio/scripts/carve.mjs \
  --comp index.html --bed music-bed --voice a-roll --strength 0.52 --dry-run
node /Users/kim/.agents/skills/hyperframes-audio/scripts/carve.mjs \
  --comp index.html --bed music-bed --voice a-roll --strength 0.52

# 4. Inspect track ends/groups and run the full project gate.
npx --yes hyperframes@0.8.139 timeline --json
npm run check

# 5. Render a mix-QC file only after the composition passes.
npm run render -- --quality looks --output output/video1-style-match-v4-audio-qc.mp4

# 6. Measure final loudness and true peak from the bytes viewers will hear.
ffmpeg -hide_banner -nostats \
  -i output/video1-style-match-v4-audio-qc.mp4 \
  -map 0:a:0 -af "ebur128=peak=true:framelog=quiet" -f null - 2>&1 | tail -n 14

# 7. Confirm sample peak as a secondary guard.
ffmpeg -hide_banner -nostats \
  -i output/video1-style-match-v4-audio-qc.mp4 \
  -map 0:a:0 -af volumedetect -f null - 2>&1 | \
  rg 'mean_volume|max_volume'
```

After rendering, audition at minimum these windows on headphones and a phone speaker: `00:00–00:07` (opening and first lift), `00:34.5–00:38.5` (long gap/re-entry), `00:58–01:02` (long gap into heat treatment), `01:09–01:18` (sub hit plus proof ticks), and `01:24.5–01:32.322` (CTA, last click, clean added-audio exit). The bed should return gently in the three gaps, the voice should never recede, and no added tail may cross `01:31.000`.
