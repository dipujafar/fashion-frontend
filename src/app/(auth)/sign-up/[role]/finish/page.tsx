import React from "react";
import Container from "@/components/shared/Container";
import AuthFinishContainer from "@/app/(auth)/auth-finish/_components/AuthFinishContainer";
import { roleOptions } from "@/data/dummyData.tsx/userRoleData";
import { notFound, redirect } from "next/navigation";
import { UserRole } from "@/types";

export const metadata = {
    title: "Finish Registration",
    description: "Complete your role verification details",
};

export default async function AuthFinishPage({ params }: { params: Promise<{ role: string }> }) {

    const { role } = await params;
    const db_role = roleOptions[role];

    if (!db_role) {
        return notFound();
    }

    const isIndividual = db_role === UserRole.INDIVIDUAL_USER;

    if(isIndividual) {
        redirect(`/sign-in`);
    }

    return (
        <div className="lg:space-y-12 space-y-7 py-5 lg:py-8">
            <Container>
                <AuthFinishContainer role={db_role} />
            </Container>
        </div>
    );
}

