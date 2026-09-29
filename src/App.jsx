import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const projects = [
  {
    id: 'urbanmind', number: '01', name: 'UrbanMind', category: 'Urban intelligence', year: '2026',
    short: 'From public data to a reasoned urban proposal and a 3D digital twin.',
    role: 'Analysis dashboards · scoring · 3D building footprints · existing-city integration',
    stack: 'Python / FastAPI / React / geospatial data / React Three Fiber',
    source: 'https://github.com/inesCherif/Khatatli_UrbanTwin',
    live: 'https://khatatli-urban-twin.vercel.app/',
    detail: 'Our team brought terrain data, regulations, feasibility analysis, and a 3D twin into one urban planning workflow.',
    noteLabel: 'My contribution',
    proof: [
      { label: 'Analysis + 3D work', url: 'https://github.com/inesCherif/Khatatli_UrbanTwin/pull/24' },
      { label: 'Existing-city integration', url: 'https://github.com/inesCherif/Khatatli_UrbanTwin/pull/37' }
    ],
    nodes: [
      { label: 'PUBLIC DATA', x: 80, y: 150 }, { label: 'ANALYSIS', x: 255, y: 80 },
      { label: 'FEASIBILITY', x: 255, y: 220 }, { label: '3D TWIN', x: 445, y: 150 }
    ], edges: [[0, 1], [0, 2], [1, 3], [2, 3]],
    architecture: [
      { title: 'Define the site', modules: ['Project brief', 'Parcel on map', 'Uploaded documents'], detail: 'The brief and mapped terrain establish what the project is trying to build and where.' },
      { title: 'Build the evidence', modules: ['20 public-data collectors', 'Regulation RAG', 'Feasibility study'], detail: 'Public datasets and cited planning rules feed analysis, scoring, and an eight-chapter feasibility study.' },
      { title: 'Design the proposal', modules: ['LangGraph + Mistral', 'Deterministic geometry', '2D master plan'], detail: 'Agents propose design parameters; deterministic Python produces the numerical results and geometry.' },
      { title: 'Explore & export', modules: ['Leaflet map', 'React Three Fiber twin', 'PDF / DXF / GeoJSON'], detail: 'The outcome is explorable in 2D and 3D, with formats that can move into planning workflows.' }
    ]
  },
  {
    id: 'syntern', number: '02', name: 'Syntern', category: 'Multi-agent simulation', year: '2026',
    short: 'A simulated remote internship with four AI colleagues and feedback on the work.',
    role: 'A team-built training experience · 2nd place at TBS Atlas',
    stack: 'React / n8n / Supabase / ElevenLabs',
    source: 'https://github.com/azizhraghi/stagi',
    detail: 'Students work through a simulated remote internship with four AI colleagues, a Kanban board, voice calls, and feedback on how they worked.',
    noteLabel: 'Context',
    proof: [],
    nodes: [
      { label: 'STUDENT', x: 78, y: 150 }, { label: 'MANAGER', x: 245, y: 55 },
      { label: 'TECH LEAD', x: 245, y: 118 }, { label: 'CLIENT', x: 245, y: 182 },
      { label: 'SENIOR', x: 245, y: 245 }, { label: 'FEEDBACK', x: 455, y: 150 }
    ], edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 5], [4, 5]],
    architecture: [
      { title: 'Enter the workspace', modules: ['React interface', 'Kanban tasks', 'Team messages'], detail: 'A student starts a simulated internship, then works through tasks and conversations in one workspace.' },
      { title: 'Trigger the scenario', modules: ['n8n webhooks', 'Timed events', 'Escalations'], detail: 'Workflow automation routes messages, starts sessions, and advances the scenario when deadlines or silence matter.' },
      { title: 'Meet the team', modules: ['Claude API', 'Four AI personas', 'Role-specific replies'], detail: 'A manager, tech lead, client, and senior intern respond with distinct responsibilities and expectations.' },
      { title: 'Evaluate the work', modules: ['Supabase sessions', 'Behavioral scoring', 'Report + badge'], detail: 'Session activity and messages feed an evaluation of communication, initiative, prioritization, and delivery.' }
    ]
  },
  {
    id: 'groov', number: '03', name: 'GROOV', category: 'Learning / RAG', year: '2026',
    short: 'Six AI study personas teach from uploaded course PDFs, grounded in retrieved pages.',
    role: 'Local-model study room with distinct voices',
    stack: 'FastAPI / Ollama / FAISS / Edge TTS',
    source: 'https://github.com/azizhraghi/groov',
    detail: 'Uploaded course PDFs become a study room. Retrieval keeps answers grounded in source pages, while six personas and distinct voices make the discussion feel alive.',
    noteLabel: 'Approach',
    proof: [],
    nodes: [
      { label: 'COURSE PDF', x: 80, y: 150 }, { label: 'RETRIEVAL', x: 255, y: 150 },
      { label: '6 PERSONAS', x: 445, y: 90 }, { label: 'VOICE', x: 445, y: 210 }
    ], edges: [[0, 1], [1, 2], [1, 3]],
    architecture: [
      { title: 'Ingest material', modules: ['Course PDFs', 'PyPDF2 parsing', 'Text chunks'], detail: 'Uploaded study material is parsed and split into smaller passages that can be retrieved later.' },
      { title: 'Ground the answer', modules: ['Sentence Transformers', 'FAISS index', 'Relevant passages'], detail: 'Embeddings and vector search select source context for each study question.' },
      { title: 'Run the study room', modules: ['FastAPI session', 'Ollama local LLM', 'Six personas'], detail: 'The backend manages conversation history and distinct prompts so multiple study personas can explain and debate.' },
      { title: 'Speak & respond', modules: ['Edge TTS', 'Distinct voices', 'Web interface'], detail: 'Text responses become spoken contributions, giving each persona a recognizable voice in the study session.' }
    ]
  },
  {
    id: 'agentichire', number: '04', name: 'AgenticHire', category: 'Recruitment / agents', year: '2026',
    short: 'Two sides of hiring routed through specialized agent workflows.',
    role: 'Team platform · 3rd place at NerdData ENSI',
    stack: 'FastAPI / React / Mistral AI',
    source: 'https://github.com/azizhraghi/agentic_hire',
    detail: 'A team-built platform routes candidates and recruiters into different workflows for matching, CV analysis, and recruitment tasks.',
    noteLabel: 'Context',
    proof: [],
    nodes: [
      { label: 'CANDIDATE', x: 80, y: 90 }, { label: 'RECRUITER', x: 80, y: 210 },
      { label: '12 AGENTS', x: 265, y: 150 }, { label: 'MATCHING', x: 445, y: 150 }
    ], edges: [[0, 2], [1, 2], [2, 3]],
    architecture: [
      { title: 'Start the conversation', modules: ['React chat interface', 'Candidate / recruiter', 'Role detection'], detail: 'The interface identifies the user\'s hiring role and opens the relevant conversational workflow.' },
      { title: 'Route the task', modules: ['FastAPI backend', 'Custom orchestrator', 'Specialist agents'], detail: 'A modular orchestration layer sends each request to agents focused on candidate or recruiter work.' },
      { title: 'Enrich the decision', modules: ['Mistral AI', 'CV analysis', 'Job-source search'], detail: 'Agents extract profile information, explore job sources, and assess fit between a CV and an opening.' },
      { title: 'Deliver the action', modules: ['Match score', 'CV guidance', 'Recruiter follow-up'], detail: 'The workflows return useful next steps: compatibility scores, CV improvements, or recruiter-facing content and messages.' }
    ]
  },
  {
    id: 'vendex', number: '05', name: 'Vendex', category: 'Vision / forensics', year: '2026',
    short: 'Five forensic layers turn insurance claim imagery into an explainable verdict.',
    role: 'Team project · top 6 of 37 at GDGC FST',
    stack: 'Python / FastAPI / DINOv2 / MobileSAM',
    source: 'https://github.com/azizhraghi/vendex',
    detail: 'ELA, FFT, DINOv2, and MobileSAM inspect claims for manipulation and damage. An AI tribunal turns the signals into an explainable verdict.',
    noteLabel: 'Context',
    proof: [],
    nodes: [
      { label: 'CLAIM IMAGE', x: 78, y: 150 }, { label: 'ELA', x: 245, y: 55 },
      { label: 'FFT', x: 245, y: 118 }, { label: 'DINOv2', x: 245, y: 182 },
      { label: 'MobileSAM', x: 245, y: 245 }, { label: 'VERDICT', x: 455, y: 150 }
    ], edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 5], [4, 5]],
    architecture: [
      { title: 'Submit evidence', modules: ['Claim imagery', 'FastAPI intake', 'Image preparation'], detail: 'A claim image enters the analysis pipeline through the application interface and API.' },
      { title: 'Inspect the pixels', modules: ['ELA residuals', 'FFT frequencies', 'Manipulation signals'], detail: 'Compression and frequency analysis look for inconsistencies that may indicate image editing or synthesis.' },
      { title: 'Read the scene', modules: ['DINOv2 anomaly', 'MobileSAM masks', 'Damage regions'], detail: 'Visual embeddings flag unusual crash imagery while segmentation localizes physical vehicle damage.' },
      { title: 'Explain the verdict', modules: ['Mistral tribunal', 'Three perspectives', 'PDF report'], detail: 'Three AI roles interpret the forensic signals and produce an explainable insurance verdict and report.' }
    ]
  }
]

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let rafId
    const onMove = (e) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.left = e.clientX + 'px'
        el.style.top = e.clientY + 'px'
        if (!el.classList.contains('visible')) el.classList.add('visible')
      })
    }
    const onLeave = () => el.classList.remove('visible')

    // Only show on desktop
    const mq = window.matchMedia('(pointer: fine)')
    if (mq.matches) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/* ─── Loading Screen ─── */
