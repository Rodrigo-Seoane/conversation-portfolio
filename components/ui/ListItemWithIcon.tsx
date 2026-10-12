"use client";

import React, { ComponentType } from "react";
import { CheckCircle, IconProps } from "@phosphor-icons/react";

export type ListItemType = "accent" | "primary" | "secondary";

export interface ListItemWithIconProps {
  type?: ListItemType;
  icon?: ComponentType<IconProps>;
  multiline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ListItemWithIcon: React.FC<ListItemWithIconProps> = ({
  type = "accent",
  icon: Icon = CheckCircle,
  multiline = false,
  className = "",
  children,
}) => {
  const iconColorClasses: Record<ListItemType, string> = {
    accent: "text-body-content-accent",
    primary: "text-content-action-primary",
    secondary: "text-content-action-secondary",
  };

  const alignClass = multiline ? "items-start" : "items-center";

  return (
    <div className={`flex ${alignClass} gap-2 text-body-content-primary ${className}`.trim()}>
      <Icon size={16} className={`shrink-0 mt-0.5 ${iconColorClasses[type]}`} aria-hidden="true" />
      <span className="type-body-lg text-body-content-primary mb-0">{children}</span>
    </div>
  );
};
