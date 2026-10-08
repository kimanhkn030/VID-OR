# Independent input-accuracy review

## Verdict

**Not ready to build exactly as mapped.** The source selection, duration, aspect ratio, core copy, and Video 4 color/type direction are substantially correct, but two input mismatches would be visible in the finished film: several overlays are not aligned to the words they represent, and beat 19 duplicates text already baked into the source footage.

Evidence checked independently:

- `video 1.mp4`: 92.322 s container duration, 2160x3840, 30 fps.
- `Video 4.mp4`: 78.135 s, 1080x1920, 60 fps.
- `analysis/source/transcript.json` and `analysis/reference/transcript.json`.
- Direct frame inspection of both videos, including the 35-50 s, 68-73 s, and 88-92.322 s regions of `video 1.mp4`.

## Blockers

None. The requested source and reference files are present and readable, and the named reusable audio assets exist elsewhere in the workspace.

## Major findings

### M1 — Several beat windows are materially out of sync with the source voice-over

The map promises overlays that follow the voice-over, but multiple cue windows start or end before/after the represented phrase. The clearest affected run is beats 11-14:

| Copy | Spoken in source transcript | Planned window | Result |
|---|---:|---:|---|
| `XẺ CUỘN ... THEO YÊU CẦU` | 35.00-38.00 | 38.00-41.90 | Starts only when the phrase has finished. |
| `KHỔ RỘNG / CHIỀU DÀI / KHỐI LƯỢNG` | 38.17-40.81 | 41.90-45.60 | All three items arrive roughly 1.1-3.7 s late. |
| `DUNG SAI / BA VIA / BỀ MẶT` | 43.77-46.68 | 45.60-48.20 | `DUNG SAI` is late and the grouped card trails into the next idea. |
| `ĐÓNG GÓI & BẢO QUẢN` | 47.00-48.45 | 48.20-50.80 | Enters near the end of the phrase and remains while VO has moved to storage conditions. |

There are earlier instances too: beat 4 opens at 6.70 although `đúng mác` is spoken at 9.12 and `đúng dạng` at 10.40; beat 9 schedules `DUNG SAI` for 26.00-30.20 although the words are spoken at 32.03. These offsets are too large to solve only by staggering lines inside the current windows.

Required correction: retime each line entrance from the word-level transcript, with short readable holds after the phrase rather than assigning one broad window to the whole card. At minimum, revise beats 4, 9, and 11-14 before implementation.

### M2 — Beat 19 duplicates a title already embedded in `video 1.mp4`

At approximately 69.8-71.1 s, the source footage itself displays `THẤM NITƠ CHÂN KHÔNG` in large white condensed type across the upper-middle of frame. Beat 19 proposes the same hero phrase from 69.50-72.30 and only says not to cover the existing text. Moving the duplicate elsewhere would still produce two identical headlines at once and would not match Video 4's information hierarchy.

Required correction: remove beat 19 as an added overlay, or explicitly treat the baked title as the beat and add no second copy. Beat 20 can begin after the embedded title clears.

## Minor findings

### m1 — Beat 6 contains an avoidable wording error

`ĐA DẠNG DẠNG VẬT LIỆU` repeats `DẠNG`. The source says, in context, “đa dạng về chủng loại, dạng vật liệu và kích thước.” Use wording such as `ĐA DẠNG CHỦNG LOẠI` / `DẠNG VẬT LIỆU & KÍCH THƯỚC`.

### m2 — “Style match” should not be read as a literal copy-density match

Video 4 commonly carries sentence-length, two-to-three-line overlays for much of the narration, whereas this approved plan deliberately uses shorter keyword cards and a two-line maximum. The color system, condensed uppercase type, outlined/shadowed treatment, upper-frame placement, and selective green checks are faithful; the text density is an intentional adaptation, not a literal match. Keep that distinction explicit during review so shorter copy is not later mistaken for missing subtitles.

### m3 — The final clean-card boundary is slightly approximate

The source is still on the truck shot at 90.50 s, begins its logo transition around 91.00 s, and reaches the clean centered logo shortly afterward. Clearing all overlays at 91.00 s is correct, but the phrase “logo card from 01:31.00” describes the start of the transition, not an already-static card.

## Confirmed accurate items

- The source duration/aspect/fps and the 9:16 output assumption are correct.
- The ORISTAR corner logo is present through the footage; reserving the top-right is necessary.
- Avoiding uncertain dimensions in the 22-35 s section is justified by the noisy transcript.
- The phone number `0988 750 686` agrees with the source transcript and is timed to the 89.00-91.00 s spoken number.
- The Video 4 palette description (cyan/white with a dark outline or shadow, occasional green check) and condensed uppercase typography are supported by direct frame inspection.
- The reusable `industrial-pulse`, `opening-impact`, and `metal-tick` assets do exist under `videos/video1-director-v3/.media/audio/`; their mix suitability still needs auditioning during build.