function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reduced ? 0 : 900)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <motion.div
            className="loading-logo"
            initial={reduced ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          >
            MAH<span>·</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── System Graph (unchanged) ─── */
function SystemGraph({ project, reduced }) {
  return (
    <svg className="system-graph" viewBox="0 0 540 300" role="img" aria-label={`${project.name} system flow: ${project.nodes.map(node => node.label).join(', ')}`}>
      <defs><pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#242d3b" strokeWidth="1" /></pattern></defs>
      <rect width="540" height="300" fill={`url(#grid-${project.id})`} />
      {project.edges.map(([from, to], index) => (
        <motion.line key={`${from}-${to}`} x1={project.nodes[from].x} y1={project.nodes[from].y} x2={project.nodes[to].x} y2={project.nodes[to].y}
          stroke="#52647f" strokeWidth="1.5" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: .5, delay: index * .06 }} />
      ))}
      {project.nodes.map((node, index) => (
        <motion.g key={node.label} initial={reduced ? false : { opacity: 0, scale: .82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .35, delay: .14 + index * .06 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
          <rect x={node.x - 58} y={node.y - 21} width="116" height="42" rx="2" fill={index === project.nodes.length - 1 ? '#4d6bff' : '#171f2a'} stroke={index === project.nodes.length - 1 ? '#4d6bff' : '#607086'} />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#f4f6f8" fontSize="11" fontFamily="'Inter', Arial, sans-serif" fontWeight="700" letterSpacing=".6">{node.label}</text>
        </motion.g>
      ))}
    </svg>
  )
}

/* A source-grounded component map, not a deployment topology. */
function ArchitecturePanel({ project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  const active = project.architecture[activeIndex]

  return (
    <section className="architecture-panel" aria-label={`${project.name} system architecture`}>
      <div className="architecture-heading">
        <div>
          <span className="architecture-kicker">SYSTEM ANATOMY / {project.number}</span>
          <h4>How {project.name} works<span>.</span></h4>
        </div>
        <span className="architecture-count">0{activeIndex + 1} / 04</span>
      </div>
      <div className="architecture-track" role="group" aria-label="Explore system layers">
        {project.architecture.map((stage, index) => (
          <button
            className={`architecture-stage${activeIndex === index ? ' is-active' : ''}`}
            key={stage.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            onPointerEnter={event => { if (event.pointerType === 'mouse') setActiveIndex(index) }}
            aria-pressed={activeIndex === index}
          >
            <span className="architecture-stage-head">
              <span className="architecture-index">0{index + 1}</span>
              <span className="architecture-stage-title">{stage.title}</span>
            </span>
            <span className="architecture-modules">
              {stage.modules.map(module => <span key={module}>{module}</span>)}
            </span>
          </button>
        ))}
      </div>
      <div className="architecture-detail" aria-live="polite">
        <span className="architecture-detail-label">IN FOCUS / 0{activeIndex + 1}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={active.title}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >{active.detail}</motion.p>
        </AnimatePresence>
        <span className="architecture-source">CONCEPTUAL VIEW · BASED ON PROJECT SOURCE</span>
      </div>
    </section>
  )
}

/* ─── Hamburger Menu ─── */
function MobileMenu({ open, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`mobile-nav${open ? ' open' : ''}`} onClick={onClose}>
      <motion.a
        href="#work" onClick={onClose}
        initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: open ? 0.05 : 0 }}
      >Work</motion.a>
      <motion.a
        href="#about" onClick={onClose}
        initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: open ? 0.1 : 0 }}
      >About</motion.a>
      <motion.a
        href="#contact" onClick={onClose}
        initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: open ? 0.15 : 0 }}
      >Contact</motion.a>
      <motion.a
        href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download className="mobile-cv"
        initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: open ? 0.2 : 0 }}
      >Download CV ↗</motion.a>
    </div>
  )
}

