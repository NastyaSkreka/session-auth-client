import { NewPasswordForm } from "@/features/auth/components";
import { Loading } from "@/shared/components/ui";
import { Suspense } from "react";

export default function NewPasswordPage() {
    return <Suspense fallback={<Loading />}>
        <NewPasswordForm/>
    </Suspense>
}