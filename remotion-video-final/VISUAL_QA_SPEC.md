# ORISTAR 92s — Visual QA Specification

Status: implementation specification for the final Remotion build. This file does not change the approved wording, source footage, shot order, voice-over, or audio plan.

## 1. Source of truth

- Canvas: `1080 × 1920`, vertical `9:16`, `30 fps`.
- Duration: preserve the complete `92.322 s` source timeline and original shot order.
- Approved locked wording: `transcript/TEXT_LOCK_V1.md`.
- Full text timing map: `transcript/TEXT_BRAINSTORM_ROUND2.md`, treated as the approved map for visual placement.
- Footage evidence and edit boundaries: `videos/video1-v3-analysis/SOURCE_ANALYSIS.md`.
- Reference grammar only: `videos/video1-v3-analysis/REFERENCE_STYLE_NOTES.md` and `Video 4.mp4`. Do not reuse its footage, copy, graphics, or claims.
- Text is a key-phrase overlay, not a subtitle track. Never display a sentence-length transcription.

## 2. Findings from the existing V1 and V2 contact sheets

### Keep

- V1 has the correct reference-level impact: condensed uppercase type, cyan fill, white outline, navy depth shadow, and green confirmation marks.
- V2 is more restrained and preserves more of the footage. Its small eyebrow + large phrase hierarchy is a useful starting structure.
- Both versions correctly avoid covering the persistent ORISTAR logo in most frames.

### Correct in the final build

- V1 centers nearly every headline at the same height. Across 92 seconds this will feel templated and will repeatedly cover machine action.
- V1's small proof/footer labels are too small to survive a phone-sized playback; they should either be at least `26 px` or removed.
- V2's cyan type is visually thinner and less decisive than the Video 4 reference. The final hero style needs the V1 outline/shadow strength with the V2 restraint in density.
- V2 places some lower-left copy directly over the processing equipment and worker. The final build must move text by shot, not reuse one global anchor.
- Neither proof demonstrates the numerical cards, heat-treatment chapter, nitriding footage, dispatch CTA, or clean end-card handling. Those are covered explicitly below.

## 3. Coordinate system and exact safe zones

All coordinates are in final-frame pixels, with `(0, 0)` at the top-left.

| Zone | Bounds | Rule |
|---|---:|---|
| Hard edge safety | `x 64–1016`, `y 96–1780` | No essential glyph, phone digit, check mark, or rule may cross this box. |
| Default text safety | `x 80–1000`, `y 220–1580` | Use for all normal live-action overlays. |
| Persistent source-logo exclusion | `x 760–1080`, `y 0–220` | No text, check mark, rail, shadow, or glow may enter. The source logo must remain visually isolated. |
| Optional social-UI exclusion | `x 930–1080`, `y 260–1600` | Keep essential copy out so the same master survives Reels/TikTok right-side controls. |
| Bottom UI exclusion | `x 0–1080`, `y 1600–1920` | No essential copy. Decorative elements may enter only at less than `20%` opacity. |
| Upper-left hero lane | `x 80–880`, `y 260–700` | Default for operator and machine shots. Maximum content width `800 px`. |
| Center hero lane | `x 80–1000`, `y 360–920` | Only for wide establishing shots with a clean central field. |
| Lower proof lane | `x 80–1000`, `y 1180–1540` | Technical chips/outcomes only; use a localized scrim where the footage is busy. |
| CTA lane | `x 80–900`, `y 300–820` | CTA and hotline on the outdoor dispatch shots. Keep the physical handling action visible below. |

Additional placement rules:

1. Use a minimum `80 px` left/right inset for text and `96 px` for cards with shadows.
2. Do not center a text block merely because a shot is symmetrical. The only default centered composition is the opening factory-wide shot.
3. A two-line hero must fit inside `880 px`; explicit line breaks only. Never rely on browser auto-wrap.
4. Keep at least `48 px` between the visible text stroke/shadow and the source-logo exclusion zone.
5. Keep at least `64 px` between copy and a worker's face, hands, active tool head, machine controls, or the moving material edge.
6. When no clean field exists, add a localized scrim behind the copy; do not darken the entire frame.

## 4. Typography and hierarchy

The voice is industrial, direct, and technical. Use one condensed display face and one monospaced technical face. Fonts must be bundled locally or loaded through a deterministic Remotion font loader; do not rely on a machine-only system font.

### Families

