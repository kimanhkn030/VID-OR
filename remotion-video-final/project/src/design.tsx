import type {CSSProperties} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

const colors = {
  cyan: '#18bdf2',
  ice: '#f7fbff',
  navy: '#00345f',
  ink: '#061019',
  neutral: '#d8eaf2',
  green: '#23dc92',
  red: '#ed2339',
};

const displayFont = 'Anton, Impact, sans-serif';
const monoFont = displayFont;

const heroDepth: CSSProperties = {
  WebkitTextStrokeWidth: 1.5,
  WebkitTextStrokeColor: 'rgba(247,251,255,0.88)',
  paintOrder: 'stroke fill',
  textShadow: `0 4px 0 ${colors.navy}, 0 10px 24px rgba(0,0,0,0.72)`,
};

type Placement = {
  readonly left?: number;
  readonly right?: number;
  readonly top?: number;
};

const useEnterExit = (duration: number) => {
  const frame = useCurrentFrame();
  return {
    frame,
    opacity: interpolate(frame, [0, 7, Math.max(8, duration - 8), duration], [0, 1, 1, 0], clamp),
  };
};

const AccentRail: React.FC<{readonly progress: number; readonly width?: number}> = ({
  progress,
  width = 420,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: width * progress,
        maxWidth: width,
        height: 8,
        marginTop: 22,
        borderRadius: 99,
        overflow: 'hidden',
      }}
    >
      <div style={{flex: 7, backgroundColor: colors.cyan}} />
      <div style={{flex: 2, backgroundColor: colors.ice}} />
      <div style={{flex: 1, backgroundColor: colors.red}} />
    </div>
  );
};

const Check: React.FC<{readonly active?: boolean}> = ({active = true}) => {
  return (
    <span
      style={{
        width: 44,
        height: 44,
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: active ? colors.green : 'rgba(216,234,242,0.28)',
        color: active ? '#062c24' : colors.neutral,
        fontFamily: displayFont,
          fontSize: 34,
        lineHeight: 1,
        fontWeight: 400,
        boxShadow: active ? '0 5px 18px rgba(35,220,146,0.28)' : 'none',
      }}
    >
      ✓
    </span>
  );
};

export const FrameTreatment: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 112,
          display: 'flex',
          width: 116,
          height: 8,
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <div style={{flex: 7, backgroundColor: colors.cyan}} />
        <div style={{flex: 2, backgroundColor: colors.ice}} />
        <div style={{flex: 1, backgroundColor: colors.red}} />
      </div>
    </>
  );
};

export const HeroPhrase: React.FC<
  Placement & {
    readonly duration: number;
    readonly line1: string;
    readonly line2?: string;
    readonly kicker?: string;
    readonly size?: number;
    readonly align?: 'left' | 'center';
    readonly check?: boolean;
    readonly scrim?: boolean;
  }
> = ({
  duration,
  line1,
  line2,
  kicker,
  size = 108,
  align = 'left',
  check = false,
  left = 80,
  right = 200,
  top = 320,
}) => {
  const {frame, opacity} = useEnterExit(duration);
  const lineOne = interpolate(frame, [0, 12], [-72, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const lineTwo = interpolate(frame, [5, 16], [56, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'left' ? 'flex-start' : 'center',
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        opacity,
        textAlign: align,
        fontFamily: displayFont,
      }}
    >
      {kicker ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 13,
            marginBottom: 18,
            color: colors.ice,
            fontFamily: monoFont,
            fontSize: 30,
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textShadow: '0 4px 14px rgba(0,0,0,0.82)',
          }}
        >
          {check ? <Check /> : null}
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          maxWidth: 880,
          color: colors.cyan,
          fontSize: size * 1.1,
          lineHeight: line2 ? 0.98 : 1,
          fontWeight: 400,
          letterSpacing: '0.015em',
          textTransform: 'uppercase',
          ...heroDepth,
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [0, 9], [0, 1], clamp),
            translate: `${lineOne}px 0px`,
            clipPath: `inset(0 ${interpolate(frame, [0, 12], [100, 0], clamp)}% 0 0)`,
          }}
        >
          {line1}
        </div>
        {line2 ? (
          <div
            style={{
              color: colors.ice,
              opacity: interpolate(frame, [5, 13], [0, 1], clamp),
              translate: `${lineTwo}px 0px`,
              clipPath: `inset(0 ${interpolate(frame, [5, 16], [100, 0], clamp)}% 0 0)`,
            }}
          >
            {line2}
          </div>
        ) : null}
      </div>
      <AccentRail progress={interpolate(frame, [9, 19], [0, 1], clamp)} />
    </div>
  );
};

