'use client'

import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { PinGate } from '@/components/admin/PinGate'

export default function AdminPortalPage() {
  return (
    <PinGate>
      <AdminDashboard />
    </PinGate>
  )
}