/* ─── Header ─── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="header" id="top">
        <a className="logo" href="#top" aria-label="Med Aziz Hraghi, home">MAH<span>·</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cv" href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download>Download CV <span aria-hidden="true">↗</span></a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

/* ─── Hero ─── */
function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 700], [0, 38])
  const active = projects[activeIndex]

  function handleKeyDown(event, index) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + projects.length) % projects.length
    setActiveIndex(next)
    event.currentTarget.parentElement.querySelectorAll('button')[next]?.focus()
  }

  return (
    <section className="hero" aria-labelledby="name">
      <div className="identity-panel">
        <motion.img
          src="/assets/med-aziz-portrait.jpg" width="1024" height="1536"
          alt="Med Aziz Hraghi smiling in a black shirt" fetchPriority="high"
          style={reduced ? undefined : { y: photoY }}
          initial={reduced ? false : { opacity: 0.5, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <div className="identity-shade" />
        <div className="identity-top">
          <span>AI ENGINEER</span>
          <span>TUNISIA / 2026</span>
        </div>
        <div className="identity-bottom">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >AI systems with<br />a human interface.</motion.p>
          <motion.h1
            id="name"
            initial={reduced ? false : { opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
          >MED AZIZ<br />HRAGHI<span>.</span></motion.h1>
        </div>
      </div>

      <div className="explorer">
        <div className="explorer-top">
          <span>SELECTED SYSTEMS</span>
          <span>01 — 05</span>
        </div>
        <div className="explorer-main">
          <div className="system-list" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                key={project.id} type="button"
                className={activeIndex === index ? 'system-choice active' : 'system-choice'}
                onClick={() => setActiveIndex(index)}
                onPointerEnter={event => { if (event.pointerType === 'mouse') setActiveIndex(index) }}
                onKeyDown={event => handleKeyDown(event, index)}
                aria-pressed={activeIndex === index}
              >
                {activeIndex === index && <motion.span className="active-rail" layoutId="active-rail" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="choice-number">{project.number}</span>
                <span className="choice-name">{project.name}</span>
                <span className="choice-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="graph-stage">
            <div className="graph-top">
              <span>SYSTEM MAP</span>
              <span>{active.number} / 05</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: reduced ? 0.1 : 0.32 }}
              >
                <SystemGraph project={active} reduced={reduced} />
              </motion.div>
            </AnimatePresence>
            <span className="graph-foot">SIMPLIFIED PROJECT FLOW / SELECT A SYSTEM</span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id} className="system-summary"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduced ? 0.1 : 0.3 }}
            aria-live="polite"
          >
            <div>
              <span className="summary-label">{active.category} / {active.year}</span>
              <h2>{active.name}</h2>
              <p>{active.short}</p>
            </div>
            <a href={`#${active.id}`} className="summary-link">Explore case <span aria-hidden="true">↘</span></a>
          </motion.div>
        </AnimatePresence>

        <div className="explorer-bottom">
          <span>BUILD / TEST / EXPLAIN</span>
          <a href="#work">SCROLL TO WORK ↓</a>
        </div>
      </div>
    </section>
  )
}

