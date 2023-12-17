import React from "react";
import Video from "../../../common/Video";
import { Link } from "react-router-dom";

const solutions = [
  {
    title: "Qracle",
    content:
      "start your quantum journey, effortlessly creating and executing innovative circuits.",
    url: "",
  },
  {
    title: "Quantum HedgeFunds",
    content:
      "start your quantum journey, effortlessly creating and executing innovative circuits.",
    url: "",
  },
  {
    title: "We are still buidling!",
    content:
      "There's more to come and we can't wait to share our solutions with you!",
    url: "",
  },
];

export default function Solutions() {
  return (
    <section className="relative h-screen mt-[20vh]">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[75vh] flex justify-center">
        <Video
          src="/videos/extend-cubes.mp4"
          autoPlay
          muted
          loop
          className="invert w-full h-full object-cover"
          speed={1}
        />

        <div className="absolute-cover bg-gradient-to-br from-primary to-secondary via-accent mix-blend-color" />
        <div className="absolute-cover bg-gradient-to-b from-background to-background via-transparent" />
      </div>

      <div className="flex flex-col p-page items-center relative z-1 h-full">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-4xl font-medium text-center">
            We believe the future is Quantum
          </h1>

          <div className="text-center mt-24 flex flex-col items-center gap-y-1 text-xl font-extralight">
            <p>We are working towards that future.</p>
            <p>
              We are buidling our solutions in public which are available for
              early access
            </p>
          </div>

          <div className="flex justify-between mt-32">
            {solutions.map((item, key) => (
              <Link
                to={item.url}
                key={key}
                className="w-[30%] bg-background p-5 bg-opacity-75 backdrop-blur-sm border-2 border-primary outline outline-secondary rounded group hover:bg-opacity-100"
              >
                <div className="flex flex-col gap-y-2 group-hover:text-bg-gradient group-hover:bg-gradient-to-tl group-hover:from-secondary group-hover:via-accent group-hover:to-secondary">
                  <h3 className="text-xl font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-70 group-hover:opacity-100">
                    {item.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
