"use client";

import React, { ComponentType } from "react";
import { IconProps } from "@phosphor-icons/react";

export type MetricOrientation = "vertical" | "horizontal";
export type MetricType = "numeric" | "icon";
export type MetricChipValue = "golden" | "orange" | "transparent";
export type MetricBackground = "primary" | "secondary" | "featured" | "transparent";

export interface MetricTileProps {
  orientation?: MetricOrientation;
  type?: MetricType;
  chipValue?: MetricChipValue;
  background?: MetricBackground;
  number?: string | number;
  unit?: string;
  icon?: ComponentType<IconProps>;
  title: string;
  description?: string;
  className?: string;
}

export const MetricTile: React.FC<MetricTileProps> = ({
  orientation = "vertical",
  type = "numeric",
  chipValue = "golden",
  background = "featured",
  number,
  unit,
  icon: Icon,
  title,
  description,
  className = "",
}) => {
  // Tile background mapping
  const bgClasses: Record<MetricBackground, string> = {
    primary: "bg-surfaces-section-primary text-body-content-primary",
    secondary: "bg-surfaces-section-secondary text-body-content-secondary",
    featured: "bg-surfaces-section-featured text-body-content-primary",
    transparent: "bg-transparent text-body-content-primary",
  };

  // Chip background mapping
  const chipClasses: Record<MetricChipValue, string> = {
    golden: "bg-surfaces-section-primary text-body-content-primary",
    orange: "bg-content-action-auxiliary text-body-content-primary",
    transparent: "bg-transparent text-current",
  };

  const isDarkBg = background === "secondary";
  const titleTextColor = isDarkBg ? "text-body-content-secondary" : "text-body-content-primary";
  const descTextColor = isDarkBg ? "text-body-content-secondary/80" : "text-body-content-primary/80";

  const isHorizontal = orientation === "horizontal";
  const layoutClasses = isHorizontal ? "flex flex-row items-center gap-6" : "flex flex-col gap-6";

  const chipWidthClass = isHorizontal
    ? type === "icon"
      ? "min-w-[48px] h-[48px]"
      : "px-3 py-1"
    : type === "icon"
    ? "min-w-[72px] h-[48px]"
    : "px-3 py-1";

  return (
    <div className={`p-4 rounded-regular ${bgClasses[background]} ${layoutClasses} ${className}`.trim()}>
      {/* Metric Chip / Value */}
      <div className={`inline-flex items-center justify-center rounded-small ${chipClasses[chipValue]} ${chipWidthClass}`}>
        {type === "numeric" ? (
          <div className="flex items-baseline gap-0.5">
            <span className="type-h1 font-semibold">{number}</span>
            {unit && <span className="type-body-lg font-regular">{unit}</span>}
          </div>
        ) : (
          Icon && <Icon size={32} className="shrink-0" aria-hidden="true" />
        )}
      </div>

      {/* Text Block */}
      <div className="flex flex-col gap-3 flex-1">
        <h4 className={`type-body-md font-extrabold uppercase tracking-[0.04em] ${titleTextColor} mb-0`}>
          {title}
        </h4>
        {description && <p className={`type-body-md ${descTextColor} mb-0`}>{description}</p>}
      </div>
    </div>
  );
};
