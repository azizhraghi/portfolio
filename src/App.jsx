import { useState, useEffect, useRef, useCallback, useId } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import HelloAziz from './HelloAziz.jsx'
import BrandMark from './BrandMark.jsx'
import {
  siFastapi, siLanggraph, siLeaflet, siMistralai, siN8n,
  siOllama, siPython, siQdrant, siReact, siSupabase, siTypescript
} from 'simple-icons'

const projectOrder = ['urbanmind', 'agentichire', 'vendex', 'syntern', 'groov']
const cvUrl = '/assets/Med_Aziz_Hraghi_CV_2026.pdf'

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
      { name: 'TypeScript', icon: siTypescript, project: 'UrbanMind', target: 'urbanmind' },
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
    stack: 'FastAPI / LangGraph / Qdrant / Mistral / React + TypeScript / React Three Fiber',
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
    demo: { src: '/media/agentichire-highlights.mp4', poster: '/media/agentichire-poster.jpg', label: 'Full workflow demo', duration: '3:57' },
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

function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setVisible(false), 760)
    return () => clearTimeout(timer)
  }, [reduced])

  if (reduced) return null
  return (
    <AnimatePresence>
      {visible && <motion.div className="loading-screen" aria-hidden="true"
        exit={{ opacity: 0 }} transition={{ duration: .3 }}>
        <BrandMark animate />
      </motion.div>}
    </AnimatePresence>
  )
}

function SystemGraph({ project, reduced }) {
  const gridId = useId()
  return (
    <svg className="system-graph" viewBox="0 0 540 300" role="img" aria-label={`${project.name} system flow: ${project.nodes.map(node => node.label).join(', ')}`}>
      <defs><pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#242d3b" strokeWidth="1" /></pattern></defs>
      <rect width="540" height="300" fill={`url(#${gridId})`} />
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
          <span className="architecture-kicker">SYSTEM ANATOMY</span>
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
        href="#experience" onClick={onClose}
        initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, delay: open ? 0.08 : 0 }}
      >Experience</motion.a>
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
        href={cvUrl} download="HraghiMedAziz_CV.pdf" className="mobile-cv"
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
      <header className={menuOpen ? 'header header-menu-open' : 'header'} id="top">
        <a className="logo" href="#top" aria-label="Med Aziz Hraghi, home"><BrandMark /></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cv" href={cvUrl} download="HraghiMedAziz_CV.pdf">Download CV <span aria-hidden="true">↗</span></a>
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

const surgiguardProject = {
  id: 'surgiguard', name: 'SurgiGuard AI', category: 'Wearables / recovery', year: '2026',
  short: 'A hackathon prototype connecting wearable readings to a recovery dashboard and simulated care-team alerts.',
  context: '2nd place at HackCure 2026 · Team project',
  stack: 'ESP32 / MQTT / .NET / MongoDB / FastAPI / LangGraph',
  detail: 'Recovery at home leaves patients and caregivers piecing together symptoms, sensor readings, and discharge documents.',
  solution: 'Wearable telemetry, recovery plans, and review workflows come together in a shared prototype.',
  decision: 'Rules handle urgent escalation. AI assists with document retrieval and investigation.',
  status: 'Hackathon prototype using a fictional patient and simulated notifications.',
  evidence: ['ESP32 + MQTT', 'Rules-based escalation', '2nd place · HackCure'],
  demo: { src: '/media/surgiguard-demo.mp4', poster: '/media/surgiguard-poster.jpg', label: 'Mobile app and wearable demo', duration: '2:33' },
  proof: [],
  nodes: [
    { label: 'WEARABLE', x: 70, y: 150 }, { label: 'MQTT + API', x: 250, y: 80 },
    { label: 'AI REVIEW', x: 250, y: 220 }, { label: 'CARE TEAM', x: 450, y: 150 }
  ],
  edges: [[0, 1], [1, 2], [2, 3]],
  architecture: [
    { title: 'Read', modules: ['ESP32', 'Heart rate + SpO2', 'Motion + temperature'], detail: 'The wearable collects readings for the recovery workflow.' },
    { title: 'Ingest', modules: ['MQTT', '.NET API', 'MongoDB'], detail: 'The API stores telemetry and patient data.' },
    { title: 'Review', modules: ['FastAPI', 'LangGraph', 'Urgent rules'], detail: 'Rules and agent workflows review incoming data.' },
    { title: 'Follow up', modules: ['Recovery plan', 'Care-team review', 'Simulated alert'], detail: 'The prototype presents information for follow-up.' }
  ]
}
const portfolioProjects = [...projects, surgiguardProject]
const decisionTitles = {
  urbanmind: 'Let the model propose. Let geometry calculate.',
  agentichire: 'Give each hiring role its own route.',
  vendex: 'Keep the evidence visible.',
  syntern: 'Put the scenario clock in the workflow.',
  groov: 'Bring the source material into the conversation.',
  surgiguard: 'Keep escalation rules explicit.'
}

