import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { TemplateTab } from '../../../types/clientTemplate'

interface TabManagerProps {
  tabs: TemplateTab[]
  onTabsChange: (tabs: TemplateTab[]) => void
  selectedTabId: string
  onTabSelect: (tabId: string) => void
  children?: React.ReactNode
}

export function TabManager({
  tabs,
  onTabsChange,
  selectedTabId,
  onTabSelect,
  children
}: TabManagerProps) {
  const [isAddingTab, setIsAddingTab] = useState(false)
  const [newTabName, setNewTabName] = useState('')

  const handleAddTab = () => {
    if (!newTabName.trim()) return

    const newTab: TemplateTab = {
      id: crypto.randomUUID(),
      name: newTabName.trim(),
      label: newTabName.trim(),
      sections: [],
      order: tabs.length
    }

    onTabsChange([...tabs, newTab])
    setNewTabName('')
    setIsAddingTab(false)
    onTabSelect(newTab.id)
  }

  const handleTabNameChange = (tabId: string, newName: string) => {
    const updatedTabs = tabs.map(tab =>
      tab.id === tabId
        ? { ...tab, name: newName, label: newName }
        : tab
    )
    onTabsChange(updatedTabs)
  }

  const handleDeleteTab = (tabId: string) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId)
    onTabsChange(updatedTabs)
    if (selectedTabId === tabId && updatedTabs.length > 0) {
      onTabSelect(updatedTabs[0].id)
    }
  }

  const handleReorderTab = (tabId: string, direction: 'up' | 'down') => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= tabs.length) return

    const updatedTabs = [...tabs]
    const [movedTab] = updatedTabs.splice(currentIndex, 1)
    updatedTabs.splice(newIndex, 0, movedTab)

    // Update order property
    const reorderedTabs = updatedTabs.map((tab, index) => ({
      ...tab,
      order: index
    }))

    onTabsChange(reorderedTabs)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tabs</h3>
        <Button onClick={() => setIsAddingTab(true)} variant="outline">
          Add Tab
        </Button>
      </div>

      {isAddingTab && (
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Tab Name"
            value={newTabName}
            onChange={e => setNewTabName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddTab()
              if (e.key === 'Escape') {
                setNewTabName('')
                setIsAddingTab(false)
              }
            }}
          />
          <Button onClick={handleAddTab}>Add</Button>
          <Button
            variant="outline"
            onClick={() => {
              setNewTabName('')
              setIsAddingTab(false)
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <Tabs value={selectedTabId} onValueChange={onTabSelect}>
        <TabsList className="w-full">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center">
              <TabsTrigger value={tab.id} className="flex-1">
                {tab.name}
              </TabsTrigger>
              <div className="flex items-center space-x-1 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReorderTab(tab.id, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReorderTab(tab.id, 'down')}
                  disabled={index === tabs.length - 1}
                >
                  ↓
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTab(tab.id)}
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            <div className="space-y-4">
              <Input
                placeholder="Tab Name"
                value={tab.name}
                onChange={e => handleTabNameChange(tab.id, e.target.value)}
              />
              {children}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
