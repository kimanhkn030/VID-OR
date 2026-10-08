import {Audio, Video} from '@remotion/media';
import type {ReactNode} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

const SourceClip: React.FC<{
  readonly trimBefore: number;
  readonly children?: ReactNode;
  readonly startScale: number;
  readonly endScale: number;
  readonly translateX?: number;
}> = ({trimBefore, children, startScale, endScale, translateX = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#07111a', overflow: 'hidden'}}>
      <Video
        name="Source footage"
        src={staticFile('source-preview.mp4')}
        trimBefore={trimBefore}
        volume={0}
        premountFor={fps}
        objectFit="cover"
        style={{
          width: '100%',
          height: '100%',
          scale: interpolate(
            frame,
            [0, durationInFrames],
            [startScale, endScale],
            {...clamp, easing: Easing.bezier(0.33, 0, 0.2, 1)},
          ),
          translate: `${translateX}px 0px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(1,9,16,0.05) 0%, rgba(1,9,16,0) 40%, rgba(1,9,16,0.72) 100%)',
          boxShadow: 'inset 0 0 150px rgba(0,18,30,0.28)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const KeyIdea: React.FC<{
  readonly eyebrow: string;
  readonly line1: string;
  readonly line2?: string;
  readonly duration: number;
  readonly check?: boolean;
  readonly align?: 'center' | 'left';
}> = ({eyebrow, line1, line2, duration, check = false, align = 'center'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enterEnd = Math.round(0.42 * fps);
  const exitStart = Math.max(enterEnd + 1, duration - Math.round(0.35 * fps));
  const opacity = interpolate(
    frame,
    [0, Math.round(0.18 * fps), exitStart, duration],
    [0, 1, 1, 0],
    clamp,
  );
  const lift = interpolate(frame, [0, enterEnd], [44, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const reveal = interpolate(frame, [4, enterEnd], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const isLeft = align === 'left';

  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        top: isLeft ? 1030 : 980,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLeft ? 'flex-start' : 'center',
        textAlign: align,
        opacity,
        translate: `0px ${lift}px`,
        fontFamily: 'Arial Narrow, Helvetica Neue, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 18,
          color: '#ffffff',
          fontSize: 44,
          fontWeight: 800,
          letterSpacing: 6,
          textTransform: 'uppercase',
          textShadow: '0 3px 14px rgba(0,0,0,0.9)',
        }}
      >
        {check ? (
          <span
            style={{
              width: 38,
              height: 38,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 7,
              backgroundColor: '#23dc92',
              color: '#062c24',
              fontSize: 27,
              letterSpacing: 0,
              boxShadow: '0 5px 20px rgba(12,218,143,0.34)',
            }}
          >
            ✓
          </span>
        ) : null}
        {eyebrow}
      </div>
      <div
        style={{
          color: '#18bdf2',
          fontSize: line2 ? 98 : 108,
          lineHeight: 0.96,
          fontWeight: 1000,
          letterSpacing: -3,
          textTransform: 'uppercase',
          WebkitTextStrokeWidth: 3,
          WebkitTextStrokeColor: '#ffffff',
          paintOrder: 'stroke fill',
          textShadow: '0 8px 0 rgba(0,44,87,0.9), 0 15px 28px rgba(0,0,0,0.75)',
          clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
        }}
      >
        <div>{line1}</div>
        {line2 ? <div>{line2}</div> : null}
      </div>
      <div
        style={{
          marginTop: 28,
          width: interpolate(frame, [6, enterEnd + 4], [0, isLeft ? 620 : 500], clamp),
          height: 8,
          borderRadius: 999,
          background: 'linear-gradient(90deg, #19bff2 0%, #ffffff 78%, #ed2339 100%)',
          boxShadow: '0 4px 18px rgba(25,191,242,0.6)',
        }}
      />
    </div>
  );
};

const CornerLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 105,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: 25,
        fontWeight: 800,
        letterSpacing: 4,
        opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
      }}
    >
      <span
        style={{
          width: 10,
          height: 44,
          backgroundColor: '#18bdf2',
          boxShadow: '0 0 16px rgba(24,189,242,0.8)',
        }}
      />
      ORISTAR · MATERIAL FLOW
    </div>
  );
};

const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const cutOne = interpolate(frame, [177, 180, 184], [0, 0.52, 0], clamp);
  const cutTwo = interpolate(frame, [312, 315, 319], [0, 0.52, 0], clamp);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        backgroundColor: '#bcecff',
        opacity: Math.max(cutOne, cutTwo),
        mixBlendMode: 'screen',
      }}
    />
  );
};

export const OristarPreviewV2: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#061019'}}>
      <Series>
        <Series.Sequence name="Factory overview" durationInFrames={180} premountFor={fps}>
          <SourceClip trimBefore={0 * fps} startScale={1.02} endScale={1.09}>
            <Sequence name="Idea - Material" from={15} durationInFrames={92} premountFor={fps}>
              <KeyIdea eyebrow="Một hệ thống" line1="Từ vật liệu" duration={92} />
            </Sequence>
            <Sequence name="Idea - Processing" from={112} durationInFrames={68} premountFor={fps}>
              <KeyIdea eyebrow="Liền mạch" line1="Đến gia công" duration={68} check />
            </Sequence>
          </SourceClip>
        </Series.Sequence>
        <Series.Sequence name="Processing line" durationInFrames={135} premountFor={fps}>
          <SourceClip trimBefore={6 * fps} startScale={1.08} endScale={1.15} translateX={-16}>
            <Sequence name="Idea - Equipment" from={14} durationInFrames={110} premountFor={fps}>
              <KeyIdea
                eyebrow="Năng lực tại chỗ"
                line1="Thiết bị"
                line2="Chuyên dụng"
                duration={110}
                check
                align="left"
              />
            </Sequence>
          </SourceClip>
        </Series.Sequence>
        <Series.Sequence name="Warehouse" durationInFrames={135} premountFor={fps}>
          <SourceClip trimBefore={10.5 * fps} startScale={1.03} endScale={1.11} translateX={10}>
            <Sequence name="Idea - Ready" from={10} durationInFrames={118} premountFor={fps}>
              <KeyIdea
                eyebrow="Sẵn sàng đáp ứng"
                line1="Cho sản xuất"
                duration={118}
                check
              />
            </Sequence>
          </SourceClip>
        </Series.Sequence>
      </Series>

      <Audio
        name="Original voiceover"
        src={staticFile('source-preview.mp4')}
        premountFor={fps}
        volume={1}
      />

      <Sequence name="Opening whoosh" from={4} durationInFrames={18} premountFor={fps}>
        <Audio src={staticFile('whoosh.wav')} premountFor={fps} volume={0.16} />
      </Sequence>
      <Sequence name="Processing cut whoosh" from={176} durationInFrames={18} premountFor={fps}>
        <Audio src={staticFile('whoosh.wav')} premountFor={fps} volume={0.13} />
      </Sequence>
      <Sequence name="Warehouse cut whoosh" from={311} durationInFrames={18} premountFor={fps}>
        <Audio src={staticFile('whoosh.wav')} premountFor={fps} volume={0.13} />
      </Sequence>
      <Sequence name="Check tick one" from={116} durationInFrames={8} premountFor={fps}>
        <Audio src={staticFile('tick.wav')} premountFor={fps} volume={0.24} />
      </Sequence>
      <Sequence name="Check tick two" from={194} durationInFrames={8} premountFor={fps}>
        <Audio src={staticFile('tick.wav')} premountFor={fps} volume={0.24} />
      </Sequence>
      <Sequence name="Check tick three" from={325} durationInFrames={8} premountFor={fps}>
        <Audio src={staticFile('tick.wav')} premountFor={fps} volume={0.24} />
      </Sequence>

      <CornerLabel />
      <CutFlash />
    </AbsoluteFill>
  );
};