const buildStories = {
  vendex: {
    title: 'Five hours to make the pieces work together.',
    text: 'Our individual parts were working. When I brought them together, the system broke. I spent five hours, from 3:00 to 8:00, getting the integrated workflow working again.'
  },
  syntern: {
    title: 'We started Syntern at midnight.',
    text: 'We had been working on another idea before changing direction. We only started building Syntern at midnight, kept working through the remaining time, and finished in second place.'
  },
  agentichire: {
    title: 'LinkedIn was the source I struggled to connect.',
    text: 'The job search starts from the candidate’s CV and spans 11 platforms. LinkedIn scraping was the part I wasn’t sure I could get working. I kept working on it and eventually got it into the pipeline.'
  }
}

const projectMoments = {
  agentichire: {
    src: '/assets/moments/nerddata-team.png',
    alt: 'AgenticHire teammates seated with their laptops at the NerdData hackathon',
    caption: 'NerdData · ENSIT', result: '3rd place', label: 'AT THE BUILD TABLE'
  },
  syntern: {
    src: '/assets/moments/atlas-award.png',
    alt: 'The group on stage at the Atlas hackathon at TBS',
    caption: 'Atlas Hackathon · TBS', result: '2nd place', label: 'AFTER THE LAST PIVOT'
  },
  surgiguard: {
    src: '/assets/moments/hackcure-award.png',
    alt: 'SurgiGuard’s team with certificates and the prize cheque at HackCure',
    caption: 'HackCure · SurgiGuard', result: '2nd place', label: 'A TEAM EFFORT'
  }
}

const urbanMindFrames = [
  {
    title: 'Define the site',
    image: '/assets/urbanmind-parcel.jpg',
    alt: 'UrbanMind site diagnostic with the boundary outlined on a map',
    caption: 'The boundary defines where to collect terrain and neighborhood data.'
  },
  {
    title: 'Check the planning rules',
    image: '/assets/urbanmind-rules.jpg',
    alt: 'UrbanMind zoning rules with a warning about incomplete source pages',
    caption: 'The planning view flags missing source pages so gaps are visible before design begins.'
  },
  {
    title: 'Inspect the 3D result',
    image: '/assets/urbanmind-twin.jpg',
    alt: 'UrbanMind 3D neighborhood with a selected building and its measurements',
    caption: 'Select a building in the 3D twin to inspect its height, footprint, and terrain elevation.'
  }
]

