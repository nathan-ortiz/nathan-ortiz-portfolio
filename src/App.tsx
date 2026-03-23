import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { StatsBar } from "@/sections/StatsBar";
import { Projects } from "@/sections/Projects";
import { Statement } from "@/sections/Statement";
import { About } from "@/sections/About";
import { Connect } from "@/sections/Connect";
import { Footer } from "@/sections/Footer";

export const App = () => (
  <div className="dither-bg font-body text-text min-h-screen">
    <Navbar />
    <main className="relative z-[1]">
      <Hero />
      <StatsBar />
      <Projects />
      <Statement />
      <About />
      <Connect />
    </main>
    <Footer />
  </div>
);
