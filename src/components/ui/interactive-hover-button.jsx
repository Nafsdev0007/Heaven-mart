import React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  variant = "green",
  as: Component = "button",
  ...props
}) {
  const isWhiteVariant = variant === "white" || variant === "light" || variant === "white-bg"

  return (
    <Component
      className={cn(
        "group relative inline-flex items-center justify-center w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-all duration-300",
        isWhiteVariant
          ? "bg-[#F4F0E8] text-[#173332] border-[#F4F0E8]"
          : "bg-[#173332] text-[#F4F1EA] border-[#173332]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]",
            isWhiteVariant ? "bg-[#173332]" : "bg-[#F4F1EA]"
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className={cn(
          "absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
          isWhiteVariant ? "text-[#F4F0E8]" : "text-[#173332]"
        )}
      >
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Component>
  )
}