- Display/headline: `Oswald`, weight `700`.
- Technical labels, units, chips, and hotline: `JetBrains Mono`, weight `700`.
- If the existing build cannot add fonts, `Arial Narrow` is an acceptable temporary display fallback only after checking the computed rendered face. Plain Arial fallback is not acceptable for final QA because it loses the reference's condensed character.

### Sizes

| Role | Size / line height | Tracking | Maximum lines |
|---|---:|---:|---:|
| Primary hero, short phrase | `108 px / 0.92` | `-0.025em` | 2 |
| Primary hero, long phrase | `88 px / 0.96` | `-0.02em` | 2 |
| Chapter/kicker | `30 px / 1.1` | `0.14em` | 1 |
| Technical chip | `36 px / 1.08` | `0.025em` | 2 |
| Metric label | `34 px / 1.0` | `0.09em` | 1 |
| Metric value | `128 px / 0.9` | `-0.035em`; tabular numerals | 1 |
| Supporting proof line | `30 px / 1.15` | `0.035em` | 2 |
| CTA lead | `84 px / 0.94` | `-0.02em` | 2 |
| CTA helper | `34 px / 1.0` | `0.10em` | 1 |
| Hotline | `118 px / 0.92` | `-0.035em`; tabular numerals | 1 |
| Persistent corner label, if retained | `26 px / 1.0` | `0.12em` | 1 |

Rules:

- All approved phrases remain uppercase.
- Keep phrase cards to the approved maximum of two simultaneous lines and roughly `3–5` words per line.
- Do not squeeze long phrases below `88 px`. Re-break the line or use the chip treatment.
- Unit styling is consistent: `MM` is uppercase, on the same baseline, and never smaller than `0.55×` the numeric height.
- Use tabular numerals for `1–600`, `11–600`, `6.000`, and `0988 750 686`.
- No body copy smaller than `26 px` appears in the final master.

## 5. Color and contrast tokens

| Token | Value | Use |
|---|---|---|
| Cyan primary | `#18BDF2` | Hero fill, rails, section accents |
| Ice white | `#F7FBFF` | Hero outline, light labels, metric labels |
| Deep navy | `#00345F` | Extruded text shadow / depth edge |
| Ink | `#061019` | Card fill and localized scrim base |
| Cool neutral | `#D8EAF2` | Secondary technical copy |
| Confirm green | `#23DC92` | Check mark and affirmative state only |
| ORISTAR red | `#ED2339` | Micro accent or terminal rail cap only; never a paragraph or full card |
| Highlight cyan | `#BCEFFF` | Brief flash/highlight, never persistent body copy |

Hero text treatment:

- Fill: `#18BDF2`.
- Outline: `3 px #F7FBFF`, `paint-order: stroke fill`.
- Depth shadow: `0 7px 0 #00345F`.
- Legibility shadow: `0 14px 28px rgba(0,0,0,0.72)`.
- On exceptionally bright metal, increase localized shadow opacity to `0.84`; do not increase the white outline beyond `4 px`.

Cards and chips:

- Card fill: `rgba(6,16,25,0.78)` on bright footage and `rgba(6,16,25,0.64)` on dark footage.
- Card border: `2 px rgba(188,239,255,0.60)`.
- Corner radius: `10 px`; confirmation square radius: `7 px`.
- Internal padding: `22 px 28 px`; gap between stacked cards: `16 px`.
- Check square: `44 × 44 px`, fill `#23DC92`, glyph `#062C24` at `30 px`.
- Accent rail: `8 px` high. Use discrete cyan / white / red segments, not a full-width gradient.

## 6. Motion grammar at 30 fps

All motion must be derived from `useCurrentFrame()`, `interpolate()`, or deterministic Remotion `spring()`. Do not use CSS transitions, CSS keyframes, timers, or wall-clock animation.

### Core patterns

1. **Line-by-line hero reveal**
   - Begin `3 frames` (`0.10 s`) after the corresponding VO phrase begins.
   - Line 1: `x -72 → 0`, `opacity 0 → 1`, clip reveal `0 → 100%`, over `12 frames`.
   - Line 2 starts `5 frames` after line 1 and uses `x 56 → 0` over `11 frames`.
   - Ease: cubic bezier equivalent of `0.16, 1, 0.3, 1`.
   - Rail draws left-to-right over `10 frames`, beginning after the hero is at least `60%` visible.

2. **Material word build**
   - `NHÔM`, `ĐỒNG`, `INOX` appear one at a time, `4 frames` apart.
   - Each word uses `scale 0.94 → 1`, `y 20 → 0`, `opacity 0 → 1` over `9 frames`.
   - Separators appear with the following word, never by themselves.

