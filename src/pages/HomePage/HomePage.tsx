import CursorGlow from "../../common/CursorGlow";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <CursorGlow />

      <Hero />

      <section className="h-[300vh]" />
    </>
  );
}
