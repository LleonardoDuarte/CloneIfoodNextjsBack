import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliverInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restautantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 20,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        <div className="flex items-center gap-1">
          <div className="relative h-10 w-10">
            <Image
              src={restaurant.imageURL}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="bg-white">
          <div className=" flex items-center gap-1 rounded-full bg-foreground px-2 py-[2px] text-white">
            <StarIcon size={14} className="fill-yellow-500 text-yellow-500" />
            <span className="px-1 text-xs font-semibold">5.0</span>
          </div>
        </div>
      </div>
      <div className="px-5">
        <DeliverInfo restaurant={restaurant} />
      </div>

      <div className="mt-6 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#f4f4f4] text-center"
          >
            <span className="text-xs text-muted-foreground ">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 px-5">
        <h2 className="font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>
      {restaurant.categories.map((category) => (
        <div className="mt-6 px-5" key={category.id}>
          <h2 className="font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
