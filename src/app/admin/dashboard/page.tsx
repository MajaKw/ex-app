import { redirect } from 'next/navigation'
import { checkRole } from '@/src/utils/clerk'

export default function AdminDashboard() {

    if (!checkRole('admin')) {
        redirect('/')
      }

    return(
        <>
        <h1>This is the admin dashboard</h1>
        <p>This page is restricted to users with the 'admin' role.</p>
      </>
    )
}