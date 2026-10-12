import React from "react";
import Image from "next/image";

export type BrandIconSize = "large" | "medium" | "small" | "xs";
export type BrandIconVariant = "gold" | "dark" | "transparent";

export interface BrandIconProps {
  size?: BrandIconSize | number;
  variant?: BrandIconVariant;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  size = "large",
  variant = "gold",
  className = "",
}) => {
  // Dimension mapping
  const pxSize =
    typeof size === "number"
      ? size
      : size === "large"
      ? 56
      : size === "medium"
      ? 40
      : size === "small"
      ? 32
      : 24;

  // Currently only the gold variant SVG is exported from Figma.
  // When dark / transparent variants are exported, map them here.
  const srcMap: Record<BrandIconVariant, string> = {
    gold: "/images/brand_Icon-gold-56.svg",
    dark: "/images/brand_Icon-gold-56.svg",        // TODO: replace when dark variant is exported
    transparent: "/images/brand_Icon-gold-56.svg",  // TODO: replace when transparent variant is exported
  };

  return (
    <Image
      src={srcMap[variant]}
      alt="Rodrigo Seoane — Brand Icon"
      width={pxSize}
      height={pxSize}
      priority
      className={`shrink-0 select-none transition-transform group-hover:scale-105 ${className}`.trim()}
    />
  );
};
