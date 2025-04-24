"use client"

import { toastMessageHandler } from "@/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { TypeNewPasswordSchema } from "../schemes";
import { passwordRecoveryService } from "../services";

export function useNewPasswordMutation() {
    const router = useRouter() 
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
        mutationKey: ['new password'], 
        mutationFn: ({
            values, 
        }: {
            values: TypeNewPasswordSchema
        }) => passwordRecoveryService.new(values, token), 
        onSuccess() {
            toast.success('Пароль успешно изменён', {
                description: 
                'Теперь вы можете войти в свой аккаунт.'
            })
            router.push('/dashboard/setting')
        },
        onError(error){
            toastMessageHandler(error)
        }
        
    })

    return {newPassword, isLoadingNew}
}