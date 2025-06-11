'use client'
import { useSession} from "next-auth/react"
import Welcome from "@/components/Welcome";
import Image from "next/image";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import Variety from "@/components/Variety";

export default function Home() {
  const { data: session } = useSession()
  if(session){
    return(
      <>
      <Navbar/>
      <MenuItemCard/>
      </>
    )
  }
  return (
    <>
    <Welcome/>
    </>
  );
}
