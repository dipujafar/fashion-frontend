import { GetQuesAnsWithProdDetails } from '@/lib/services/ProductDetails';
import React from 'react'
import { IQuesAns } from '@/types';
import SubmitYourReview from '../_components/review/SubmitYourReview';
import Image from 'next/image';
import { defaultImg } from '@/utils/defaultImg';
import moment from 'moment';
import { Redo2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import AddAnsForm from '../_components/review/AddAnsForm';

async function Questionpage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const questions = await GetQuesAnsWithProdDetails({ prodId: productId }) as { data: { data: IQuesAns[], isOwner: boolean } };

    return (
        <div>

            <div className='lg:space-y-8 space-y-5'>
                <div className={cn(" rounded-sm  space-y-4",)}>
                    <h3 className="md:text-3xl text-xl font-medium">Questions (0)</h3>
                    <div>

                        {/* ====================Submit Question============== */}
                        {!questions?.data?.isOwner && <section>
                            <h3>
                                Have a question that others might want to know? Add a public question.
                            </h3>
                            <SubmitYourReview prodId={productId} />
                        </section>}

                        {/* -------------------- display previous questions ------------- */}
                        <div>
                            {questions?.data?.data?.map((comment) => (
                                <div key={comment?.id}>
                                    <div
                                        className=" mt-4 border bg-gray-100 p-2 rounded flex justify-between"
                                    >
                                        <div className="flex space-x-3">
                                            <Image
                                                src={comment?.questioner?.picture?.url || defaultImg?.empty_user}
                                                alt="user img"
                                                width={100}
                                                height={100}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold">{comment?.questioner?.fname}</p>
                                                <p className="text-lg">{comment?.question}</p>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                {moment(comment?.createdAt).format("MM/DD/YYYY h:mm a")}
                                            </p>

                                            {(questions?.data?.isOwner && !comment?.answer) && <Popover>
                                                <PopoverTrigger>
                                                    <Button size={"sm"} className="mt-2 cursor-pointer">
                                                        Reply <Redo2 />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <AddAnsForm questionId={comment?.id} prodId={productId} />
                                                </PopoverContent>
                                            </Popover>}
                                        </div>
                                    </div>
                                    {comment?.answer && (
                                        <div className="mt-1 border-l-4 border-blue-400 pl-3 py-1">
                                            <p className="text-sm text-gray-700">{comment?.answer}</p>
                                            {comment?.answeredAt && <span className='text-xs text-gray-600'>{moment(comment?.answeredAt).format("MM/DD/YYYY h:mm a")}</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Questionpage