import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../_components/product-image";
import ProductDetails from "../_components/product-details";

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
  const juices = await db.product.findMany({
    take: 3,
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restautantId,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div>
        <ProductImage product={product} />
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </>
  );
};

export default ProductPage;
