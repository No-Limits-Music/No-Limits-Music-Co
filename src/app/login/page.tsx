"use client";

import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

const formSchema = z.object({
    email: z.string().email(),

    password: z.string().min(8, {
        message: "Password Short"
    }).max(255, {
        message: "Password too long"
    })
});


const Login: React.FC = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post('auth/user/login', {values}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = response.data;

            if (response.status === 200) {
                toast.success(data.message || "Login successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });
                router.push(`/home/${data.name}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 409) {
                    toast.error(data.error || "Invalid Credentials", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.resetField('password');
                } else {
                    toast.error(data.error || "Some Error Occured", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.reset();
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    style: {
                        "backgroundColor": "#FADBD8",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 2500
                });
            }
        }
    }

    return (
        <React.Fragment>
            <main className=' h-screen w-screen'>
                <section className=' w-2/5 h-screen p-12 flex flex-col justify-evenly absolute top-0 left-[60vw] bg-green-50 max-lg:w-full max-lg:left-0'>
                    <h1 className=' text-3xl text-green-700 font-bold underline decoration-wavy text-center'>
                        LOGIN
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' placeholder='enter email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='enter password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className=' w-full'>
                                Login
                            </Button>
                            <Separator className=' my-4' />
                            <div className=' w-full flex flex-row justify-center gap-4'>
                                <span>
                                    Don&apos;t have an account?
                                </span>
                                <span>
                                    <Link href={'/register'} className=' font-bold text-green-600'>
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </Form>
                </section>
                <section className=' h-screen w-3/5 flex justify-center items-center'>
                    <Image
                        src={'./login.svg'}
                        alt='login image'
                        width={550}
                        height={550}
                        priority
                    />
                </section>
            </main>
        </React.Fragment>
    )
}

export default Login