"use client"
import React, { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import CountryStateCitySelector from '@/components/ui/country-state-city-selector';
import LoadingSpin from '@/components/ui/loading-spin';
import { IUser } from '@/types';
import Image from 'next/image';
import { defaultImg } from '@/utils/defaultImg';
import { UpdateProfile } from '@/lib/Actions/Profile.action';

function MyProfile({ user }: { user: IUser }) {

    const [image, setImage] = useState<File | null>(null);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: user?.fname ?? "",
            lastName: user?.lname ?? "",
            phoneNumber: user?.phone ?? "",
            bio: user.bio ?? "",
            country: user?.country ?? "",
            state: user?.state ?? "",
            city: user?.city ?? "",
            streetAddress: user?.address ?? "",
            zipCode: user?.zip_code ?? "",
            vacationMode: user.vacationMode ?? false,
        },
    });

    const { register, setValue, control, formState: { errors, isSubmitting: isLoading } } = form;

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {

        try {
            const payload = {
                phone: data.phoneNumber, fname: data.firstName, lname: data.lastName, website: data.website, description: data.description, country: data.country, state: data.state, city: data.city, address: data.streetAddress, zip_code: data.zipCode, bio: data.bio, vacationMode: data.vacationMode
            }

            const form = new FormData();

            form.append('data', JSON.stringify(payload))

            if (image) {
                form.append('picture', image);
            }

            await UpdateProfile({ payload: form });

            toast.success("Profile Updated Successfully");

        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update profile");
        }

    };

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
    };


    const onError = (errors: any) => {
        // const firstErrorMessage = getFirstErrorMessage(errors);
        // toast.error(firstErrorMessage);
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
                            <Image
                                alt="profile img"
                                className="size-[90px] object-cover rounded-full"
                                height={200}
                                width={200}
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

                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem className='flex flex-row justify-between items-center'>
                                        <FormLabel className='text-foreground'>Bio</FormLabel>
                                        <div className='w-52 md:w-72 flex flex-col'>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Enter Your Bio"
                                                    {...field}
                                                    className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-transparent w-full"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </div>


                <div className="rounded-xl p-6 gap-6 border border-gray-200 shadow-sm">
                    <div className="grid w-full  items-center gap-1.5">
                        <Label className='text-foreground text-base'>Location</Label>
                        <CountryStateCitySelector
                            control={control}
                            setValue={setValue}
                            register={register}
                            errors={errors}
                            userAddress={
                                {
                                    country: user?.country,
                                    state: user?.state,
                                    city: user?.city,
                                    streetAddress: user?.address,
                                    zipCode: user?.zip_code,
                                }
                            }
                        />
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
                                        id="airplane-mode" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type='submit' className="ml-auto cursor-pointer flex flex-row items-center gap-2 disabled:cursor-not-allowed" disabled={isLoading}>
                    Save Changes {isLoading && <LoadingSpin color="white" />}
                </Button>

            </form>
        </Form>
    )
}

export default MyProfile