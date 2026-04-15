import Image from "next/image";
import { ContactForm } from "@/components/contact-form";

const projects = [
  {
    title: "AI Knowledge Assistant",
    summary:
      "Built an AI-powered assistant with retrieval workflows to answer product and documentation queries with high accuracy.",
    tags: ["Next.js", "OpenAI API", "RAG"],
    href: "https://github.com/jatin-x-pal",
  },
  {
    title: "Modern SaaS Dashboard",
    summary:
      "Designed and developed a scalable full-stack dashboard with secure auth, analytics, and optimized data pipelines.",
    tags: ["React", "Node.js", "MongoDB"],
    href: "https://github.com/jatin-x-pal",
  },
  {
    title: "Prompt Workflow Studio",
    summary:
      "Created a prompt management and evaluation interface for rapid AI experimentation and deployment.",
    tags: ["TypeScript", "Express", "Prompt Engineering"],
    href: "https://github.com/jatin-x-pal",
  },
];

const skills = [
  { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "MongoDB"] },
  { label: "AI", items: ["OpenAI API", "RAG", "Prompt Engineering"] },
  { label: "Tools", items: ["Git", "Docker", "Vercel"] },
];

const testimonials = [
  {
    quote:
      "Jatin delivers clean, scalable solutions and has a strong understanding of modern web technologies.",
    person: "Senior Developer",
  },
  {
    quote:
      "His ability to combine AI with full-stack development makes his work stand out.",
    person: "Project Mentor",
  },
];

export default function Home() {
  return (
    <div className="pb-16">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#04060bcc]/80 backdrop-blur">
        <nav className="section-shell flex h-16 items-center justify-between text-sm text-[#d5e2ff]">
          <a href="#home" className="font-semibold tracking-[0.15em] uppercase text-[#ffb56f]">
            JATIN
          </a>
          <div className="hidden gap-6 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#testimonials" className="hover:text-white">Testimonials</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      <main id="home" className="section-shell reveal pt-8 md:pt-14">
        <section className="grid items-center gap-10 rounded-3xl border border-white/10 bg-[linear-gradient(140deg,rgba(255,156,61,0.08),rgba(74,167,255,0.07))] p-6 shadow-[0_32px_90px_rgba(1,5,20,0.6)] md:grid-cols-[1.05fr_0.95fr] md:p-10">
          <div>
            <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[#ffb56f]">Portfolio 2026</p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-white md:text-6xl">
              Jatin <span className="text-[#4aa7ff]">Pal</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#c6d6f3] md:text-lg">
              I build AI-powered systems and modern web experiences.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-[#ff9c3d] px-6 py-3 text-sm font-semibold text-[#151007] transition hover:bg-[#ffb56f]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#4aa7ff] px-6 py-3 text-sm font-semibold text-[#dbe9ff] transition hover:bg-[#4aa7ff1f]"
              >
                Let&apos;s Work
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="absolute inset-0 z-10 bg-[linear-gradient(130deg,rgba(3,7,16,0.85),rgba(3,7,16,0.25)_52%,rgba(255,156,61,0.16))]" />
            <Image
              src="/hero-portrait.png"
              alt="Portrait of Jatin Pal"
              width={1400}
              height={900}
              priority
              className="h-[420px] w-full object-cover object-center md:h-[560px]"
            />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-[#ff9c3d4d] blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rounded-full bg-[#4aa7ff4d] blur-3xl" />
          </div>
        </section>

        <section id="about" className="reveal pt-20 md:pt-24">
          <h2 className="section-title">About</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#b5c4df] md:text-lg">
            I am a developer focused on building intelligent systems and high-performance web applications. I combine full-stack engineering with AI to create impactful digital products. Currently exploring scalable architectures, AI integrations, and futuristic UI experiences.
          </p>
        </section>

        <section id="projects" className="reveal pt-20 md:pt-24">
          <div className="mb-7 flex items-end justify-between gap-6">
            <h2 className="section-title">Projects</h2>
            <p className="text-sm text-[#9cb1d6]">Selected work around AI systems and modern full-stack product engineering.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="card-glow rounded-2xl p-5">
                <h3 className="text-xl font-semibold text-[#eef3ff]">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b9c8e3]">{project.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[#d8e4ff]">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/15 px-3 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm text-[#ffb56f] hover:text-[#ffd7ac]"
                >
                  Case Study -&gt;
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="reveal pt-20 md:pt-24">
          <h2 className="section-title">Skills</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <article key={group.label} className="card-glow rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-[#e8efff]">{group.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-[#bfcee9]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#4aa7ff]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="reveal pt-20 md:pt-24">
          <h2 className="section-title">Testimonials</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote key={item.person} className="card-glow rounded-2xl p-6 text-[#d9e5ff]">
                <p className="text-base leading-relaxed">&quot;{item.quote}&quot;</p>
                <footer className="mt-4 text-sm text-[#9ab1d8]">{item.person}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal pt-20 md:pt-24">
          <h2 className="section-title">Contact</h2>
          <p className="mt-4 max-w-2xl text-[#b8c8e5]">
            Have an opportunity, collaboration idea, or product challenge? Send a message and I&apos;ll get back to you.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-[0.7fr_1.3fr]">
            <aside className="card-glow rounded-2xl p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-[#9ab2db]">Direct Links</p>
              <ul className="mt-4 space-y-3 text-sm text-[#e4eeff]">
                <li>
                  <a href="mailto:jatinpaldelhi@gmail.com" className="hover:text-[#ffbf80]">jatinpaldelhi@gmail.com</a>
                </li>
                <li>
                  <a href="https://github.com/jatin-x-pal" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbf80]">
                    github.com/jatin-x-pal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/jatin-pal-112190329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ffbf80]"
                  >
                    linkedin.com/in/jatin-pal-112190329
                  </a>
                </li>
                <li>
                  <a href="https://leetcode.com/u/jatinxpal/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbf80]">
                    leetcode.com/u/jatinxpal
                  </a>
                </li>
              </ul>
            </aside>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
