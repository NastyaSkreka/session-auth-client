import { NewVerificationForm } from "@/features/auth/components";
import { Loading } from "@/shared/components/ui";
import { Suspense } from "react";


export default function NewVerificationPage() {
    return  <Suspense fallback={<Loading />}>
    <NewVerificationForm />
</Suspense>
}