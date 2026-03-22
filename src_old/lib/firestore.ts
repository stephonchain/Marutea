import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// User Profile Operations
export const getUserProfile = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  return userDoc.exists() ? userDoc.data() : null
}

export const updateUserProfile = async (uid: string, data: any) => {
  await updateDoc(doc(db, 'users', uid), data)
}

export const createUserProfile = async (uid: string, data: any) => {
  await setDoc(doc(db, 'users', uid), {
    ...data,
    createdAt: Timestamp.now(),
    loyaltyPoints: 0
  })
}

// Appointments Operations
export const getUserAppointments = async (uid: string) => {
  const q = query(
    collection(db, 'appointments'),
    where('userId', '==', uid),
    where('status', '!=', 'cancelled')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const createAppointment = async (data: any) => {
  const appointmentRef = doc(collection(db, 'appointments'))
  await setDoc(appointmentRef, {
    ...data,
    createdAt: Timestamp.now(),
    status: 'confirmed'
  })
  return appointmentRef.id
}

// Loyalty Points Operations
export const updateLoyaltyPoints = async (uid: string, points: number) => {
  const userRef = doc(db, 'users', uid)
  const userDoc = await getDoc(userRef)

  if (userDoc.exists()) {
    const currentPoints = userDoc.data().loyaltyPoints || 0
    await updateDoc(userRef, {
      loyaltyPoints: currentPoints + points,
      lastPointsUpdate: Timestamp.now()
    })
  }
}

// Routine Operations
export const saveRoutineProgress = async (uid: string, routineData: any) => {
  const today = new Date().toISOString().split('T')[0]
  await setDoc(doc(db, 'routines', `${uid}_${today}`), {
    userId: uid,
    date: today,
    tasks: routineData,
    updatedAt: Timestamp.now()
  })
}
