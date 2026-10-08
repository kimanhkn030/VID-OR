# ORISTAR 92 s — Timing & Audio QA

Phạm vi: tài liệu review cho bản Remotion hoàn chỉnh, không thay đổi source code. Nội dung text lấy từ `transcript/TEXT_BRAINSTORM_ROUND2.md`; cửa sổ lời nói lấy từ `transcript/TRANSCRIPT_CLEAN_DRAFT.md`.

## 1. Timeline contract

- FPS đích: **30 fps**.
- Source đầy đủ: `project/public/source-full.mp4`.
- Duration source đo được: **92.322021 s**.
- Composition hoàn chỉnh phải dùng **2.770 frames**, frame `0–2769`; thời lượng timeline là `92.333 s`, chỉ dài hơn source khoảng 0.011 s.
- Bảng dưới dùng frame **zero-based, inclusive**. Ví dụ `24–65` tương đương Remotion `from={24}`, `durationInFrames={42}` và thời gian `[0.800, 2.200)`.
- Tất cả cue phải render bằng frame nguyên; không dùng millisecond trực tiếp để điều khiển Remotion.

### Preflight blocker cần kiểm tra

Snapshot source hiện tại vẫn đăng ký `OristarPreviewV2` dài **450 frames / 15 s** và dùng `source-preview.mp4`. Đây là proof composition, chưa phải timeline 92 s. Tài liệu này không sửa source; trước final render phải xác nhận composition hoàn chỉnh đã chuyển sang `source-full.mp4`, `durationInFrames={2770}`.

## 2. Text cue sheet — exact frames

Các cụm có hậu tố `a/b/c/d` là build tuần tự trong cùng một layout: cue trước tiếp tục giữ đến cuối nhóm, cue sau được ráp thêm. Các card còn lại thay thế card trước, không chồng toàn bộ câu VO.

| ID | Seconds `[start,end)` | Frames inclusive | Frames | Text |
|---|---:|---:|---:|---|
| T01 | 0.800–2.200 | 24–65 | 42 | `NHÔM • ĐỒNG • INOX` |
| T02 | 2.300–3.500 | 69–104 | 36 | `CẮT THEO YÊU CẦU` |
| T03 | 3.500–5.000 | 105–149 | 45 | `CHỈ TỪ 1 TẤM` |
| T04a | 8.367–13.700 | 251–410 | 160 | `ĐÚNG MÁC` |
| T04b | 10.100–13.700 | 303–410 | 108 | `ĐÚNG DẠNG` |
| T04c | 11.100–13.700 | 333–410 | 78 | `ĐÚNG KÍCH THƯỚC` |
| T04d | 11.667–13.700 | 350–410 | 61 | `ĐÚNG QUY CÁCH` |
| T05 | 14.400–16.600 | 432–497 | 66 | `ĐA DẠNG VẬT LIỆU` |
| T06 | 16.600–18.800 | 498–563 | 66 | `ĐA DẠNG CHỦNG LOẠI` |
| T07 | 18.800–21.800 | 564–653 | 90 | `TIÊU CHUẨN → GIA CÔNG CỤ THỂ` |
| T08 | 22.500–24.400 | 675–731 | 57 | `VẬT LIỆU DẠNG TẤM` / `ĐA DẠNG QUY CÁCH` |
| T09 | 24.400–26.700 | 732–800 | 69 | `CHIỀU DÀY` / `1–600 MM` |
| T10 | 26.700–28.900 | 801–866 | 66 | `CHIỀU RỘNG` / `11–600 MM` |
| T11 | 28.900–31.300 | 867–938 | 72 | `CHIỀU DÀI` / `LÊN ĐẾN 6.000 MM` |
| T12 | 31.300–35.100 | 939–1052 | 114 | `KIỂM SOÁT KÍCH THƯỚC & DUNG SAI` / `THEO TIÊU CHUẨN • YÊU CẦU KỸ THUẬT` |
| T13 | 37.900–40.400 | 1137–1211 | 75 | `XẺ CUỘN THEO YÊU CẦU` |
| T14 | 40.400–43.100 | 1212–1292 | 81 | `KHỔ RỘNG • CHIỀU DÀI` / `KHỐI LƯỢNG • CHẤT LƯỢNG` |
| T15 | 43.100–45.700 | 1293–1370 | 78 | `KIỂM SOÁT TỐT` / `DUNG SAI ĐỘ LƯỢN` |
| T16 | 45.700–47.800 | 1371–1433 | 63 | `KIỂM SOÁT` / `BA VIA KHỔ XẺ` |
| T17 | 47.800–50.600 | 1434–1517 | 84 | `ĐÓNG GÓI • BẢO QUẢN` |
| T18 | 51.700–54.200 | 1551–1625 | 75 | `PHAY CHÍNH XÁC` / `4–6 MẶT` |
| T19 | 54.200–56.700 | 1626–1700 | 75 | `VUÔNG GÓC • ĐỘ PHẲNG • BA VIA` |
| T20 | 56.700–58.400 | 1701–1751 | 51 | `ỔN ĐỊNH SAU GIA CÔNG` |
| T21 | 61.200–63.700 | 1836–1910 | 75 | `XỬ LÝ NHIỆT KIM LOẠI` |
| T22a | 64.300–68.900 | 1929–2066 | 138 | `TĂNG ĐỘ CỨNG` |
| T22b | 65.100–68.900 | 1953–2066 | 114 | `ỔN ĐỊNH CƠ TÍNH` |
| T22c | 66.233–68.900 | 1987–2066 | 80 | `GIẢM ỨNG SUẤT DƯ` |
| T23 | 69.600–72.000 | 2088–2159 | 72 | `THẤM NITƠ CHÂN KHÔNG` |
| T24a | 72.000–76.700 | 2160–2300 | 141 | `TĂNG ĐỘ CỨNG BỀ MẶT` |
| T24b | 72.600–76.700 | 2178–2300 | 123 | `CẢI THIỆN CHỐNG MÀI MÒN` |
| T24c | 75.300–76.700 | 2259–2300 | 42 | `HẠN CHẾ BIẾN DẠNG` |
| T25 | 76.700–79.500 | 2301–2384 | 84 | `TỪ 1 TẤM → SỐ LƯỢNG LỚN` / `VẬT LIỆU → GIA CÔNG HOÀN THIỆN` |
| T26a | 80.500–84.400 | 2415–2531 | 117 | `MÁC VẬT LIỆU` |
| T26b | 81.600–84.400 | 2448–2531 | 84 | `QUY CÁCH` |
| T26c | 82.700–84.400 | 2481–2531 | 51 | `TIÊU CHUẨN KỸ THUẬT` |
| T26d | 83.600–84.400 | 2508–2531 | 24 | `THEO TỪNG ĐƠN HÀNG` |
| T27 | 85.200–88.600 | 2556–2657 | 102 | `GỬI QUY CÁCH CỦA BẠN` |
| T28 | 88.600–89.300 | 2658–2678 | 21 | `ORISTAR TƯ VẤN` |
| T29 | 89.300–91.500 | 2679–2744 | 66 | `0988 750 686` |

