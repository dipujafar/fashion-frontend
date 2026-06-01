"use client"
import React from 'react'

import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import profileSchema from './Schema';
import { getFirstErrorMessage } from '@/utils/modifyFormError';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

function MyProfile() {

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
    });

    const { register, setValue, control } = form;

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        console.log(data)
    };

    const onError = (errors: any) => {
        const firstErrorMessage = getFirstErrorMessage(errors);
        toast.error(firstErrorMessage);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="md:space-y-6 space-y-4 max-w-4xl"
            >
                <div className="rounded-2xl p-8 gap-6 border border-gray-200 shadow-sm">
                    <div className="flex pb-4 flex-row justify-between items-center gap-4">
                        <p>Your Photo</p>
                        <div className="flex items-center gap-4">
                            <img
                                alt="John Doe"
                                className="size-[90px] object-cover rounded-full"
                                data-authorname="Michael Dam"
                                data-authorurl="https://unsplash.com/@michaeldam"
                                data-blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                                data-photoid="iEEBWgY_6lA"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTAzMTh8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTQ5MjM3Nzd8MA&ixlib=rb-4.1.0&q=80&w=200"
                            />

                            <Button type='button' className="gap-2">
                                <Camera className="size-4" />
                                <span>Edit Photo</span>
                            </Button>

                        </div>

                    </div>

                    <Separator />

                    <div className="space-y-5 mt-5">
                        {/* <div className="flex flex-row justify-between items-center gap-2 w-full">
                            <p className="text-sm text-foreground">First Name</p>
                            <input type="text" className="border rounded-md px-3 py-2" placeholder="John" />
                        </div> */}

                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-between items-center'>
                                        <FormLabel className='text-foreground'>First Name</FormLabel>
                                        <div className='w-52 md:w-72 flex flex-col'>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your First Name"
                                                    {...field}
                                                    className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-transparent md:py-5 shadow-none w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />

                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-between items-center'>
                                        <FormLabel className='text-foreground'>Last Name</FormLabel>
                                        <div className='w-52 md:w-72 flex flex-col'>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Last Name"
                                                    {...field}
                                                    className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-transparent md:py-5 shadow-none w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />

                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-between items-center'>
                                        <FormLabel className='text-foreground'>Phone number</FormLabel>
                                        <div className='w-52 md:w-72 flex flex-col'>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Phone Number"
                                                    {...field}
                                                    className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-transparent md:py-5 shadow-none w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                    </div>
                </div>

                <div className="rounded-xl p-6 gap-6 border border-gray-200 shadow-sm">
                    <FormField
                        control={form.control}
                        name="vacationMode"
                        render={({ field }) => (
                            <FormItem className='flex flex-row justify-between items-center'>
                                <FormLabel className='text-foreground text-base'>Vacation Mode</FormLabel>
                                <FormControl>
                                    <Switch checked={field.value}
                                        onCheckedChange={field.onChange}
                                        id="airplane-mode"/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}

export default MyProfile