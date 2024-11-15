"use client"

import { Button } from "../../ui/button"
import type { ClientTemplate } from "../../../types/clientTemplate"

interface TemplateListProps {
  templates: ClientTemplate[]
  onEdit: (template: ClientTemplate) => void
  onDelete: (templateId: string) => void
}

export function TemplateList({ templates, onEdit, onDelete }: TemplateListProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3 text-left">Template Name</th>
            <th className="p-3 text-left">Created</th>
            <th className="p-3 text-left">Last Updated</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-b">
              <td className="p-3">{template.name}</td>
              <td className="p-3">{new Date(template.createdAt).toLocaleDateString()}</td>
              <td className="p-3">{new Date(template.updatedAt).toLocaleDateString()}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(template)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDelete(template.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
