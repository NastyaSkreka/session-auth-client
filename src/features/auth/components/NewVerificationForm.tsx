"use client"

import { Loading } from "@/shared/components/ui";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useVerificationMutation } from "../hooks";
import { AuthWrapper } from "./AuthWrapper";

export function NewVerificationForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { verification, isPending, isSuccess, isError } = useVerificationMutation();

    const [isLoadingState, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            verification(token);
        }
    }, [token, verification]);

    useEffect(() => {
        if (!isPending) {
            setIsLoading(false);
        }
    }, [isPending]);

    return (
        <Suspense fallback={<Loading />}>
        <AuthWrapper heading="Подтверждение почты">
           
                {isLoadingState ? (
                    <Loading />
                ) : isError ? (
                    <div>Произошла ошибка. Попробуйте снова.</div>
                ) : isSuccess ? (
                    <div>Подтверждение завершено!</div>
                ) : null}
          
        </AuthWrapper>
        </Suspense>
    );
}