import {Composition} from 'remotion';
import {OristarFullFinal} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OristarFullFinal"
      component={OristarFullFinal}
      durationInFrames={2770}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
