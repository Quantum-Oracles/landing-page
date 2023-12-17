import CursorGlow from "../../common/CursorGlow";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";

export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <Hero />
      <Solutions />

      <section className="h-[300vh]" />
    </>
  );
}
