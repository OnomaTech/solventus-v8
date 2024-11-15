"use client"

import { useState, useEffect } from "react"
import { Input } from "../input"
import { cn } from "../../../lib/utils"

interface EditableCellProps {
  value: string
  row: any
  column: {
    id: string
  }
  onUpdate: (value: string) => void
}

export function EditableCell({
  value: initialValue,
  row,
  column,
  onUpdate,
}: EditableCellProps) {
  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    setIsEditing(false)
    if (value !== initialValue) {
      onUpdate(value)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setValue(initialValue)
    }
  }

  if (isEditing) {
    return (
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus
        className="h-8 w-[180px]"
      />
    )
  }

  return (
    <div
      className={cn(
        "truncate py-2 cursor-pointer hover:bg-muted/50 rounded px-2",
        column.id === "email" && "max-w-[180px]"
      )}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </div>
  )
}
