"use client"

import { toastMessageHandler } from "@/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { TypeLoginSchema } from "../schemes";
import { authService } from "../services";

export function useLoginMutation(setIsShowFactor: Dispatch<SetStateAction<boolean>>) {
    const router = useRouter()

    const {mutate: login, isPending: isLoadingLogin} = useMutation({
        mutationKey: ['login user'], 
        mutationFn: ({
           values
        }: {
            values: TypeLoginSchema
        }) => authService.login(values),
        onSuccess(data: any) {
           if(data.message) {
            toastMessageHandler(data)
            setIsShowFactor(true)
           } else {
            toast.success('Успешная авторизация')
            router.push('/dashboard/settings')
           }
        },
        onError(error) {
            toastMessageHandler(error)
        }
    })

    return { login, isLoadingLogin }
}