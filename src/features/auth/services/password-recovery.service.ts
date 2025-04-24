import { api } from "@/shared/api"
import { TypeNewPasswordSchema, TypeResetPasswordSchema } from "../schemes"
import { IUser } from "../types"

class PasswordRecoveryService {
    public async reset(body: TypeResetPasswordSchema) {
        const response = await api.post<IUser>(
            'auth/password-recovery/reset', body
        )

        return response
    }

    public async new(body: TypeNewPasswordSchema, token: string | null) {
        const response = await api.post<IUser>(
            `auth/password-recovery/new/${token}`, body
        )

        return response
    }
}

export const passwordRecoveryService = new PasswordRecoveryService()