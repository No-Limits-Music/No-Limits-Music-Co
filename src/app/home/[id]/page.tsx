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
  FormItem
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { User, Bell, TvMinimal, Box, Menu, NotebookTabs, BellDot, CircleX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';

const formSchema = z.object({
  search: z.string(),
})

const Home = ({ params }: { params: { id: string } }) => {

  const router = useRouter();

  const [noti, setNoti] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    }
  });

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
    } catch(error: any) {
      console.log(error);
    }
  }

  const handleSearch = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  };

  const navElement = [
    {
      group: "General",
      items: [
        {
          link: `/home/${params.id}`,
          icon: <TvMinimal />,
          text: "Home"
        },
        {
          link: "/about",
          icon: <Box />,
          text: "About"
        },
        {
          link: "/contact",
          icon: <NotebookTabs />,
          text: "Contact"
        },
      ]
    },
    {
      group: "Setting",
      items: [
        {
          link: `/profile/${params.id}`,
          icon: <User />,
          text: "Profile"
        },
      ]
    }
  ];

  return (
    <React.Fragment>
      <main className=' h-screen w-screen'>
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
              NO LIMITS MUSIC
            </h1>
          </span>
          <div className=' max-lg:hidden'>
            <h1 className=' text-green-600 text-center font-bold text-lg rounded-md p-4 border border-green-700 cursor-pointer'>
              NO LIMITS MUSIC
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
        <section className=' h-screen w-[83vw] absolute top-0 left-[17vw] flex justify-center items-center max-lg:w-screen max-lg:left-0 max-lg:top-[10vh] max-lg:h-[90vh]'>
          <section className=' w-full h-[12vh] absolute top-[0vh] flex flex-row justify-between'>
            <div className=' w-[50vw] flex items-center px-12'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)} className=' w-full'>
                  <FormField
                    control={form.control}
                    name='search'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='text' placeholder='search' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className=' flex items-center px-12'>
              {(noti.length)
                ?
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'} className=' flex gap-2 border-none'>
                      <BellDot />
                      Notification
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {noti.map((content: any, key: number) => (
                      <div key={key} className=' w-full border-none p-2 rounded flex justify-between bg-slate-100'>
                        {content.message}
                      </div>
                    ))}
                    <Button onClick={() => setNoti([])}>Dismiss All</Button>
                  </DialogContent>
                </Dialog>
                :
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'} className=' flex gap-2 border-none'>
                      <Bell />
                      Notification
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    No New Notifications
                  </DialogContent>
                </Dialog>
              }
            </div>
          </section>
          <Separator orientation='horizontal' className=' absolute top-[12vh] bg-green-400 h-[0.75px]' />
          <section className=' w-full h-[48vh] absolute top-[12vh]'></section>
          <Separator orientation='horizontal' className=' absolute top-[60vh] bg-green-400 h-[0.75px]' />
          <section className=' w-full h-[40vh] absolute top-[60vh]'></section>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Home