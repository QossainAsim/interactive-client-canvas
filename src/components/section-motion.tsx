type MotionKind = 'journey' | 'stories' | 'answers' | 'contact'

export function SectionMotion({ kind }: { kind: MotionKind }) {
  const isJourney = kind === 'journey'
  return <div className={`section-motion motion-art--${kind}`} aria-hidden="true">
    <svg className="motion-svg" viewBox={isJourney ? '0 0 700 220' : '0 0 220 160'} focusable="false">
      {kind === 'journey' && <>
        <path className="motion-orbit" d="M28 110 C110 20 185 200 270 110 S430 20 515 110 S630 195 674 105" />
        <path className="motion-route" d="M16 148 C96 148 92 49 176 64 S266 176 350 116 S460 35 536 82 S610 145 684 58" />
        <circle className="motion-node" cx="96" cy="120" r="8" />
        <circle className="motion-node" cx="258" cy="137" r="8" />
        <circle className="motion-node" cx="448" cy="60" r="8" />
        <circle className="motion-node" cx="614" cy="126" r="8" />
      </>}
      {kind === 'stories' && <>
        <circle className="story-orbit" cx="110" cy="80" r="51" />
        <path className="story-star" d="M110 18 L117 69 L168 80 L117 87 L110 142 L103 87 L52 80 L103 69 Z" />
        <circle cx="110" cy="80" r="5" />
      </>}
      {kind === 'answers' && <>
        <circle className="answer-ring" cx="110" cy="80" r="48" />
        <path className="answer-spark" d="M110 33 L116 73 L156 80 L116 87 L110 127 L104 87 L64 80 L104 73 Z" />
        <circle cx="110" cy="80" r="4" />
      </>}
      {kind === 'contact' && <>
        <rect className="contact-frame" x="24" y="27" width="172" height="106" rx="10" />
        <line x1="44" y1="55" x2="174" y2="55" />
        <line x1="44" y1="76" x2="125" y2="76" />
        <line x1="44" y1="97" x2="154" y2="97" />
        <path className="contact-scan" d="M44 55 H174" />
        <circle className="contact-point" cx="174" cy="55" r="5" />
      </>}
    </svg>
    {isJourney && <div className="motion-labels"><span>Insight</span><span>Experience</span><span>Build</span><span>Momentum</span></div>}
  </div>
}
