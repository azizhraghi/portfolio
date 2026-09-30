import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  siFastapi, siLanggraph, siLeaflet, siMistralai, siN8n,
  siOllama, siPython, siQdrant, siReact, siSupabase
} from 'simple-icons'

const projectOrder = ['urbanmind', 'agentichire', 'groov', 'vendex', 'syntern']

const toolchainLanes = [
  {
    label: '01 / ORCHESTRATE',
    description: 'Agents, retrieval, and local inference',
    tools: [
      { name: 'LangGraph', icon: siLanggraph, project: 'UrbanMind', target: 'urbanmind' },
      { name: 'Qdrant', icon: siQdrant, project: 'UrbanMind', target: 'urbanmind' },
      { name: 'FAISS', mark: 'F', project: 'GROOV', target: 'groov' },
      { name: 'Ollama', icon: siOllama, project: 'GROOV', target: 'groov' },
      { name: 'Mistral AI', icon: siMistralai, project: 'AgenticHire', target: 'agentichire' }
    ]
  },
  {
    label: '02 / BUILD',
    description: 'APIs, interfaces, and workflow state',
    tools: [
      { name: 'Python', icon: siPython, project: 'UrbanMind', target: 'urbanmind' },
      { name: 'FastAPI', icon: siFastapi, project: 'AgenticHire', target: 'agentichire' },
      { name: 'React', icon: siReact, project: 'Syntern', target: 'syntern' },
      { name: 'Supabase', icon: siSupabase, project: 'Syntern', target: 'syntern' },
      { name: 'n8n', icon: siN8n, project: 'Syntern', target: 'syntern' }
    ]
  },
  {
    label: '03 / INTERPRET',
    description: 'Vision, geometry, and spatial output',
    tools: [
      { name: 'DINOv2', mark: 'D2', project: 'Vendex', target: 'vendex' },
      { name: 'MobileSAM', mark: 'SAM', project: 'Vendex', target: 'vendex' },
      { name: 'React Three Fiber', mark: '3D', project: 'UrbanMind', target: 'urbanmind' },
      { name: 'Leaflet', icon: siLeaflet, project: 'UrbanMind', target: 'urbanmind' }
    ]
  }
]

