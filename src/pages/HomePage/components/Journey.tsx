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
      style={
        {
          "--cHeight": `${Math.max(rect?.width || 0, window.innerHeight)}px`,
        } as React.CSSProperties
      }
      className="relative bg-foreground widescreen:h-[var(--cHeight)]"
    >
      <div className="sticky -top-[0.5px] flex overflow-hidden bg-background mobile:flex-col widescreen:h-screen">
        <div
          ref={containerRef}
          className="flex mobile:flex-col mobile:gap-y-10 widescreen:w-[300vw] widescreen:translate-x-[var(--translate)]"
          style={{ "--translate": `-${translate}px` } as React.CSSProperties}
        >
          <JourneySection1 />
          <JourneySection2 />
          <JourneySection3 />
        </div>
      </div>
    </section>
  );
}

function JourneySection1() {
  return (
    <article className="flex w-screen bg-opacity-10 widescreen:h-screen">
      <div className="relative flex h-full flex-1 flex-col items-center widescreen:pt-[17vh]">
        <h1 className="text-6xl font-medium tracking-tight mobile:text-4xl">
          Our Journey
        </h1>
        <p className="mb-10 mt-5 text-center text-xl text-gray-300 mobile:text-xs">
          Reflecting on the development trajectory of Quantum Oracles
          <br />
          our journey has been a series of significant milestones
        </p>

        <div
          className="flex w-[87vw] rounded-xl p-8 backdrop-blur-sm mobile:w-[90vw] mobile:flex-col mobile:p-4"
          style={{
            background:
              "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
          }}
        >
          <img
            src="/images/journey-header.png"
            className="aspect-[590/400] rounded-xl object-cover widescreen:h-[400px]"
            alt="journey ai"
          />

          <div className="relative flex h-full flex-1 flex-col justify-center gap-y-6 pl-10 mobile:px-0 mobile:pt-5">
            <span className="absolute right-0 top-0 text-gray-400">
              #LATEST
            </span>

            <h1 className="text-4xl font-bold tracking-tight">
              Buidling Quantum Hedge Funds
            </h1>
            <p className="text-lg text-gray-300 mobile:text-sm">
              {" "}
              We are further fusing quantum computing with blockchain
              technology. Our focus is now on establishing a hedge fund that
              leverages the Quantum Oracles infrastructure, integrating
              Chainlink functions, price feeds, and automation to drive forward
              the financial industry's future.
            </p>

            <Link
              to="https://www.linkedin.com/posts/yash-goyal-0018_oxfordblockchainhack-homedao-chainlink-activity-7123292120601219072-_mYH/"
              target="__blank"
              className="group flex w-max items-center justify-center gap-x-3 rounded-full border border-front px-6 py-4 duration-300 hover:bg-foreground hover:text-back"
            >
              <p className="uppercase leading-none">Read Article</p>
              <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
            </Link>
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[45%] -z-10 h-[30vh] w-[75vw] -translate-x-1/2 -rotate-[20deg] rounded-full bg-gradient-to-r from-primary 
        to-secondary opacity-25 blur-3xl"
        />
      </div>
    </article>
  );
}

function JourneySection2() {
  return (
    <article className="flex w-screen flex-col items-center widescreen:h-screen widescreen:pt-[17vh]">
      <div
        className="flex w-[87vw] rounded-xl p-8 backdrop-blur-sm mobile:w-[90vw] mobile:flex-col mobile:p-4"
        style={{
          background:
            "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
        }}
      >
        <div className="flex aspect-square w-[40%] flex-col gap-y-[1px] overflow-hidden rounded-xl bg-gradient-to-br from-secondary via-accent to-secondary p-[1px] mobile:w-full">
          <img
            src="/images/journey/l1.jpeg"
            className="h-[64%] w-full rounded-t-xl object-cover"
          />
          <div className="flex flex-1 gap-x-[1px] pr-[2px]">
            <img
              src="/images/journey/l2.jpeg"
              className="aspect-square w-1/3 rounded-bl-xl object-cover"
            />
            <img
              src="/images/journey/l3.jpeg"
              className="aspect-square w-1/3 object-cover"
            />
            <img
              src="/images/journey/l4.jpeg"
              className="aspect-square w-1/3 rounded-br-xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-y-6 pl-10 mobile:px-0 mobile:pt-4">
          <h1 className="text-4xl font-bold tracking-tight mobile:text-2xl">
            Major Win at EthLondon Bridging Quantum Computing & Blockchain!
          </h1>
          <p className="text-lg text-gray-300 mobile:text-sm">
            Quantum Oracles aims to revolutionize the way we think about
            decentralized computations by allowing smart contracts to execute
            quantum programs. This project isn't just a blend of groundbreaking
            technologies; it's a peek into the future of decentralized quantum
            applications.
          </p>

          <Link
            to="https://www.linkedin.com/feed/update/urn:li:activity:7125048726338904064/"
            target="__blank"
            className="group flex w-max items-center justify-center gap-x-3 rounded-full border border-front px-6 py-4 duration-300 hover:bg-foreground hover:text-back"
          >
            <p className="uppercase leading-none">Read Article</p>
            <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
          </Link>
        </div>
      </div>

      <p className="mt-20 text-xl text-gray-300 mobile:hidden">29 Oct 2023</p>
    </article>
  );
}

function JourneySection3() {
  return (
    <article className="relative flex w-screen flex-col items-center mobile:flex-col-reverse widescreen:h-screen widescreen:pt-[17vh]">
      <p className="mb-20 text-xl text-gray-300 mobile:hidden">22 Oct 2023</p>

      <div
        className="flex w-[87vw] rounded-xl p-8 backdrop-blur-sm mobile:w-[90vw] mobile:flex-col mobile:p-4"
        style={{
          background:
            "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
        }}
      >
        <div className="flex aspect-square w-[40%] flex-col gap-y-[1px] overflow-hidden rounded-xl bg-gradient-to-br from-secondary via-accent to-secondary p-[1px] mobile:w-full">
          <img
            src="/images/journey/o1.jpeg"
            className="h-[64%] w-full rounded-t-xl object-cover"
          />
          <div className="flex flex-1 gap-x-[1px] pr-[2px]">
            <img
              src="/images/journey/o2.jpeg"
              className="w-1/2 rounded-bl-xl object-cover"
            />
            <img
              src="/images/journey/o3.jpeg"
              className="w-1/2 rounded-br-xl object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-y-6 pl-10 mobile:px-0 mobile:pt-4">
          <h1 className="text-4xl font-bold tracking-tight mobile:text-2xl">
            Winning on a Meaningful Experience at Oxford Blockchain Hack
          </h1>
          <p className="text-lg text-gray-300 mobile:text-sm">
            We focused on a project that aimed to bridge the gap between
            blockchain and quantum computing. Utilizing Chainlink functions, our
            solution facilitates the execution of quantum circuits on IBM's
            quantum computers, storing the outcomes on-chain for future smart
            contract operations.
          </p>

          <Link
            to="https://www.linkedin.com/feed/update/urn:li:activity:7125048726338904064/"
            target="__blank"
            className="group flex w-max items-center justify-center gap-x-3 rounded-full border border-front px-6 py-4 duration-300 hover:bg-foreground hover:text-back"
          >
            <p className="uppercase leading-none">Read Article</p>
            <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
          </Link>
        </div>
      </div>

      <div
        className="absolute -left-1/2 top-[45%] -z-10 h-[30vh] w-[75vw] translate-x-[35%] rotate-[20deg] rounded-full bg-gradient-to-l from-primary 
        to-secondary opacity-25 blur-3xl"
      />
    </article>
  );
}
