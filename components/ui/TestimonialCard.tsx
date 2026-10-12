"use client";

import React from "react";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react";

export interface TestimonialCardProps {
  variant?: "card" | "slider";
  quote: string;
  name: string;
  role: string;
  companyLogoUrl?: string;
  avatarUrl?: string;
  title?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  variant = "card",
  quote,
  name,
  role,
  companyLogoUrl,
  avatarUrl,
  title,
  className = "",
}) => {
  if (variant === "slider") {
    return (
      <div
        className={`w-full max-w-[960px] p-6 bg-surfaces-section-featured rounded-regular flex flex-col md:flex-row gap-6 items-start text-body-content-primary ${className}`.trim()}
      >
        {(avatarUrl || companyLogoUrl) && (
          <div className="flex flex-col items-center gap-3 shrink-0">
            {avatarUrl && (
              <div className="relative w-[96px] h-[96px] rounded-full overflow-hidden border-2 border-content-action-primary">
                <Image src={avatarUrl} alt={name} fill className="object-cover" />
                <div className="absolute inset-0 bg-content-action-primary/40 mix-blend-overlay pointer-events-none" />
              </div>
            )}
            {companyLogoUrl && (
              <div className="relative w-[134px] h-[40px]">
                <Image src={companyLogoUrl} alt="Company logo" fill className="object-contain" />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 flex-1">
          <h3 className="type-h2 font-semibold text-body-content-primary mb-0">{name}</h3>
          <p className="type-body-xl font-semibold text-body-content-primary/80 mb-1">{role}</p>
          <p className="type-body-lg text-body-content-primary mb-0">“{quote}”</p>
        </div>
      </div>
    );
  }

  // Card Variant
  return (
    <div
      className={`w-full max-w-[342px] p-5 bg-surfaces-section-featured border-l-4 border-body-content-accent rounded-regular shadow-md flex flex-col gap-6 text-body-content-primary ${className}`.trim()}
    >
      <Quotes size={32} className="text-body-content-accent shrink-0" weight="fill" />

      {title && <h4 className="type-h4 font-semibold text-body-content-primary mb-0">{title}</h4>}

      <p className="type-body-md text-body-content-primary flex-1 mb-0">“{quote}”</p>

      <div className="flex items-center gap-3 pt-2 border-t border-body-content-primary/10">
        {avatarUrl && (
          <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden border border-content-action-primary shrink-0">
            <Image src={avatarUrl} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-content-action-primary/40 mix-blend-overlay pointer-events-none" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="type-body-xs font-extrabold uppercase tracking-[0.04em] text-body-content-primary/70">{role}</span>
          <span className="type-body-xl font-semibold text-body-content-primary">{name}</span>
        </div>
      </div>
    </div>
  );
};
