import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliverInfoProps {
  restaurant: Pick<Restaurant, "deliverfee" | "deliverTimeMinutes">;
}

const DeliverInfo = ({ restaurant }: DeliverInfoProps) => {
  return (
    <div className="px-5">
      <Card className="mt-6 flex justify-around py-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>

          {Number(restaurant.deliverfee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliverfee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>
          {restaurant.deliverTimeMinutes} min
        </div>
      </Card>
    </div>
  );
};

export default DeliverInfo;
