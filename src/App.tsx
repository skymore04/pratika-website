import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Music from "./components/Music";
import WildWildWomen from "./components/WildWildWomen";
import YouTube from "./components/YouTube";
import Portfolio from "./components/Portfolio";
import Achievements from "./components/Achievements";
import Social from "./components/Social";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  return (
    <>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <div className="noise" />

      <main>
        <Hero introComplete={introComplete} />
        <About />
        <Music />
        <YouTube />
        <Portfolio />
        <WildWildWomen />
        <Achievements />
        <Social />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