const projects = [
  {
    id: 'urbanmind', number: '01', name: 'UrbanMind', category: 'Urban intelligence', year: '2026',
    short: 'An urban-planning copilot connecting cited regulations, terrain analysis, and a 3D twin.',
    solution: 'The workspace brings parcel data, cited planning rules, and feasibility analysis together, then turns the proposal into a 2D plan and explorable 3D twin.',
    decision: 'Agents suggest planning parameters; deterministic geometry handles measurements, layouts, and exports.',
    status: 'Live product; linked pull requests trace implemented analysis and 3D modules.',
    stack: 'FastAPI / LangGraph / Qdrant / Mistral / React Three Fiber',
    source: 'https://github.com/azizhraghi/Khatatli_UrbanTwin',
    live: 'https://khatatli-urban-twin.vercel.app/',
    detail: 'Parcel data and planning rules live in separate places, making feasibility slow to assess and difficult to trace back to sources.',
    context: 'AI Engineer Intern at Talan Tunisia · Bambalouni team',
    evidence: ['8 legal codes + local PLU', '20 public-data collectors', '2D plans + 3D twin'],
    demo: { src: '/media/urbanmind-demo.mp4', poster: '/assets/urbanmind-live.webp', label: 'Product walkthrough', duration: '2:21' },
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
    short: 'A remote-internship simulation with four AI teammates, deadlines, and behavioral feedback.',
    solution: 'A simulated team assigns work, responds through distinct AI roles, and reacts to deadlines. The workspace tracks decisions and turns the session into behavioral feedback.',
    decision: 'n8n controls timed events and escalation; AI personas handle conversations inside the same session.',
    status: 'Hackathon simulation. Its feedback is formative, not a validated hiring assessment.',
    stack: 'React / n8n / Supabase / Claude API / ElevenLabs',
    source: 'https://github.com/azizhraghi/stagi',
    detail: 'Students rarely get to practice remote-team communication and prioritization before their first internship.',
    context: 'Team project · 2nd place at TBS Atlas',
    evidence: ['4 AI colleagues', 'Kanban + team messages', 'Behavioral evaluation'],
    demo: { src: '/media/syntern-demo.mp4', poster: '/media/syntern-poster.jpg', label: 'Simulation walkthrough', duration: '1:39' },
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
    short: 'A local-AI study room that grounds a six-persona discussion in course PDFs.',
    solution: 'Course PDFs become searchable passages; a local model uses retrieved context to run a six-persona discussion, with spoken responses for a more interactive study session.',
    decision: 'FAISS retrieves source passages before Ollama responds; the study session keeps separate persona prompts and conversation history.',
    status: 'Runs locally with Ollama. Public source is available; a browser demo is not yet published.',
    stack: 'FastAPI / Ollama / FAISS / Sentence Transformers / Edge TTS',
    source: 'https://github.com/azizhraghi/groov',
    detail: 'Long course PDFs are hard to study alone, and generic AI explanations can lose the source material they should be grounded in.',
    context: 'Independent project · local-model architecture',
    evidence: ['PDF-grounded retrieval', 'Local Ollama inference', 'Six teaching personas'],
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
    short: 'A chat-first hiring platform for candidate and recruiter workflows.',
    solution: 'A role-aware chat orchestrator connects CV analysis, job discovery, fit assessment, and interview preparation for candidates, with separate recruiter-facing workflows.',
    decision: 'Candidate and recruiter requests follow separate specialist-agent routes instead of one general-purpose chat prompt.',
    status: 'Recorded prototype with public source, not a hosted service.',
    stack: 'FastAPI / React / Mistral AI / SQLite',
    source: 'https://github.com/azizhraghi/agentic_hire',
    detail: 'Candidates and recruiters move between CV review, job boards, matching, and follow-up without one coherent decision trail.',
    context: 'Two-person project · 3rd place at NerdData ENSIT',
    evidence: ['Candidate + recruiter paths', 'Multi-source job search', 'CV-to-job matching'],
    demo: { src: '/media/agentichire-highlights.mp4', poster: '/media/agentichire-poster.jpg', label: 'Workflow highlights', duration: '1:08' },
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
    short: 'Image-forensic signals and damage analysis combined into an explainable claim assessment.',
    solution: 'The pipeline checks image integrity, identifies unusual visual patterns, maps vehicle damage, and combines those signals into an explainable claim assessment and PDF report.',
    decision: 'ELA, FFT, DINOv2, and MobileSAM remain separate evidence streams before the reasoning layer summarizes them.',
    status: 'Hackathon prototype for triage; no validated fraud-detection accuracy or autonomous claim decision is claimed.',
    stack: 'FastAPI / DINOv2 / MobileSAM / Mistral AI',
    source: 'https://github.com/azizhraghi/vendex',
    detail: 'A single claim photo gives an assessor little visibility into possible edits, image provenance, or the location of physical damage.',
    context: 'Team project · top 6 of 37 at GDGC FST',
    evidence: ['ELA + FFT checks', 'DINOv2 + MobileSAM', 'Explainable PDF report'],
    demo: { src: '/media/vendex-demo.mp4', poster: '/media/vendex-poster.jpg', label: 'Claim analysis walkthrough', duration: '3:09' },
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
].sort((a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id))
  .map((project, index) => ({ ...project, number: String(index + 1).padStart(2, '0') }))

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
        href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download="HraghiMedAziz_CV.pdf" className="mobile-cv"
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
        <a className="header-cv" href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download="HraghiMedAziz_CV.pdf">Download CV <span aria-hidden="true">↗</span></a>
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
          >Agents, retrieval, vision.<br />Built for real workflows.</motion.p>
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
  const [isPlaying, setIsPlaying] = useState(false)
  const artRef = useRef(null)

  function playDemo() {
    setIsPlaying(true)
    artRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
  }

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
        <div className="case-art" ref={artRef}>
          {project.demo
            ? isPlaying
              ? <div className="case-video-playing">
                  <video controls autoPlay playsInline preload="metadata" poster={project.demo.poster} aria-label={`${project.name} ${project.demo.label}`}>
                    <source src={project.demo.src} type="video/mp4" />
                    Your browser cannot play this video.
                  </video>
                  <button type="button" className="case-video-close" onClick={() => setIsPlaying(false)} aria-label={`Close ${project.name} video`}>Close video</button>
                </div>
              : <button type="button" className="case-video-preview" onClick={playDemo} aria-label={`Play ${project.name} ${project.demo.label}, ${project.demo.duration}`}>
                  <img src={project.demo.poster} alt="" loading="lazy" />
                  <span className="case-video-overlay" aria-hidden="true">
                    <span className="case-video-play">▶</span>
                    <span><strong>{project.demo.label}</strong><small>{project.demo.duration} · Play video</small></span>
                  </span>
                </button>
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
          <ul className="case-evidence" aria-label={`${project.name} at a glance`}>
            {project.evidence.map(item => <li key={item}>{item}</li>)}
          </ul>
          <div className="case-story">
            <div><span>The problem</span><p>{project.detail}</p></div>
            <div><span>The solution</span><p>{project.solution}</p></div>
            <div><span>Design choice</span><p>{project.decision}</p></div>
          </div>
          <div className="case-meta">
            <div>
              <span>Context</span>
              <p>{project.context}</p>
            </div>
            <div>
              <span>Scope</span>
              <p>{project.status}</p>
            </div>
            <div>
              <span>Built with</span>
              <p>{project.stack}</p>
            </div>
          </div>
          <div className="case-links">
            <span className="case-links-label">VERIFY THE BUILD</span>
            {project.demo && <button type="button" onClick={playDemo}>Watch {project.demo.label.toLowerCase()}</button>}
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live product ↗</a>}
            <a href={project.source} target="_blank" rel="noopener noreferrer">GitHub source ↗</a>
            {project.proof.map(item => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>)}
          </div>
        </div>
      </div>
      <details className="architecture-disclosure">
        <summary><span>Explore {project.name} architecture</span><span>FOUR SYSTEM LAYERS <b aria-hidden="true">+</b></span></summary>
        <ArchitecturePanel project={project} />
      </details>
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
        <p>Start with the working artifacts. Then inspect the decisions and source behind each system.</p>
      </motion.div>
      <div className="proof-index" id="proof" aria-label="Quick paths to project evidence">
        <div className="proof-index-heading">
          <span>FOR A QUICK REVIEW</span>
          <strong>Proof before pitch.</strong>
        </div>
        <div className="proof-index-items">
          <div>
            <span>LIVE APPLICATION</span>
            <strong>UrbanMind</strong>
            <p>Parcel-to-plan workflow, with implementation pull requests in the case study.</p>
            <a href="https://khatatli-urban-twin.vercel.app/" target="_blank" rel="noopener noreferrer">Open application ↗</a>
          </div>
          <div>
            <span>1:08 RECORDED DEMO</span>
            <strong>AgenticHire</strong>
            <p>Candidate and recruiter paths, including CV-to-job matching.</p>
            <a href="/media/agentichire-highlights.mp4" target="_blank" rel="noopener noreferrer">Watch workflow ↗</a>
          </div>
          <div>
            <span>3:09 RECORDED DEMO</span>
            <strong>Vendex</strong>
            <p>Claim image through separate forensic signals to an explainable report.</p>
            <a href="/media/vendex-demo.mp4" target="_blank" rel="noopener noreferrer">Watch analysis ↗</a>
          </div>
          <div>
            <span>PUBLIC REPOSITORY</span>
            <strong>INAT / LSTE</strong>
            <p>Research monitoring and reviewed parcel-water decision support prototype.</p>
            <a href="https://github.com/azizhraghi/lab_research" target="_blank" rel="noopener noreferrer">Inspect source ↗</a>
          </div>
        </div>
      </div>
      <div className="cases">
        {projects.map((project, index) => <CaseStudy key={project.id} project={project} index={index} />)}
      </div>
    </section>
  )
}

