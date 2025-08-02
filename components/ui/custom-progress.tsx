import type React from "react"
import { Progress } from "./progress"
import { cn } from "@/lib/utils"

interface CustomProgressBarProps {
  value: number
  className?: string
  showSignalBars?: boolean,
  text?: string
}

export function CustomProgressBar({ value, className, text, showSignalBars = true }: CustomProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-1.5 p-1 border border-primary/20 rounded-md bg-background", className)}>
      <div className="flex-1">
        <Progress
          value={value}
          className="h-2 bg-muted"
          style={
            {
              "--progress-background": "hsl(var(--muted))",
              "--progress-foreground": "hsl(var(--primary))",
            } as React.CSSProperties
          }
        />
      </div>
      <Progress value={value}  />


      {showSignalBars && (
        <div className="flex items-end gap-0.5">
          <div className="w-0.5 h-1.5 bg-primary/60 rounded-sm" />
          <div className="w-0.5 h-2 bg-primary/60 rounded-sm" />
          <div className="w-0.5 h-2.5 bg-primary/60 rounded-sm" />
        </div>
      )}

      <span className="text-xs font-medium text-foreground min-w-[2rem]">{value}% Seat Filled</span>
    </div>
  )
}
