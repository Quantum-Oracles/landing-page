import React, { useEffect, useRef } from "react";

interface VideoProps {
  speed?: number;
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
    ref.current.playbackRate = props.speed || 1;
  }, []);

  return <video ref={ref} {...props} />;
}
