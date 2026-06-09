import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
