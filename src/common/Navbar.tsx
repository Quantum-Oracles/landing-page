import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

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
          "fixed top-0 left-0 w-full p-page py-4 duration-500 flex justify-between items-center z-[9999] bg-background bg-opacity-70 backdrop-blur-sm",
          minimized && "-translate-y-full"
        )}
      >
        <Link to="/">
          <NavLogo />
        </Link>

        <div className="flex gap-x-10">
          {navItems.map((item, key) => (
            <div
              className="text-front text-opacity-70 text-lg duration-300"
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
          className="fixed top-full bg-background duration-300 rounded"
          style={{ left: `${hoverDisplayX}px` }}
          onMouseLeave={() => setHoverDisplay(null)}
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%_+_2rem)] scale-y-125 bg-transparent -translate-y-10 -z-1" />
          {hoverDisplay && (
            <div className="animate-[anim-cropin-tl_200ms] bg-foreground bg-opacity-5">
              {hoverDisplay}
            </div>
          )}
        </div>
      </nav>

      <nav
        className={twMerge(
          "fixed top-0 left-1/2 -translate-x-1/2 w-max flex rounded-full px-5 py-3 mt-6 duration-500 z-[9999] bg-background border border-front border-opacity-20 items-center gap-x-14",
          "group",
          !minimized && "-translate-y-full mt-0"
        )}
      >
        <Link
          to="/"
          className="brightness-0 invert hover:brightness-100 hover:invert-0"
        >
          <NavLogo />
        </Link>

        <button
          className="flex items-center px-6 py-2 rounded-full bg-foreground bg-opacity-100 text-back gap-x-2 hover:bg-gradient-to-br hover:from-primary hover:to-secondary
        hover:via-accent hover:text-front"
        >
          Get Notified <Icon icon="open_in_new" />
        </button>
      </nav>
    </>
  );
}

function NavLogo() {
  return (
    <figure className="flex gap-x-2">
      <img src="/logo.png" alt="quantum logo" className="aspect-square w-12" />
      <div className="flex flex-col leading-none justify-center font-semibold font-poppins gap-y-1 bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary via-accent">
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
          className="py-2 px-4 border border-front border-opacity-10"
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
          className="py-2 px-4 border border-front border-opacity-10"
        >
          {sol.name}
        </Link>
      ))}
    </div>
  );
}
