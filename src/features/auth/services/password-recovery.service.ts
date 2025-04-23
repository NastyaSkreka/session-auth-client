import { api } from "@/shared/api"
import { TypeResetPasswordSchema } from "../schemes"
import { IUser } from "../types"

class PasswordRecoveryService {
    public async reset(body: TypeResetPasswordSchema) {
        const response = await api.post<IUser>(
            'auth/password-recovery/reset', body
        )

        return response
    }
}

export const passwordRecoveryService = new PasswordRecoveryService()