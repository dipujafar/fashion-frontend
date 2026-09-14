"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IUser, UserRole } from '@/types';
import Image from 'next/image';
import { defaultImg } from '@/utils/defaultImg';
import { UpdateProfile } from '@/lib/Actions/Profile.action';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import profileUpdateSchema, { charitySchema } from './Schema';

const MAX_PHOTOS = 8;
const INPUT_ID = "photo-uploader-input";

function MyProfile({ user }: { user: IUser }) {

    const [image, setImage] = useState<File | null>(null);

    const [defaultCharityImgs, setDefaultCharityImgs] = useState<{ id: string, url: string }[]>(user?.charityGalleries || []);
    const [charityImgs, setCharityImgs] = useState<File[]>([]);
    const [dltCharityImgIds, setDltCharityImgIds] = useState<string[]>([]);

    const isCharity = user?.auth?.role == UserRole.CHARITABLE_ORGANIZATION || user?.auth?.role == UserRole.CHARITY_SHOP

    const profileSchema = isCharity ? profileUpdateSchema.merge(charitySchema) : profileUpdateSchema;

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
            description: user?.description ?? "",
            facebook: user?.facebook ?? "",
            instagram: user?.instagram ?? "",
            twitter: user?.twitter ?? "",
            support_email: user?.support_email ?? "",
        },
    });

    const { formState: { isSubmitting: isLoading } } = form;

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {

        try {

            const { phoneNumber, firstName, lastName, ...more } = data;

            const payload = {
                phone: phoneNumber, fname: firstName, lname: lastName,
                dltGalleries: dltCharityImgIds,
                ...more
            }

            const form = new FormData();

            form.append('data', JSON.stringify(payload))

            if (image) {
                form.append('picture', image);
            }

            for (let charityImg of charityImgs) {
                form.append('charityImgs', charityImg);
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

    const totalCount = defaultCharityImgs.length + charityImgs.length;

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
        e.target.value = "";
    };

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {

        const incoming = Array.from(e.target.files || []);

        if (incoming.length > 0) {
            setCharityImgs((prev) => {
                const room = MAX_PHOTOS - prev.length;
                return [...prev, ...incoming.slice(0, Math.max(room, 0))];
            });
        }
        // allow re-selecting the same file again later
        e.target.value = "";
    };

    const removeDefaultImg = (id: string) => {
        setDltCharityImgIds((prev) => [...prev, id]);
        setDefaultCharityImgs((prev) => prev.filter((img) => img.id !== id));
    };

    // Removing a freshly-added local file — just drop it from state
    const removeFile = (index: number) => {
        setCharityImgs((prev) => prev.filter((_, i) => i !== index));
    };

    const boxes = Array.from({ length: 8 });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:space-y-6 space-y-4 max-w-4xl">

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
                                                    className="border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4 "
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

                            {isCharity && <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="support_email"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Support Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='email'
                                                    className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-6 px-4"
                                                    placeholder="Enter Charity Support Email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>}

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

                        </div>

                        {isCharity && (
                            <div className='mt-8'>
                                <p className="text-xl font-semibold mb-6">About Charity</p>

                                <div className='space-y-7 max-w-lg'>

                                    <div className="flex-1">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem className=''>
                                                    <FormLabel className='text-gray-800 font-normal'>About Charity</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us about your charity..."
                                                            {...field}
                                                            className="bg-white border-[#e1e1e1] rounded shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black !text-base !py-3 px-4"
                                                            rows={5}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="">
                                        <div>
                                            <h2 className="text-lg lg:text-xl font-bold text-gray-900">Gallery</h2>
                                            <p className="text-sm mt-1 text-gray-500">Add some photos to your charity's gallery.</p>
                                        </div>

                                        <input
                                            id={INPUT_ID}
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            multiple
                                            className="hidden"
                                            onChange={handleFiles}
                                        />

                                        <div className="mt-4 grid grid-cols-3 md:grid-cols-4 gap-4">
                                            {boxes.map((_, i) => {
                                                // First show remaining default images
                                                if (i < defaultCharityImgs.length) {
                                                    const img = defaultCharityImgs[i];
                                                    return (
                                                        <div
                                                            key={img.id}
                                                            className="group relative aspect-square rounded-lg border border-dashed border-gray-300 overflow-hidden"
                                                        >
                                                            <Image
                                                                src={img?.url || defaultImg?.placeholderImg}
                                                                alt="Galary photo"
                                                                className="w-full h-full object-cover"
                                                                height={500}
                                                                width={500}
                                                                placeholder='blur'
                                                                blurDataURL={defaultImg?.placeholderImg}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeDefaultImg(img.id)}
                                                                className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center transition-opacity cursor-pointer"
                                                                aria-label="Remove photo"
                                                            >
                                                                <X size={12} strokeWidth={2.5} />
                                                            </button>
                                                        </div>
                                                    );
                                                }

                                                // Then show newly added local files
                                                const localIndex = i - defaultCharityImgs.length;
                                                const file = charityImgs[localIndex];

                                                if (file) {
                                                    return (
                                                        <div
                                                            key={`local-${localIndex}`}
                                                            className="group relative aspect-square rounded-lg border border-dashed border-gray-300 overflow-hidden"
                                                        >
                                                            <Image
                                                                src={URL.createObjectURL(file)}
                                                                alt="Charity photo"
                                                                className="w-full h-full object-cover"
                                                                height={500}
                                                                width={500}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(localIndex)}
                                                                className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center transition-opacity cursor-pointer"
                                                                aria-label="Remove photo"
                                                            >
                                                                <X size={12} strokeWidth={2.5} />
                                                            </button>
                                                        </div>
                                                    );
                                                }

                                                // Otherwise, empty upload box
                                                const isFull = totalCount >= MAX_PHOTOS;

                                                return (
                                                    <label
                                                        key={`empty-${i}`}
                                                        htmlFor={isFull ? undefined : INPUT_ID}
                                                        className={`aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 transition-colors ${isFull
                                                            ? "opacity-40 cursor-not-allowed"
                                                            : "cursor-pointer hover:border-gray-400 hover:bg-gray-50 hover:text-gray-500"
                                                            }`}
                                                    >
                                                        <Camera size={22} strokeWidth={1.75} />
                                                    </label>
                                                );
                                            })}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                        <p className="text-xl font-semibold mb-6 mt-8">Socials</p>

                        <div className='space-y-7 max-w-lg'>

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

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Facebook</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://facebook.com/..."
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
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://instagram.com/..."
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
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem className=''>
                                            <FormLabel className='text-gray-800 font-normal'>Twitter(X)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://x.com/..."
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