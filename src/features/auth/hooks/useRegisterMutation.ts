import { toastMessageHandler } from "@/shared/utils";
import { useMutation } from "@tanstack/react-query";
import { TypeRegisterSchema } from "../schemes";
import { authService } from "../services";

export function useRegisterMutation() {
    const {mutate: register, isPending: isLoadingRegister} = useMutation({
        mutationKey: ['register user'], 
        mutationFn: ({
           values
        }: {
            values: TypeRegisterSchema
        }) => authService.register(values),
        onSuccess(data: any) {
           toastMessageHandler(data)
        },
        onError(error) {
            toastMessageHandler(error)
        }
    })

    return { register, isLoadingRegister }
}