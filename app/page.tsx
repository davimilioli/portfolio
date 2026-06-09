import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";

export default function Home() {
  return (
    <>
      <div id="hero"><Hero /></div>
      <div id="sobre"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projetos"><Projects /></div>
      <div id="contato"><Contact /></div>
    </>
  );
}
