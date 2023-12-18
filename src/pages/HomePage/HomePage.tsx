import CursorGlow from "../../common/CursorGlow";
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
      <Faqs />

      {/* <section className="h-[300vh]" /> */}
    </>
  );
}
