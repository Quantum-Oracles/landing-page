import { twMerge } from "tailwind-merge";
import ArtAnimCanvas from "../../../common/ArtAnimCanvas";
import usePosition from "../../../hooks/usePosition";
import { useEffect, useRef, useState } from "react";
import { clampValue } from "../../../utils";
import { Link } from "react-router-dom";
import { PopupButton } from "@typeform/embed-react";

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
    <section className="p-page relative h-screen overflow-hidden pt-[15vh] mobile:pt-[20vh]">
      <div className="absolute-cover -z-10">
        <ArtAnimCanvas
          className="absolute-cover translate-y-1/4 mobile:top-full mobile:h-1/2 mobile:-translate-y-[70%]"
          colors={{ from: [137, 44, 254], to: [23, 244, 169] }}
          bumps={8}
          strength={9}
          speed={1}
          radSize={200}
          pulsate
          // wavesCount={100}
        />
        <div
          className="absolute left-0 top-3/4 z-1 h-[45%] w-[20%] animate-[art-anim-pulsate_15000ms_infinite] bg-black opacity-50 mix-blend-hue blur-2xl"
          key={0}
        />
        <div className="absolute-cover bg-gradient-to-l from-background via-transparent to-background" />
      </div>

      <div
        className={twMerge(
          "absolute right-3 top-0 aspect-square w-[32vw] -translate-y-1/2 translate-x-1/2 rounded-full opacity-30 blur-3xl",
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
        <div className="flex flex-col gap-y-4 text-center text-6xl font-semibold tracking-tight mobile:text-4xl">
          <h1>
            Create with{" "}
            <span className="text-bg-gradient bg-gradient-to-r from-primary via-accent to-secondary">
              Quantum
            </span>{" "}
            power.
          </h1>
          <h2 className="mobile:text-3xl">Faster than ever!</h2>
        </div>

        <p className="text-lg font-light text-front text-opacity-75 mobile:text-sm">
          Web3 Computation Layer
        </p>

        <div className="flex gap-x-20 mobile:flex-col mobile:gap-y-6">
          <PopupButton
            id="xeMPj4UL"
            className="before:absolute-cover relative overflow-hidden rounded-full bg-gradient-to-br from-secondary to-transparent px-10 py-4 font-raleway font-semibold tracking-wider text-front
        duration-500 before:-z-1 before:bg-secondary before:opacity-10 before:duration-inherit hover:scale-90 hover:text-back hover:opacity-70 hover:before:opacity-100"
          >
            Get Notified
          </PopupButton>
          <Link
            to="/developers/docs"
            className="before:absolute-cover relative overflow-hidden rounded-full bg-gradient-to-bl from-primary to-transparent px-10 py-4 font-raleway font-semibold tracking-wider text-front
        duration-500 before:-z-1 before:bg-primary before:opacity-10 before:duration-inherit hover:scale-90 hover:text-back hover:opacity-70 hover:before:opacity-100"
          >
            Read Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
