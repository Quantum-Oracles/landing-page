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
    </>
  );
}
