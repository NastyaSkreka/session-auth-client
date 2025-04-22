"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, TypeLoginSchema } from "../schemes";
import { AuthWrapper } from "./AuthWrapper";

export function LoginForm() {
   const form = useForm<TypeLoginSchema>({
     resolver: zodResolver(LoginSchema), 
     defaultValues: {
        name: '', 
        email:'', 
        password: ''
     }
   })

   const onSubmit = (values: TypeLoginSchema) => {
     console.log(values)
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
              name="name"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                        <Input placeholder="Настя" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                        <Input placeholder="nastya@example.com" 
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                        <Input placeholder="******" 
                        type="password"
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit">Войти в аккаунт</Button>
        </form>
       </Form>
        </AuthWrapper>
    )
}