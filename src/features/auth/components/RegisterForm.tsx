"use client"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../hooks";
import { RegisterSchema, TypeRegisterSchema } from "../schemes";
import { AuthWrapper } from "./AuthWrapper";

export function RegisterForm() {
   const form = useForm<TypeRegisterSchema>({
     resolver: zodResolver(RegisterSchema), 
     defaultValues: {
        name: '', 
        email:'', 
        password: '', 
        passwordRepeat: ''
     }
   })

   const {register, isLoadingRegister} = useRegisterMutation()

   const onSubmit = (values: TypeRegisterSchema) => {
    register({ values })
   }

    return (
        <AuthWrapper
         heading="Регистрация"
         description="Чтобы войти на сайт введите ваш email и пароль"
         backButtonLabel="Уже есть аккаунт? Войти"
         backButtonHref="/auth/login"
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
                        <Input placeholder="Настя" 
                        disabled={isLoadingRegister}
                        {...field}/>
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
                        disabled={isLoadingRegister}
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
                        disabled={isLoadingRegister}
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordRepeat"
              render={({field}) => (
                <FormItem>
                    <FormLabel>Повторите пароль</FormLabel>
                    <FormControl>
                        <Input placeholder="******" 
                        type="password"
                        disabled={isLoadingRegister}
                        {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoadingRegister}>Создать аккаунт</Button>
        </form>
       </Form>
        </AuthWrapper>
    )
}