export const MaterialBuild: React.FC<{readonly duration: number}> = ({duration}) => {
  const {frame, opacity} = useEnterExit(duration);
  const words = ['NHÔM', 'ĐỒNG', 'INOX'];

  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        top: 600,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        opacity,
        fontFamily: displayFont,
      }}
    >
      {words.map((word, index) => (
        <div
          key={word}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            color: index === 1 ? colors.ice : colors.cyan,
            fontSize: 110,
            lineHeight: 0.98,
            fontWeight: 400,
            letterSpacing: '0.01em',
            opacity: interpolate(frame, [index * 4, index * 4 + 9], [0, 1], clamp),
            translate: `0px ${interpolate(frame, [index * 4, index * 4 + 9], [20, 0], clamp)}px`,
            scale: interpolate(frame, [index * 4, index * 4 + 9], [0.94, 1], clamp),
            ...heroDepth,
          }}
        >
          {index > 0 ? <span style={{color: colors.red, WebkitTextStrokeWidth: 0}}>•</span> : null}
          {word}
        </div>
      ))}
    </div>
  );
};

export const LockedGrid: React.FC<
  Placement & {
    readonly duration: number;
    readonly items: readonly string[];
    readonly starts: readonly number[];
    readonly columns?: 1 | 2 | 3;
    readonly support?: string;
    readonly supportStart?: number;
    readonly strongScrim?: boolean;
  }
> = ({
  duration,
  items,
  starts,
  columns = 2,
  support,
  supportStart = Number.POSITIVE_INFINITY,
  strongScrim = false,
  left = 80,
  right = 380,
  top = 300,
}) => {
  const {frame, opacity} = useEnterExit(duration);
  const currentIndex = starts.reduce((latest, start, index) => (frame >= start ? index : latest), -1);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity,
        fontFamily: monoFont,
        textShadow: '0 5px 16px rgba(0,0,0,0.82)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: 16,
        }}
      >
        {items.map((item, index) => {
          const start = starts[index] ?? 0;
          const active = index === currentIndex;
          return (
            <div
              key={item}
              style={{
                minHeight: columns === 1 ? 94 : 88,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 14,
                padding: '10px 0',
                border: 0,
                borderRadius: 0,
                backgroundColor: 'transparent',
                color: colors.ice,
                fontSize: columns === 3 ? 34 : 40,
                lineHeight: 1.12,
                fontWeight: 400,
                letterSpacing: '0.045em',
                textTransform: 'uppercase',
                opacity:
                  frame < start
                    ? 0
                    : active
                      ? 1
                      : 0.78,
                translate: `${interpolate(frame, [start, start + 9], [-28, 0], clamp)}px 0px`,
                textShadow: strongScrim
                  ? '0 5px 18px rgba(0,0,0,0.95)'
                  : '0 4px 14px rgba(0,0,0,0.82)',
              }}
            >
              <div style={{scale: interpolate(frame, [start + 4, start + 11], [0.65, 1], clamp)}}>
                <Check active={active} />
              </div>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
      {support ? (
        <div
          style={{
            alignSelf: 'flex-start',
            padding: '10px 0',
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: colors.neutral,
            fontSize: 34,
            lineHeight: 1.15,
            fontWeight: 400,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [supportStart, supportStart + 8], [0, 1], clamp),
            translate: `${interpolate(frame, [supportStart, supportStart + 8], [-28, 0], clamp)}px 0px`,
            textShadow: '0 4px 14px rgba(0,0,0,0.88)',
          }}
        >
          {support}
        </div>
      ) : null}
    </div>
  );
};

export const ProofCard: React.FC<
  Placement & {
    readonly duration: number;
    readonly line1: string;
    readonly line2?: string;
    readonly align?: 'left' | 'center';
  }
> = ({duration, line1, line2, align = 'left', left = 100, right = 160, top = 1220}) => {
  const {frame, opacity} = useEnterExit(duration);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '12px 0 12px 24px',
        border: 0,
        borderLeft: `8px solid ${colors.cyan}`,
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: colors.ice,
        opacity,
        translate: `${interpolate(frame, [0, 9], [-28, 0], clamp)}px 0px`,
        textAlign: align,
        fontFamily: monoFont,
        textTransform: 'uppercase',
        textShadow: '0 5px 18px rgba(0,0,0,0.92)',
      }}
    >
      <div style={{fontSize: 40, lineHeight: 1.12, fontWeight: 400, letterSpacing: '0.045em'}}>
        {line1}
      </div>
      {line2 ? (
        <div style={{color: colors.neutral, fontSize: 34, lineHeight: 1.18, letterSpacing: '0.05em'}}>
          {line2}
        </div>
      ) : null}
    </div>
  );
};

export const MetricCard: React.FC<
  Placement & {
    readonly duration: number;
    readonly label: string;
    readonly value: string;
  }
