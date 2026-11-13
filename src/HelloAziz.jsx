import BrandMark from './BrandMark.jsx'

export default function HelloAziz() {
  return (
    <section className="signal-atlas" aria-labelledby="aziz-name">
      <div className="atlas-inner">
        <div className="atlas-heading">
          <div className="atlas-intro">
            <span className="atlas-label">APPLIED AI / TUNISIA</span>
            <h1 id="aziz-name">Med Aziz<br /><span>Hraghi.</span></h1>
            <p className="atlas-opening">I like getting the pieces<br /> to work together.</p>
            <p className="atlas-bio">I’m a final-year engineering student at ENSTAB. At Talan Tunisia, I helped build the analysis and 3D workflow for UrbanMind, an urban planning tool.</p>
            <p className="atlas-availability">Available for a 6-month applied AI internship · Jan–Feb 2027</p>
            <div className="atlas-actions">
              <a href="#work">Explore the work <span aria-hidden="true">↘</span></a>
              <div className="atlas-secondary-actions">
                <a href="/assets/Med_Aziz_Hraghi_CV_2026.pdf" download="HraghiMedAziz_CV.pdf">Download CV ↓</a>
                <a href="https://github.com/azizhraghi" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
          <figure className="atlas-portrait">
            <img src="/assets/med-aziz-portrait.jpg" width="1024" height="1536"
              alt="Med Aziz Hraghi smiling in a black shirt" fetchPriority="high" />
            <span className="atlas-portrait-mark"><BrandMark /></span>
            <figcaption><span>MED AZIZ HRAGHI</span><span>ENGINEERING STUDENT / ENSTAB</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
