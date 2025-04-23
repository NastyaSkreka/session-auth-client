"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../hooks";
import { ResetPasswordSchema, TypeResetPasswordSchema } from "../schemes";
import { AuthWrapper } from "./AuthWrapper";

export function ResetPasswordForm() {
   const form = useForm<TypeResetPasswordSchema>({
     resolver: zodResolver(ResetPasswordSchema), 
     defaultValues: {
        email:'', 
     }
   })

   const { reset , isLoadingReset} = useResetPasswordMutation()

   const onSubmit = (values: TypeResetPasswordSchema) => {
      reset({values})
   }

    return (
        <AuthWrapper
         heading="Сброс пароля"
         description="Для сброса пароля введите свою почту"
         backButtonLabel="Войти в аккаунт"
         backButtonHref="/auth/login"
        >
       <Form {...form}>
        <form 
         className="grid gap-2 space-y-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                        <Input
                        disabled={isLoadingReset}
                        placeholder="nastya@example.com" 
                        type="email"
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

         
            <Button type="submit" disabled={isLoadingReset}>Сбросить</Button>
        </form>
       </Form>
        </AuthWrapper>
    )
}