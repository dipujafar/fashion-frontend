
import { roleOptions } from '@/data/dummyData.tsx/userRoleData';
import { UserRole } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react'
import SignUpForm from '../components/SignUpForm';

async function SignupPage({ params, }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const db_role = roleOptions[role];

  if (!db_role) {
    return notFound();
  }

  const isCharity = db_role === UserRole.CHARITABLE_ORGANIZATION || db_role === UserRole.CHARITY_SHOP;
  
  return (
    <div>
      <SignUpForm isCharity={isCharity} role={db_role} />
    </div>
  )
}

export default SignupPage