3. **Technical chip lock-in**
   - Chip enters from the nearest frame edge by `28 px` over `9 frames`.
   - A green check snaps in `4 frames` later with `scale 0.65 → 1` over `7 frames`.
   - Subsequent chips stagger every `8–10 frames`; the complete stagger remains under `0.5 s` where multiple items coexist.

4. **Metric replacement card**
   - Label enters over `8 frames`; value follows `4 frames` later over `10 frames`.
   - Previous metric exits over `7 frames` before the next value enters. Do not crossfade two large values on top of each other.
   - Value motion: `scale 0.97 → 1`, `y 18 → 0`; no slot-machine or count-up effect because the values are fixed specifications.

5. **Resolve / exit**
   - Exit begins `7–9 frames` before the text-map boundary.
   - Use `opacity 1 → 0` plus `x/y 0 → 24 px` over `7 frames`.
   - Exits are shorter than entrances. Do not animate copy during the deliberate no-text pauses.

6. **CTA**
   - Lead enters in `12 frames`; helper in `8 frames`; hotline in `10 frames`.
   - Hotline holds fully static for at least `45 frames` before exit.
   - No pulsing or repeated scaling on the phone number.

### Cut interaction

- Hard source cuts at coil and machining macro shots stay hard. Do not add crossfades over them.
- During the source's zoom/blur handoff around `72.97–76.00 s`, keep overlays spatially locked and use only an opacity handoff; additional zoom or blur on text is prohibited.
- Do not place a text entrance on the exact same frame as a source cut. Offset by `3–5 frames` unless the approved text map explicitly uses that cut as the impact.
- Use only one active text animation at a time. Once settled, text stays still.

## 7. Full-duration shot-specific placement matrix

The placement bounds below are content boxes, excluding text shadows.