> = ({duration, label, value, left = 80, right = 290, top = 300}) => {
  const {frame, opacity} = useEnterExit(duration);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        right,
        top,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '18px 0 28px',
        border: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        opacity,
        textShadow: '0 5px 18px rgba(0,0,0,0.92)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          color: colors.ice,
          fontFamily: monoFont,
          fontSize: 38,
          lineHeight: 1,
          fontWeight: 400,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [0, 8], [0, 1], clamp),
          translate: `${interpolate(frame, [0, 8], [-28, 0], clamp)}px 0px`,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 28,
          color: colors.cyan,
          fontFamily: monoFont,
          fontSize: value.length > 14 ? 98 : 140,
          lineHeight: 0.98,
          fontWeight: 400,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          opacity: interpolate(frame, [4, 14], [0, 1], clamp),
          translate: `0px ${interpolate(frame, [4, 14], [18, 0], clamp)}px`,
          scale: interpolate(frame, [4, 14], [0.97, 1], clamp),
          ...heroDepth,
        }}
      >
        {value}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          height: 8,
        }}
      >
        <div style={{flex: 7, backgroundColor: colors.cyan}} />
        <div style={{flex: 2, backgroundColor: colors.ice}} />
        <div style={{flex: 1, backgroundColor: colors.red}} />
      </div>
    </div>
  );
};

export const RollingBenefits: React.FC<{readonly duration: number}> = ({duration}) => {
  const {frame, opacity} = useEnterExit(duration);
  const cards = [
    {text: 'TĂNG ĐỘ CỨNG BỀ MẶT', start: 0, end: 99, slot: 0},
    {text: 'CẢI THIỆN CHỐNG MÀI MÒN', start: 18, end: duration, slot: 1},
    {text: 'HẠN CHẾ BIẾN DẠNG', start: 99, end: duration, slot: 0},
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 160,
        top: 1250,
        height: 250,
        opacity,
        fontFamily: monoFont,
      }}
    >
      {cards.map((card) => (
        <div
          key={card.text}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: card.slot * 118,
            minHeight: 102,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 0',
            border: 0,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: colors.ice,
            fontSize: 40,
            lineHeight: 1.12,
            fontWeight: 400,
            letterSpacing: '0.045em',
            textTransform: 'uppercase',
            opacity: interpolate(
              frame,
              [card.start, card.start + 8, Math.max(card.start + 9, card.end - 7), card.end],
              [0, 1, 1, 0],
              clamp,
            ),
            translate: `${interpolate(frame, [card.start, card.start + 9], [-28, 0], clamp)}px 0px`,
            textShadow: '0 5px 18px rgba(0,0,0,0.92)',
          }}
        >
          <Check />
          {card.text}
        </div>
      ))}
    </div>
  );
};

export const BridgeCard: React.FC<{readonly duration: number}> = ({duration}) => {
  const {frame, opacity} = useEnterExit(duration);
  const rows = [
    ['TỪ 1 TẤM', 'SỐ LƯỢNG LỚN'],
    ['VẬT LIỆU', 'GIA CÔNG HOÀN THIỆN'],
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 180,
        top: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        opacity,
        fontFamily: displayFont,
      }}
    >
      {rows.map(([from, to], index) => (
        <div
          key={from}
          style={{
            minHeight: 142,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1.45fr',
            alignItems: 'center',
            gap: 18,
            padding: '18px 0',
            border: 0,
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: colors.ice,
            fontSize: 60,
            lineHeight: 1.06,
            fontWeight: 400,
            letterSpacing: '0.015em',
            textAlign: 'center',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [index * 9, index * 9 + 8], [0, 1], clamp),
            textShadow: '0 5px 18px rgba(0,0,0,0.92)',
          }}
        >
          <span>{from}</span>
          <span style={{color: colors.red, fontSize: 76}}>→</span>
          <span style={{color: colors.cyan}}>{to}</span>
        </div>
      ))}
    </div>
  );
};

export const CtaLead: React.FC<{readonly duration: number}> = ({duration}) => {
  const {frame, opacity} = useEnterExit(duration);
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 210,
        top: 350,
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: colors.cyan,
        fontFamily: displayFont,
        fontSize: 92,
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: '0.015em',
        textTransform: 'uppercase',
        opacity,
        translate: `${interpolate(frame, [0, 12], [-72, 0], clamp)}px 0px`,
        ...heroDepth,
      }}
    >
      GỬI QUY CÁCH CỦA BẠN
      <AccentRail progress={interpolate(frame, [8, 18], [0, 1], clamp)} width={480} />
    </div>
  );
};

export const CtaHelper: React.FC<{readonly duration: number}> = ({duration}) => {
  const {frame, opacity} = useEnterExit(duration);
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        top: 470,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: colors.ice,
        fontFamily: monoFont,
        fontSize: 38,
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        opacity,
        translate: `${interpolate(frame, [0, 8], [-28, 0], clamp)}px 0px`,
        textShadow: '0 5px 18px rgba(0,0,0,0.92)',
      }}
    >
      <Check /> ORISTAR TƯ VẤN
    </div>
  );
};

export const Hotline: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 160,
        top: 600,
        padding: 0,
        border: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        color: colors.cyan,
        fontFamily: monoFont,
        fontSize: 116,
        lineHeight: 0.98,
        fontWeight: 400,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        opacity: interpolate(frame, [0, 6], [0, 1], clamp),
        translate: `0px ${interpolate(frame, [0, 6], [18, 0], clamp)}px`,
        ...heroDepth,
      }}
    >
      0988 750 686
    </div>
  );
};
