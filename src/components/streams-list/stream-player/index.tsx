// React Imports
import { useContext } from 'react';

// Next Imports
import { useSearchParams } from 'next/navigation';

// Libs Imports
import ReactPlayer from 'react-player';
import { cva } from 'class-variance-authority';
import { useMediaQuery } from 'usehooks-ts';

// Contexts Imports
import { StreamPlayerControlsContext } from './stream-player-controls-context';

// Scripts Imports
import { getStreamUrl } from '@/utils/getStreamUrl';
import { useSearchParamsStates } from '@/utils/useSearchParamsState';

// Components Imports
import { StreamPlayerHeader } from './stream-player-header';
import { getColumns } from '@/utils/getColumns';

interface Props {
  channel: string;
}

export const StreamPlayer = ({ channel }: Props) => {
  const streamPlayerControls = useContext(StreamPlayerControlsContext);
  const { streams } = useSearchParamsStates();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const playerStyleVariants = cva('flex-grow inset-0', {
    variants: {
      fullScreen: {
        true: 'absolute z-20',
        false: 'relative z-0',
      },
    },
    defaultVariants: {
      fullScreen: false,
    },
  });

  return (
    <div
      className={playerStyleVariants({
        fullScreen: streamPlayerControls.fullScreen.value,
      })}
      style={{
        width: streamPlayerControls.fullScreen.value
          ? 'auto'
          : `${100 / getColumns(streams.length, isDesktop)}%`,
      }}
    >
      <StreamPlayerHeader
        channel={channel}
        isYoutubeStream={getStreamUrl(channel).includes('youtube')}
      />
      <ReactPlayer
        className="!h-full !w-full"
        url={getStreamUrl(channel)}
        muted={streamPlayerControls.muted.value}
        playing
        controls
        key={streamPlayerControls.refresh.key}
      />
    </div>
  );
};
