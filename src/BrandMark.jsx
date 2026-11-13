export default function BrandMark({ animate = false }) {
  return (
    <svg className={animate ? 'brand-mark brand-mark--draw' : 'brand-mark'}
      viewBox="0 0 126 54" fill="none" aria-hidden="true">
      <path pathLength="1" d="M8 43V11L22 29L36 11V43M47 43L60 11L73 43M51 33H69M84 11V43M108 11V43M84 27H108"
        stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="121" cy="43" r="4" fill="var(--accent)" />
    </svg>
  )
}
