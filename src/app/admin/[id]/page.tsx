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
import { undefined, z } from 'zod';
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
import { User, Settings, Menu, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import {
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

const ACCEPTED_EXCEL_TYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
];

const excelSchema = z
    .instanceof(File)
    .refine((file) => {
        return !file || file.size <= 50 * 1024 * 1024;
    }, "File size must be less than 50MB")
    .refine((file) => {
        return ACCEPTED_EXCEL_TYPES.includes(file.type);
    }, "File must be an Excel File");

const formSchema = z.object({
    month: z.string().min(1, {
        message: "This Field is Required"
    }),
    year: z.string().min(1, {
        message: "This Field is Required"
    }),
    platform: z.string().min(1, {
        message: "This Field is Required"
    }),
    excelFile: excelSchema
});

const Admin = ({ params }: { params: { id: String } }) => {

    const router = useRouter();

    // Default form field
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            month: "",
            year: "",
            platform: "",
            excelFile: new File([], "")
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

    for (let i = 2000; i <= 2100; i++) {
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
        setState(!state);
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
                    <section className=' h-screen w-[17vw] p-2 py-6 absolute top-0 left-0 flex flex-col justify-between max-lg:w-screen max-lg:h-[10vh] max-lg:justify-between max-lg:items-center max-lg:flex-row max-lg:px-[5vw]'>
                        <Sheet>
                            <SheetTrigger asChild className=' lg:hidden'>
                                <Button variant="outline" className=' border-blue-600 py-6 rounded'>
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
                                        className=' w-full bg-blue-300 hover:bg-blue-400 text-black'
                                        onClick={handlelogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <span className=' lg:hidden'>
                            <h1 className=' text-blue-600 text-center font-bold text-lg rounded-md p-4 border border-blue-700 cursor-pointer'>
                                WELCOME {(params.id.length < 8) ? params.id.toUpperCase() : ""}
                            </h1>
                        </span>
                        <div className=' max-lg:hidden'>
                            <h1 className=' text-blue-600 text-center font-bold text-lg rounded-md p-4 border border-blue-700 cursor-pointer'>
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
                                className=' w-full bg-blue-300 hover:bg-blue-400 text-black'
                                onClick={handlelogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </section>
                    <Separator orientation='vertical' className=' h-screen absolute left-[17vw] top-0 bg-blue-300 max-lg:hidden' />
                    <Separator orientation='horizontal' className=' max-lg:absolute max-lg:top-[10vh] max-lg:left-0 max-lg:bg-blue-700' />
                </section>
                <section>
                    {state ? (
                        <div className=' h-screen w-[83vw] absolute top-0 left-[17vw] flex flex-col justify-start gap-4 p-12 max-lg:left-0 max-lg:top-[10vh] max-lg:w-screen max-lg:h-[90vh] max-lg:p-2'>
                            <div>
                                <Alert variant="default" className=" flex flex-col gap-2 bg-blue-50">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle className=' font-bold'>GUIDE FOR FILE UPLOAD</AlertTitle>
                                    <AlertDescription>
                                        <div className="flex flex-col gap-2">
                                            <AlertTitle className=' font-semibold underline'>1. Fields Selection</AlertTitle>
                                            <AlertDescription className=' pl-4'>
                                                    <p>Select the appropriate values from the dropdown menus for "Month," "Year," and "Platform".</p>                                                
                                            </AlertDescription>
                                            <AlertTitle className=' font-semibold underline'>2. File Upload Process</AlertTitle>
                                            <AlertDescription>
                                                <ol className="list-decimal pl-4">
                                                    <li>Click the "Upload File" area.</li>
                                                    <li>Select the Excel File you want to upload from your computer.</li>
                                                    <li className=' text-red-500 font-medium'>Excel File should be a Single File and less than 50Mb in size.</li>
                                                    <li>Click "Open" or the equivalent button on your file selection dialog.</li>
                                                </ol>
                                            </AlertDescription>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-lg:space-y-2'>
                                    <div className=' grid grid-cols-3 max-lg:grid-cols-1 gap-3 max-lg:space-y-2 max-lg:p-2 max-lg:gap-0'>
                                        <FormField
                                            control={form.control}
                                            name='month'
                                            render={({ field }) => (
                                                <FormItem className=' w-full'>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                <FormItem className=' w-full'>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                <FormItem className=' w-full'>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <div className=' h-3/5 max-lg:h-2/5 w-full flex flex-col gap-6 items-center'>
                                        <Alert variant="default" className="bg-amber-500">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>NOTE</AlertTitle>
                                            <AlertDescription>
                                                Excel File must be single File not exceeding 50Mb.
                                            </AlertDescription>
                                        </Alert>
                                        <FormField
                                            control={form.control}
                                            name='excelFile'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input className=' w-[76.5vw]' accept='.xlsx' placeholder='Excel Upload' type='file' onChange={(e) => field.onChange(e.target.files?.[0])} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className=' flex justify-center items-start py-2'>
                                        <Button variant={'outline'} type='submit' className=' border-blue-600 hover:bg-blue-600 hover:text-white max-lg:bg-blue-600 max-lg:text-white'>
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    ) : (
                        <div className=' absolute top-0 left-[17vw] h-screen w-[83vw] flex justify-center items-center max-lg:left-0 max-lg:w-screen max-lg:h-[90vh] max-lg:top-[10vh]'>
                            File Submitted
                        </div>
                    )}
                </section>
            </main>
        </React.Fragment>
    )
}

export default Admin;