import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";

const scrollThreshold = window.innerHeight * 0.15;

const navItems = [
  { to: "/", title: "Home" },
  { to: "/solutions", title: "Solutions" },
  { to: "/docs", title: "Learn" },
  { to: "/pr", title: "Community" },
  { to: "/about", title: "About" },
];

export default function Navbar() {
  const [minimized, setMinimized] = useState(false);
  const [flag, setFlag] = useState(false);

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

  useEffect(() => {
    // Check for user intent to scroll and hide / show navbar accordingly
    if (!flag) {
      window.addEventListener("scroll", handleScroll);
      setFlag(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setFlag(false);
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
            <NavLink
              key={key}
              className={({ isActive }) =>
                twMerge(
                  "text-front text-opacity-70 text-lg duration-300",
                  isActive
                    ? "text-front text-opacity-100"
                    : "hover:text-secondary"
                )
              }
              to={item.to}
            >
              {item.title}
            </NavLink>
          ))}
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
          Start Building <Icon icon="open_in_new" />
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
