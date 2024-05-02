"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageURL">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const randlePackClick = () => router.back();

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={restaurant.imageURL}
        alt={restaurant.name}
        fill
        className="object-cover"
        quality={100}
      />

      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={randlePackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        className="absolute right-2 top-2 h-7 w-7 rounded-full bg-transparent"
        size="icon"
      >
        <HeartIcon className="h-fit w-fit" size={20} />
      </Button>
    </div>
  );
};

export default RestaurantImage;
