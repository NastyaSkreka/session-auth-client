"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks";
import { LoginSchema, TypeLoginSchema } from "../schemes";
import { AuthWrapper } from "./AuthWrapper";

export function LoginForm() {
   const form = useForm<TypeLoginSchema>({
     resolver: zodResolver(LoginSchema), 
     defaultValues: {
        email:'', 
        password: ''
     }
   })

   const { login, isLoadingLogin } = useLoginMutation()

   const onSubmit = (values: TypeLoginSchema) => {
     login({values})
   }

    return (
        <AuthWrapper
         heading="Войти"
         description="Чтобы войти на сайт введите ваш email и пароль"
         backButtonLabel="Еще нет аккаунта? Регистрация"
         backButtonHref="/auth/register"
         isShowSocial
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
                        disabled={isLoadingLogin}
                        placeholder="nastya@example.com" 
                        type="email"
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                    <div className="flex items-center justify-between">
                    <FormLabel>Пароль</FormLabel>
                    <Link
                     href='/auth/reset-password'
                     className="ml-auto inline-block text-sm underline"
                    >
                      Забыли пароль?
                    </Link>
                    </div>
                    <FormControl>
                        <Input placeholder="******" 
                        type="password"
                        disabled={isLoadingLogin}
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoadingLogin}>Войти в аккаунт</Button>
        </form>
       </Form>
        </AuthWrapper>
    )
}