function UrbanMindDecision({ project }) {
  return (
    <section className="urban-case" aria-labelledby="urban-decision-title">
      <h3 id="urban-decision-title">Which decisions belong to the AI?</h3>
      <div className="urban-case-notes">
        <div>
          <h4>Agents propose the design</h4>
          <p>The agents suggest planning parameters for the proposal. The geometry code uses those parameters to generate layouts and compute measurements.</p>
        </div>
        <div>
          <h4>Geometry measures it</h4>
          <p>The height used for the planning check is measured from the lowest point of the natural terrain under the building footprint. On a slope, that measurement can exceed the building’s height.</p>
        </div>
      </div>
      <figure className="urban-evidence">
        <a href={urbanMindFrames[2].image} target="_blank" rel="noopener noreferrer" aria-label="Open full UrbanMind building measurement screenshot">
          <img src={urbanMindFrames[2].image} alt={urbanMindFrames[2].alt} width="1440" height="810" loading="lazy" />
          <span className="urban-measurement-outline" aria-hidden="true" />
          <span className="moment-expand" aria-hidden="true">↗</span>
        </a>
        <figcaption>
          <h4>One building on sloped terrain</h4>
          <dl>
            <div><dt>Building height</dt><dd>21.1 m</dd></div>
            <div><dt>Height for the planning check</dt><dd>26.7 m</dd></div>
            <div><dt>Difference due to slope</dt><dd>5.6 m</dd></div>
          </dl>
          <p>The demo shows both measurements for the same existing residential building.</p>
        </figcaption>
      </figure>
      <div className="urban-contribution">
        <h4>My contribution at Talan</h4>
        <p>I worked with the Bambalouni team on terrain analysis and the 3D workflow, including how UrbanMind handles existing neighborhoods.</p>
        <div className="index-links">{project.proof.map(item => (
          <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} PR ↗</a>
        ))}</div>
      </div>
    </section>
  )
}

