export function handleClientError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

export function formatErrorMessage(action: string, detail?: string): string {
  return detail 
    ? `Failed to ${action}: ${detail}`
    : `Failed to ${action}`
}
