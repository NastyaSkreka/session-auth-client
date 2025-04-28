"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNewPasswordMutation } from "../hooks";
import { NewPasswordSchema, TypeNewPasswordSchema } from "../schemes";
import { AuthWrapper } from "./AuthWrapper";

export function NewPasswordForm() {
   const form = useForm<TypeNewPasswordSchema>({
     resolver: zodResolver(NewPasswordSchema), 
     defaultValues: {
        password:'', 
     }
   })

   const { newPassword , isLoadingNew} = useNewPasswordMutation()

   const onSubmit = (values: TypeNewPasswordSchema) => {
      newPassword({values})
   }

    return (
      <Suspense fallback={<div>Loading...</div>}>
      <AuthWrapper
        heading="Новый пароль"
        description="Придумайте новый пароль для вашего аккаунта"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoadingNew}
                      placeholder="******"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoadingNew}>
              Продолжить
            </Button>
          </form>
        </Form>
      </AuthWrapper>
    </Suspense>
    )
}