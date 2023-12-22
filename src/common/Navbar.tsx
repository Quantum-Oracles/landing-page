import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { PopupButton } from "@typeform/embed-react";

const scrollThreshold = window.innerHeight * 0.15;

const navItems: { title: string; to?: string; hover?: ReactNode }[] = [
  { to: "/", title: "Home" },
  { to: "/developers/docs", title: "Learn" },
  // { hover: <HoverWindowSolutions />, title: "Solutions" },
  // { hover: <HoverWindowCommunity />, title: "Community" },
  // { to: "/about", title: "About" },
];

export default function Navbar() {
  const [minimized, setMinimized] = useState(false);
  const flag = useRef(false);
  const [hoverDisplay, setHoverDisplay] = useState<ReactNode | null>(null);
  const [hoverDisplayX, setHoverDisplayX] = useState<number>(0);

  function handleScroll() {
    const currY = window.scrollY;
    if (currY < window.innerHeight * 0.25) {
      setMinimized(false);
    } else {
      setTimeout(() => {
        if (window.scrollY > currY + scrollThreshold) {
          setMinimized(true);
        }
        if (window.scrollY < currY - scrollThreshold / 2) {
          setMinimized(false);
        }
      }, 200);
    }
  }

  function handleMouseMove(event: MouseEvent) {
    if (
      Math.sqrt(
        Math.pow(event.clientX - hoverDisplayX, 2) +
          Math.pow(event.clientY - 0, 2)
      ) > 200
    ) {
      setHoverDisplay(null);
    }
  }

  useEffect(() => {
    if (!flag.current) {
      // Check for user intent to scroll and hide / show navbar accordingly
      window.addEventListener("scroll", handleScroll);

      window.addEventListener("mousemove", handleMouseMove);
      flag.current = true;
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <nav
        className={twMerge(
          "p-page fixed left-0 top-0 z-[9999] flex w-full items-center justify-between bg-background bg-opacity-70 py-4 backdrop-blur-sm duration-500",
          minimized && "widescreen:-translate-y-full"
        )}
      >
        <Link to="/">
          <NavLogo />
        </Link>

        <div className="flex gap-x-10">
          {navItems.map((item, key) => (
            <div
              className="text-lg text-front text-opacity-70 duration-300"
              key={key}
            >
              {item.to && (
                <NavLink
                  key={key}
                  className={({ isActive }) =>
                    twMerge(
                      isActive
                        ? "text-front text-opacity-100"
                        : "hover:text-secondary"
                    )
                  }
                  to={item.to}
                >
                  {item.title}
                </NavLink>
              )}
              {item.hover && (
                <button
                  key={key}
                  onMouseEnter={(event) => {
                    setHoverDisplay(item.hover);
                    setHoverDisplayX(
                      (event.target as any).getBoundingClientRect().left
                    );
                  }}
                >
                  {item.title}
                </button>
              )}
            </div>
          ))}
        </div>

        <div
          className="fixed top-full rounded bg-background duration-300 mobile:hidden"
          style={{ left: `${hoverDisplayX}px` }}
          onMouseLeave={() => setHoverDisplay(null)}
        >
          <div className="absolute left-0 top-0 -z-1 h-[calc(100%_+_2rem)] w-full -translate-y-10 scale-y-125 bg-transparent" />
          {hoverDisplay && (
            <div className="animate-[anim-cropin-tl_200ms] bg-foreground bg-opacity-5">
              {hoverDisplay}
            </div>
          )}
        </div>
      </nav>

      <nav
        className={twMerge(
          "fixed left-1/2 top-0 z-[9999] mt-6 flex w-max -translate-x-1/2 items-center gap-x-14 rounded-full border border-front border-opacity-20 bg-background px-5 py-3 duration-500",
          "group",
          !minimized && "mt-0 -translate-y-full"
        )}
      >
        <Link
          to="/"
          className="brightness-0 invert hover:brightness-100 hover:invert-0"
        >
          <NavLogo />
        </Link>

        <PopupButton
          id="xeMPj4UL"
          className="flex items-center gap-x-2 rounded-full bg-foreground bg-opacity-100 px-6 py-2 text-back hover:bg-gradient-to-br hover:from-primary hover:via-accent
        hover:to-secondary hover:text-front"
        >
          Get Notified <Icon icon="open_in_new" />
        </PopupButton>
      </nav>
    </>
  );
}

function NavLogo() {
  return (
    <figure className="flex gap-x-2">
      <img src="/logo.png" alt="quantum logo" className="aspect-square w-12" />
      <div className="flex flex-col justify-center gap-y-1 bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text font-poppins font-semibold leading-none text-transparent">
        <h1>Quantum</h1>
        <h2>Oracles</h2>
      </div>
    </figure>
  );
}

function HoverWindowSolutions() {
  const solutions = [
    { name: "QuChain", link: "" },
    { name: "Qracle", link: "" },
    { name: "HedgeFunds", link: "" },
  ];
  return (
    <div className="flex flex-col">
      {solutions.map((sol, key) => (
        <Link
          key={key}
          target="__blank"
          to={sol.link}
          className="border border-front border-opacity-10 px-4 py-2"
        >
          {sol.name}
        </Link>
      ))}
    </div>
  );
}

function HoverWindowCommunity() {
  const solutions = [
    { name: "Twitter / X", link: "" },
    { name: "Github", link: "" },
    { name: "Telegram", link: "" },
  ];
  return (
    <div className="flex flex-col">
      {solutions.map((sol, key) => (
        <Link
          key={key}
          target="__blank"
          to={sol.link}
          className="border border-front border-opacity-10 px-4 py-2"
        >
          {sol.name}
        </Link>
      ))}
    </div>
  );
}
