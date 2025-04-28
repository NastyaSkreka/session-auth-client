"use client"

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verificationService } from "../services";

export function useVerificationMutation() {
    const router = useRouter()

    const { mutate: verification, isPending, isSuccess, isError } = useMutation({
        mutationKey: ['new verification'],
        mutationFn: (token: string | null) => 
            verificationService.newVerification(token),
    
        onSuccess(data) {
            console.log('SUCCESS:', data);
            toast.success('Почта успешно подтверждена')
            router.push('/dashboard/settings')
        },
        onError(error) {
            console.log('ERROR:', error);
            toast.error('Ошибка при подтверждении почты');
            router.push('/auth/login');
          }
    })

    return {verification, isPending, isSuccess, isError}
}