/* ─── Toolchain ─── */
function Toolchain() {
  return (
    <section className="toolchain-section" id="toolchain" aria-labelledby="toolchain-title">
      <div className="toolchain-inner">
        <div className="toolchain-heading">
          <span className="toolchain-eyebrow">BEHIND THE BUILDS / SELECTED TOOLS</span>
          <h2 id="toolchain-title">The stack follows<br /><em>the problem.</em></h2>
          <p>Not a badge collection. These are the tools behind the systems above—each one takes you to a project where it has a job.</p>
        </div>
        <div className="toolchain-lanes">
          {toolchainLanes.map((lane, laneIndex) => (
            <div className="toolchain-lane" key={lane.label}>
              <div className="toolchain-lane-info">
                <span>{lane.label}</span>
                <p>{lane.description}</p>
              </div>
              <div className="toolchain-viewport">
                <div className={`toolchain-track ${laneIndex % 2 ? 'toolchain-track-reverse' : ''}`}>
                  {[false, true].map((duplicate) => (
                    <div className="toolchain-group" key={String(duplicate)} aria-hidden={duplicate ? 'true' : undefined}>
                      {lane.tools.map((tool, toolIndex) => (
                        <a
                          className={`toolchain-item ${tool.icon ? 'toolchain-item--logo' : ''}`}
                          href={`#${tool.target}`}
                          key={tool.name}
                          tabIndex={duplicate ? -1 : undefined}
                          aria-label={duplicate ? undefined : `${tool.name} in ${tool.project}; view case study`}
                          style={tool.icon ? {
                            '--lamp-ink': `#${tool.icon.hex}`,
                            '--lamp-background': tool.icon.hex === '000000' ? '#f5f6f3' : '#172132',
                            '--lamp-halo': tool.icon.hex === '000000' ? '#8ea2ff' : `#${tool.icon.hex}`,
                            '--lamp-delay': `${(laneIndex * 5 + toolIndex) * 0.85}s`
                          } : undefined}
                        >
                          <span className="toolchain-mark" aria-hidden="true">
                            {tool.icon
                              ? <svg viewBox="0 0 24 24" focusable="false"><path d={tool.icon.path} fill="currentColor" /></svg>
                              : tool.mark}
                          </span>
                          <span className="toolchain-item-copy"><strong>{tool.name}</strong><small>{tool.project} ↗</small></span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        <motion.div
          className="experience-content experience-secondary"
          initial={reduced ? false : { opacity: 0.5, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span>JUL — AUG 2026 · REMOTE</span>
            <h2>INAT<span>.</span></h2>
          </div>
          <div>
            <p className="experience-role">Applied AI Intern · LSTE</p>
            <p>I built research-monitoring workflows across ArXiv, PubMed, and Scopus, using semantic retrieval and deduplication. I also worked on a parcel-water decision-support prototype that combines reviewed field data with water-balance scenarios. Field validation remains to be done.</p>
            <div className="experience-links">
              <a href="https://github.com/azizhraghi/lab_research" target="_blank" rel="noopener noreferrer">Explore the research platform ↗</a>
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
            <p>Outside product work, I chaired the ACM ENSTAB Club and helped run programming training and contests.</p>
            <div className="about-columns">
              <div>
                <span>CORE WORK</span>
                <p>Multi-agent systems<br />RAG and retrieval<br />Computer vision<br />Geospatial analysis</p>
              </div>
              <div>
                <span>APPROACH</span>
                <p>Ground outputs in sources<br />Keep geometry deterministic<br />Make decisions inspectable</p>
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
          <a href="https://www.linkedin.com/in/med-aziz-hraghi-b45a04248/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download="HraghiMedAziz_CV.pdf">CV ↓</a>
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
        <Toolchain />
        <About />
      </main>
      <Contact />
    </>
  )
}

export default App
export { projects, SystemGraph }
