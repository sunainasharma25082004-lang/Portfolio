import { Suspense } from 'react'
import AdminDashboardClient from './AdminDashboardClient'

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading admin...</div>}>
      <AdminDashboardClient />
    </Suspense>
  )
}