/* ─── Case Study ─── */
function CaseStudy({ project, index }) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      id={project.id}
      className={`case-card ${index % 2 ? 'case-reverse' : ''}`}
      initial={reduced ? false : { opacity: 0.5, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="case-top">
        <span>{project.number} / {project.category}</span>
        <span>{project.year}</span>
      </div>
      <div className="case-layout">
        <div className="case-art">
          {project.id === 'urbanmind'
            ? <img src="/assets/urbanmind-live.webp" width="1200" height="750" alt="UrbanMind live product landing page" loading="lazy" />
            : <div className="case-graph">
                <span className="visual-heading">SIMPLIFIED PROJECT FLOW / {project.number}</span>
                <SystemGraph project={project} reduced={reduced} />
                <span className="visual-footer">{project.category.toUpperCase()} · PROJECT MAP</span>
              </div>
          }
        </div>
        <div className="case-copy">
          <span className="case-eyebrow">SELECTED WORK / {project.number}</span>
          <h3>{project.name}</h3>
          <p className="case-lede">{project.short}</p>
          <p className="case-detail">{project.detail}</p>
          <div className="case-meta">
            <div>
              <span>{project.noteLabel}</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>Built with</span>
              <p>{project.stack}</p>
            </div>
          </div>
          <div className="case-links">
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live product ↗</a>}
            <a href={project.source} target="_blank" rel="noopener noreferrer">Source ↗</a>
            {project.proof.map(item => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}
          </div>
        </div>
      </div>
      <ArchitecturePanel project={project} />
    </motion.article>
  )
}

