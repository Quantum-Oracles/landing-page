import React from "react";
import Video from "../../../common/Video";
import Icon from "../../../common/Icon";
import { Link } from "react-router-dom";

export default function Climate() {
  return (
    <section className="p-page relative mt-[10vh] h-screen w-full mobile:hidden">
      <Video
        src="/videos/olena.mp4"
        speed={1}
        autoPlay
        muted
        loop
        className="absolute-cover -z-1 object-cover saturate-150"
      />
      <div className="absolute-cover -z-1 bg-gradient-to-b from-black via-[#0a2a0a56] to-black" />

      <div className="z-1 flex h-full w-full flex-col items-center justify-center text-front">
        <h1
          className="text-center text-6xl font-medium leading-tight"
          style={{ filter: "drop-shadow(0px 0px 4px #000, 0px 0px 2px #000)" }}
        >
          Shifting Computational Paradigms
          <br /> is the Key to Fighting Climate Change
        </h1>
        <p
          className="my-10 w-[46%] text-center text-2xl leading-tight"
          style={{ filter: "drop-shadow(0px 0px 4px #000, 0px 0px 2px #000)" }}
        >
          We are developing our core solutions and services to be eco-friendly.
          We aim to be pioneers in the fight against climate change. Quantum
          computing means less electronic waste and cloud quantum computing
          alludes to less computing devices in existance
        </p>

        <Link
          to="https://www2.deloitte.com/content/dam/Deloitte/us/Documents/quantum-computing-climate-change-2023.pdf"
          target="__blank"
          className="group flex w-max items-center justify-center gap-x-3 rounded-full border border-front bg-background px-6 py-4 hover:brightness-200"
        >
          <p className="mt-[2px] uppercase leading-none">Details</p>
          <div className="relative aspect-square h-[1em] scale-[160%] overflow-hidden">
            <Icon
              icon="arrow_forward"
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 -rotate-45 duration-300 group-hover:right-0 group-hover:top-0
            group-hover:-translate-y-full group-hover:translate-x-full"
            />
            <Icon
              icon="arrow_forward"
              className="absolute bottom-0 left-0 -translate-x-full translate-y-full -rotate-45 duration-300 group-hover:bottom-1/2 group-hover:left-1/2
              group-hover:-translate-x-1/2 group-hover:translate-y-1/2"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
