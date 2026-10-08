import {Composition} from 'remotion';
import {OristarPreviewV2} from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OristarPreviewV2"
      component={OristarPreviewV2}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
