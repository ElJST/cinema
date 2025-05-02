import React from 'react'
import { Card, CardFooter } from "@heroui/react";

export const Footer = () => {
    return (
        <>
            <Card 
            isFooterBlurred 
            shadow='lg' 
            className="border-none h-14 p-1 dark:bg-zinc-700/50 dark:text-white"
            radius="none"
            >
                <CardFooter 
                className="justify-between border border-amber-50/20 rounded-2xl z-10 h-full">
                    <p 
                    className="text-tiny w-full text-center">© 2025 Cinema. Todos los derechos reservados por Justin.</p>
                </CardFooter>
            </Card>
        </>
    )
}
