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
      <section className="py-[10vh] relative">
        <ArtsyWordsElement className="h-[45vh] pointer-events-auto" />
        <div className="absolute-cover flex flex-col justify-center p-page gap-y-6">
          <p className="text-bg-gradient bg-gradient-to-br from-accent to-secondary text-lg font-medium">
            Get to know when we go public or buidl a new solution
          </p>
          <p
            className="font-medium text-4xl"
            style={{
              filter: `drop-shadow(0px 0px 4px #000)`,
            }}
          >
            Subscribe for updates
          </p>
          <PopupButton
            id="xeMPj4UL"
            className="w-max flex gap-x-3 items-center uppercase bg-background border border-front border-opacity-20 px-6 py-3 rounded-md duration-500 hover:scale-110
          hover:bg-foreground hover:text-back hover:translate-x-2"
          >
            <span className="tracking-wide">Newsletter</span>
            <Icon icon="arrow_forward" className="text-xl scale-110" />
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
    if (ref && rect && chars)
      window.addEventListener("mousemove", handleMouseMove);
  }, [rect, ref, chars]);

  useEffect(() => {
    window.addEventListener("resize", generateChars);
    return () => window.removeEventListener("resize", generateChars);
  }, []);

  return (
    <div
      ref={ref}
      className={twMerge("w-full relative group", props.className)}
    >
      {chars.map((row, i) => (
        <figure key={row.toString()}>
          {row.map((ch, j) => (
            <figure
              key={`${i}#${j}`}
              className={twMerge(
                "absolute -translate-x-1/2 -translate-y-1/2 text-xs text-white duration-[2s]",
                isPointInCircle(mousePos, window.innerWidth * (6.9 / 100), {
                  x: ch.left,
                  y: ch.top,
                }) &&
                  "text-secondary scale-[200%] text-xl font-bold duration-300"
              )}
              style={{
                ...getCharacterCoords(i, j),
                animation: `artsy-pulsating-text ${ch.pulsateDuration}ms infinite ${ch.pulsateDelay}ms, artsy-wobbly-text ${ch.wobbleDuration}ms infinite`,
              }}
            >
              {ch.char}
            </figure>
          ))}
        </figure>
      ))}
    </div>
  );
}