### Text timing QA

- T04, T22, T24 và T26 là build tăng dần. Không fade cue cũ khi cue mới vào; cả nhóm rời cùng end-frame.
- Entrance tối đa 5–8 frames; exit 6–10 frames. Animation nằm **bên trong** range trên, không kéo dài sequence vượt end-frame.
- T09, T10, T11 là ba card thay nhau. Không giữ ba thông số đồng thời trên khung dọc.
- T23 là hero card quan trọng nhất; không thêm tick/transition mới trong 12 frames đầu của card ngoài SFX đã nêu bên dưới.
- Hotline phải giữ tĩnh tối thiểu từ frame `2679` đến `2744`; không animate từng chữ số.
- Khoảng sạch chữ chủ đích: frames `150–250`, `411–431`, `654–674`, `1053–1136`, `1518–1550`, `1752–1835`, `2067–2087`, `2385–2414`, `2532–2555`, `2745–2769`.

## 3. Original VO preservation

### Measured source

- `source-full.mp4`: AAC stereo 48 kHz, **−24.0 LUFS integrated**, **3.8 LU LRA**, **−4.5 dBTP**.
- Keep the original VO/audio stream at `volume={1}`. Do not normalize, compress, gate, time-stretch or replace it for this build.
- If picture is rendered through `<Video volume={0}>` plus a separate `<Audio src={source-full.mp4} volume={1}>`, keep the video muted. Unmuting both creates duplicated VO, roughly +6 dB and possible phasing.
- If final mix exceeds **−1 dBTP**, reduce BGM/SFX first. Do not lower or limit the source VO merely to make room for added layers.

### Approved speech windows at 30 fps

These ranges drive music ducking. Frames are inclusive.

| VO phrase | Transcript time | Frames |
|---:|---:|---:|
| 1 | 0.74–4.88 | 22–146 |
| 2 | 6.46–13.74 | 194–412 |
| 3 | 14.16–21.82 | 425–654 |
| 4 | 22.38–35.08 | 671–1052 |
| 5 | 37.64–50.64 | 1129–1519 |
| 6 | 51.56–58.42 | 1547–1752 |
| 7 | 61.06–68.96 | 1832–2068 |
| 8 | 69.46–79.50 | 2084–2384 |
| 9 | 80.40–84.40 | 2412–2531 |
| 10 | 85.10–91.52 | 2553–2745 |

## 4. Music plan

### Measured bed

- `bgm.wav`: PCM stereo 44.1 kHz, 100.360 s, **−23.9 LUFS integrated**, **−12.3 dBTP**.
- BGM and source VO have nearly the same measured integrated loudness. Running both at `volume={1}` is a hard fail: music will mask the narration.
- Trim BGM to the 2.770-frame composition; do not let its 100.36 s tail extend the output.

### Recommended levels

