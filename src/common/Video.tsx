import React, { useEffect, useRef } from "react";

interface VideoProps {
  speed?: number;
  autoLoop?: boolean;
}

export default function Video(
  props: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > &
    VideoProps
) {
  const ref = useRef() as React.MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    const curr = ref.current;
    curr.playbackRate = props.speed || 1;
    if (props.autoLoop) {
      curr.autoplay = true;
      curr.muted = true;
      curr.loop = true;
    }
  }, []);

  return <video ref={ref} {...props} />;
}
