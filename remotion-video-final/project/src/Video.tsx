import {Audio, Video} from '@remotion/media';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  BridgeCard,
  CtaHelper,
  CtaLead,
  FrameTreatment,
  HeroPhrase,
  Hotline,
  LockedGrid,
  MaterialBuild,
  MetricCard,
  ProofCard,
  RollingBenefits,
} from './design';

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

const whooshCues = [
  {frame: 24, name: 'Materials reveal'},
  {frame: 69, name: 'Custom cutting reveal'},
  {frame: 251, name: 'Requirements grid reveal'},
  {frame: 564, name: 'Capability bridge reveal'},
  {frame: 675, name: 'Plate chapter reveal'},
  {frame: 939, name: 'Tolerance control reveal'},
  {frame: 1137, name: 'Slitting chapter reveal'},
  {frame: 1434, name: 'Packing chapter reveal'},
  {frame: 1551, name: 'Precision milling reveal'},
  {frame: 1836, name: 'Heat treatment reveal'},
  {frame: 2160, name: 'Nitriding benefits reveal'},
  {frame: 2301, name: 'Production capability reveal'},
  {frame: 2556, name: 'CTA reveal'},
] as const;

const tickCues = [
  {frame: 105, name: 'One plate lock'},
  {frame: 303, name: 'Right form lock'},
  {frame: 333, name: 'Right dimensions lock'},
  {frame: 350, name: 'Right specification lock'},
  {frame: 432, name: 'Material variety lock'},
  {frame: 498, name: 'Category variety lock'},
  {frame: 732, name: 'Thickness metric lock'},
  {frame: 801, name: 'Width metric lock'},
  {frame: 867, name: 'Length metric lock'},
  {frame: 1212, name: 'Slitting parameters lock'},
  {frame: 1293, name: 'Camber tolerance lock'},
  {frame: 1371, name: 'Burr control lock'},
  {frame: 1626, name: 'Milling criteria lock'},
  {frame: 1701, name: 'Machining stability lock'},
  {frame: 1929, name: 'Hardness benefit lock'},
  {frame: 1953, name: 'Mechanical stability lock'},
  {frame: 1987, name: 'Residual stress lock'},
  {frame: 2178, name: 'Wear resistance lock'},
  {frame: 2259, name: 'Deformation control lock'},
  {frame: 2415, name: 'Material grade lock'},
  {frame: 2448, name: 'Specification lock'},
  {frame: 2481, name: 'Technical standard lock'},
  {frame: 2508, name: 'Per-order support lock'},
  {frame: 2658, name: 'Consulting lock'},
  {frame: 2679, name: 'Hotline lock'},
] as const;

const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Audio
      name="Background music with VO ducking"
      src={staticFile('bgm-ramp-it-up.mp3')}
      durationInFrames={2770}
      premountFor={fps}
      volume={interpolate(
        frame,
        [
          0, 21, 146, 158, 187, 193, 1052, 1064, 1122, 1128, 1519, 1530, 1540,
          1546, 1752, 1764, 1825, 1831, 2384, 2395, 2405, 2411, 2745, 2769,
        ],
        [
          0, 0.18, 0.18, 0.26, 0.26, 0.18, 0.18, 0.26, 0.26, 0.18, 0.18, 0.23, 0.23,
          0.18, 0.18, 0.26, 0.26, 0.18, 0.18, 0.23, 0.23, 0.18, 0.18, 0,
        ],
        clamp,
      )}
    />
  );
};

const TextSoundEffects: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      {whooshCues.map((cue) => (
        <Audio
          key={`whoosh-${cue.frame}`}
          name={`Text whoosh - ${cue.name}`}
          src={staticFile('whoosh.wav')}
          from={cue.frame}
          durationInFrames={13}
          premountFor={fps}
          volume={0.75}
        />
      ))}
      {tickCues.map((cue) => (
        <Audio
          key={`tick-${cue.frame}`}
          name={`Text tick - ${cue.name}`}
          src={staticFile('tick.wav')}
          from={cue.frame}
          durationInFrames={4}
          premountFor={fps}
          volume={1}
        />
      ))}
    </>
  );
};

