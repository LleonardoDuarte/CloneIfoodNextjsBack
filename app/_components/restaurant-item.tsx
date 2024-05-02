import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProp {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProp) => {
  return (
    <Link
      className="min-w-[266px] max-w-[266px]"
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageURL}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />

          <div className="bg-white">
            <div className="absolute left-2 top-2 flex items-center rounded-full bg-primary bg-white px-2 py-[2px]">
              <StarIcon size={14} className="fill-yellow-500 text-yellow-500" />
              <span className="px-1 text-xs font-semibold">5.0</span>
            </div>
          </div>

          <div className="">
            <Button
              className="absolute right-2 top-2 h-7 w-7 rounded-full bg-transparent"
              size="icon"
            >
              <HeartIcon className="h-fit w-fit" size={20} />
            </Button>
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <TimerIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliverTimeMinutes} min
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BikeIcon size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliverfee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliverfee))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
