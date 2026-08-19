
import React from 'react'
import ChangepasswordForm from './_components/ChangepasswordForm'

function ChangepasswordPage() {
  return (
    <div className="space-y-5">

      <div className='mt-5'>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Change Password</h2>
        </div>
        <p className="mt-1 text-sm text-gray-600 max-w-2xl">
          Change your account password to keep your account secure. Make sure to choose a strong and unique password that you haven't used before.
        </p>
      </div>

      <ChangepasswordForm />
    </div>
  )
}

export default ChangepasswordPage