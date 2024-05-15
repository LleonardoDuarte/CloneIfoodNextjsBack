"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";

    case "COMPLETED":
      return "Finalizado";

    case "DELIVERING":
      return "Em Transporte";

    case "CONFIRMED":
      return "Confirmado";

    case "PREPARING":
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-5">
          <div
            className={`mb-2 w-fit rounded-full bg-[#EEEEEE] p-3 px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
          >
            <span className="block text-xs font-semibold">
              {getOrderStatusLabel(order.status)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={order.restaurant.imageURL} />
              </Avatar>

              <span className="text-xm font-semibold">
                {order.restaurant.name}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="h-5 w-5" asChild>
              <Link href={`/restaurants/${order.restaurantId}`}>
                <ChevronRightIcon />
              </Link>
            </Button>
          </div>
          <div className="py-3">
            <Separator />
          </div>

          <div>
            {order.products.map((product) => (
              <div className="flex items-center gap-2" key={product.id}>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                  <span className="block text-xs text-white">
                    {product.quantity}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.product.name}
                </span>
              </div>
            ))}
          </div>

          <div className="py-3">
            <Separator />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {formatCurrency(Number(order.totalPrice))}
            </p>

            <Button
              variant="ghost"
              className="text-primary"
              disabled={order.status !== "COMPLETED"}
            >
              Refazer pedido
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderItem;
