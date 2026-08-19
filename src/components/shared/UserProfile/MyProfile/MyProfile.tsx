"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import profileSchema from './Schema';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import LoadingSpin from '@/components/ui/loading-spin';
import { IUser } from '@/types';
import Image from 'next/image';
import { defaultImg } from '@/utils/defaultImg';
import { UpdateProfile } from '@/lib/Actions/Profile.action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

function MyProfile({ user }: { user: IUser }) {

    const [image, setImage] = useState<File | null>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.fname ?? "",
            lastName: user?.lname ?? "",
            phoneNumber: user?.phone ?? "",
            bio: user.bio ?? "",
            userName: user?.userName ?? "",
            email: user?.email ?? "",
            website: user?.website ?? "",
        },
    });

    const { formState: { isSubmitting: isLoading } } = form;

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {

        try {
            const payload = {
                phone: data.phoneNumber, fname: data.firstName, lname: data.lastName, website: data.website, description: data.description, bio: data.bio
            }

            const form = new FormData();

            form.append('data', JSON.stringify(payload))

            if (image) {
                form.append('picture', image);
            }

            await UpdateProfile({ payload: form });

            toast.success("Profile Updated Successfully");

        } catch (error: any) {
            if (isRedirectError(error)) {
                throw error; // Let Next.js handle the redirect
            }
            toast.error(error?.message || "Failed to update profile");
        }

    };

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-4 max-w-4xl"
            >

                <div className="">

                    <div className="flex pb-4">
                        <div className="flex items-center gap-4">
                            <Image
                                alt="profile img"
                                className="size-28 object-cover rounded-full"
                                height={1000}
                                width={1000}
                                placeholder='blur'
                                blurDataURL={defaultImg?.placeholderImg}
                                src={image ? URL.createObjectURL(image) : (user?.picture?.url || defaultImg.empty_user)}
                            />

                            <label htmlFor="chosePhoto" className="cursor-pointer">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
                                    <Camera className="size-4" />
                                    Edit Photo
                                </span>
                            </label>

                            <input
                                onChange={fileonChange}
                                multiple={false}
                                type="file"
                                name="chosePhoto"
                                id="chosePhoto"
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="mt-5">

                        <p className="text-xl font-semibold mb-6">User Details</p>

                        <div className='space-y-7 max-w-lg mb-8'>
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled
                                                    className="border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4 disabled:text-black"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='email'
                                                    disabled
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                        <p className="text-xl font-semibold mb-6">About me</p>

                        <div className='space-y-7 max-w-lg'>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your First Name"
                                                    {...field}
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Last Name"
                                                    {...field}
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Phone number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Your Phone Number"
                                                    {...field}
                                                    type='tel'
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Short Bio..."
                                                    {...field}
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-3 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Website</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://...."
                                                    {...field}
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                <Button size={"lg"} type='submit' className="cursor-pointer gap-2 disabled:cursor-not-allowed rounded-none mt-5" disabled={isLoading}>
                    {isLoading ? <span className="loader" /> : "Save Changes "}
                </Button>

            </form>
        </Form>
    )
}

export default MyProfile