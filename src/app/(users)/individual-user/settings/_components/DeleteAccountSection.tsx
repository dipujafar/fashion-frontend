import { Button } from '@/components/ui/button';
import React from 'react';

const DeleteAccountSection = () => {
    return (
        <div>
            <h2 className="md:text-2xl text-xl font-semibold text-[#333]">Account Delete</h2>
            <div className='mt-2 space-y-2 rounded-lg p-4' style={{boxShadow: " 0px 4px 11px 0px rgba(0, 0, 0, 0.09)"}}>
                <p className='text-center text-[#6B6B6B]'>Are you sure you want to delete your account</p>
                <Button className='w-full bg-black md:py-5 uppercase cursor-pointer'>Confirm</Button>
            </div>
        </div>
    );
};

export default DeleteAccountSection;