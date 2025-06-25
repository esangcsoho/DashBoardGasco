"use client";

import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { Card, Text } from "@tremor/react";

const progressCircleVariants = tv({
  slots: {
    background: "",
    circle: "",
  },
  variants: {
    variant: {
      primary: {
        background: "stroke-blue-200 dark:stroke-blue-500/30",
        circle: "stroke-[#0066FF] dark:stroke-blue-500",
      },
      success: {
        background: "stroke-green-200 dark:stroke-green-500/30",
        circle: "stroke-[#22C55E] dark:stroke-green-500",
      },
      warning: {
        background: "stroke-orange-200 dark:stroke-orange-500/30",
        circle: "stroke-[#F59E0B] dark:stroke-orange-500",
      },
      danger: {
        background: "stroke-red-200 dark:stroke-red-500/30",
        circle: "stroke-[#EF4444] dark:stroke-red-500",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface GascoProgressCircleProps
  extends Omit<React.SVGProps<SVGSVGElement>, "value">,
    VariantProps<typeof progressCircleVariants> {
  value?: number;
  max?: number;
  showAnimation?: boolean;
  radius?: number;
  strokeWidth?: number;
  title?: string;
  description?: string;
  formatValue?: (value: number) => string;
  children?: React.ReactNode;
}

const defaultFormatValue = (value: number) => `${value}%`;

const GascoProgressCircle = React.forwardRef<SVGSVGElement, GascoProgressCircleProps>(
  (
    {
      value = 0,
      max = 100,
      radius = 48,
      strokeWidth = 8,
      showAnimation = true,
      variant,
      className,
      title,
      description,
      formatValue = defaultFormatValue,
      children,
      ...props
    }: GascoProgressCircleProps,
    forwardedRef,
  ) => {
    const safeValue = Math.min(max, Math.max(value, 0));
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (safeValue / max) * circumference;

    const { background, circle } = progressCircleVariants({ variant });

    const content = (
      <div className="relative">
        <svg
          ref={forwardedRef}
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          className={cn("-rotate-90 transform", className)}
          role="progress circle"
          aria-label="progress bar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          data-max={max}
          data-value={safeValue ?? null}
          {...props}
        >
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke=""
            strokeLinecap="round"
            className={cn("transition-colors ease-linear", background())}
          />
          {safeValue >= 0 ? (
            <circle
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              fill="transparent"
              stroke=""
              strokeLinecap="round"
              className={cn(
                "transition-colors ease-linear",
                circle(),
                showAnimation &&
                  "transform-gpu transition-all duration-300 ease-in-out",
              )}
            />
          ) : null}
        </svg>
        <div className={cn("absolute inset-0 flex items-center justify-center")}>
          {children || (
            <Text className="text-xl font-semibold">
              {formatValue(safeValue)}
            </Text>
          )}
        </div>
      </div>
    );

    if (title || description) {
      return (
        <Card className="flex flex-col items-center gap-4 p-6">
          {content}
          {title && (
            <Text className="text-center font-medium">{title}</Text>
          )}
          {description && (
            <Text className="text-center text-sm text-gray-600">
              {description}
            </Text>
          )}
        </Card>
      );
    }

    return content;
  },
);

GascoProgressCircle.displayName = "GascoProgressCircle";

export { GascoProgressCircle, type GascoProgressCircleProps }; 