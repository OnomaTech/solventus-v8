"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          props.checked ? "bg-primary" : "bg-gray-200",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          {...props}
          onChange={(e) => {
            props.onChange?.(e)
            onCheckedChange?.(e.target.checked)
          }}
        />
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            props.checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </label>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }
