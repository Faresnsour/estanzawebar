import type { ShinexCar } from "@/lib/shinex-demo";

/** Original, unbranded line drawings. No vehicle manufacturer's marks. */
export default function VehicleArt({ car = "sedan", className = "" }: { car?: ShinexCar; className?: string }) {
  const suv = car !== "sedan";
  const long = car === "suv7";
  return <svg className={className} viewBox="0 0 520 210" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={suv ? "M31 152 35 120Q40 109 61 105L129 92 176 45Q181 39 196 39L386 42Q407 45 420 66L448 98 482 107 490 148 478 164 453 164Q449 123 414 122Q374 121 373 164H146Q142 122 106 122Q68 122 65 163H39Z" : "M30 153 35 124Q43 111 75 105L159 93 211 57Q234 42 276 43L341 48Q361 51 383 72L415 98 474 111 488 126 486 153 474 162H452Q448 123 414 122Q374 122 373 164H146Q141 123 105 122Q66 122 64 161H38Z"} />
    <path d={suv ? `M150 91 185 51 241 51 235 91Z${long ? "M250 51 304 52 307 91 248 91ZM317 52 380 53 400 89 321 91Z" : "M250 51 371 54 399 90 248 91Z"}` : "M177 93 217 65Q239 52 265 54L257 92ZM276 55 337 60Q355 63 386 96L270 93Z"} />
    <path d={suv ? "M138 100 140 122M237 98 238 153M313 98 315 152M404 98 424 106 438 121M157 153H365" : "M169 100Q163 123 170 151L259 150 264 101M276 101 365 104Q379 114 362 149L273 150Z"} />
    <path d="M43 123 72 118 65 130 38 134M461 119 480 122 484 136 470 135ZM38 145H56M158 159H361M185 108H201M304 109H320" />
    {suv ? <path d="M181 33H360M158 175H361" /> : <path d="M83 106 160 100M385 96 428 107M201 157 364 157" />}
    {[105,414].map(x => <g key={x}>
      <circle cx={x} cy="161" r="32" /><circle cx={x} cy="161" r="24" /><circle cx={x} cy="161" r="4" />
      <path d={`M${x} 137V157M${x} 165V185M${x-24} 161H${x-4}M${x+4} 161H${x+24}M${x-17} 144  ${x-3} 158M${x+3} 164 ${x+17} 178M${x+17} 144 ${x+3} 158M${x-3} 164 ${x-17} 178`} strokeWidth="1.3" />
    </g>)}
    <path d="M23 195H490" opacity=".3" strokeWidth="1" />
  </svg>;
}

export function InteriorArt() {
  return <svg viewBox="0 0 600 285" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 227 36 152Q54 124 108 115L180 52Q220 24 295 29L402 41Q449 55 493 104L561 134 583 225" strokeWidth="2" />
    <path d="M54 227H549M91 117 184 65Q220 40 288 43L388 52Q431 64 469 105ZM306 44 315 112M178 67 161 119M117 129 510 130M88 231Q69 171 111 143M494 146 530 216" strokeWidth="1.5" />
    {[145,255,365].map((x,index)=><g key={x} transform={`translate(${x} ${index===2?110:120})`} strokeWidth="1.5">
      <path d="M0 16Q-3 0 12 0H25Q39 1 37 17L34 31H3ZM7 34Q29 28 41 40L58 99Q61 112 47 115H1Q-9 113-5 98L4 42ZM4 119H48Q64 119 70 132L74 144H-17L-13 132Q-9 120 4 119Z" />
      <path d="M11 42 5 103H44M18 43 38 101M-12 147H69" opacity=".5" />
    </g>)}
    <path d="M456 140 507 150 520 168 477 170 458 198M488 151 475 158M469 166 445 152" strokeWidth="2" />
    <ellipse cx="449" cy="144" rx="13" ry="22" transform="rotate(-23 449 144)" strokeWidth="2" />
    <path d="M132 160 110 168 111 216M542 197 532 217M109 228H522" opacity=".5" />
  </svg>;
}
