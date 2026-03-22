import { create } from 'zustand'

interface RoutineTask {
  id: string
  name: string
  frequency: 'AM' | 'PM' | 'BOTH'
  isCompleted: boolean
  completedAt?: Date
}

interface RoutineStore {
  tasks: RoutineTask[]
  toggleTask: (id: string) => void
  resetDailyTasks: () => void
  getTasksByFrequency: (frequency: 'AM' | 'PM') => RoutineTask[]
}

export const useRoutineStore = create<RoutineStore>((set, get) => ({
  tasks: [
    { id: 'r1', name: 'Nettoyage visage', frequency: 'BOTH', isCompleted: false },
    { id: 'r2', name: 'Sérum hydratant', frequency: 'BOTH', isCompleted: false },
    { id: 'r3', name: 'Crème de jour SPF', frequency: 'AM', isCompleted: false },
    { id: 'r4', name: 'Méditation 5 min', frequency: 'AM', isCompleted: false },
    { id: 'r5', name: 'Démaquillage', frequency: 'PM', isCompleted: false },
    { id: 'r6', name: 'Crème de nuit', frequency: 'PM', isCompleted: false },
    { id: 'r7', name: 'Auto-massage visage', frequency: 'PM', isCompleted: false }
  ],
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedAt: !task.isCompleted ? new Date() : undefined
            }
          : task
      )
    })),
  resetDailyTasks: () =>
    set((state) => ({
      tasks: state.tasks.map((task) => ({ ...task, isCompleted: false, completedAt: undefined }))
    })),
  getTasksByFrequency: (frequency) =>
    get().tasks.filter(
      (task) => task.frequency === frequency || task.frequency === 'BOTH'
    )
}))