export const OristarFullFinal: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#061019', overflow: 'hidden'}}>
      <Video
        name="Original footage and voiceover"
        src={staticFile('source-full.mp4')}
        premountFor={fps}
        objectFit="cover"
        volume={1}
        style={{width: '100%', height: '100%'}}
      />

      <Sequence name="Frame treatment before clean end card" durationInFrames={2730} premountFor={fps}>
        <FrameTreatment />
      </Sequence>

      <Sequence name="T01 - Materials" from={24} durationInFrames={42} premountFor={fps}>
        <MaterialBuild duration={42} />
      </Sequence>
      <Sequence name="T02 - Custom cutting" from={69} durationInFrames={36} premountFor={fps}>
        <HeroPhrase
          duration={36}
          line1="CẮT THEO"
          line2="YÊU CẦU"
          left={100}
          right={100}
          top={520}
          align="center"
        />
      </Sequence>
      <Sequence name="T03 - One plate" from={105} durationInFrames={45} premountFor={fps}>
        <HeroPhrase
          duration={45}
          kicker="CHỈ TỪ"
          line1="1 TẤM"
          left={160}
          right={160}
          top={520}
          size={132}
          align="center"
        />
      </Sequence>

      <Sequence name="T04 - Four right requirements" from={251} durationInFrames={160} premountFor={fps}>
        <LockedGrid
          duration={160}
          items={['ĐÚNG MÁC', 'ĐÚNG DẠNG', 'ĐÚNG KÍCH THƯỚC', 'ĐÚNG QUY CÁCH']}
          starts={[0, 52, 82, 99]}
          columns={2}
          left={80}
          right={380}
          top={290}
        />
      </Sequence>

      <Sequence name="T05 - Material variety" from={432} durationInFrames={66} premountFor={fps}>
        <ProofCard duration={66} line1="ĐA DẠNG VẬT LIỆU" left={100} right={160} top={1210} />
      </Sequence>
      <Sequence name="T06 - Category variety" from={498} durationInFrames={66} premountFor={fps}>
        <ProofCard duration={66} line1="ĐA DẠNG CHỦNG LOẠI" left={100} right={160} top={1210} />
      </Sequence>
      <Sequence name="T07 - Standard to machining" from={564} durationInFrames={90} premountFor={fps}>
        <ProofCard
          duration={90}
          line1="TIÊU CHUẨN → GIA CÔNG CỤ THỂ"
          left={110}
          right={110}
          top={1260}
          align="center"
        />
      </Sequence>

      <Sequence name="T08 - Plate chapter" from={675} durationInFrames={57} premountFor={fps}>
        <HeroPhrase
          duration={57}
          kicker="ĐA DẠNG QUY CÁCH"
          line1="VẬT LIỆU"
          line2="DẠNG TẤM"
          left={80}
          right={430}
          top={1190}
          size={88}
          check
          scrim
        />
      </Sequence>
      <Sequence name="T09 - Plate thickness" from={732} durationInFrames={69} premountFor={fps}>
        <MetricCard duration={69} label="CHIỀU DÀY" value="1–600 MM" left={80} right={290} top={300} />
      </Sequence>
      <Sequence name="T10 - Plate width" from={801} durationInFrames={66} premountFor={fps}>
        <MetricCard duration={66} label="CHIỀU RỘNG" value="11–600 MM" left={80} right={290} top={300} />
      </Sequence>
      <Sequence name="T11 - Plate length" from={867} durationInFrames={72} premountFor={fps}>
        <MetricCard
          duration={72}
          label="CHIỀU DÀI"
          value="LÊN ĐẾN 6.000 MM"
          left={80}
          right={230}
          top={320}
        />
      </Sequence>
      <Sequence name="T12 - Dimension and tolerance control" from={939} durationInFrames={114} premountFor={fps}>
        <HeroPhrase
          duration={114}
          kicker="THEO TIÊU CHUẨN • YÊU CẦU KỸ THUẬT"
          line1="KIỂM SOÁT KÍCH THƯỚC"
          line2="& DUNG SAI"
          left={80}
          right={240}
          top={290}
          size={88}
          check
          scrim
        />
      </Sequence>

      <Sequence name="T13 - Slitting chapter" from={1137} durationInFrames={75} premountFor={fps}>
        <HeroPhrase
          duration={75}
          line1="XẺ CUỘN"
          line2="THEO YÊU CẦU"
          left={80}
          right={210}
          top={270}
          size={100}
          check
          scrim
        />
      </Sequence>
      <Sequence name="T14 - Slitting parameters" from={1212} durationInFrames={81} premountFor={fps}>
        <ProofCard
          duration={81}
          line1="KHỔ RỘNG • CHIỀU DÀI"
          line2="KHỐI LƯỢNG • CHẤT LƯỢNG"
          left={80}
          right={160}
          top={1270}
        />
      </Sequence>
      <Sequence name="T15 - Camber tolerance" from={1293} durationInFrames={78} premountFor={fps}>
        <HeroPhrase
          duration={78}
          kicker="KIỂM SOÁT TỐT"
          line1="DUNG SAI"
          line2="ĐỘ LƯỢN"
          left={80}
          right={260}
          top={290}
          size={96}
          check
          scrim
        />
      </Sequence>
      <Sequence name="T16 - Burr control" from={1371} durationInFrames={63} premountFor={fps}>
        <HeroPhrase
          duration={63}
          kicker="KIỂM SOÁT"
          line1="BA VIA"
          line2="KHỔ XẺ"
          left={80}
          right={260}
          top={290}
          size={102}
          check
          scrim
        />
      </Sequence>
      <Sequence name="T17 - Packing and storage" from={1434} durationInFrames={84} premountFor={fps}>
        <HeroPhrase
          duration={84}
          line1="ĐÓNG GÓI"
          line2="BẢO QUẢN"
          left={80}
          right={210}
          top={290}
          size={102}
          check
          scrim
        />
      </Sequence>

      <Sequence name="T18 - Precision milling" from={1551} durationInFrames={75} premountFor={fps}>
        <HeroPhrase
          duration={75}
          line1="PHAY CHÍNH XÁC"
          line2="4–6 MẶT"
          left={80}
          right={180}
          top={280}
          size={98}
          check
          scrim
        />
      </Sequence>
      <Sequence name="T19 - Milling criteria" from={1626} durationInFrames={75} premountFor={fps}>
        <ProofCard
          duration={75}
          line1="VUÔNG GÓC • ĐỘ PHẲNG • BA VIA"
          left={80}
          right={100}
          top={1290}
          align="center"
        />
      </Sequence>
      <Sequence name="T20 - Stability after machining" from={1701} durationInFrames={51} premountFor={fps}>
        <ProofCard
          duration={51}
          line1="ỔN ĐỊNH SAU GIA CÔNG"
          left={80}
          right={100}
          top={1290}
          align="center"
        />
      </Sequence>

      <Sequence name="T21 - Heat treatment chapter" from={1836} durationInFrames={75} premountFor={fps}>
        <HeroPhrase
          duration={75}
          line1="XỬ LÝ NHIỆT"
          line2="KIM LOẠI"
          left={80}
          right={260}
          top={290}
          size={98}
          scrim
        />
      </Sequence>
      <Sequence name="T22 - Heat treatment outcomes" from={1929} durationInFrames={138} premountFor={fps}>
        <LockedGrid
          duration={138}
          items={['TĂNG ĐỘ CỨNG', 'ỔN ĐỊNH CƠ TÍNH', 'GIẢM ỨNG SUẤT DƯ']}
          starts={[0, 24, 58]}
          columns={1}
          left={80}
          right={180}
          top={1230}
          strongScrim
        />
      </Sequence>

      <Sequence name="T24 - Nitriding outcomes" from={2160} durationInFrames={141} premountFor={fps}>
        <RollingBenefits duration={141} />
      </Sequence>
      <Sequence name="T25 - Capability bridge" from={2301} durationInFrames={84} premountFor={fps}>
        <BridgeCard duration={84} />
      </Sequence>

      <Sequence name="T26 - Per-order requirements" from={2415} durationInFrames={117} premountFor={fps}>
        <LockedGrid
          duration={117}
          items={['MÁC VẬT LIỆU', 'QUY CÁCH', 'TIÊU CHUẨN KỸ THUẬT']}
          starts={[0, 33, 66]}
          columns={3}
          support="THEO TỪNG ĐƠN HÀNG"
          supportStart={93}
          left={80}
          right={110}
          top={1200}
          strongScrim
        />
      </Sequence>

      <Sequence name="T27 - CTA lead" from={2556} durationInFrames={102} premountFor={fps}>
        <CtaLead duration={102} />
      </Sequence>
      <Sequence name="T28 - CTA helper" from={2658} durationInFrames={21} premountFor={fps}>
        <CtaHelper duration={21} />
      </Sequence>
      <Sequence name="T29 - Hotline clean hold" from={2679} durationInFrames={51} premountFor={fps}>
        <Hotline />
      </Sequence>

      <BackgroundMusic />
      <TextSoundEffects />
    </AbsoluteFill>
  );
};