| Source time | Footage / approved text | Placement | Risks and mandatory handling |
|---|---|---|---|
| `00:00.00–00:06.67` | Factory-wide hook: `NHÔM • ĐỒNG • INOX` → `CẮT THEO YÊU CẦU` → `CHỈ TỪ 1 TẤM` | Center hero lane, `x 100–980`, `y 370–930`. Keep the final `1 TẤM` line within `x 160–920`. | Preserve the warehouse's central vanishing point and the crane line. Do not rise above `y 300`; that would compete with the top-right source logo and roof detail. Avoid the pallet mass below `y 1050`. |
| `00:06.67–00:14.13` | Operator at green line; four `ĐÚNG…` locks | Upper-left, `x 80–700`, `y 270–720`. Use a compact 2×2 or sequential lock grid no wider than `620 px`. | Worker, moving sheet, and machine line occupy approximately `x 210–1010`, `y 690–1580`. No lower-center text. Ensure the last chip does not drift into the logo exclusion. |
| `00:14.13–00:18.93` | Racked stock; `ĐA DẠNG VẬT LIỆU`, `ĐA DẠNG CHỦNG LOẠI` | Lower proof lane, centered-left: `x 100–920`, `y 1190–1490`. | Dense diagonal rack lines reduce edge contrast. Use the `0.78` ink card/scrim. Do not cover the rack aisle perspective in the center above `y 1150`. |
| `00:18.93–00:22.37` | Long warehouse aisle; `TIÊU CHUẨN → GIA CÔNG CỤ THỂ` | Lower proof lane, `x 110–970`, `y 1240–1510`. | The aisle center is the visual subject. Use a low, shallow card rather than a tall two-line block. Keep arrows horizontal and do not point at any specific rack as factual evidence. |
| `00:22.37–00:25.13` | Operator at control; chapter label `VẬT LIỆU DẠNG TẤM / ĐA DẠNG QUY CÁCH` | Lower-left, `x 80–650`, `y 1190–1480`. | Face, hands, and control screen occupy the mid/right field. Never place a metric card over the control screen. |
| `00:25.13–00:29.87` | Cutting/handling; thickness and width metrics | Upper-left, `x 80–790`, `y 270–680`. Metric label above value. | Hands and sheet edges move across the lower half. Keep the card out of `y 760–1580`. The white outline must remain visible against the bright cutting bed. |
| `00:29.87–00:33.07` | Frontal cutting machine; length metric | Upper-left to upper-middle, `x 80–850`, `y 300–720`. | The machine bed is centered. Do not place `6.000 MM` in the middle of the bed or over warning decals. Keep right edge below `x 850` to protect the logo. |
| `00:33.07–00:35.10` | Operator stacks cut pieces; tolerance proof | Upper-left, `x 80–840`, `y 280–660`. | Hands and finished pieces occupy the lower-center. Do not use a bottom card. Exit completely by `35.10 s`. |
| `00:35.10–00:37.90` | Major VO pause / chapter reset | No text. | Preserve the clean transition. No lingering rail, check mark, or corner title animation. |
| `00:37.90–00:40.30` | Coil/web macro; `XẺ CUỘN THEO YÊU CẦU` | Upper-left, `x 80–870`, `y 250–570`. | Reflective metal changes luminance rapidly. Use full outline/shadow and the `0.64` localized scrim. Avoid lower-center, where the material path is clearest. |
| `00:40.30–00:43.70` | Rapid coil macros; optional dimension/quality chips | Fixed lower-left card, `x 80–920`, `y 1260–1510`. | These are sub-second cuts. Do not reposition or reanimate the card on every cut. If readability is poor, omit the optional `KHỔ RỘNG…` card as allowed by the approved map. |
| `00:43.70–00:47.30` | Operator tends line; tolerance and burr phrases | Upper-left, `x 80–820`, `y 270–690`. | Keep worker and feed path visible. `BA VIA KHỔ XẺ` must never stand alone; the visible phrase must include `KIỂM SOÁT`. |
| `00:47.30–00:51.07` | Ring coils / protected stock; `ĐÓNG GÓI • BẢO QUẢN` | Upper-left, `x 80–870`, `y 270–580`. | Do not cover ring openings or wrapping action. The `47.300–47.333 s` flash is not a beat; no entrance may start there. |
| `00:51.07–00:54.70` | Machining head; `PHAY CHÍNH XÁC / 4–6 MẶT` | Upper-left, `x 80–900`, `y 260–610`. | The tool head and contact point are the evidence. Keep copy outside the center `x 300–820`, `y 650–1320`. |
| `00:54.70–00:58.42` | Spindle close-ups; criteria and outcome chips | Lower proof lane, `x 80–980`, `y 1260–1530`. | Bright coolant/chips can wash out white details. Use the `0.78` card. Never cover the rotating spindle or tool/material interface. |
| `00:58.42–01:01.06` | Major VO pause / machining-to-treatment reset | No text. | Let the machinery breathe. No chapter preview before the treatment VO begins. |
| `01:01.06–01:03.77` | Rack enters chamber / operator; `XỬ LÝ NHIỆT KIM LOẠI` | Upper-left, `x 80–820`, `y 270–650`. | Dark racks support cyan well, but avoid covering the operator and red safety rail. Use no green check on the chapter headline. |
| `01:03.77–01:09.46` | Chamber, door, controls; three outcome chips | Lower-left, `x 80–900`, `y 1230–1530`. | Chamber openings and controls are central/right. Do not imply a chip points to a specific gauge or component. Keep copy generic and fixed while the source cuts rapidly. |
| `01:09.46–01:12.97` | Vacuum-nitriding chamber with source-burned `THẤM NITO CHÂN KHÔNG` | Source title is the hero. Do not place a duplicate phrase over it. If a graphic container is necessary, use only a cyan rail/check in `x 80–500`, `y 1260–1450`. | Highest collision risk in the film: the source already proves and names the process. A second identical headline creates an obvious double title. Preserve the source logo and chamber opening. |
| `01:12.97–01:16.00` | Zoom/blur handoff; nitriding benefit chips | Stable lower-left, `x 80–920`, `y 1230–1510`. | Do not add text blur, zoom, or lateral travel. Use opacity only so the source transition remains readable. No more than two chips visible simultaneously. |
| `01:16.00–01:20.27` | Operator console → wrapped pallets; payoff `TỪ 1 TẤM…` / `VẬT LIỆU…` | Upper-left, `x 80–900`, `y 280–700`. | Keep the operator console and pallet straps visible. Clear all text by the approved `01:19.50–01:20.40` reset. |
| `01:20.27–01:25.07` | Warehouse stock; mác/quy cách/standard/order locks | Lower proof lane, `x 80–970`, `y 1190–1510`. | Dense rack lines require the ink card. Do not attach the words to individual visible bars or packages; they describe order handling, not a labeled item in frame. |
| `01:25.07–01:28.10` | Forklift approaches; CTA lead | CTA lane, `x 80–870`, `y 300–650`. | Forklift and load occupy the lower frame. Keep the CTA above the moving forks and outside the top-right logo. |
| `01:28.17–01:31.00` | Forklift loads truck; helper and hotline | CTA lane, `x 80–920`, `y 350–820`. Hotline occupies `y 600–760`. | Do not use the `01:28.10–01:28.17` transition frame as an entrance. Keep the truck opening and moving load visible below. The hotline must be fully settled and static. |
| `01:31.00–01:32.32` | White ORISTAR end card | Clean source end card; no added overlay. | The approved phone hold currently extends to roughly `01:31.50`, overlapping this end card. Visual QA requires the hotline to exit by `01:31.00`; otherwise the clean brand close is lost. This is a timing conflict to resolve before final render. |

