"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

interface TemplateSettingsProps {
  name: string
  onNameChange: (name: string) => void
}

export function TemplateSettings({ name, onNameChange }: TemplateSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
