"use client";
import type { KeyboardEvent } from "react";
import { coverageOptions, type CoverageId } from "../../_data/services";
import s from "../../speedcar.module.css";

type Props = {
  selected: CoverageId[];
  onToggle: (id: CoverageId) => void;
  unavailable?: CoverageId[];
};

export function CarDiagram({ selected, onToggle, unavailable = [] }: Props) {
  const groupProps = (id: CoverageId) => ({
    role: "button",
    tabIndex: unavailable.includes(id) ? -1 : 0,
    "aria-label": coverageOptions.find((option) => option.id === id)?.name,
    "aria-pressed": selected.includes(id),
    "aria-disabled": unavailable.includes(id),
    className: `${s.glassTarget} ${selected.includes(id) ? s.glassSelected : ""} ${unavailable.includes(id) ? s.glassUnavailable : ""}`,
    onClick: () => {
      if (!unavailable.includes(id)) onToggle(id);
    },
    onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
      if (
        (event.key === "Enter" || event.key === " ") &&
        !unavailable.includes(id)
      ) {
        event.preventDefault();
        onToggle(id);
      }
    },
  });
  return (
    <div className={s.carDiagramWrap}>
      <svg
        viewBox="0 0 400 510"
        className={s.carDiagram}
        role="group"
        aria-label="اختيار أجزاء الزجاج على رسم سيارة من الأعلى"
      >
        <defs>
          <linearGradient
            id="sc-car-body"
            x1="100"
            y1="60"
            x2="300"
            y2="470"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#44433f" />
            <stop offset=".48" stopColor="#161719" />
            <stop offset="1" stopColor="#292a2d" />
          </linearGradient>
        </defs>
        <path
          d="M105 84h-7v60h7m190-60h7v60h-7M105 355h-7v69h7m190-69h7v69h-7"
          stroke="#080808"
          strokeWidth="16"
        />
        <path
          d="M121 84Q124 37 166 30h68q42 7 45 54l8 87v179l-6 71q-3 42-39 54h-84q-36-12-39-54l-6-71V171Z"
          fill="url(#sc-car-body)"
          stroke="#777772"
          strokeWidth="1.5"
        />
        <path
          d="M143 81q57-24 114 0m-118 18q61-25 122 0m-119 330q58 12 116 0"
          stroke="#8d8d86"
          strokeOpacity=".35"
        />
        <path
          d="M145 50h110m-128 18 18-10m127 10-18-10"
          stroke="#e4d8c4"
          strokeWidth="2"
        />
        <path d="M132 450h26m84 0h26" stroke="#aa7661" strokeWidth="3" />
        <g {...groupProps("front")}>
          <title>الزجاج الأمامي</title>
          <path d="M137 129q63-21 126 0l-18 47h-90Z" />
        </g>
        <path
          d="M156 183h88l7 132-12 14h-78l-12-14Z"
          fill="#202123"
          stroke="#777772"
          strokeOpacity=".55"
        />
        <g {...groupProps("four-windows")}>
          <title>الأربع شبابيك</title>
          <path d="m126 169 23 17-3 65-22-9Zm-2 85 23 7 6 64-24 22Zm150-85-23 17 3 65 22-9Zm2 85-23 7-6 64 24 22Z" />
        </g>
        <g {...groupProps("rear")}>
          <title>الزجاج الخلفي</title>
          <path d="m153 338 94 0 17 48q-64 17-128 0Z" />
        </g>
        <g stroke="#82715b" strokeWidth=".7" fill="none">
          <path d="M262 153h53l12-12h33" />
          <path d="M128 232H76l-12-12H30" />
          <path d="M265 364h52l12 12h30" />
        </g>
        <g fill="#a99880" fontSize="11" fontFamily="monospace">
          <text x="325" y="132">
            FRONT
          </text>
          <text x="24" y="209">
            SIDE
          </text>
          <text x="322" y="396">
            REAR
          </text>
        </g>
        <path d="M185 11h30m-15-7v14" stroke="#5f5347" />
        <path d="M185 496h30m-15-7v14" stroke="#5f5347" />
      </svg>
      <p>
        اضغط على الزجاج أو استخدم قائمة التغطية.
        <br />
        الرسم يوضح الأجزاء المختارة، وليس درجة نفاذ الضوء.
      </p>
    </div>
  );
}
