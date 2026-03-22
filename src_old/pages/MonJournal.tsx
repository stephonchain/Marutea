import { useRoutineStore } from '@/stores/routineStore'
import { useUserStore } from '@/stores/userStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Check, Sun, Moon, Sparkles } from 'lucide-react'

export function MonJournal() {
  const tasks = useRoutineStore((state) => state.tasks)
  const toggleTask = useRoutineStore((state) => state.toggleTask)
  const user = useUserStore((state) => state.user)

  const morningTasks = tasks.filter(
    (task) => task.frequency === 'AM' || task.frequency === 'BOTH'
  )
  const eveningTasks = tasks.filter(
    (task) => task.frequency === 'PM' || task.frequency === 'BOTH'
  )

  const calculateCompletion = (taskList: typeof tasks) => {
    const completed = taskList.filter((t) => t.isCompleted).length
    return Math.round((completed / taskList.length) * 100)
  }

  const TaskChecklist = ({
    tasks,
    icon: Icon,
    title,
    iconColor
  }: {
    tasks: typeof morningTasks
    icon: any
    title: string
    iconColor: string
  }) => {
    const completion = calculateCompletion(tasks)

    return (
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full ${iconColor} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-emerald-900" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-emerald-900">{title}</h3>
            <p className="text-sm text-emerald-900/60">{completion}% complété</p>
          </div>
          {completion === 100 && (
            <Sparkles className="w-6 h-6 text-rose-200" />
          )}
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer ${
                task.isCompleted
                  ? 'bg-emerald-50'
                  : 'bg-white border-2 border-emerald-50 hover:border-emerald-100'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  task.isCompleted
                    ? 'bg-emerald-900'
                    : 'border-2 border-emerald-200'
                }`}
              >
                {task.isCompleted && <Check className="w-4 h-4 text-white" />}
              </div>
              <span
                className={`flex-1 ${
                  task.isCompleted
                    ? 'text-emerald-900/60 line-through'
                    : 'text-emerald-900'
                }`}
              >
                {task.name}
              </span>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-4xl font-display text-emerald-900 mb-2">Mon Journal</h1>
        <p className="text-emerald-900/70">Suivez vos rituels beauté</p>
      </div>

      {/* Morning Routine */}
      <TaskChecklist
        tasks={morningTasks}
        icon={Sun}
        title="Routine du Matin"
        iconColor="bg-gradient-to-br from-rose-100 to-rose-200"
      />

      {/* Evening Routine */}
      <TaskChecklist
        tasks={eveningTasks}
        icon={Moon}
        title="Routine du Soir"
        iconColor="bg-gradient-to-br from-emerald-100 to-emerald-50"
      />

      {/* Beauty Profile */}
      <Card variant="gentle">
        <h3 className="font-medium text-emerald-900 mb-4 text-center">
          Mon Profil Beauté
        </h3>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4">
            <span className="text-sm text-emerald-900/60 block mb-1">Type de peau</span>
            <p className="text-lg font-display text-emerald-900">{user?.skinType}</p>
          </div>
          <div className="bg-white rounded-2xl p-4">
            <span className="text-sm text-emerald-900/60 block mb-2">
              Préoccupations principales
            </span>
            <div className="flex flex-wrap gap-2">
              {user?.concerns.map((concern) => (
                <Badge key={concern} variant="emerald">
                  {concern}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Motivational Message */}
      <Card variant="bubble" className="text-center">
        <div className="text-rose-200 mb-3">
          <Sparkles className="w-10 h-10 mx-auto" />
        </div>
        <p className="font-display text-lg text-emerald-900 leading-relaxed">
          Chaque geste compte sur le chemin de votre bien-être
        </p>
      </Card>
    </div>
  )
}
