import { create } from 'zustand'

interface UserProfile {
  uid: string
  name: string
  email: string
  skinType: string
  concerns: string[]
  loyaltyPoints: number
}

interface Appointment {
  id: string
  serviceId: string
  serviceName: string
  dateTime: Date
  duration: number
  status: 'confirmed' | 'completed' | 'cancelled'
}

interface UserStore {
  user: UserProfile | null
  appointments: Appointment[]
  setUser: (user: UserProfile) => void
  updateLoyaltyPoints: (points: number) => void
  addAppointment: (appointment: Appointment) => void
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    uid: 'demo-user',
    name: 'Sophie',
    email: 'sophie@example.com',
    skinType: 'Mixte',
    concerns: ['Hydratation', 'Éclat'],
    loyaltyPoints: 750
  },
  appointments: [
    {
      id: '1',
      serviceId: 's1',
      serviceName: 'Soin Visage Éclat',
      dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 60,
      status: 'confirmed'
    }
  ],
  setUser: (user) => set({ user }),
  updateLoyaltyPoints: (points) =>
    set((state) => ({
      user: state.user ? { ...state.user, loyaltyPoints: state.user.loyaltyPoints + points } : null
    })),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
      )
    }))
}))
