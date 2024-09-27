// import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategarySearch from "./_components/CategarySearch";
import HomeServices from "./_components/HomeServices";
import DoctorCard from "./_components/DoctorCard";
import PopularDoctors from "./_components/PopularDoctors";
import Testimonials from "./_components/Testimonials";
import Banner from "./_components/Banner";
import Stat from "./_components/Stat";


export default function Home() {
  return (
    <div className="w-full">
      {/* herosection */}
      {/* <Banner/> */}
      <Hero />
      {/* searchbar+categary */}
      {/* <CategarySearch /> */}
      <PopularDoctors />

      <Stat />
      <HomeServices />

      <Testimonials />

    </div>
  );
}
