import { toastMessageHandler } from "@/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { TypeResetPasswordSchema } from "../schemes/reset-password.schema";
import { passwordRecoveryService } from "../services";

export function useResetPasswordMutation() {
    const { mutate: reset, isPending: isLoadingReset } = useMutation({
        mutationKey: ['reset password'], 
        mutationFn: ({
            values
        }: {
            values: TypeResetPasswordSchema
        }) => passwordRecoveryService.reset(values), 
        onSuccess() {
            toast.success('Проверьте почту', {
                description: 
                'На вашу почту была отправлена ссылка для подтверждения.'
            })
        },
        onError(error){
            toastMessageHandler(error)
        }
        
    })

    return {reset, isLoadingReset}
}