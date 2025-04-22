'use client'

import { PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export function MainProvider({children}: PropsWithChildren) {

    return <TanstackQueryProvider>
       < ThemeProvider
        attribute='class'
        defaultTheme="light"
        disableTransitionOnChange
       >
        <ToastProvider/>
       {children}
       </ThemeProvider>
    
        </TanstackQueryProvider>
}