- VO/source audio: **1.00** at all times.
- BGM under active speech: **0.20** (about −14 dB gain; effective bed ≈ −37.9 LUFS before summing).
- BGM in long clean gaps: **0.32** maximum (about −9.9 dB; effective bed ≈ −33.8 LUFS).
- BGM in 0.6–1.0 s gaps: **0.26** maximum.
- Gaps under 0.6 s: keep **0.20** to avoid audible pumping.
- Optional BGM-only spectral carve: broad −2 to −3 dB around 1.6–2.5 kHz, Q ≈ 0.8–1.2. Never apply this EQ to the VO.

### Exact volume automation

All values are linear Remotion `volume` values.

| Frames | Action |
|---:|---|
| 0–21 | Fade BGM `0.00 → 0.20`; VO begins at frame 22 |
| 22–146 | Hold `0.20` under VO |
| 147–158 | Release `0.20 → 0.32` |
| 159–187 | Hold `0.32` |
| 188–193 | Attack `0.32 → 0.20` before VO |
| 194–1052 | Hold `0.20`; do not recover in the short gaps at 413–424 and 655–670 |
| 1053–1064 | Release `0.20 → 0.32` |
| 1065–1122 | Hold `0.32` |
| 1123–1128 | Attack `0.32 → 0.20` |
| 1129–1519 | Hold `0.20` under VO |
| 1520–1530 | Release `0.20 → 0.26` |
| 1531–1540 | Hold `0.26` |
| 1541–1546 | Attack `0.26 → 0.20` |
| 1547–1752 | Hold `0.20` under VO |
| 1753–1764 | Release `0.20 → 0.32` |
| 1765–1825 | Hold `0.32` |
| 1826–1831 | Attack `0.32 → 0.20` |
| 1832–2384 | Hold `0.20`; do not recover in the 15-frame gap at 2069–2083 |
| 2385–2395 | Release `0.20 → 0.26` |
| 2396–2405 | Hold `0.26` |
| 2406–2411 | Attack `0.26 → 0.20` |
| 2412–2745 | Hold `0.20`; keep the CTA gap 2532–2552 flat to avoid pumping before the hotline |
| 2746–2769 | Fade BGM `0.20 → 0.00` over the logo tail |

Use linear interpolation for the short attack/release ramps. If the BGM still masks consonants on phone speakers, lower the speech level to `0.16–0.18`; do not raise VO above 1.00.

## 5. Restrained SFX plan

Assets already present:

- `whoosh.wav`: 0.420 s ≈ 13 frames, raw peak −26.5 dBFS.
- `tick.wav`: 0.110 s ≈ 4 frames, raw peak −33.0 dBFS.

Use **five events total**. Do not add an opening whoosh, a tick for every chip, or a CTA phone tick.

| Event | Start | Frames inclusive | Asset / volume | Purpose |
|---|---:|---:|---|---|
| S01 | 28.900 s | 867–870 | `tick.wav`, `volume={0.70}` | Locks the largest sheet-length figure `6.000 MM` |
| S02 | 37.367 s | 1121–1133 | `whoosh.wav`, `volume={0.45}` | Uses the clean gap to hand off into `XẺ CUỘN`; ends before hero text settles |
| S03 | 51.700 s | 1551–1554 | `tick.wav`, `volume={0.70}` | Small metallic punctuation on `PHAY CHÍNH XÁC` |
| S04 | 60.767 s | 1823–1835 | `whoosh.wav`, `volume={0.45}` | Uses the long pause before the heat-treatment chapter |
| S05 | 69.600 s | 2088–2091 | `tick.wav`, `volume={0.70}` | Locks the `THẤM NITƠ CHÂN KHÔNG` hero card |

The current proof uses whoosh `0.13–0.16` and tick `0.24`; given the measured raw peaks, those values are likely nearly inaudible in the full mix. The recommendations above remain restrained: estimated SFX peaks stay roughly in the −33 to −36 dBFS range before summing.

## 6. Final listen / pass-fail checklist

1. **VO identity:** original source voice remains unchanged, centered and intelligible from first line through hotline.
2. **No duplicate source audio:** only one audible instance of `source-full.mp4` audio.
3. **Text sync:** every number and benefit chip appears on or immediately after the spoken phrase; chapter-label cards may lead their sentence as specified in the approved map.
4. **Build groups:** T04, T22, T24, T26 accumulate without reflow or layout jump.
5. **Music:** BGM is felt, not followed, while VO is active; it recovers only in the three long chapter gaps.
6. **SFX:** exactly five or fewer events; none masks the first consonant of a VO phrase.
7. **CTA:** `0988 750 686` remains fully readable for frames 2679–2744; no sound accent competes with the spoken digits.
8. **Output ceiling:** final render true peak ≤ −1 dBTP. If not, reduce added layers first.
9. **Tail:** source picture/audio ends cleanly by frame 2769; BGM reaches zero on the final frame.
10. **Device check:** listen once on headphones and once through a phone speaker at low volume. The hotline and the terms `dung sai độ lượn`, `phay chính xác`, `thấm nitơ chân không` must remain intelligible without reading the screen.