function UrbanMindWalkthrough() {
  return (
    <div className="urban-case">
      <ol className="urban-case-frames" aria-label="UrbanMind workflow">
        {urbanMindFrames.map((frame, index) => (
          <li key={frame.title}>
            <a href={frame.image} target="_blank" rel="noopener noreferrer" aria-label={`View full screenshot: ${frame.title}`}>
              <img src={frame.image} alt={frame.alt} width="1440" height="810" loading="lazy" />
              <span className="moment-expand" aria-hidden="true">↗</span>
            </a>
            <div className="urban-frame-caption">
              <span aria-hidden="true">0{index + 1}</span>
              <div><h4>{frame.title}</h4><p>{frame.caption}</p></div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function ProjectDisplay({ project, color }) {
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const flagship = project.id === 'urbanmind'
  const Heading = flagship ? 'h2' : 'h3'
  const headingId = `${project.id}-title`
  const poster = flagship ? '/assets/urbanmind-twin.jpg' : project.demo?.poster
  const story = buildStories[project.id]
  const moment = projectMoments[project.id]
  const media = (
      <div className="portfolio-media">
        {project.demo
          ? playing
            ? <div className="portfolio-video">
                <video controls autoPlay playsInline preload="metadata" poster={poster}
                  aria-label={`${project.name} demonstration`}>
                  <source src={project.demo.src} type="video/mp4" />
                </video>
                <button type="button" onClick={() => setPlaying(false)}>Close video</button>
              </div>
            : <button type="button" className="portfolio-preview" onClick={() => setPlaying(true)}
                aria-label={`Play ${project.name} demo, ${project.demo.duration}`}>
                <img src={poster} alt={`${project.name} product screen`} width="1440" height="810" loading="lazy" />
                <span className="portfolio-play"><b aria-hidden="true">▶</b><span>Watch demo<small>{project.demo.duration}</small></span></span>
              </button>
          : <div className="portfolio-flow">
              <span className="chapter-label">PROJECT FLOW</span>
              <SystemGraph project={project} reduced={true} />
            </div>}
      </div>
  )

  return (
    <motion.article className={`portfolio-project${flagship ? ' portfolio-project--flagship' : ''}`}
      id={project.id} tabIndex={-1} aria-labelledby={headingId} style={{ '--project-color': color }}
      initial={flagship || reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .28, ease: [.2, .7, .2, 1] }}>
      <header className="portfolio-project-heading">
        <div>
          <span className="chapter-label">{flagship ? 'Talan Tunisia · AI Engineering Internship' : project.category}</span>
          <Heading id={headingId}>{project.name}</Heading>
          <p>{project.short}</p>
        </div>
        <div className="portfolio-project-links">
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Open live app ↗</a>}
          {project.source && <a href={project.source} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
        </div>
      </header>
      <div className="case-demo">{media}</div>
      {flagship && <UrbanMindDecision project={project} />}
      <div className="portfolio-footnote">
        {!flagship && <p>{project.context}</p>}
        <ul>{project.evidence.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      {!flagship && <aside className={`build-moment${moment ? ' build-moment--photo' : ''}`} aria-label={`${story ? 'Build story' : 'Engineering note'} for ${project.name}`}>
        {moment && <figure className="moment-photo">
          <a href={moment.src} target="_blank" rel="noopener noreferrer" aria-label={`View full photo: ${moment.caption}`}>
            <img src={moment.src} alt={moment.alt} loading="lazy" width="1280" height="960" />
            <span className="moment-expand" aria-hidden="true">↗</span>
          </a>
          <figcaption><span>{moment.caption}</span><strong>{moment.result}</strong></figcaption>
        </figure>}
        <div className="decision-record">
          <div className="decision-record-stamp"><BrandMark /><span>{moment?.label ?? (story ? 'FROM THE BUILD' : 'ENGINEERING NOTE')}</span></div>
          <div><h4>{story?.title ?? decisionTitles[project.id]}</h4><p>{story?.text ?? project.decision}</p></div>
          <a href="#about" aria-label="Read more about Aziz">— Aziz ↗</a>
        </div>
      </aside>}
      {flagship && <details className="portfolio-notes portfolio-demo">
        <summary>From site boundary to 3D result <span aria-hidden="true">+</span></summary>
        <UrbanMindWalkthrough />
      </details>}
      <details className="portfolio-notes">
        <summary>Read the design notes <span aria-hidden="true">+</span></summary>
        <div className="portfolio-notes-grid">
          <div><h4>Problem</h4><p>{project.detail}</p></div>
          <div><h4>Solution</h4><p>{project.solution}</p></div>
          {story && <div><h4>Engineering decision</h4><p>{project.decision}</p></div>}
          <div><h4>Scope</h4><p>{project.status}</p></div>
        </div>
        <p className="portfolio-stack"><strong>Built with</strong> {project.stack}</p>
        {!flagship && project.proof.length > 0 && <div className="index-links">{project.proof.map(item => (
          <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>
        ))}</div>}
      </details>
      <details className="architecture-disclosure">
        <summary><span>Explore system architecture</span><span>{project.architecture.length} LAYERS <b aria-hidden="true">+</b></span></summary>
        <ArchitecturePanel project={project} />
      </details>
    </motion.article>
  )
}

const showcaseArt = {
  urbanmind: { image: '/assets/urbanmind-twin.jpg', clip: '/media/urbanmind-preview.mp4', caption: 'Inspecting a building in the 3D twin', color: '#d4e7a6' },
  agentichire: { image: '/assets/desk-agentichire-search.jpg', clip: '/media/agentichire-preview.mp4', caption: 'Browsing jobs matched to a candidate’s CV', color: '#a7caff' },
  vendex: { image: '/assets/desk-vendex-signals.jpg', clip: '/media/vendex-preview.mp4', caption: 'Inspecting forensic signals from a claim photo', color: '#ffad98' },
  syntern: { image: '/media/syntern-poster.jpg', clip: '/media/syntern-preview.mp4', caption: 'A conversation with a simulated teammate', color: '#ffd392' },
  groov: { caption: 'From study material to a guided session', color: '#c6beff' },
  surgiguard: { image: '/media/surgiguard-poster.jpg', clip: '/media/surgiguard-preview.mp4', caption: 'Exploring the recovery monitoring prototype', color: '#a9e2d3', portrait: true }
}

function ProjectHighlight({ project, art, reduced }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [preference, setPreference] = useState(null)
  const shouldPlay = preference ?? !reduced

  useEffect(() => {
    const video = videoRef.current
    if (!shouldPlay) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: .3 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [shouldPlay])

  function togglePlayback() {
    if (playing) {
      setPreference(false)
      videoRef.current.pause()
    } else {
      setPreference(true)
      videoRef.current.play().catch(() => {})
    }
  }

  return (
    <div className="work-showcase-image work-showcase-reel">
      <video ref={videoRef} src={art.clip} poster={art.image} preload="none" muted loop playsInline
        aria-label={`${project.name} demo highlight`}
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" className="reel-toggle" onClick={togglePlayback}>
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        {playing ? 'Pause preview' : 'Play preview'}
      </button>
    </div>
  )
}

function Work() {
  const [selected, setSelected] = useState(() => window.location.hash.slice(1))
  const jumpToCase = useRef(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    function selectFromHash() {
      const id = window.location.hash.slice(1)
      if (!portfolioProjects.some(item => item.id === id)) return
      jumpToCase.current = true
      setSelected(id)
    }
    window.addEventListener('hashchange', selectFromHash)
    return () => window.removeEventListener('hashchange', selectFromHash)
  }, [])

  const project = portfolioProjects.find(item => item.id === selected) ?? portfolioProjects[0]
  const art = showcaseArt[project.id]

  useEffect(() => {
    if (!jumpToCase.current || window.location.hash !== `#${project.id}`) return
    jumpToCase.current = false
    const detail = document.getElementById(project.id)
    detail?.focus({ preventScroll: true })
    detail?.scrollIntoView()
  }, [project])

  function selectProject(id) {
    jumpToCase.current = false
    window.history.replaceState(window.history.state, '', `#${id}`)
    setSelected(id)
  }

  return (
    <section className="portfolio-collection" id="work" aria-labelledby="work-title">
      <div className="work-showcase" style={{ '--project-color': art.color }}>
        <div className="work-showcase-index">
          <h2 id="work-title">Selected <em>work.</em></h2>
          <div className="work-showcase-picker" role="group" aria-label="Select a project">
            {portfolioProjects.map(item => (
              <button type="button" key={item.id} aria-pressed={item.id === project.id}
                aria-controls="work-preview work-case" onClick={() => selectProject(item.id)}>
                <span><strong>{item.name}</strong><small>{item.category}</small></span>
                <span aria-hidden="true">{item.id === project.id ? '→' : '·'}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="work-showcase-preview" id="work-preview">
          <motion.figure className={`work-showcase-figure${art.portrait ? ' work-showcase-figure--portrait' : ''}`}
            key={project.id} initial={reduced ? false : { opacity: .45, y: 6 }}
            animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .28 }}>
            {art.clip ? <ProjectHighlight project={project} art={art} reduced={reduced} />
              : <a className="work-showcase-image" href={`#${project.id}`} aria-label={`Open ${project.name} case study`}>
                  <SystemGraph project={project} reduced={true} />
                </a>}
            <figcaption>{art.caption}{art.clip && <span>8-second demo excerpt</span>}</figcaption>
          </motion.figure>
          <div className="work-showcase-summary">
            <p aria-live="polite">{project.short}</p>
            <a href={`#${project.id}`}>Jump to case study <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
      <div id="work-case">
        <a className="case-return" href="#work">↑ Back to selected work</a>
        <ProjectDisplay key={project.id} project={project} color={art.color} />
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
          <span className="toolchain-eyebrow">03 / TOOLCHAIN</span>
          <h2 id="toolchain-title">The stack follows<br /><em>the problem.</em></h2>
          <p>Choose a tool to see how I used it in a project.</p>
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

/* ─── Experience and About ─── */
function About() {
  const [role, setRole] = useState('organizer')
  const roles = {
    student: {
      label: 'ENSTAB',
      text: 'I’m in my final year at ENSTAB, specializing in Digitalisation and Data Analysis after a preparatory cycle in Mathematics and Physics.',
      href: cvUrl, link: 'See my education'
    },
    coordinator: {
      label: 'ETC Junior Entreprise',
      text: 'At ETC Junior Entreprise, I work on project planning, team coordination, client communication, and delivery tracking.',
      href: cvUrl, link: 'Read my CV'
    },
    organizer: {
      label: 'ACM ENSTAB',
      text: 'I chaired the ACM ENSTAB Club from September 2025 to September 2026, helping run technical training, programming contests, and club activities.',
      href: cvUrl, link: 'Read my CV'
    }
  }
  const currentRole = roles[role]

  return (
    <section className="field-journal" id="experience" aria-labelledby="experience-title">
      <div className="journal-inner">
        <div className="journal-heading">
          <span className="chapter-label">02 / EXPERIENCE</span>
          <h2 id="experience-title">Where I learned<br /><em>to build.</em></h2>
          <a href={cvUrl} download="HraghiMedAziz_CV.pdf">Download my CV ↓</a>
        </div>
        <div className="journal-entries">
          <article className="journal-entry journal-entry--talan">
            <div className="journal-entry-copy">
            <span className="chapter-label">JUL–AUG 2026 / TUNISIA</span>
            <h3>Talan Tunisia</h3>
            <p className="journal-role">AI Engineer Intern · SummerCamp</p>
            <p>With the Bambalouni team, I worked on UrbanMind’s path from terrain analysis and geometry to an explorable 3D view, including a workflow for existing neighborhoods.</p>
            <div className="index-links">
              <a href="#urbanmind">UrbanMind case study ↘</a>
              <a href="https://github.com/inesCherif/Khatatli_UrbanTwin/pull/24" target="_blank" rel="noopener noreferrer">Analysis and 3D work ↗</a>
              <a href="https://github.com/inesCherif/Khatatli_UrbanTwin/pull/37" target="_blank" rel="noopener noreferrer">Existing city workflow ↗</a>
            </div>
            </div>
            <figure className="experience-photo">
              <a href="/assets/moments/talan-team.png" target="_blank" rel="noopener noreferrer" aria-label="View full Talan team photo">
                <img src="/assets/moments/talan-team.png" alt="The Talan Tunisia SummerCamp team together at the office" loading="lazy" width="1280" height="720" />
              </a>
              <figcaption>SummerCamp 2026 / Talan Tunisia</figcaption>
            </figure>
          </article>
          <article className="journal-entry journal-entry--research">
            <div>
            <span className="chapter-label">JUL–AUG 2026 / REMOTE</span>
            <h3>INAT / LSTE</h3>
            <p className="journal-role">Applied AI Intern</p>
            </div>
            <div>
            <p>I built research monitoring workflows across arXiv, PubMed, and Scopus. I also worked on a prototype that uses reviewed field data to compare water balance scenarios for agricultural parcels.</p>
            <div className="index-links">
              <a href="https://github.com/azizhraghi/lab_research" target="_blank" rel="noopener noreferrer">Research platform ↗</a>
            </div>
            </div>
          </article>
        </div>
        <aside className="journal-personal" id="about" aria-labelledby="about-title">
          <img src="/assets/med-aziz-portrait.jpg" alt="" width="160" height="160" loading="lazy" />
          <div>
            <span className="chapter-label">MED AZIZ HRAGHI / ENSTAB</span>
            <h3 id="about-title">Outside the project view.</h3>
            <p>I’m studying digitalisation and data analysis at ENSTAB. Alongside building software, I’ve worked in internship teams and helped organize a programming community.</p>
            <div className="personal-role-picker" role="group" aria-label="Explore Aziz’s experience">
              {Object.entries(roles).map(([id, item]) => (
                <button type="button" key={id} aria-pressed={role === id} onClick={() => setRole(id)}>{item.label}</button>
              ))}
            </div>
            <div className="personal-role-note" aria-live="polite">
              <p>{currentRole.text}</p>
              <a href={currentRole.href}>{currentRole.link} ↗</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
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
        <h2>Have a project<br />in mind?<br /><em>Say hello.</em></h2>
        <div>
          <p>I’m interested in applied AI roles and teams building products around real data.</p>
          <a href="mailto:medazizhraghi@gmail.com" className="contact-email">medazizhraghi@gmail.com <span aria-hidden="true">↗</span></a>
        </div>
      </motion.div>
      <div className="contact-bottom">
        <span>© 2026 MED AZIZ HRAGHI</span>
        <div>
          <a href="https://github.com/azizhraghi" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href="https://www.linkedin.com/in/med-aziz-hraghi-b45a04248/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href={cvUrl} download="HraghiMedAziz_CV.pdf">CV ↓</a>
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
        <HelloAziz />
        <Work />
        <About />
        <Toolchain />
      </main>
      <Contact />
    </>
  )
}

export default App
export { projects, SystemGraph }
