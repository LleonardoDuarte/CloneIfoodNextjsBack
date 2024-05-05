import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductsFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductsFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageURL}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              className="h-7 w-7 border-solid border-muted-foreground"
              variant="ghost"
            >
              <ChevronLeftIcon
                size={18}
                onClick={handleDecreaseQuantityClick}
              />
            </Button>
            <span className="w-4 text-sm">{cartProduct.quantity}</span>
            <Button size="icon" className="h-7 w-7">
              <ChevronRightIcon
                size={18}
                onClick={handleIncreaseQuantityClick}
              />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <Trash2Icon size={20} />
      </Button>
    </div>
  );
};

export default CartItem;
