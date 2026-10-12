"use client";

import React, { ComponentType } from "react";
import { IconProps } from "@phosphor-icons/react";

export type BadgeType = "info" | "success" | "warning" | "error" | "secondary";
export type BadgeColorValue = "50" | "100" | "200" | "300" | "400" | "500" | "600";

export interface BadgeProps {
  type?: BadgeType;
  colorValue?: BadgeColorValue;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  type = "secondary",
  colorValue = "100",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = "",
  children,
}) => {
  // Mapping background styles according to semantic tokens
  const bgClasses: Record<BadgeType, Record<string, string>> = {
    info: {
      "50": "bg-accent-info-50",
      "100": "bg-accent-info-100",
      "200": "bg-accent-info-200",
      "300": "bg-accent-info-300",
      "400": "bg-accent-info",
      "500": "bg-accent-info-500",
      "600": "bg-accent-info-600",
    },
    success: {
      "50": "bg-accent-success-50",
      "100": "bg-accent-success-100",
      "200": "bg-accent-success-200",
      "300": "bg-accent-success-300",
      "400": "bg-accent-success",
      "500": "bg-accent-success-500",
      "600": "bg-accent-success-600",
    },
    warning: {
      "50": "bg-accent-warning-50",
      "100": "bg-accent-warning-100",
      "200": "bg-accent-warning-200",
      "300": "bg-accent-warning-300",
      "400": "bg-accent-warning",
      "500": "bg-accent-warning-500",
      "600": "bg-accent-warning-600",
    },
    error: {
      "50": "bg-accent-error-50",
      "100": "bg-accent-error-100",
      "200": "bg-accent-error-200",
      "300": "bg-accent-error-300",
      "400": "bg-accent-error",
      "500": "bg-accent-error-500",
      "600": "bg-accent-error-600",
    },
    secondary: {
      "50": "bg-content-action-secondary-50",
      "100": "bg-content-action-secondary-100",
      "200": "bg-content-action-secondary-200",
      "300": "bg-content-action-secondary-300",
      "400": "bg-content-action-secondary-500",
      "500": "bg-content-action-secondary-600",
      "600": "bg-content-action-secondary-700",
    },
  };

  const bgStyle = bgClasses[type]?.[colorValue] || bgClasses.secondary["100"];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 min-h-[20px] rounded-full text-[10px] leading-[12px] font-semibold tracking-[0.04em] text-content-action-secondary-700 ${bgStyle} ${className}`.trim()}
    >
      {LeftIcon && <LeftIcon size={12} className="shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {RightIcon && <RightIcon size={12} className="shrink-0" aria-hidden="true" />}
    </span>
  );
};
