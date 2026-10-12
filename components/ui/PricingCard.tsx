"use client";

import React from "react";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ListItemWithIcon } from "./ListItemWithIcon";

export interface PricingCardProps {
  type?: "default" | "best-deal";
  duration: string;
  title: string;
  idealFor: string;
  price: string;
  features: string[];
  badgeLabel?: string;
  ctaLabel?: string;
  ctaHref: string;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  type = "default",
  duration,
  title,
  idealFor,
  price,
  features,
  badgeLabel = "Best Deal",
  ctaLabel = "Request your estimate",
  ctaHref,
  className = "",
}) => {
  const isBestDeal = type === "best-deal";

  return (
    <div
      className={`relative w-full max-w-[380px] p-6 pt-10 bg-surfaces-section-featured hover:bg-surfaces-section-form-field border-b-4 border-body-content-auxiliary rounded-regular transition-all duration-300 flex flex-col gap-8 text-body-content-primary shadow-sm hover:shadow-lg group ${className}`.trim()}
    >
      {isBestDeal && (
        <div className="absolute -top-3 left-6">
          <Badge type="warning" colorValue="400">
            {badgeLabel}
          </Badge>
        </div>
      )}

      {/* Header Block */}
      <div className="flex flex-col gap-2">
        <span className="type-caption-lg text-body-content-accent">{duration}</span>
        <h3 className="type-h1 font-semibold text-body-content-primary mb-0">{title}</h3>
        <p className="type-body-md text-body-content-primary/80 mb-0">
          <strong className="font-semibold text-body-content-primary">Ideal For: </strong>
          {idealFor}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline font-display text-[54px] leading-[1.1] font-semibold text-body-content-primary">
        {price}
      </div>

      {/* Feature List */}
      <div className="flex flex-col gap-3 flex-1">
        {features.map((feature, idx) => (
          <ListItemWithIcon key={idx} type="accent">
            {feature}
          </ListItemWithIcon>
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Button size="large" type="primary" href={ctaHref} className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
};
