import { cn } from "../../../lib/utils"
import { Alert, AlertDescription } from "../../ui/alert"
import { LoadingDots } from "../../ui/loading-dots"

interface ClientFormStatusProps {
  isLoading?: boolean
  error?: string | null
  className?: string
}

export function ClientFormStatus({ isLoading, error, className }: ClientFormStatusProps) {
  if (!isLoading && !error) return null

  return (
    <div className={cn("space-y-2", className)}>
      {isLoading && (
        <div className="flex items-center justify-center py-2">
          <LoadingDots />
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

interface FieldErrorProps {
  error?: string
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null

  return (
    <span className="text-sm text-destructive">
      {error}
    </span>
  )
}
