import { twMerge } from "tailwind-merge";
import ArtAnimCanvas from "../../../common/ArtAnimCanvas";
import usePosition from "../../../hooks/usePosition";
import { useEffect, useRef, useState } from "react";
import { clampValue } from "../../../utils";

export default function Hero() {
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  function scrollHandler() {
    setOffset((window.scrollY - initialPos.top) / window.innerHeight);
  }

  const initialPos = usePosition(contentRef);
  const [r] = useState(Math.random());

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <section className="h-screen relative p-page pt-[15vh] overflow-hidden">
      <div className="absolute-cover -z-10">
        <ArtAnimCanvas
          className="absolute-cover translate-y-1/4"
          colors={{ from: [137, 44, 254], to: [23, 244, 169] }}
          bumps={8}
          strength={9}
          speed={1}
          radSize={200}
          pulsate
          // wavesCount={100}
        />
        <div
          className="absolute w-[20%] h-[45%] blur-2xl mix-blend-hue bg-black opacity-50 animate-[art-anim-pulsate_15000ms_infinite] top-3/4 left-0 z-1"
          key={0}
        />
        <div className="absolute-cover bg-gradient-to-l from-background via-transparent to-background" />
      </div>

      <div
        className={twMerge(
          "absolute top-0 -translate-y-1/2 right-3 translate-x-1/2 w-[32vw] aspect-square rounded-full blur-3xl opacity-30",
          r < 0.4
            ? "bg-gradient-to-bl from-primary to-transparent"
            : "bg-gradient-to-bl from-secondary to-transparent"
        )}
      />

      <div
        className="flex flex-col items-center gap-y-10"
        ref={contentRef}
        style={{
          opacity: Math.abs(1 - clampValue(offset * 6, { min: -1, max: 1 })),
        }}
      >
        <div className="flex flex-col gap-y-4 text-center text-6xl font-semibold tracking-tight">
          <h1>
            Create with{" "}
            <span className="text-bg-gradient bg-gradient-to-r from-primary to-secondary via-accent">
              Quantum
            </span>{" "}
            power.
          </h1>
          <h2>Faster than ever!</h2>
        </div>

        <p className="text-front text-opacity-75 font-light text-lg">
          some five words professional description
        </p>

        <div className="flex gap-x-20">
          <button
            className="bg-gradient-to-br from-secondary text-front tracking-wider font-raleway font-semibold to-transparent rounded-full px-10 py-4 overflow-hidden relative hover:opacity-70
        before:absolute-cover before:bg-secondary before:opacity-10 before:-z-1 duration-500 before:duration-inherit hover:before:opacity-100 hover:text-back hover:scale-90"
          >
            Start Building
          </button>
          <button
            className="bg-gradient-to-bl from-primary text-front tracking-wider font-raleway font-semibold to-transparent rounded-full px-10 py-4 overflow-hidden relative hover:opacity-70
        before:absolute-cover before:bg-primary before:opacity-10 before:-z-1 duration-500 before:duration-inherit hover:before:opacity-100 hover:text-back hover:scale-90"
          >
            Read Docs
          </button>
        </div>
      </div>
    </section>
  );
}
