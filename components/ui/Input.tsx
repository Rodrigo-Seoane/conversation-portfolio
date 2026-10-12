"use client";

import React, { useState } from "react";
import { CaretDown, Check, Info } from "@phosphor-icons/react";

/* ─── 1. Label Component ─── */
export interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  infoText?: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  optional = false,
  infoText,
  className = "",
  children,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-flex items-center gap-1 type-body-xs font-semibold text-body-content-primary mb-1 select-none ${className}`.trim()}
    >
      <span>{children}</span>
      {required && <span className="text-accent-error text-xs font-bold" aria-hidden="true">*</span>}
      {optional && <span className="text-body-content-placeholder font-normal text-[10px]">(optional)</span>}
      {infoText && (
        <span title={infoText} className="cursor-help inline-flex items-center">
          <Info size={10} className="text-body-content-placeholder shrink-0" />
        </span>
      )}
    </label>
  );
};

/* ─── 2. TextField Component (Single-line Input) ─── */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: React.ComponentType<{ size?: number; className?: string }>;
  rightIcon?: React.ComponentType<{ size?: number; className?: string }>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, optional, error, helperText, leftIcon: LeftIcon, rightIcon: RightIcon, id, className = "", ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col w-full">
        {label && (
          <Label htmlFor={inputId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {LeftIcon && <LeftIcon size={20} className="absolute left-3 text-body-content-placeholder pointer-events-none" />}
          <input
            ref={ref}
            id={inputId}
            className={`w-full h-[40px] px-3 py-2 text-[14px] leading-[20px] bg-surfaces-section-form-field text-body-content-primary placeholder:text-body-content-placeholder rounded-small border border-transparent focus:border-content-action-primary focus:bg-white focus:outline-none transition-all duration-150 ${
              LeftIcon ? "pl-9" : ""
            } ${RightIcon ? "pr-9" : ""} ${error ? "border-accent-error focus:border-accent-error" : ""} ${className}`.trim()}
            {...props}
          />
          {RightIcon && <RightIcon size={20} className="absolute right-3 text-body-content-placeholder pointer-events-none" />}
        </div>
        {error && <span className="text-[12px] text-accent-error mt-1">{error}</span>}
        {helperText && !error && <span className="text-[12px] text-body-content-placeholder mt-1">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ─── 3. TextArea Component (Multi-line Input) ─── */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  helperText?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, optional, error, helperText, id, className = "", rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col w-full">
        {label && (
          <Label htmlFor={inputId} required={required} optional={optional}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`w-full min-h-[108px] px-3 py-2 text-[14px] leading-[20px] bg-surfaces-section-form-field text-body-content-primary placeholder:text-body-content-placeholder rounded-small border border-transparent focus:border-content-action-primary focus:bg-white focus:outline-none transition-all duration-150 resize-y ${
            error ? "border-accent-error focus:border-accent-error" : ""
          } ${className}`.trim()}
          {...props}
        />
        {error && <span className="text-[12px] text-accent-error mt-1">{error}</span>}
        {helperText && !error && <span className="text-[12px] text-body-content-placeholder mt-1">{helperText}</span>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

/* ─── 4. Select Dropdown Component ─── */
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  required,
  optional,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col w-full relative ${className}`.trim()}>
      {label && <Label required={required} optional={optional}>{label}</Label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[40px] px-3 py-2 text-[14px] leading-[20px] bg-surfaces-section-form-field text-left flex items-center justify-between rounded-small border border-transparent focus:border-content-action-primary focus:bg-white focus:outline-none transition-all duration-150 ${
          error ? "border-accent-error" : ""
        }`}
      >
        <span className={selectedOption ? "text-body-content-primary font-medium" : "text-body-content-placeholder"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown size={16} className={`text-body-content-placeholder transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-surfaces-section-form-field border border-surfaces-section-featured rounded-regular shadow-lg overflow-hidden py-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full px-3 py-2 text-left text-[14px] leading-[20px] transition-colors flex items-center justify-between ${
                opt.value === value
                  ? "bg-surfaces-section-featured font-semibold text-body-content-primary"
                  : "text-body-content-primary hover:bg-surfaces-section-featured/60"
              }`}
            >
              <span>{opt.label}</span>
              {opt.value === value && <Check size={14} className="text-body-content-primary" />}
            </button>
          ))}
        </div>
      )}
      {error && <span className="text-[12px] text-accent-error mt-1">{error}</span>}
    </div>
  );
};

/* ─── 5. Control (Checkbox / Radio) ─── */
export interface ControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "checkbox" | "radio";
}

export const Control: React.FC<ControlProps> = ({ label, type = "checkbox", className = "", ...props }) => {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`.trim()}>
      <input
        type={type}
        className={`w-4 h-4 text-content-action-primary bg-surfaces-section-form-field border-content-action-secondary-300 focus:ring-content-action-primary ${
          type === "checkbox" ? "rounded-small" : "rounded-full"
        }`}
        {...props}
      />
      <span className="type-body-md text-body-content-primary mb-0">{label}</span>
    </label>
  );
};
