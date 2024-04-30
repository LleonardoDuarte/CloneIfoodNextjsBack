import { Product } from "@prisma/client";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return <h1>{product.name}</h1>;
};

export default ProductItem;