/* ─── Work ─── */
function Work() {
  const reduced = useReducedMotion()

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <motion.div
        className="section-intro"
        initial={reduced ? false : { opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <span>01 / SELECTED WORK</span>
        <h2 id="work-title">Systems built<br />to do something<span>.</span></h2>
        <p>Five projects across cities, learning, work, hiring, and visual evidence. Each one starts with a real task, not just a model.</p>
      </motion.div>
      <div className="cases">
        {projects.map((project, index) => <CaseStudy key={project.id} project={project} index={index} />)}
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  const reduced = useReducedMotion()

  return (
    <>
      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-label">02 / EXPERIENCE</div>
        <motion.div
          className="experience-content"
          initial={reduced ? false : { opacity: 0.5, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span>JUL — AUG 2026</span>
            <h2 id="experience-title">Talan<br />Tunisia<span>.</span></h2>
          </div>
          <div>
            <p className="experience-role">AI Engineer Intern · SummerCamp</p>
            <p>I worked with the Bambalouni team on UrbanMind. The internship connected analysis and geometry in the backend to an explorable 3D interface, including an existing-city workflow.</p>
            <div className="experience-links">
              <a href="https://github.com/inesCherif/Khatatli_UrbanTwin/pull/24" target="_blank" rel="noopener noreferrer">See analysis and 3D work ↗</a>
              <a href="https://github.com/inesCherif/Khatatli_UrbanTwin/pull/37" target="_blank" rel="noopener noreferrer">See existing-city integration ↗</a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="section-label">03 / ABOUT</div>
        <motion.div
          className="about-layout"
          initial={reduced ? false : { opacity: 0.5, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="about-title">Engineer<br />in practice<span>.</span></h2>
          <div>
            <p>I'm an engineering student at ENSTAB, specializing in digitalisation and data analysis. I like the difficult middle of AI products: making data usable, choosing where agents help, and giving people a clear way to understand the result.</p>
            <p>Outside product work, I chair the ACM ENSTAB Club and help run programming training and contests.</p>
            <div className="about-columns">
              <div>
                <span>CORE WORK</span>
                <p>Multi-agent systems<br />RAG and retrieval<br />Computer vision<br />Geospatial analysis</p>
              </div>
              <div>
                <span>TOOLS</span>
                <p>Python · FastAPI · React<br />PyTorch · Ollama · Mistral AI<br />FAISS · Supabase · n8n</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

/* ─── Contact ─── */
function Contact() {
  const reduced = useReducedMotion()

  return (
    <footer className="contact-section" id="contact">
      <div className="contact-top">
        <span>04 / CONTACT</span>
        <span>TUNISIA · OPEN TO GOOD PROBLEMS</span>
      </div>
      <motion.div
        className="contact-main"
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Let's build<br />something<br /><em>that matters.</em></h2>
        <div>
          <p>Tell me about the problem, the team, or the idea.</p>
          <a href="mailto:medazizhraghi@gmail.com" className="contact-email">medazizhraghi@gmail.com <span aria-hidden="true">↗</span></a>
        </div>
      </motion.div>
      <div className="contact-bottom">
        <span>© 2026 MED AZIZ HRAGHI</span>
        <div>
          <a href="https://github.com/azizhraghi" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href="https://www.linkedin.com/in/med-aziz-hraghi/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download>CV ↓</a>
        </div>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  )
}

/* ─── App ─── */
function App() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <a className="skip-link" href="#work">Skip to work</a>
      <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Contact />
    </>
  )
}

export default App
export { projects, SystemGraph }
