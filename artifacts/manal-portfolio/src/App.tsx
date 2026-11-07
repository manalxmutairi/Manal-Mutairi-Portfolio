import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  BookOpen,
  Code2,
  GraduationCap,
  Heart,
  Leaf,
  Lightbulb,
  Mail,
  MessageCircle,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
  UsersRound,
} from 'lucide-react';
import { portfolioContent } from './content';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const skillIcons = {
  technical: Code2,
  professional: BriefcaseBusiness,
  communication: MessageCircle,
  interpersonal: UsersRound,
  problemSolving: Lightbulb,
};

const curiosityNotes = [
  'A little curiosity can change the whole shape of a day.',
  'Good questions make room for better learning.',
  'Small details are often where the best ideas begin.',
  'Make space for wonder. Then follow it somewhere new.',
];

function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('manal-portfolio-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.add('theme-transition');
    try {
      localStorage.setItem('manal-portfolio-theme', dark ? 'dark' : 'light');
    } catch {
      // Theme still works for this visit when storage is unavailable.
    }
  }, [dark]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !email || !message) {
      setFormMessage('Please complete each field before continuing.');
      return;
    }
    const subject = encodeURIComponent(`A note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    setFormMessage('Your email app should open with a draft addressed to Manal. Nothing has been sent yet.');
    window.location.href = `mailto:${portfolioContent.email}?subject=${subject}&body=${body}`;
  };

  const handleNavClick = () => setMenuOpen(false);

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-card focus:px-5 focus:py-3">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <a href="#home" aria-label={`${portfolioContent.name}, back to top`} className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-round text-sm font-extrabold transition-transform group-hover:rotate-[-8deg]">{portfolioContent.initials}</span>
            <span className="font-round text-[15px] font-extrabold tracking-tight">{portfolioContent.name}</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link text-[13px] font-semibold text-muted-foreground">{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="button-theme-toggle"
              onClick={() => setDark((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-muted"
              aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
              title={`Switch to ${dark ? 'light' : 'dark'} theme`}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              data-testid="button-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="mobile-nav border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-xl flex-col">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={handleNavClick} className="rounded-xl px-3 py-3 font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section id="home" className="relative isolate">
          <div className="page-shell grid min-h-[690px] items-center gap-10 py-16 md:min-h-[760px] md:grid-cols-[1.12fr_.88fr] md:py-20">
            <div className="relative z-10">
              <p className="eyebrow reveal flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> {portfolioContent.location} · Class of {portfolioContent.graduationYear}</p>
              <h1 className="font-round reveal reveal-delay-1 mt-7 max-w-[760px] text-[clamp(3.7rem,9vw,7.6rem)] font-black leading-[.86] tracking-[-.085em]">
                {portfolioContent.hero.titleStart} <span className="font-editorial font-medium italic tracking-[-.07em] text-primary">{portfolioContent.hero.titleAccent}</span> {portfolioContent.hero.titleEnd}
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-[490px] text-lg leading-8 text-muted-foreground md:text-xl">
                {portfolioContent.hero.introduction}
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-4">
                <a href="#about" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 font-bold text-primary-foreground transition hover:-translate-y-1">
                  A little about me <ArrowDown size={16} />
                </a>
                <a href="#contact" className="inline-flex min-h-12 items-center gap-2 px-3 font-bold text-foreground transition hover:text-primary">
                  Say hello <ArrowDownRight size={17} />
                </a>
              </div>
              <div className="mt-14 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> {portfolioContent.hero.signoff}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[470px] md:mr-0">
              <div className="absolute -right-5 -top-7 h-32 w-32 rounded-full bg-secondary/80 md:-right-2" />
              <div className="absolute -bottom-4 -left-3 h-24 w-24 rounded-full border border-accent/70" />
              <div className="soft-grid relative flex aspect-[.94] flex-col justify-between overflow-hidden rounded-[48%_48%_38%_38%/42%_42%_32%_32%] border border-border bg-card p-8 shadow-[var(--shadow)] md:p-10">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-border bg-background/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[.15em]">A new chapter</span>
                  <Leaf className="leaf-mark text-primary" size={28} strokeWidth={1.5} />
                </div>
                <div className="relative z-10 -mt-3">
                  <div className="mb-4 flex items-center gap-2 text-primary"><span className="h-px w-8 bg-primary" /><span className="eyebrow">{portfolioContent.field} · {portfolioContent.university}</span></div>
                  <p className="font-round text-5xl font-black leading-[.95] tracking-[-.07em] md:text-6xl">Rooted in<br />care.</p>
                  <p className="mt-5 max-w-[250px] text-sm leading-6 text-muted-foreground">Growing toward a future where every learner feels seen.</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-editorial text-6xl italic text-accent">’{portfolioContent.graduationYear.slice(-2)}</span>
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles size={22} /></div>
                </div>
              </div>
              <span className="absolute -right-2 top-1/2 rotate-90 text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground md:-right-8">Made with intention</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        </section>

        <section id="about" className="section-pad">
          <div className="page-shell grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-20">
            <div>
              <p className="eyebrow">01 / A little context</p>
              <h2 className="section-title mt-5">Hello,<br /><span className="font-editorial font-medium italic text-primary">I’m Manal.</span></h2>
              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground"><Leaf size={17} /></span>
                  {portfolioContent.university} · {portfolioContent.graduationYear}
              </div>
            </div>
            <div className="pt-1 md:pt-12">
              <p className="max-w-2xl text-[1.2rem] leading-[1.8] text-foreground/90 md:text-[1.45rem]">
                {portfolioContent.about.background}
              </p>
              <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
                {portfolioContent.about.aspirations}
              </p>
              <div className="mt-10 rounded-[28px] border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-secondary-foreground"><Heart size={18} /></span>
                  <div>
                    <p className="font-round font-extrabold">Ideas I’m curious about</p>
                    <p className="text-xs text-muted-foreground">Professional interests that keep me exploring.</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {portfolioContent.interests.map((interest) => (
                    <span key={interest} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad bg-secondary/45">
          <div className="page-shell">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">02 / Things I’m building</p>
                <h2 className="section-title mt-5 max-w-2xl">A toolkit, still<br /><span className="font-editorial font-medium italic text-primary">in progress.</span></h2>
              </div>
              <p className="max-w-sm pb-2 leading-7 text-muted-foreground">A good educator keeps learning, too. These are editable examples for Manal to replace with confirmed skills.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {portfolioContent.skills.map((group, groupIndex) => {
                const Icon = skillIcons[group.icon];
                return (
                  <article key={group.title} className="lift rounded-[26px] border border-border bg-card p-6 md:p-7">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><Icon size={21} strokeWidth={1.8} /></span>
                      <span className="font-editorial text-3xl italic text-accent">0{groupIndex + 1}</span>
                    </div>
                    <h3 className="mt-7 font-round text-xl font-extrabold tracking-tight">{group.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Example prompts — please edit</p>
                    <div className="mt-6 space-y-4">
                      {group.examples.map((example, index) => (
                        <div key={example}>
                          <div className="mb-2 flex justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">{example}</span>
                            <span aria-hidden="true" className="text-accent">＋</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                            <div className="skill-fill h-full rounded-full bg-primary/55" style={{ width: `${62 + index * 13 + groupIndex * 4}%`, animationDelay: `${groupIndex * 130 + index * 100}ms` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 border-t border-border pt-4 text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground">Examples only · no proficiency implied</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-dashed border-primary/40 px-5 py-4 text-sm text-muted-foreground">
              <span className="mt-0.5 text-primary"><Sparkles size={17} /></span>
              <p><strong className="text-foreground">A note for editing:</strong> replace the example labels with skills Manal can personally confirm; adjust or remove the decorative bars as needed.</p>
            </div>
          </div>
        </section>

        <section id="education" className="section-pad">
          <div className="page-shell grid gap-12 md:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="eyebrow">03 / The foundation</p>
              <h2 className="section-title mt-5">Where the<br /><span className="font-editorial font-medium italic text-primary">roots began.</span></h2>
            </div>
            <article className="relative mt-3 overflow-hidden rounded-[34px] bg-primary p-7 text-primary-foreground md:p-11">
              <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full border border-primary-foreground/15" />
              <div className="absolute -right-3 -top-3 h-36 w-36 rounded-full border border-primary-foreground/15" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-foreground/10"><GraduationCap size={23} /></span>
                <span className="rounded-full border border-primary-foreground/30 px-4 py-2 text-xs font-bold uppercase tracking-[.14em]">Graduated · {portfolioContent.graduationYear}</span>
                </div>
                <p className="mt-10 text-xs font-bold uppercase tracking-[.18em] text-primary-foreground/70">{portfolioContent.degree}</p>
                <h3 className="font-round mt-2 max-w-xl text-3xl font-extrabold leading-tight tracking-[-.04em] md:text-5xl">{portfolioContent.field}</h3>
                <p className="mt-4 text-lg text-primary-foreground/80">{portfolioContent.university}</p>
                <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-primary-foreground/20 pt-6">
                  <span className="font-editorial text-4xl italic">{portfolioContent.gpa}</span>
                  <span className="text-sm text-primary-foreground/75">GPA</span>
                  <span className="mx-1 h-6 w-px bg-primary-foreground/25" />
                  <span className="text-sm text-primary-foreground/75">A foundation in education, completed in {portfolioContent.graduationYear}.</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="experience" className="section-pad bg-[#e9e2d2] text-[#283c30] dark:bg-[#26372e] dark:text-[#f1ead8]">
          <div className="page-shell grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <div>
              <p className="eyebrow">04 / Learning in practice</p>
              <h2 className="section-title mt-5">The next<br /><span className="font-editorial font-medium italic text-primary">chapter.</span></h2>
              <p className="mt-6 max-w-sm leading-7 opacity-75">{portfolioContent.experience.introduction}</p>
            </div>
            <article className="rounded-[30px] border border-[#526858]/25 bg-background/60 p-7 md:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-primary"><BookOpen size={20} /></span>
                <span className="eyebrow">Experience & practical training</span>
              </div>
              <h3 className="font-round mt-7 text-2xl font-extrabold tracking-tight">A place for the work behind the learning.</h3>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{portfolioContent.experience.description}</p>
              <div className="mt-7 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[.14em] text-primary">Editable example fields</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{portfolioContent.experience.editableFields}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="py-12">
          <div className="page-shell">
            <div className="relative overflow-hidden rounded-[32px] border border-border bg-card px-6 py-8 md:flex md:items-center md:justify-between md:px-10">
              <div className="absolute -right-8 -top-16 h-44 w-44 rounded-full border border-accent/30" />
              <div className="relative flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Sparkles size={20} /></span>
                <div>
                  <p className="eyebrow">A small pause</p>
                  <p className="font-editorial mt-1 text-xl italic md:text-2xl" aria-live="polite">{curiosityNotes[noteIndex]}</p>
                </div>
              </div>
              <button type="button" data-testid="button-curiosity-note" onClick={() => setNoteIndex((index) => (index + 1) % curiosityNotes.length)} className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold transition hover:bg-muted md:mt-0">
                Another thought <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad">
          <div className="page-shell grid gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-20">
            <div>
              <p className="eyebrow">05 / Let’s connect</p>
              <h2 className="section-title mt-5">Have a good<br /><span className="font-editorial font-medium italic text-primary">question?</span></h2>
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">I’d be glad to hear from you. A thoughtful note is always a good place to start.</p>
              <a data-testid="link-direct-email" href={`mailto:${portfolioContent.email}`} className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-1">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary"><Mail size={18} /></span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[.14em] text-muted-foreground">Write directly</span>
                  <span className="font-semibold group-hover:text-primary">{portfolioContent.email}</span>
                </span>
                <ArrowDownRight size={17} className="ml-2 text-primary" />
              </a>
              <div className="mt-5">
                <p className="eyebrow">Find me online</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {portfolioContent.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground">These links open the platforms. Replace their destinations in the socialLinks list with personal profile URLs before sharing.</p>
              </div>
            </div>
            <form onSubmit={onSubmit} className="rounded-[30px] border border-border bg-card p-6 shadow-[var(--shadow)] md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Your name</span>
                  <input data-testid="input-contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm placeholder:text-muted-foreground/70" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Email address</span>
                  <input data-testid="input-contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm placeholder:text-muted-foreground/70" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-bold">Your message</span>
                <textarea data-testid="input-contact-message" name="message" required minLength={5} maxLength={4000} rows={5} placeholder="A question, an idea, or just hello…" className="w-full resize-y rounded-2xl border border-input bg-background px-4 py-3.5 text-sm placeholder:text-muted-foreground/70" />
              </label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" data-testid="button-contact-submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground transition hover:-translate-y-1">
                  Open email draft <Send size={15} />
                </button>
                <span className="max-w-[230px] text-xs leading-5 text-muted-foreground">This opens your email app with a draft. You’ll review and send it yourself.</span>
              </div>
              {formMessage && <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-secondary/70 px-4 py-3 text-sm text-foreground">{formMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="page-shell flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="inline-flex items-center gap-2 font-round font-extrabold text-foreground"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{portfolioContent.initials}</span> {portfolioContent.name}</a>
          <p>{portfolioContent.field} graduate · {portfolioContent.university} · {portfolioContent.graduationYear}</p>
          <a href="#home" className="inline-flex items-center gap-2 font-semibold hover:text-primary">Back to top <ArrowDown className="rotate-180" size={14} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
