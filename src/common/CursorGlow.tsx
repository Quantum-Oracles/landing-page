import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [flag, setFlag] = useState(false);

  function mouseMoveHandler(event: MouseEvent) {
    setPos({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    if (!flag) {
      setFlag(true);
      window.addEventListener("mousemove", mouseMoveHandler);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      setFlag(false);
    };
  }, []);

  return (
    <figure
      className="animate-[cursor-glow-color-anim_20000ms_infinite,cursor-glow-scale-anim_20000ms_infinite] fixed aspect-square w-[75vw] rounded-full blur-3xl z-[10000] opacity-[7%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="absolute-cover bg-gradient-to-r from-black to-black via-transparent" />
      <div className="absolute-cover bg-gradient-to-b from-black to-black via-transparent" />
    </figure>
  );
}
