"use client";

import React, { ComponentType, HTMLAttributes } from "react";
import Link from "next/link";
import { IconProps } from "@phosphor-icons/react";

export type ButtonSize = "large" | "medium" | "small";
export type ButtonType = "primary" | "secondary" | "destructive" | "onlyText" | "noPadding";
export type ButtonTheme = "light" | "dark";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  size?: ButtonSize;
  variant?: ButtonType;
  type?: ButtonType;
  htmlType?: "button" | "submit" | "reset";
  theme?: ButtonTheme;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = "medium",
  variant = "primary",
  type,
  htmlType = "button",
  theme = "light",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  href,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const buttonVariant = variant || type || "primary";
  // Base classes according to Design.md & components/Button.md
  // DRIFT FIX (see DRIFT.md #5, #6): duration-150 → duration-200 ease-out
  // (Design.md §4 Motion: default transition is ease-out 200ms). The
  // bespoke focus-visible classes were removed — the single global
  // :focus-visible rule in app/globals.css (DRIFT.md #6) now covers every
  // interactive element, including this one.
  const baseClasses =
    "inline-flex items-center justify-center font-body font-semibold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

  // Size classes
  // DRIFT FIX (see DRIFT.md #4, #5): rounded-md/rounded-sm renamed to the
  // real Figma token names (rounded-regular/rounded-small — Design.md §4).
  // Height/text/line-height arbitrary px replaced with references to Scale
  // tokens instead of raw numbers (Design.md §4/§5: never hardcode px).
  const sizeClasses = {
    large: "h-[var(--scale-16)] px-6 py-2 text-[length:var(--scale-4-5)] leading-[var(--scale-7)] rounded-regular gap-3",
    medium: "h-[var(--scale-12)] px-6 py-2 text-[length:var(--scale-4)] leading-[var(--scale-6)] rounded-regular gap-2",
    small: "h-[var(--scale-7)] px-3 py-1 text-[length:var(--scale-3)] leading-[var(--scale-5)] rounded-small gap-1.5",
  };

  // No padding type overrides size padding & height
  const noPaddingClasses = "h-auto p-0 text-[length:var(--scale-4)] leading-[var(--scale-6)] rounded-none gap-1.5 inline-flex";

  // Variant & Theme Styling Matrix
  let styleClasses = "";

  if (buttonVariant === "primary") {
    if (theme === "light") {
      styleClasses =
        "bg-content-action-secondary-700 text-content-action-primary hover:bg-content-action-secondary-500 active:bg-content-action-secondary-700 active:border active:border-content-action-primary";
    } else {
      styleClasses =
        "bg-content-action-primary text-content-action-secondary-700 hover:bg-content-action-primary-400 active:bg-content-action-primary active:border active:border-content-action-secondary-700";
    }
  } else if (buttonVariant === "secondary") {
    styleClasses =
      "bg-content-action-auxiliary text-content-action-secondary-700 hover:bg-content-action-auxiliary-400 active:bg-content-action-auxiliary active:border active:border-content-action-secondary-700";
  } else if (buttonVariant === "destructive") {
    styleClasses =
      "bg-accent-error text-content-action-secondary-700 hover:bg-accent-error-500 active:bg-accent-error";
  } else if (buttonVariant === "onlyText") {
    if (theme === "light") {
      styleClasses =
        "bg-transparent text-content-action-secondary-700 hover:text-content-action-secondary-500 active:text-content-action-secondary-700";
    } else {
      styleClasses =
        "bg-transparent text-content-action-primary hover:text-content-action-primary-300 active:text-content-action-primary";
    }
  } else if (buttonVariant === "noPadding") {
    if (theme === "light") {
      styleClasses =
        "bg-transparent text-content-action-secondary-700 hover:text-content-action-secondary-500 active:text-content-action-secondary-700 underline underline-offset-4";
    } else {
      styleClasses =
        "bg-transparent text-content-action-primary hover:text-content-action-primary-300 active:text-content-action-primary underline underline-offset-4";
    }
  }

  const iconSize = buttonVariant === "noPadding" ? 16 : size === "small" ? 16 : 24;

  const combinedClasses = `${baseClasses} ${
    buttonVariant === "noPadding" ? noPaddingClasses : sizeClasses[size]
  } ${styleClasses} ${className}`.trim();

  const content = (
    <>
      {LeftIcon && <LeftIcon size={iconSize} className="shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {RightIcon && <RightIcon size={iconSize} className="shrink-0" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={htmlType} className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
