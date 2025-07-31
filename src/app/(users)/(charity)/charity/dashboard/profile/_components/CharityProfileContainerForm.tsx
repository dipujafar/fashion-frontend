"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import CommonButton from "@/components/ui/common-button";
import { Label } from "@/components/ui/label";
import { ImageUp, Trash2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import CustomAvatar from "@/components/shared/CustomAvatar";
import CountryStateCitySelector from "@/components/ui/country-state-city-selector";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import tiktok from "@/assets/icons/tiktokIcon.png";
import XIcon from "@/assets/icons/x-icon.png";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { DocumentIcon } from "@/icons";
import TextEditor from "@/components/ui/text-editor";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(1, { message: "First Name is required" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, { message: "Last Name is required" }),
  image: z.string().optional(), // avatar image
  coverImage: z.string().optional(), // cover image added here
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(1, { message: "Phone Number is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  storeName: z.string().optional(),
  about: z.string().optional(),
  country: z.string({
    required_error: "Please select a country.",
  }),
  streetAddress: z.string().min(5, {
    message: "Street address must be at least 5 characters.",
  }),
  city: z.string({
    required_error: "Please select a city.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  mission: z
    .string({ required_error: "Mission is required" })
    .min(1, { message: "Mission is required" }),
  uploadDocument: z.any().optional(),
  businessTags: z
    .array(z.string())
    .min(1, { message: "At least one business tag is required" }),
  aboutOrganization: z
    .string()
    .min(10, { message: "Details must be at least 10 characters." }),
  socialMedia: z.array(
    z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      x: z.string().optional(),
      tiktok: z.string().optional(),
    })
  ),
});

const CharityProfileContainerForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState("");
  const [businessTags, setBusinessTags] = useState<string[]>([
    "T-shirt",
    "Shoes",
    "Jeans",
  ]);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [document, setDocument] = useState<string[] | null>(["Document.pdf"]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!businessTags.includes(currentTag.trim())) {
        const newTags = [...businessTags, currentTag.trim()];
        setBusinessTags(newTags);
        form.setValue("businessTags", newTags);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = businessTags.filter((tag) => tag !== tagToRemove);
    setBusinessTags(newTags);
    form.setValue("businessTags", newTags);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Ziaul Haque",
      lastName: "Shapona",
      userName: "Prince Shapona",
      email: "shapona@me.com",
      phoneNumber: "+8801712345678",
      streetAddress: "Banasree",
      zipCode: "5444",
      country: "Bangladesh",
      city: "Dhaka",
      state: "Dhaka Division",
      storeName: "Fish Store",
      about: "I am a fish seller",
      businessTags: ["T-shirt", "Shoes", "Jeans"],
      socialMedia: [
        {
          instagram: "https://www.instagram.com",
          facebook: "https://www.facebook.com",
          x: "https://www.x.com",
          tiktok: "https://www.tiktok.com",
        },
      ],
    },
  });
  const { register, setValue, control } = form;

  const handleImageChange = (files: any) => {
    if (files && files?.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleCoverImageChange = (files: any) => {
    if (files && files?.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setCoverImagePreview(url);
    } else {
      setCoverImagePreview(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      form.setValue("uploadDocument", file);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const handleImageFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles = Array.from(files).slice(0, 8 - images.length);
      const newPreviews: string[] = [];

      newFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            newPreviews.push(result);
            if (newPreviews.length === newFiles.length) {
              setImages((prev) => [...prev, ...newFiles]);
              setImagePreviews((prev) => [...prev, ...newPreviews]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [images.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleImageFileUpload(e.dataTransfer.files);
    },
    [handleImageFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    // Clean up object URL to prevent memory leaks
    if (imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
  };


  console.log("images", images);
  console.log("images", imagePreviews);

  return (
    <div className="lg:space-y-12 space-y-7 ">
      <Card className="  shadow-none border-none py-0">
        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-4 w-full"
            >
              <div className="relative">
                {/* Cover Image upload */}
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative w-full h-40 md:h-60 xl:h-64 rounded-lg mb-6">
                        <Image
                          src={
                            coverImagePreview ||
                            "/dummyImages/charity-cover-images.jpg"
                          }
                          alt="Cover Preview"
                          fill
                          className="object-cover w-full h-full "
                        />

                        <Input
                          id="coverImageInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            handleCoverImageChange(e.target.files);
                          }}
                        />
                        <label
                          htmlFor="coverImageInput"
                          className={cn(
                            "absolute bottom-4 right-4 bg-black/60 text-white size-8 rounded-full cursor-pointer hover:bg-slate-500 flex justify-center items-center"
                          )}
                        >
                          <ImageUp size={20} />
                        </label>

                        {coverImagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setCoverImagePreview(null);
                              field.onChange(null);
                            }}
                            className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Avatar upload */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:-bottom-16 -bottom-24">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative size-44 mx-auto">
                          <CustomAvatar
                            className="md:size-40 size-28 object-cover mx-auto"
                            img={
                              imagePreview ||
                              "/dummyImages/charity-profile-image.png"
                            }
                            name="Ali Asraf"
                            fallbackClass="lg:text-4xl"
                          />

                          <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleImageChange(e.target.files);
                            }}
                          />
                          <label
                            htmlFor="avatarInput"
                            className={cn(
                              "absolute md:bottom-8 bottom-16  md:right-4 right-10 bg-black/60 text-white md:size-[29px] size-6 flex-center rounded-full cursor-pointer hover:bg-slate-500",
                              imagePreview && "hidden"
                            )}
                          >
                            <ImageUp className="md:size-5 size-4" />
                          </label>
                          {imagePreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                field.onChange(null);
                              }}
                              className="absolute top-2 right-5 bg-red-500 text-white p-1 rounded-full"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="md:space-y-6 space-y-4 md:mt-20 mt-14 ">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your First Name"
                              {...field}
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5]"
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
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Last Name"
                              {...field}
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5] "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your User Name"
                          {...field}
                          className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5] "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex md:flex-row flex-col  gap-4">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Email"
                              {...field}
                              className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  md:py-5 bg-[#F5F5F5]"
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
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <PhoneInput
                              // @ts-ignore
                              value={field.value}
                              onChange={field.onChange}
                              international
                              defaultCountry="US"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* -------------------------------- business tag ------------------------------------ */}
                <div>
                  <FormLabel>Business Tag</FormLabel>
                  <div className="space-y-2">
                    <Input
                      placeholder="Write business tag and press enter"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] md:py-5"
                    />
                    {businessTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {businessTags.map((tag, index) => (
                          <div
                            key={index}
                            className="bg-primary-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          >
                            {tag}
                            <X
                              size={14}
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {form.formState.errors.businessTags && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.businessTags.message}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-2xl font-medium my-3">
                    About Organization
                  </h4>
                  <FormField
                    control={form.control}
                    name="aboutOrganization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Write about your organization</FormLabel>
                        <FormControl>
                          <TextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Write about your organization"
                            className="bg-[#F8FAFC] min-h-[100px] border-[#707071] rounded-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Images */}
                  <div className="space-y-4 mt-2">
                    <label className="text-base font-medium">
                      Upload Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviews?.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-video border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            <img
                              src={preview || "/placeholder.svg"}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {images?.length < 8 && (
                        <div
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer relative"
                        >
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              handleImageFileUpload(e.target.files)
                            }
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500 text-center px-2">
                            Drop images or click to upload
                          </span>
                        </div>
                      )}
                    </div>

                
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium ">
                    Social Media Link (Optional)
                  </label>
                  <div className="grid sm:grid-cols-2  gap-4 mt-2">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={instagram}
                        alt="logo"
                        className="w-[40px] h-[40px]"
                      />
                      <Input
                        {...form.register(`socialMedia.${0}.instagram`)}
                        type="text"
                        placeholder="Enter Your Instagram Link"
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={facebook}
                        alt="logo"
                        className="w-[40px] h-[40px]"
                      />
                      <Input
                        {...form.register(`socialMedia.${0}.facebook`)}
                        type="text"
                        placeholder="Enter Your Facebook Link"
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={XIcon}
                        alt="logo"
                        className="w-[40px] h-[40px]"
                      />
                      <Input
                        {...form.register(`socialMedia.${0}.x`)}
                        type="text"
                        placeholder="Enter Your X Link"
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={tiktok}
                        alt="logo"
                        className="w-[40px] h-[40px]"
                      />
                      <Input
                        {...form.register(`socialMedia.${0}.tiktok`)}
                        type="text"
                        placeholder="Enter Your Tiktok Link"
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded bg-[#F5F5F5] md:py-5"
                      />
                    </div>
                  </div>
                </div>

                {/* ------------------------------------- mission --------------------------------- */}
                <FormField
                  control={form.control}
                  name="mission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your business mission"
                          {...field}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded bg-[#F5F5F5] min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ------------------------------------- upload document --------------------------------- */}
                <div>
                  <FormLabel>Upload Document</FormLabel>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-[#F5F5F5]">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex justify-center items-center gap-x-1.5 group">
                          <p className="mt-2 text-sm text-gray-600">
                            {uploadedFile ? uploadedFile.name : "Select a file"}
                          </p>

                          {uploadedFile && (
                            <div className="">
                              <Trash2
                                color="red"
                                size={20}
                                className="cursor-pointer"
                                onClick={() => setUploadedFile(null)}
                              />
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {document?.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-[#FFF9F9] mt-3 flex items-center justify-between gap-x-2 px-3 py-2 rounded-xl"
                      style={{ boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.11)" }}
                    >
                      <div className="flex items-center gap-x-2">
                        <DocumentIcon className="w-10 h-10" />
                        <h4 className="text-[#E12728]">{doc}</h4>
                      </div>
                      <Trash2
                        onClick={() => setDocument(null)}
                        color="red"
                        size={20}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Country, State, City Selector */}
                <div className="grid w-full items-center gap-1.5">
                  <Label>Location</Label>
                  <CountryStateCitySelector
                    control={control}
                    setValue={setValue}
                    register={register}
                    userAddress={{
                      country: form.getValues("country"),
                      state: form.getValues("state"),
                      city: form.getValues("city"),
                    }}
                  />
                </div>
              </div>

              <CommonButton className="w-full">Save</CommonButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharityProfileContainerForm;
