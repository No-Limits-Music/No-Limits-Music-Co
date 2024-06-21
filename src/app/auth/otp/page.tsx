"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/components/ui/input-otp"

const formSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const OTP = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pin: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.push('/home/user')
        console.log(values)
    }

    const router = useRouter();

    return (
        <React.Fragment>
            <main className=' h-screen w-screen flex justify-center items-center'>
                <Card className=' w-[380px] max-md:w-[300px] flex flex-col justify-center items-center'>
                    <CardHeader>
                        <CardTitle className=' text-2xl underlin font-bold'>ENTER OTP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className=' flex flex-col justify-center items-center space-y-6'>
                                <FormField
                                    control={form.control}
                                    name='pin'
                                    render={({ field }) => (
                                        <FormItem className=' flex flex-col gap-4 items-center justify-center'>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                Please enter the one-time password sent to your Mail.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className=' w-3/5 bg-green-500 hover:bg-green-600'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </main>
        </React.Fragment>
    )
}

export default OTP