## 8. Chapter-specific layout recipes

### Hook

- Use one compositional stack, not three separate floating cards.
- `NHÔM • ĐỒNG • INOX` is the kicker/first reveal; `CẮT THEO YÊU CẦU` is the hero; `CHỈ TỪ 1 TẤM` is the payoff.
- Make `1 TẤM` cyan-filled with the strongest white outline; keep `CHỈ TỪ` in ice white at `0.62×` scale.

### Four `ĐÚNG…` labels

- Build a consistent lock system: cyan rail, dark chip, optional green check.
- Only the currently spoken phrase receives the green confirmation state. Previous phrases stay visible at `78%` opacity if the grid remains on screen.
- Do not let four equal cards compete at full brightness.

### Dimension cards

- One card replaces the previous card; do not show all three large values simultaneously.
- Structure: small metric label → large tabular value → short cyan rail.
- `6.000 MM` receives the largest value treatment, but no additional superlative beyond the approved `LÊN ĐẾN`.

### Coil, machining, and treatment chapters

- Hero phrase establishes the chapter; technical criteria appear as short chips.
- Use green checks only for confirmed process points. Avoid a green check beside performance outcomes that depend on material or process settings.
- Keep the overlay container stationary across fast source cuts; let the footage create the pace.

### CTA and end card

- CTA is left-aligned over dispatch, not centered over the physical load.
- Use `GỬI QUY CÁCH CỦA BẠN` as the hero, `ORISTAR TƯ VẤN` as the helper, and the hotline as the final dominant line.
- The source white end card is a separate clean beat. No added rail, check, dark scrim, phone, or duplicated logo remains after `01:31.00`.

## 9. Visual QA gates before final render

### Frame coverage

Review at minimum these frames: `00:01.2`, `00:03.8`, `00:07.5`, `00:12.0`, `00:16.5`, `00:20.2`, `00:24.8`, `00:27.5`, `00:30.3`, `00:33.8`, `00:38.8`, `00:42.0`, `00:44.8`, `00:48.8`, `00:52.5`, `00:56.2`, `01:02.2`, `01:05.5`, `01:10.5`, `01:14.2`, `01:18.2`, `01:22.4`, `01:26.7`, `01:29.8`, `01:31.5`.

### Pass/fail checklist

- [ ] Every essential element stays inside hard edge safety.
- [ ] Nothing enters the top-right logo exclusion at any sampled frame.
- [ ] No phrase covers a face, hands, control screen, active tool/material contact point, moving forks, or the truck load.
- [ ] No copy smaller than `26 px`; hero text is never smaller than `88 px`.
- [ ] Every hero remains readable in grayscale and on both the brightest and darkest footage frames.
- [ ] Approved wording is exact; no new claims or paraphrases are introduced.
- [ ] Maximum two text lines at once, except the four-label lock grid where only one item is at full emphasis.
- [ ] Large numerical values never overlap during replacement.
- [ ] No CSS animation or wall-clock timing is used.
- [ ] No text enters on a source transition flash.
- [ ] The built-in nitriding title is not duplicated.
- [ ] The two major pause windows (`35.10–37.90`, `58.42–61.06`) remain text-free.
- [ ] CTA hotline is completely readable for at least `45 frames`.
- [ ] The source end card from `01:31.00` onward remains clean.

## 10. Known blockers / decisions requiring confirmation

1. The approved CTA timing keeps the hotline until approximately `01:31.50`, while the source switches to its clean white end card at `01:31.00`. The visual requirement is to end the hotline by `01:31.00`.
2. The source footage already contains `THẤM NITO CHÂN KHÔNG` on screen. The final overlay must not duplicate that exact phrase simultaneously.
3. `TEXT_LOCK_V1.md` locks the hook, dimension cards, coil cards, and CTA. The rest of the full-duration wording comes from the approved Round 2 map; any wording change outside those locks needs a separate copy review.
