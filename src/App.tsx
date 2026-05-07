import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}