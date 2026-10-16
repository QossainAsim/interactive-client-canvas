import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Asterisk,
  Check,
  Menu,
  X,
  Plus,
  Minus,
  Code2,
  ShoppingBag,
  MousePointer2,
  Search,
  Megaphone,
  TrendingUp,
  Sparkles,
  Compass,
  Layers3,
  Rocket,
  Pause,
  Play,
  Mail,
  MessageCircle,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/lib/portfolio";
import { getSiteMetadata } from "@/lib/site.functions";
import { ProjectPreview } from "@/components/project-preview";
import { Testimonials } from "@/components/testimonials";

const formEndpoint = "https://formspree.io/f/mrperdvl";

const services = [
  {
    name: "Conversion-focused websites",
    text: "Turn a first impression into the next conversation. Fast, distinctive websites with a clear path from curiosity to enquiry.",
    icon: MousePointer2,
    tags: "Strategy / Design / Development",
  },
  {
    name: "Custom web & app development",
    text: "Your idea, without the template limitations. Thoughtful web experiences and applications shaped around your business.",
    icon: Code2,
    tags: "Web apps / Interfaces / Custom builds",
  },
  {
    name: "E-commerce that sells",
    text: "Make finding, loving, and buying your products feel effortless. Beautiful storefronts with customer-first shopping journeys.",
    icon: ShoppingBag,
    tags: "Storefronts / Product pages / Checkout",
  },
  {
    name: "Social media advertising",
    text: "Get in front of the right people with creative that earns attention and campaigns built around your business goals.",
    icon: Megaphone,
    tags: "Creative / Campaigns / Optimization",
  },
  {
    name: "Search engine optimization",
    text: "Help the right customers find you. Technical foundations, useful content, and a search strategy built for the long game.",
    icon: Search,
    tags: "Technical SEO / Content / Search strategy",
  },
  {
    name: "Business growth strategy",
    text: "Connect your website, marketing, and customer journey. Find the friction, focus your efforts, and build a clearer route to growth.",
    icon: TrendingUp,
    tags: "Positioning / Customer journeys / Growth",
  },
];
const faqs = [
  [
    "What can Forthmotive help my business with?",
    "From a new conversion-focused website to a custom web app, e-commerce store, social media campaigns, or SEO, we bring design and growth together. Tell us what your business needs and we’ll help define the right scope.",
  ],
  [
    "How much will my project cost?",
    "Every project has a different scope. After learning about your goals, the pages or features you need, and your timeline, we’ll put together a tailored proposal. No made-up packages or one-size-fits-all pricing.",
  ],
  [
    "How long does a website take?",
    "Timing depends on the project’s size, functionality, and how ready your content is. We agree on milestones and a realistic delivery schedule before the work begins.",
  ],
  [
    "Can you improve my existing website?",
    "Yes. We can review your existing design, customer journey, performance, and search foundations, then recommend focused improvements or a rebuild where it makes sense.",
  ],
  [
    "Can you guarantee the top spot on Google?",
    "No reputable SEO service can guarantee a number-one ranking. We focus on sound technical SEO, relevant content, and a useful experience. Rankings also depend on competition, authority, and changes to search engines.",
  ],
  [
    "Can I explore the portfolio without leaving this page?",
    "Yes. Most projects open in an instant, scrollable mobile preview. When a capture is unavailable, you can still open the original website in a new tab.",
  ],
];
export const Route = createFileRoute("/")({
  component: Index,
  loader: () => getSiteMetadata(),
  head: ({ loaderData }) => {
    const canonicalUrl = new URL("/", loaderData!.siteUrl).toString();
    const socialImageUrl = new URL("/og-image.png", loaderData!.siteUrl).toString();
    const title = "Forthmotive — Conversion-Focused Websites & Digital Growth";
    const description =
      "Forthmotive creates conversion-focused websites, custom web apps and e-commerce stores, alongside social media advertising, SEO and business growth strategy.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: "Forthmotive — Made with intent. Built for momentum." },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: socialImageUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Forthmotive — Made with intent. Built for momentum.",
        },
        { property: "og:locale", content: "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Forthmotive — Made with intent. Built for momentum." },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: socialImageUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Forthmotive",
            url: canonicalUrl,
            image: socialImageUrl,
            description,
            email: "qossainawais@gmail.com",
            sameAs: ["https://www.linkedin.com/in/qossain-awais"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Digital design and growth services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: service.name, description: service.text },
              })),
            },
          }),
        },
      ],
    };
  },
});
function PortfolioCard({
  project,
  onSelect,
  clone = false,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  clone?: boolean;
}) {
  const previewIssue =
    project.previewIssue === "unavailable"
      ? "Original site unavailable"
      : project.previewIssue === "not-found"
        ? "Original site returned 404"
        : project.previewIssue === "capture-unavailable"
          ? "Instant preview unavailable"
          : null;
  const content = (
    <>
      {project.image ? (
        <img
          src={project.image}
          loading="lazy"
          decoding="async"
          width={project.imageWidth}
          height={project.imageHeight}
          alt={`${project.name} website preview — ${project.industry}`}
        />
      ) : (
        <span className="portfolio-card-fallback" aria-hidden="true">
          <span>Live site</span>
        </span>
      )}
      <span className="portfolio-card-shade" aria-hidden="true" />
      {previewIssue && (
        <span className="portfolio-card-status">
          <strong>{previewIssue}</strong>
          <span>
            {project.live
              ? "Open the original website from the project preview."
              : "The original website is currently unavailable."}
          </span>
        </span>
      )}
      <span className="portfolio-card-copy">
        <span className="portfolio-card-type">{project.category}</span>
        <strong>{project.name}</strong>
        <span>{project.industry}</span>
        <span className="portfolio-card-action">
          View project <ArrowUpRight size={15} />
        </span>
      </span>
    </>
  );
  return (
    <article
      className={`portfolio-card-wrap project-${project.slug}${clone ? " portfolio-card-wrap--clone" : ""}`}
    >
      <div className="portfolio-card" aria-hidden={clone ? true : undefined}>
        {content}
      </div>
      {!clone && (
        <Button
          className="portfolio-card-hitarea"
          variant="ghost"
          onClick={() => onSelect(project)}
          aria-label={`Open ${project.name} project preview`}
        />
      )}
    </article>
  );
}
const processSteps = [
  {
    title: "Discover",
    text: "We get to know your business, your customers, and what success actually looks like.",
    icon: Compass,
  },
  {
    title: "Create",
    text: "Strategy becomes structure. Structure becomes a distinctive experience with purpose.",
    icon: Layers3,
  },
  {
    title: "Build",
    text: "We develop, test, and refine the details that make your website work beautifully.",
    icon: Code2,
  },
  {
    title: "Move forward",
    text: "Launch is a beginning. We identify next steps for your visibility and customer journey.",
    icon: Rocket,
  },
];
const whyForthmotive = [
  {
    label: "Small team",
    title: "Work directly with us",
    text: "Your project stays close to the people responsible for its strategy, design, and development.",
  },
  {
    label: "Clear process",
    title: "Know what happens next",
    text: "We agree the scope, milestones, and responsibilities before work begins, then keep you updated throughout.",
  },
  {
    label: "Tailored work",
    title: "Made for your business",
    text: "We start with your goals, customers, and constraints instead of forcing your project into a fixed template.",
  },
  {
    label: "After launch",
    title: "Ready for the next step",
    text: "You receive a clear handover and practical recommendations for improving visibility, performance, and growth.",
  },
];
function ApproachTimeline() {
  return (
    <section id="approach" className="approach-timeline section-shell reveal">
      <div className="timeline-intro">
        <div>
          <span className="eyebrow">04 / HOW WE GET THERE</span>
          <h2>
            Small studio.
            <br />
            <span>Big-picture thinking.</span>
          </h2>
        </div>
        <p>
          Less back-and-forth. More moving forward.
          <br />
          You’re part of the process, not outside it.
        </p>
      </div>
      <div className="process-timeline" aria-label="Four stages of the Forthmotive process">
        <div className="process-progress" aria-hidden="true">
          <span className="process-progress-fill" />
          <span className="process-progress-runner" />
        </div>
        <div className="timeline-grid">
          {processSteps.map((step, index) => (
            <article className={`timeline-step timeline-step-${index + 1}`} key={step.title}>
              <div className="timeline-node" aria-hidden="true">
                <span>
                  <step.icon size={18} />
                </span>
              </div>
              <div className="timeline-card">
                <span className="timeline-number">0{index + 1}</span>
                <h3>
                  {step.title}
                  <ArrowUpRight size={18} />
                </h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="timeline-commitment">
        <div className="timeline-commitment-mark" aria-hidden="true">
          <Asterisk />
        </div>
        <h3>
          A partner in your corner.
          <br />
          <span>Not another name in your inbox.</span>
        </h3>
        <div>
          {["Direct communication", "A clear, agreed scope", "Design with business intent"].map(
            (t) => (
              <span key={t}>
                <Check size={16} />
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
function Index() {
  const [project, setProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All work");
  const [faq, setFaq] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [service, setService] = useState("Website development");
  const [draft, setDraft] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error" | "rate-limited"
  >("idle");
  const [servicesPaused, setServicesPaused] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.target.classList.contains("approach-timeline")) {
            entry.target.classList.toggle("is-visible", entry.isIntersecting);
          } else if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const sections = ["services", "work", "approach", "testimonials", "faq", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setActiveSection(id);
    setMenu(false);
  };
  const filtered = projects.filter((p) => filter === "All work" || p.category === filter);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = `Hi Forthmotive,\n\nI'm ${name}.\nEmail: ${email}\nInterested in: ${service}\n\n${message}\n\nLet's talk.`;
    const url = `mailto:qossainawais@gmail.com?subject=${encodeURIComponent(`New project enquiry — ${service}`)}&body=${encodeURIComponent(body)}`;
    setDraft(url);
    setFormStatus("sending");
    data.set("service", service);
    data.set("subject", `New project enquiry — ${service}`);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.status === 429) {
        setFormStatus("rate-limited");
        return;
      }
      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }
      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Project enquiry submission failed:", error);
      setFormStatus("error");
    }
  };
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Forthmotive home">
          Forthmotive
        </a>
        <nav aria-label="Main navigation" className={menu ? "nav-open" : ""}>
          {(
            [
              ["Services", "services"],
              ["Selected work", "work"],
              ["The approach", "approach"],
              ["Client stories", "testimonials"],
              ["FAQs", "faq"],
            ] as const
          ).map(([label, id], index) => (
            <Button
              variant="ghost"
              className="nav-link"
              key={id}
              onClick={() => go(id)}
              aria-current={activeSection === id ? "location" : undefined}
              style={{ "--nav-index": index } as CSSProperties}
            >
              <span className="nav-link-label">{label}</span>
              <span className="nav-link-dot" aria-hidden="true" />
            </Button>
          ))}
        </nav>
        <Button className="nav-cta" onClick={() => go("contact")}>
          Let’s talk <ArrowUpRight />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </Button>
      </header>
      <main>
        <section className="hero" id="top">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="status-dot" /> INDEPENDENT DIGITAL DESIGN & GROWTH STUDIO
            </div>
            <h1>
              <span className="sr-only">Forthmotive — </span>Beautiful
              <br />
              websites.
              <br />
              <span className="outline-type">Serious</span> business
              <span className="lime-dot">.</span>
            </h1>
            <p>
              We turn ambitious brands into unmissable digital
              <br className="desktop-break" /> experiences. Built to look good. Designed to convert.
            </p>
            <div className="hero-actions">
              <Button className="pill-cta" onClick={() => go("contact")}>
                Let’s build something <ArrowUpRight />
              </Button>
              <Button className="text-cta" variant="ghost" onClick={() => go("work")}>
                Explore our work <ArrowDown />
              </Button>
            </div>
            <div className="hero-bottom">
              <span>
                <span className="status-dot" /> OPEN FOR GOOD PROJECTS
              </span>
              <span>MADE WITH INTENT. BUILT FOR MOMENTUM.</span>
            </div>
          </div>
        </section>
        <div
          className={`service-marquee ${servicesPaused ? "is-paused" : ""}`}
          aria-label="Services Forthmotive provides"
        >
          <div className="service-marquee-track">
            {[0, 1].map((setIndex) => (
              <div className="service-marquee-set" aria-hidden={setIndex === 1} key={setIndex}>
                {services.map((item) => (
                  <span key={`${setIndex}-${item.name}`}>
                    <Asterisk aria-hidden="true" />
                    <b>{item.name}</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="service-marquee-control"
            onClick={() => setServicesPaused((value) => !value)}
            aria-label={servicesPaused ? "Play services animation" : "Pause services animation"}
          >
            {servicesPaused ? <Play /> : <Pause />}
          </Button>
        </div>
        <section id="big-picture" className="why-us section-shell reveal">
          <div className="why-us-heading">
            <span className="eyebrow">01 / WHY FORTHMOTIVE</span>
            <h2>
              Why work
              <br />
              with us<span>?</span>
            </h2>
            <p>
              A focused team, a clear process, and work shaped around how your business actually
              operates.
            </p>
          </div>
          <div className="why-us-panel">
            {whyForthmotive.map((item, index) => (
              <article className="why-us-card" key={item.label}>
                <span className="why-us-number">0{index + 1}</span>
                <strong>{item.label}</strong>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="why-us-foot">
            <div>
              <span>
                <Check size={16} /> Direct access to the team
              </span>
              <span>
                <Check size={16} /> Clear scope and regular updates
              </span>
            </div>
            <Button variant="ghost" onClick={() => go("services")}>
              Explore our services <ArrowUpRight />
            </Button>
          </div>
        </section>
        <section id="services" className="services section-shell">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">02 / WHAT WE DO</span>
              <h2>
                Good looks.
                <br />
                Even better outcomes.
              </h2>
            </div>
            <p>
              From your first click to your next customer.
              <br />A connected set of services, one clear ambition.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <article className="service-item reveal" key={s.name}>
                <div className="service-top">
                  <span>0{i + 1}</span>
                  <s.icon size={25} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <div className="service-bottom">
                  <span>{s.tags}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Enquire about ${s.name}`}
                    onClick={() => {
                      setService(s.name);
                      go("contact");
                    }}
                  >
                    <ArrowUpRight />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="work" className="work section-shell">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">03 / SELECTED WORK</span>
              <h2>
                Proof, not promises<span className="lime-dot">.</span>
              </h2>
            </div>
            <p>
              A few different worlds.
              <br />
              The same attention to every detail.
            </p>
          </div>
          <div className="work-filters" role="group" aria-label="Filter portfolio">
            {["All work", "Websites", "E-commerce"].map((f) => (
              <Button
                key={f}
                variant="ghost"
                className={filter === f ? "filter-active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
                {f === "All work" && <span>{projects.length}</span>}
              </Button>
            ))}
          </div>
          <div className="project-rail" aria-label="Selected project previews">
            <div
              className="project-track"
              key={filter}
              style={
                {
                  "--rail-duration": `${Math.max(80, filtered.length * 13)}s`,
                  "--rail-duration-mobile": `${Math.max(60, filtered.length * 9)}s`,
                } as React.CSSProperties
              }
            >
              <div className="project-rail-set">
                {filtered.map((p) => (
                  <PortfolioCard key={p.slug} project={p} onSelect={setProject} />
                ))}
              </div>
              <div className="project-rail-set" aria-hidden="true">
                {filtered.map((p) => (
                  <PortfolioCard key={`${p.slug}-clone`} project={p} onSelect={setProject} clone />
                ))}
              </div>
            </div>
          </div>
        </section>
        <ApproachTimeline />
        <Testimonials />
        <section id="faq" className="faq section-shell">
          <div className="faq-heading reveal">
            <span className="eyebrow">06 / A FEW GOOD QUESTIONS</span>
            <h2>
              Let’s clear
              <br />
              things up.
            </h2>
            <p>Still have something on your mind?</p>
            <Button variant="link" onClick={() => go("contact")}>
              Ask us directly <ArrowUpRight />
            </Button>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <Button
                  variant="ghost"
                  aria-expanded={faq === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  <span>{question}</span>
                  {faq === i ? <Minus /> : <Plus />}
                </Button>
                <div id={`faq-${i}`} className={`faq-answer ${faq === i ? "answer-open" : ""}`}>
                  <div>
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact section-shell">
          <div className="contact-motion" aria-hidden="true">
            <span className="contact-orb contact-orb-one" />
            <span className="contact-orb contact-orb-two" />
            <span className="contact-ring contact-ring-one" />
            <span className="contact-ring contact-ring-two" />
            <span className="contact-beam" />
          </div>
          <div className="contact-copy">
            <span className="eyebrow">07 / YOUR NEXT CHAPTER</span>
            <h2>
              Have a good
              <br />
              feeling about
              <br />
              this<span>?</span>
            </h2>
            <p>
              Tell us a little about what you’re building.
              <br />
              Let’s see what we can make happen.
            </p>
            <div className="contact-steps">
              {["Share your goal", "Get a tailored reply", "Start with a clear plan"].map(
                (item, index) => (
                  <span key={item}>
                    <b>0{index + 1}</b>
                    {item}
                  </span>
                ),
              )}
            </div>
            <div className="contact-links">
              <a className="contact-email" href="mailto:qossainawais@gmail.com">
                <Mail size={18} aria-hidden="true" />
                <span>qossainawais@gmail.com</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                className="contact-whatsapp"
                href="https://wa.me/923114897893"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>WhatsApp</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                className="contact-linkedin"
                href="https://www.linkedin.com/in/qossain-awais"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={18} aria-hidden="true" />
                <span>LinkedIn · Qossain Awais</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-footnote">
              <span className="status-dot" /> REAL CONVERSATIONS. NO PRESSURE.
            </div>
          </div>
          <form action={formEndpoint} method="POST" onSubmit={submit} className="contact-form">
            <div className="contact-form-head">
              <span>
                <Sparkles size={16} /> Project enquiry form
              </span>
              <small>
                <i /> Replies within 1–2 business days
              </small>
            </div>
            <div className="form-row">
              <label>
                <span>Your name</span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Alex, for example"
                  maxLength={100}
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  maxLength={200}
                />
              </label>
            </div>
            <label className="form-honeypot" aria-hidden="true">
              Website
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
            <fieldset>
              <legend>I’m interested in...</legend>
              <div className="service-choices">
                {[
                  "Website development",
                  "E-commerce",
                  "Web / app development",
                  "SEO",
                  "Social media ads",
                  "Growth strategy",
                ].map((s) => (
                  <Button
                    type="button"
                    key={s}
                    variant="outline"
                    aria-pressed={service === s}
                    className={service === s ? "choice-selected" : ""}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </fieldset>
            <label>
              <span>A little about your project</span>
              <textarea
                name="message"
                required
                minLength={10}
                placeholder="The idea, the ambition, the thing keeping you up at night..."
                rows={4}
                maxLength={4000}
              />
            </label>
            <Button
              type="submit"
              className="form-submit"
              disabled={formStatus === "sending"}
              aria-busy={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending your enquiry…" : "Let’s start a conversation"}{" "}
              <ArrowUpRight />
            </Button>
            <p className="form-note">
              We’ll confirm when your enquiry is submitted. Prefer email?{" "}
              <a href={draft || "mailto:qossainawais@gmail.com"}>Open a draft instead.</a>
            </p>
            {formStatus === "success" && (
              <p className="form-status form-status-success" role="status">
                Thanks — your enquiry has been submitted. We’ll reply within 1–2 business days.
              </p>
            )}
            {formStatus === "rate-limited" && (
              <p className="form-status form-status-error" role="alert">
                Too many submissions right now. Please wait a minute and try again, or{" "}
                <a href={draft}>open your email draft</a>.
              </p>
            )}
            {formStatus === "error" && (
              <p className="form-status form-status-error" role="alert">
                We couldn’t submit that just now. <a href={draft}>Open your email draft</a> so your
                message isn’t lost.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div>
          <a className="wordmark" href="#top">
            Forthmotive
          </a>
          <p>A little different. A lot more intentional.</p>
        </div>
        <span>© {new Date().getFullYear()} Forthmotive</span>
        <Button variant="ghost" onClick={() => go("top")}>
          Back to top <ArrowUpRight />
        </Button>
      </footer>
      <ProjectPreview project={project} onClose={() => setProject(null)} />
    </>
  );
}
