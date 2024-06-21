"use client";

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const publicUrlError = () => {

    const router = useRouter();

    return (
        <React.Fragment>
            <main>
                <section className=' h-[10vh] w-full flex justify-center items-center'>
                    <h1 className=' font-bold text-2xl underline max-md:text-base text-red-600'>
                        SOME ERROR HAS OCCURED
                    </h1>
                </section>
                <section className=' h-[70vh] w-screen flex justify-center items-center'>
                    <Image
                        src={'./publicurlerror.svg'}
                        alt='public url error image'
                        width={550}
                        height={550}
                        priority
                    />
                </section>
                <section className=' h-[20vh] w-screen flex justify-center items-center'>
                    <Button 
                        variant={'outline'} 
                        className=' w-fit bg-green-300 hover:bg-green-400 text-black max-lg:bg-green-400'
                        onClick={() => router.push("/login")}
                    >
                        To Login
                    </Button>
                </section>
            </main>
        </React.Fragment>
    )
}

export default publicUrlError