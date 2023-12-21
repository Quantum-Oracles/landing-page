import CursorGlow from "../../common/CursorGlow";
import Climate from "./components/Climate";
import Faqs from "./components/Faqs";
import Hero from "./components/Hero";
import Journey from "./components/Journey";
import Solutions from "./components/Solutions";

export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <Hero />
      <Solutions />
      <Journey />
      <Climate />
      <Faqs />
      <div data-tf-live="01HJ61N0J8T46GMSC22PV7P27X" />
    </>
  );
}
