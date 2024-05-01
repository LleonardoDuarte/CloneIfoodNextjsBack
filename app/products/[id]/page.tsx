import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "../_components/product-image";
import DiscountBadge from "@/app/_components/discount-badge";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div>
        <ProductImage product={product} />
        <div className="p-5">
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-8 w-8">
              <Image
                src={product.restaurant.imageURL}
                alt={product.restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          </div>
          <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="px-1 text-xl font-semibold">
                  {formatCurrency(calculateProductTotalPrice(product))}
                </h2>

                {product.discountPercentage > 0 && (
                  <DiscountBadge product={product} />
                )}
              </div>
              <span className="text-sl text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
