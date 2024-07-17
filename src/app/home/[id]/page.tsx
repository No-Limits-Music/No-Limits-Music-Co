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
import { User, Bell, TvMinimal, Box, Menu, NotebookTabs, BellDot, CircleX, IterationCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { 
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const formSchema = z.object({
  search: z.string(),
})

const Home = ({ params }: { params: { id: string } }) => {

  const router = useRouter();

  const [noti, setNoti] = useState([]);

  // Platform Data
  const [userSpotifyData, SetUserSpotifyData] = useState<any>();
  const [userAmazonMusicData, SetUserAmazonMusicData] = useState<any>(); 
  const [userYoutubeMusicData, SetYoutubeMusicData] = useState<any>();

  // Trigger State
  const [spotify, SetSpotify] = useState<boolean>(false);
  const [amazonMusic, SetAmazonMusic] = useState<boolean>(false);
  const [youtubeMusic, SetYoutubeMusic] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/auth/user/home");
      SetUserSpotifyData(response.data.spotifyData);
      SetUserAmazonMusicData(response.data.amazonMusic);
      SetYoutubeMusicData(response.data.youtubeMusic);
    };
    
    getData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    }
  });

  const handlelogout = async () => {
    try {
      await axios.get("/auth/logout")
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

        {/* NavBar Start */}

        <section className=' h-screen w-[17vw] p-2 py-6 absolute top-0 left-0 flex flex-col justify-between max-md:justify-evenly max-lg:w-screen max-lg:h-[10vh] max-lg:justify-between max-lg:items-center max-lg:flex-row max-lg:px-[10vw] max-md:p-[2vw]'>
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
            <h1 className=' text-green-600 text-center font-bold text-md max-md:text-sm rounded-md max-md:p-2 p-3 border border-green-700 cursor-pointer'>
              NO LIMITS MUSIC
            </h1>
          </span>
          <span className=' lg:hidden'>
          {(noti.length)
                ?
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={'outline'} className=' flex gap-2 border-none'>
                      <BellDot />
                      <span className=' max-md:hidden'>Notification</span>
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
                      <span className=' max-md:hidden'>Notification</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    No New Notifications
                  </DialogContent>
                </Dialog>
              }
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

        {/* NavBar End */}

        <Separator orientation='vertical' className=' h-screen absolute left-[17vw] top-0 bg-green-300 max-lg:hidden' />
        <Separator orientation='horizontal' className=' max-lg:absolute max-lg:top-[10vh] max-lg:left-0 max-lg:bg-green-700' />

        {/* Main Page Start */}

        <section className=' h-screen w-[83vw] absolute top-0 left-[17vw] flex justify-center items-center max-lg:w-screen max-lg:left-0 max-lg:top-[10vh] max-lg:h-[90vh]'>
          <section className=' w-full h-[12vh] absolute top-[0vh] flex flex-row justify-between max-lg:hidden'>
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
          <Separator orientation='horizontal' className=' absolute top-[12vh] bg-green-400 h-[0.75px] max-lg:hidden' />
          <section className=' w-full h-[88vh] absolute top-[12vh] p-1 flex flex-col justify-between max-lg:h-full max-lg:top-0 max-lg:left-0'>

              {/* Platform Selector */}

              <div className=' h-[20vh] w-full flex flex-col justify-center items-center gap-6 bg-green-100 p-2 border-b-[1px] border-green-600'>
                <h1 className=' text-xl font-bold text-green-600 text-center underline decoration-wavy'>
                  PLATFORM
                </h1>
                <div className='w-full flex flex-row justify-between items-center px-[5vw] max-lg:hidden'>
                  <Button variant={'outline'} className=' border-none lg:hover:bg-green-200 font-semibold' onClick={() => { SetSpotify(true); SetAmazonMusic(false); SetYoutubeMusic(false);}}>Spotify</Button>
                  <Button variant={'outline'} className=' border-none lg:hover:bg-green-200 font-semibold' onClick={() => { SetSpotify(false); SetAmazonMusic(true); SetYoutubeMusic(false);}}>Amazon Music</Button>
                  <Button variant={'outline'} className=' border-none lg:hover:bg-green-200 font-semibold' onClick={() => { SetSpotify(false); SetAmazonMusic(false); SetYoutubeMusic(true);}}>Youtube Music</Button>
                </div>
                <div className=' h-[20vh] w-full lg:hidden'>
                  <Select
                  onValueChange={(val) => {
                    if(val === "Spotify") {
                      SetSpotify(true); SetAmazonMusic(false); SetYoutubeMusic(false);
                    } else if(val === "Amazon Music") {
                      SetSpotify(false); SetAmazonMusic(true); SetYoutubeMusic(false);
                    } else if(val === "Youtube Music") {
                      SetSpotify(false); SetAmazonMusic(false); SetYoutubeMusic(true);
                    }
                  }}>
                    <SelectTrigger  className=' bg-green-300 text-black font-bold'>
                      <SelectValue  className=' bg-green-600 text-black' placeholder="Select Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectLabel>Platform</SelectLabel>
                        <SelectItem value='Spotify'>
                          Spotify
                        </SelectItem>
                        <SelectItem value='Amazon Music'>
                          Amazon Music
                        </SelectItem>
                        <SelectItem value='Youtube Music'>
                          Youtube Music
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className=' h-[80vh] w-full bg-green-100 p-6 flex flex-col justify-start items-center gap-4'>
                {spotify ? <h1 className=' text-center text-xl text-green-700 underline font-bold'>SPOTIFY</h1>: <></>}
                {amazonMusic ? <h1 className=' text-center text-xl text-green-700 underline font-bold'>AMAZON MUSIC</h1>: <></>}
                {youtubeMusic ? <h1 className=' text-center text-xl text-green-700 underline font-bold'>YOUTUBE MUSIC</h1>: <></>}
                <div className=' w-full h-full'>
                  {spotify ? (
                    <ScrollArea className=' max-h-[50vh] rounded-lg overflow-y-scroll overflow-x-hidden'>
                    <table className=' p-2 bg-gray-50 w-full rounded-lg border-black min-w-[600px]'>
                      <thead>
                      <tr className=' bg-gray-200'>
                        <th className=' font-bold p-2'>Song Name</th>
                        <th className=' font-bold p-2'>Artist Name</th>
                        <th className=' font-bold p-2'>Album Name</th>
                        <th className=' font-bold p-2'>Total</th>
                        <th className=' font-bold p-2'>Type</th>
                        <th className=' font-bold p-2'>Royality</th>
                      </tr>
                      </thead>
                      <tbody>
                      {userSpotifyData !== undefined && userSpotifyData.length !== 0 ? userSpotifyData.map((item: any) => (
                        <>
                        <tr className=' bg-gray-50 border-b border-gray-300' key={item.id}>
                          <td className=' text-center font-medium py-2 px-1'>{item.song_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.artist_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.album_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.total}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.file_name}</td>
                          <td className=' text-center font-bold px-1 py-2'>{item.royality}</td>
                        </tr>
                        </>
                      )
                    ) : <tr className=' text-center'><td colSpan={6}>No Data Found</td></tr> }
                      <ScrollBar />
                      </tbody>
                    </table>
                    </ScrollArea>
                  ) : <></>}
                  {amazonMusic ? (
                    <ScrollArea className=' max-h-[50vh] rounded-lg overflow-y-scroll overflow-x-hidden'>
                    <table className=' p-2 bg-gray-50 w-full rounded-lg border-black min-w-[600px]'>
                      <thead>
                      <tr className=' bg-gray-200'>
                        <th className=' font-bold p-2'>Song Name</th>
                        <th className=' font-bold p-2'>Artist Name</th>
                        <th className=' font-bold p-2'>Album Name</th>
                        <th className=' font-bold p-2'>Total</th>
                        <th className=' font-bold p-2'>Type</th>
                        <th className=' font-bold p-2'>Royality</th>
                      </tr>
                      </thead>
                      <tbody>
                      {userAmazonMusicData !== undefined && userAmazonMusicData.length !== 0 ? userAmazonMusicData.map((item: any) => (
                        <>
                        <tr className=' bg-gray-50 border-b border-gray-300' key={item.id}>
                          <td className=' text-center font-medium py-2 px-1'>{item.song_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.artist_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.album_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.total}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.file_name}</td>
                          <td className=' text-center font-bold px-1 py-2'>{item.royality}</td>
                        </tr>
                        </>
                      )
                    ) : <tr className=' text-center'><td colSpan={6}>No Data Found</td></tr> }
                      <ScrollBar />
                      </tbody>
                    </table>
                    </ScrollArea>
                  ) : <></>}
                  {youtubeMusic ? (
                    <ScrollArea className=' max-h-[50vh] rounded-lg overflow-y-scroll overflow-x-hidden'>
                    <table className=' p-2 bg-gray-50 w-full rounded-lg border-black min-w-[600px]'>
                      <thead>
                      <tr className=' bg-gray-200'>
                        <th className=' font-bold p-2'>Song Name</th>
                        <th className=' font-bold p-2'>Artist Name</th>
                        <th className=' font-bold p-2'>Album Name</th>
                        <th className=' font-bold p-2'>Total</th>
                        <th className=' font-bold p-2'>Type</th>
                        <th className=' font-bold p-2'>Royality</th>
                      </tr>
                      </thead>
                      <tbody>
                      {userYoutubeMusicData !== undefined && userYoutubeMusicData.length !== 0 ? userYoutubeMusicData.map((item: any) => (
                        <>
                        <tr className=' bg-gray-50 border-b border-gray-300' key={item.id}>
                          <td className=' text-center font-medium py-2 px-1'>{item.song_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.artist_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.album_name}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.total}</td>
                          <td className=' text-center font-medium px-1 py-2'>{item.file_name}</td>
                          <td className=' text-center font-bold px-1 py-2'>{item.royality}</td>
                        </tr>
                        </>
                      )
                    ) : <tr className=' text-center'><td colSpan={6}>No Data Found</td></tr> }
                      <ScrollBar />
                      </tbody>
                    </table>
                    </ScrollArea>
                  ) : <></>}
                </div>
              </div>
          </section>
        </section>

        {/* Main Page End */}

      </main>
    </React.Fragment>
  )
}

export default Home