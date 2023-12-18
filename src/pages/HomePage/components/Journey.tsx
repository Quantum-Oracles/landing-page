import React, { useEffect, useRef, useState } from "react";
import { linearMap } from "../../../utils";
import Video from "../../../common/Video";
import Icon from "../../../common/Icon";
import { Link } from "react-router-dom";

export default function Journey() {
  const [rect, setRect] = useState<DOMRect>();
  const [translate, setTranslate] = useState(0);

  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  function scrollHandler() {
    if (rect)
      setTranslate(
        linearMap(
          window.scrollY,
          {
            from: rect.top || 0,
            to: rect.top + rect.width - window.innerHeight,
          },
          { from: 0, to: rect.width - window.innerWidth },
          true
        )
      );
  }

  useEffect(() => {
    setRect(containerRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [rect]);

  return (
    <section
      id="journey"
      style={{ height: Math.max(rect?.width || 0, window.innerHeight) }}
      className="bg-foreground relative"
    >
      <div className="bg-background h-screen overflow-hidden flex sticky -top-[0.5px]">
        <div
          ref={containerRef}
          className="w-[200vw] flex translate-x-[var(--translate)]"
          style={{ "--translate": `-${translate}px` } as React.CSSProperties}
        >
          <JourneySection1 />
          <JourneySection2 />
        </div>
      </div>
    </section>
  );
}

function JourneySection1() {
  return (
    <article className="bg-opacity-10 h-screen w-screen flex">
      <div className="flex relative flex-col h-full items-center flex-1 pt-[17vh]">
        <h1 className="text-6xl font-medium tracking-tight">Our Journey</h1>
        <p className="text-gray-300 text-xl text-center mt-5 mb-10">
          Reflecting on the development trajectory of Quantum Oracles
          <br />
          our journey has been a series of significant milestones
        </p>

        <div
          className="p-8 rounded-xl flex w-[87vw] backdrop-blur-sm"
          style={{
            background:
              "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
          }}
        >
          <img
            src="/images/journey-header.png"
            className="aspect-[590/400] h-[400px] object-cover rounded-xl"
            alt="journey ai"
          />

          <div className="flex-1 flex flex-col justify-center pl-10 h-full gap-y-6 relative">
            <span className="absolute top-0 right-0 text-gray-400">
              #LATEST
            </span>

            <h1 className="font-bold text-4xl tracking-tight">
              Quantum Oracles Wins 3 first places at Oxford Blockchain Hack
            </h1>
            <p className="text-gray-300 text-lg">
              'Artists in Residence' introduced over 3000 attendees to the
              Solana community of artists for the first time.
            </p>

            <Link
              to="https://www.linkedin.com/posts/yash-goyal-0018_oxfordblockchainhack-homedao-chainlink-activity-7123292120601219072-_mYH/"
              target="__blank"
              className="rounded-full px-6 py-4 border border-front w-max flex justify-center items-center gap-x-3 group duration-300 hover:bg-foreground hover:text-back"
            >
              <p className="leading-none uppercase">Read Article</p>
              <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
            </Link>
          </div>
        </div>

        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary opacity-25 h-[30vh] w-[75vw] rounded-full 
        -rotate-[20deg] blur-3xl -z-10"
        />
      </div>
    </article>
  );
}

function JourneySection2() {
  return <article className="h-screen w-screen"></article>;
}
