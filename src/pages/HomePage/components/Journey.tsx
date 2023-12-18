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
          className="w-[300vw] flex translate-x-[var(--translate)]"
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
              Buidling Quantum HedgeFunds for Chainlink constellation
            </h1>
            <p className="text-gray-300 text-lg">
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
  return (
    <article className="h-screen w-screen pt-[17vh] flex flex-col items-center">
      <div
        className="p-8 rounded-xl flex w-[87vw] backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
        }}
      >
        <div className="flex flex-col aspect-square w-[40%] rounded-xl overflow-hidden bg-gradient-to-br gap-y-[1px] from-secondary via-accent to-secondary p-[1px]">
          <img
            src="/images/journey/l1.jpeg"
            className="h-[64%] w-full object-cover rounded-t-xl"
          />
          <div className="flex flex-1 gap-x-[1px] pr-[2px]">
            <img
              src="/images/journey/l2.jpeg"
              className="aspect-square w-1/3 object-cover rounded-bl-xl"
            />
            <img
              src="/images/journey/l3.jpeg"
              className="aspect-square w-1/3 object-cover"
            />
            <img
              src="/images/journey/l4.jpeg"
              className="aspect-square w-1/3 object-cover rounded-br-xl"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col pl-10 justify-center gap-y-6">
          <h1 className="font-bold text-4xl tracking-tight">
            Major Win at EthLondon Bridging Quantum Computing & Blockchain!
          </h1>
          <p className="text-gray-300 text-lg">
            Quantum Oracles aims to revolutionize the way we think about
            decentralized computations by allowing smart contracts to execute
            quantum programs. This project isn't just a blend of groundbreaking
            technologies; it's a peek into the future of decentralized quantum
            applications.
          </p>

          <Link
            to="https://www.linkedin.com/feed/update/urn:li:activity:7125048726338904064/"
            target="__blank"
            className="rounded-full px-6 py-4 border border-front w-max flex justify-center items-center gap-x-3 group duration-300 hover:bg-foreground hover:text-back"
          >
            <p className="leading-none uppercase">Read Article</p>
            <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
          </Link>
        </div>
      </div>

      <p className="text-gray-300 text-xl mt-20">11 Nov 2023</p>
    </article>
  );
}

function JourneySection3() {
  return (
    <article className="h-screen w-screen pt-[17vh] flex flex-col items-center relative">
      <p className="text-gray-300 text-xl mb-20">20 Nov 2023</p>

      <div
        className="p-8 rounded-xl flex w-[87vw] backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(213deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.05) 49.48%,hsla(0,0%,100%,.03))",
        }}
      >
        <div className="flex flex-col aspect-square w-[40%] rounded-xl overflow-hidden bg-gradient-to-br gap-y-[1px] from-secondary via-accent to-secondary p-[1px]">
          <img
            src="/images/journey/o1.jpeg"
            className="h-[64%] w-full object-cover rounded-t-xl"
          />
          <div className="flex flex-1 gap-x-[1px] pr-[2px]">
            <img
              src="/images/journey/o2.jpeg"
              className="w-1/2 object-cover rounded-bl-xl"
            />
            <img
              src="/images/journey/o3.jpeg"
              className="w-1/2 object-cover rounded-br-xl"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col pl-10 justify-center gap-y-6">
          <h1 className="font-bold text-4xl tracking-tight">
            Winning on a Meaningful Experience at Oxford Blockchain Hack
          </h1>
          <p className="text-gray-300 text-lg">
            We focused on a project that aimed to bridge the gap between
            blockchain and quantum computing. Utilizing Chainlink functions, our
            solution facilitates the execution of quantum circuits on IBM's
            quantum computers, storing the outcomes on-chain for future smart
            contract operations.
          </p>

          <Link
            to="https://www.linkedin.com/feed/update/urn:li:activity:7125048726338904064/"
            target="__blank"
            className="rounded-full px-6 py-4 border border-front w-max flex justify-center items-center gap-x-3 group duration-300 hover:bg-foreground hover:text-back"
          >
            <p className="leading-none uppercase">Read Article</p>
            <Icon icon="arrow_forward" className="-rotate-45 scale-150" />
          </Link>
        </div>
      </div>

      <div
        className="absolute top-[45%] -left-1/2 bg-gradient-to-l translate-x-[35%] from-primary to-secondary opacity-25 h-[30vh] w-[75vw] rounded-full 
        rotate-[20deg] blur-3xl -z-10"
      />
    </article>
  );
}
