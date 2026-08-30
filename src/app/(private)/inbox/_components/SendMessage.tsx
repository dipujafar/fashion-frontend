"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSendNewMsgMutation } from '@/redux/api/message.api'
import { Camera, LoaderCircle, Send } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function SendMessage({ username }: { username: string }) {

    const [handleSendMessage, { isLoading }] = useSendNewMsgMutation();

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();
            const form = e.currentTarget;
            const msgInput = form?.message as HTMLFormElement
            if (msgInput?.value) {
                await handleSendMessage({ text: msgInput?.value, receiverUserName: username }).unwrap();
                form.reset()
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error?.data?.message || "Message sending failed");
        }
    }


    return (
        <div className="mt-3 flex w-full items-center pb-2">
            <div className='mx-2'>
                <input type="file" id="fileInput" className="hidden" />
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer flex flex-col items-center">
                    <Button
                        variant="outline"
                        type="button"
                        className="w-fit flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 border-none shadow-none bg-transparent pl-4 h-10 cursor-pointer">
                        <Camera className='size-6' />
                    </Button>
                </label>
            </div>

            <form
                onSubmit={handleSubmitForm}
                className='w-full'>
                <div className="flex w-full items-stretch gap-x-4 relative">
                    <Input
                        placeholder="Type a message"
                        type="text"
                        name='message'
                        className="w-full bg-white border-[#e1e1e1] shadow-none focus-visible:ring-0 focus:ring-0 focus:border focus-visible:border-primary-black px-4 pr-10 py-5 rounded-3xl"
                    />
                    <button disabled={isLoading} type='submit' className={cn("cursor-pointer absolute right-4 top-3", isLoading && "cursor-not-allowed")}>
                        {!isLoading ? <Send
                            size={20}
                            color="#d55758"
                            className=""
                        /> : <LoaderCircle className='animate-spin' />}
                    </button>
                </div>
            </form>
        </div>

    )
}

export default SendMessage