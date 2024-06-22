"use client";

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandList,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Settings, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
    month: z.string().min(1, {
        message: "This Field Has to be Selected"
    }),
    year: z.string().min(1, {
        message: "This Field Has to be Selected"
    }),
    platform: z.string().min(1, {
        message: "This Field Has to be Selected"
    })
});

const Admin = ({ params }: { params: { id: String } }) => {

    const router = useRouter();

    // Default form field
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            month: "",
            year: "",
            platform: ""
        }
    });

    // Display the Upload screen or Upload Details
    const [state, setState] = useState(true);

    // Select Options
    const Month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const year: number[] = [];

    for(let i = 2000; i <= 2100; i++){
        year.push(i);
    }

    const Platform = [
        "Amazon Music",
        "Spotify",
        "Youtube Music",
    ];

    const navElement = [
        {
            group: "General",
            items: [
                {
                    link: `/manageusers/${params.id}`,
                    icon: <User />,
                    text: "Manage Users"
                },
                {
                    link: `/managedata/${params.id}`,
                    icon: <Settings />,
                    text: "Manage Data"
                }
            ]
        }
    ];

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    const handlelogout = async () => {
        try {
            await axios.get("auth/logout")
                .then((res) => {
                    toast.success(res.data.message || "Logout Successful!", {
                        style: {
                            "backgroundColor": "#D5F5E3",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 1500
                    });
                    router.push("/login");
                })
                .catch((error: any) => {
                    console.log(error);
                })
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <main>
                <section>
                    <section className=' h-screen w-[17vw] p-2 py-6 absolute top-0 left-0 flex flex-col justify-between max-lg:w-screen max-lg:h-[10vh] max-lg:justify-between max-lg:items-center max-lg:flex-row max-lg:px-[10vw]'>
                        <Sheet>
                            <SheetTrigger asChild className=' lg:hidden'>
                                <Button variant="outline" className=' border-green-600 py-6 rounded'>
                                    <Menu />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className=' flex flex-col justify-between'>
                                <div>
                                    <Command className=' h-fit w-full rounded-lg overflow-visible flex gap-2'>
                                        <CommandList className=' overflow-visible'>
                                            {navElement.map((menu: any, key: number) => (
                                                <CommandGroup key={key} heading={menu.group}>
                                                    {menu.items.map((option: any, optionKey: number) => (
                                                        <Link key={optionKey} href={option.link}>
                                                            <CommandItem className=' flex gap-2 font-medium cursor-pointer' key={optionKey}>
                                                                {option.icon}
                                                                {option.text}
                                                            </CommandItem>
                                                        </Link>
                                                    ))}
                                                </CommandGroup>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </div>
                                <div className=' lg:hidden'>
                                    <Button
                                        className=' w-full bg-green-300 hover:bg-green-400 text-black'
                                        onClick={handlelogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <span className=' lg:hidden'>
                            <h1 className=' text-green-600 text-center font-bold text-lg rounded-md p-4 border border-green-700 cursor-pointer'>
                                WELCOME {(params.id.length < 8) ? params.id.toUpperCase() : ""}
                            </h1>
                        </span>
                        <div className=' max-lg:hidden'>
                            <h1 className=' text-green-600 text-center font-bold text-lg rounded-md p-4 border border-green-700 cursor-pointer'>
                                WELCOME {(params.id.length < 8) ? params.id.toUpperCase() : ""}
                            </h1>
                            <Command className=' h-fit rounded-lg overflow-visible flex gap-2'>
                                <CommandList className=' overflow-visible'>
                                    {navElement.map((menu: any, key: number) => (
                                        <CommandGroup key={key} heading={menu.group}>
                                            {menu.items.map((option: any, optionKey: number) => (
                                                <Link key={optionKey} href={option.link}>
                                                    <CommandItem className=' flex gap-2 font-medium cursor-pointer' key={optionKey}>
                                                        {option.icon}
                                                        {option.text}
                                                    </CommandItem>
                                                </Link>
                                            ))}
                                        </CommandGroup>
                                    ))}
                                </CommandList>
                            </Command>
                        </div>
                        <div className=' max-lg:hidden'>
                            <Button
                                className=' w-full bg-green-300 hover:bg-green-400 text-black'
                                onClick={handlelogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </section>
                    <Separator orientation='vertical' className=' h-screen absolute left-[17vw] top-0 bg-green-300 max-lg:hidden' />
                    <Separator orientation='horizontal' className=' max-lg:absolute max-lg:top-[10vh] max-lg:left-0 max-lg:bg-green-700' />
                </section>
                <section>
                    {state ? (
                        <div className=' h-screen w-[83vw] absolute top-0 left-[17vw] max-lg:left-0 max-lg:w-screen flex flex-col justify-start p-12'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name='month'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select {...field}>
                                                        <SelectTrigger>
                                                            <SelectValue className=' px-2' placeholder="Select Month" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Month</SelectLabel>
                                                                {Month.map((value: string, key: number) => (
                                                                    <SelectItem value={value} key={key}>{value.toUpperCase()}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="year"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select {...field}>
                                                        <SelectTrigger>
                                                            <SelectValue className=' px-2' placeholder="Select Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                            <SelectLabel>Year</SelectLabel>
                                                                {year.map((value: number, key: number) => (
                                                                    <SelectItem value={value.toString()} key={key}>{value}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='platform'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select {...field}>
                                                        <SelectTrigger>
                                                            <SelectValue className=' px-2' placeholder="Select Platform" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Platform</SelectLabel>
                                                                {Platform.map((value: string, key: number) => (
                                                                    <SelectItem value={value} key={key}>{value.toUpperCase()}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button variant={'outline'} type='submit'>
                                        Submit
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )}
                </section>
            </main>
        </React.Fragment>
    )
}

export default Admin;