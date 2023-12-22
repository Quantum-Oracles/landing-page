import { twMerge } from "tailwind-merge";
import {
  generateRandomCharactersMatrix,
  isPointInCircle,
  linearMap,
} from "../utils";
import { useEffect, useRef, useState } from "react";
import useRect from "../hooks/useRect";
import Icon from "./Icon";
import { PopupButton } from "@typeform/embed-react";

export default function Footer() {
  return (
    <footer className="mt-[13vh] select-none">
      <section className="relative py-[10vh]">
        <ArtsyWordsElement className="pointer-events-auto h-[45vh]" />
        <div className="absolute-cover p-page flex flex-col justify-center gap-y-6">
          <p className="text-bg-gradient bg-gradient-to-br from-accent to-secondary text-lg font-medium">
            Get to know when we go public or buidl a new solution
          </p>
          <p
            className="text-4xl font-medium"
            style={{
              filter: `drop-shadow(0px 0px 4px #000)`,
            }}
          >
            Subscribe for updates
          </p>
          <PopupButton
            id="xeMPj4UL"
            className="flex w-max items-center gap-x-3 rounded-md border border-front border-opacity-20 bg-background px-6 py-3 uppercase duration-500 hover:translate-x-2
          hover:scale-110 hover:bg-foreground hover:text-back"
          >
            <span className="tracking-wide">Newsletter</span>
            <Icon icon="arrow_forward" className="scale-110 text-xl" />
          </PopupButton>
        </div>
      </section>
    </footer>
  );
}

function ArtsyWordsElement(props: { className?: string }) {
  const lengths = [10, 37] as const;
  const [chars, setChars] = useState<
    {
      char: string;
      top: number;
      left: number;
      wobbleDuration: number;
      pulsateDuration: number;
      pulsateDelay: number;
    }[][]
  >([[]]);

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const rect = useRect(ref);

  const characters_xpad = window.innerWidth * (3 / 100); // in pixels

  function getCharacterCoords(i: number, j: number) {
    if (rect)
      return {
        top: linearMap(
          i,
          { from: 0, to: lengths[0] - 1 },
          { from: 1, to: rect.height }
        ),
        left: linearMap(
          j,
          { from: 0, to: lengths[1] - 1 },
          { from: characters_xpad, to: window.innerWidth - characters_xpad }
        ),
      } as const;
  }

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  function handleMouseMove(event: MouseEvent) {
    setMousePos({
      x: event.clientX,
      y: event.clientY - ref.current.getBoundingClientRect().top - 8,
    });
  }

  function generateChars() {
    setChars(
      generateRandomCharactersMatrix(...lengths).map((row, i) => {
        return row.map((ch, j) => {
          const coords = getCharacterCoords(i, j);
          return {
            char: ch,
            top: coords?.top || Infinity,
            left: coords?.left || Infinity,
            pulsateDuration: Math.random() * 8000 + 2000,
            pulsateDelay: Math.random() * 8000,
            wobbleDuration: Math.random() * 8000 + 6000,
          };
        });
      })
    );
  }

  useEffect(() => {
    setTimeout(() => {
      generateChars();
    }, 20);
  }, []);

  useEffect(() => {
    // if (ref && rect && chars)
    // window.addEventListener("mousemove", handleMouseMove);
  }, [rect, ref, chars]);

  useEffect(() => {
    window.addEventListener("resize", generateChars);
    return () => window.removeEventListener("resize", generateChars);
  }, []);

  return (
    <div
      ref={ref}
      className={twMerge("group relative w-full", props.className)}
    >
      {chars.map((row, i) => (
        <figure key={i + Math.random()}>
          {row.map((ch, j) => (
            <figure
              key={`${i}#${j}`}
              className={twMerge(
                "absolute -translate-x-1/2 -translate-y-1/2 animate-[var(--Wanimation)] text-xs text-white duration-[2s] mobile:animate-[var(--Manimation)] mobile:text-secondary mobile:text-opacity-30"
                // isPointInCircle(mousePos, window.innerWidth * (6.9 / 100), {
                //   x: ch.left,
                //   y: ch.top,
                // }) &&
                //   "text-secondary scale-[200%] text-xl font-bold duration-300"
              )}
              style={
                {
                  ...getCharacterCoords(i, j),
                  "--Wanimation": `artsy-pulsating-text ${ch.pulsateDuration}ms infinite ${ch.pulsateDelay}ms, artsy-wobbly-text ${ch.wobbleDuration}ms infinite`,
                  "--Manimation": `artsy-pulsating-text ${ch.pulsateDuration}ms infinite ${ch.pulsateDelay}ms `,
                } as React.CSSProperties
              }
            >
              {ch.char}
            </figure>
          ))}
        </figure>
      ))}
    </div>
  );
}
