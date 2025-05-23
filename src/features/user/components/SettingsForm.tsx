"use client"

import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Loading, Switch } from "@/shared/components/ui"
import { useProfile } from "@/shared/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation"
import { SettingsSchema, TypeSettingsSchema } from "../schemes"
import { UserButton, UserButtonLoading } from "./UserButton"

export function SettingsForm() {
    const { user, isLoading} = useProfile()

    const form = useForm<TypeSettingsSchema>({
        resolver: zodResolver(SettingsSchema), 
        values: {
            name: user?.displayName || '', 
            email: user?.email || '', 
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false
        }
    })

    const {update, isLoadingUpdate} = useUpdateProfileMutation()

    const onSubmit = (values: TypeSettingsSchema) => {
        update(values)
    }

    if (!user) return null

    return (
        <Card className="w-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Настройки профиля
                </CardTitle>
                {isLoading ? <UserButtonLoading/> : <UserButton user={user}/>}
            </CardHeader>
            <CardContent>
            {isLoading ? <Loading/> : (
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
                                   disabled={isLoadingUpdate}
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
                                   disabled={isLoadingUpdate}
                                   {...field}/>
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                         )}
                       />

                    <FormField
                         control={form.control}
                         name="isTwoFactorEnabled"
                         render={({field}) => (
                           <FormItem className="flex flex-row items-center
                           justify-between rounded-lg border p-3 shadow-sm">
                               <div className="space-y-0.5">
                               <FormLabel>Двухфакторная аутентификация</FormLabel>
                               <FormDescription>
                                Включите двухфакторную аутентификацию для вашей учетной записи
                               </FormDescription>
                               </div>
                               <FormControl>
                                   <Switch 
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                   />
                               </FormControl>
                
                           </FormItem>
                         )}
                       />
           
                       <Button type="submit"
                         disabled={isLoadingUpdate}
                        >Сохранить</Button>
                   </form>
                  </Form>
            )}
            </CardContent>
        </Card>
    )
}