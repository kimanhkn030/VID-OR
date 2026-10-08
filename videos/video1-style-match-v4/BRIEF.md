---
workflow: general-video
flow: companion
storyboard: yes
message: "Giữ nguyên video 1 và dùng text, motion, sound design của Video 4 để làm rõ từng ý trong voice-over"
destination: social-vertical
aspect: 1080x1920
language: vi
length: 92.322s
angle: source-preserving-style-match
---

## Intent

Dựng lại toàn bộ `video 1.mp4` theo ngôn ngữ text, chuyển động và âm thanh của
`Video 4.mp4`. Footage, thứ tự cảnh, tốc độ và voice-over gốc là bất biến; phần
dựng mới chỉ được thêm overlay text, animation và sound design bám sát voice-over.

## Assets

- `video 1.mp4` — nguồn hình và tiếng chính; phát liên tục từ 00:00 đến 01:32.322.
- `../../Video 4.mp4` — reference style; không được dùng bất kỳ frame footage nào.
- `analysis/source/transcript.json` — transcript Whisper tiếng Việt có word timing.
- `ANIMATION_MAP.md` — animation map 24 beat đã được người dùng duyệt.

## Customizations

- Keyword/câu đinh thay vì subtitle toàn bộ.
- Typography condensed cyan/trắng/navy, line-by-line entrances và check xanh có chọn lọc.
- BGM industrial pulse rất nhẹ cùng SFX whoosh/hit/tick bám motion.
- Có một agent accuracy reviewer độc lập kiểm tra trước và sau build.

## Notes

- Không crop, reorder, speed-ramp, grade, zoom hoặc thêm transition lên footage gốc.
- Voice-over/source audio không bị thay, time-stretch, EQ hoặc compress.
- Không dùng các con số kỹ thuật mà transcript chưa xác nhận chắc chắn.
- Overlay rời hoàn toàn trước logo card cuối từ 01:31.00.
- Không cài thêm skill hoặc registry item khi chưa có phép.
