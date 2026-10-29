"use client";

import React, { useState } from "react";
import {
    IClothDonation,
    useGetCharityClothDonationsQuery,
} from "@/redux/api/donation.api";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search, Shirt } from "lucide-react";
import { Pagination } from "react-pagination-bar";
import EmptyContributionState from "../../../donation-contribution/_components/EmptyContributionState";
import CharityClothDonationCard from "./CharityClothDonationCard";

function CLothRaisedContainer() {
    const [page, setPage] = useState(1);
    const [donationType, setDonationType] = useState<string>("ALL");
    const [status, setStatus] = useState<string>("ALL");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const queryParams: {
        page: number;
        limit: number;
        donationType?: string;
        status?: string;
        searchTerm?: string;
    } = {
        page,
        limit: 10,
    };

    if (donationType !== "ALL") {
        queryParams.donationType = donationType;
    }
    if (status !== "ALL") {
        queryParams.status = status;
    }
    if (searchTerm.trim()) {
        queryParams.searchTerm = searchTerm.trim();
    }

    const { data, isLoading, isFetching } = useGetCharityClothDonationsQuery(
        queryParams,
        { refetchOnMountOrArgChange: true }
    );

    const donations: IClothDonation[] = data?.data?.data || [];

    const meta = data?.data?.meta;

    return (
        <div >


            {/* Filters Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Search by donor, condition, or notes..."
                        className="pl-9 h-10 bg-white border-[#e1e1e1] rounded-none shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black text-sm"
                    />
                </div>

                {/* Select Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <Select
                        value={donationType}
                        onValueChange={(val) => {
                            setDonationType(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[155px] !h-10 bg-white border-[#e1e1e1] rounded-none shadow-none focus:ring-0 focus-visible:ring-0 focus:border-primary-black text-sm cursor-pointer">
                            <SelectValue placeholder="Donation Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none p-0">
                            <SelectItem
                                value="ALL"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                All Types
                            </SelectItem>
                            <SelectItem
                                value="SINGLE"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Single Item
                            </SelectItem>
                            <SelectItem
                                value="MULTIPLE"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Multiple Items
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={status}
                        onValueChange={(val) => {
                            setStatus(val);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[150px] !h-10 bg-white border-[#e1e1e1] rounded-none shadow-none focus:ring-0 focus-visible:ring-0 focus:border-primary-black text-sm cursor-pointer">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none p-0">
                            <SelectItem
                                value="ALL"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                All Status
                            </SelectItem>
                            <SelectItem
                                value="PENDING"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Pending
                            </SelectItem>
                            <SelectItem
                                value="ACCEPTED"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Accepted
                            </SelectItem>
                            <SelectItem
                                value="COMPLETED"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Completed
                            </SelectItem>
                            <SelectItem
                                value="REJECTED"
                                className="rounded-none cursor-pointer py-2.5 px-3"
                            >
                                Rejected
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Content */}
            {isLoading || isFetching ? (
                <div className="flex-center h-48 lg:h-60">
                    <span className="loaderDark !w-10" />
                </div>
            ) : donations.length === 0 ? (
                <EmptyContributionState
                    icon={Shirt}
                    title="No cloth donations received yet"
                    description="Clothing donation requests submitted by donors to your charity shop will appear here for review."
                />
            ) : (
                <div className="space-y-4">
                    {donations.map((donation) => (
                        <CharityClothDonationCard key={donation.id} donation={donation} />
                    ))}

                    {/* Pagination */}
                    {meta && meta.total > (meta.limit || 10) && (
                        <div className="pt-4 flex justify-center">
                            <Pagination
                                currentPage={page}
                                itemsPerPage={meta.limit || 10}
                                onPageChange={(pageNumber) => setPage(pageNumber)}
                                totalItems={meta.total || 0}
                                pageNeighbours={1}
                                startLabel={null}
                                prevLabel={<ChevronLeft className="size-3.5" />}
                                nextLabel={<ChevronRight className="size-3.5" />}
                                onlyPageNumbers={true}
                                endLabel={null}
                                customClassNames={{
                                    rpbItemClassName:
                                        "rounded px-2.5 h-7 cursor-pointer border border-gray-200 ml-1.5 text-sm",
                                    rpbItemClassNameActive:
                                        "border-none bg-primary-black text-white",
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


export default CLothRaisedContainer
