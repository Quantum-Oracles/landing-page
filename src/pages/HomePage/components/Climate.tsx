import React from "react";
import Video from "../../../common/Video";
import Icon from "../../../common/Icon";
import { Link } from "react-router-dom";

export default function Climate() {
  return (
    <section className="relative h-screen mt-[10vh] w-full p-page">
      <Video
        src="/videos/olena.mp4"
        speed={1}
        className="absolute-cover object-cover -z-1 saturate-150"
      />
      <div className="absolute-cover bg-gradient-to-b from-black to-black via-[#0a2a0a56] -z-1" />

      <div className="flex flex-col items-center justify-center w-full h-full text-front z-1">
        <h1
          className="text-6xl font-medium text-center leading-tight"
          style={{ filter: "drop-shadow(0px 0px 4px #000, 0px 0px 2px #000)" }}
        >
          Shifting Computational Paradigms
          <br /> is the Key to Fighting Climate Change
        </h1>
        <p
          className="w-[46%] my-10 text-center leading-tight text-2xl"
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
          className="rounded-full px-6 py-4 border border-front w-max flex justify-center items-center gap-x-3 group bg-background hover:brightness-200"
        >
          <p className="leading-none uppercase mt-[2px]">Details</p>
          <div className="relative overflow-hidden aspect-square h-[1em] scale-[160%]">
            <Icon
              icon="arrow_forward"
              className="-rotate-45 duration-300 absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 group-hover:top-0 group-hover:right-0
            group-hover:-translate-y-full group-hover:translate-x-full"
            />
            <Icon
              icon="arrow_forward"
              className="-rotate-45 duration-300 absolute left-0 -translate-x-full bottom-0 translate-y-full group-hover:bottom-1/2 group-hover:translate-y-1/2
              group-hover:left-1/2 group-hover:-translate-x-1/2"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
