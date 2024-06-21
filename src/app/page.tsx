"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {

  const router = useRouter();

  return (
    <React.Fragment>
      <main className=" h-screen w-screen flex justify-center items-center"> 
        <Button variant={'outline'} onClick={() => router.push("/login")}>
          Login
        </Button>
      </main>
    </React.Fragment>
  );
}
