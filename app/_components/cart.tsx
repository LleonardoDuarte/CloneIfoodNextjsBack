import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalDiscount, totalPrice } =
    useContext(CartContext);
  return (
    <div>
      <div>
        {products.map((product) => (
          <CartItem cartProduct={product} key={product.id} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="text-sx flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Subtotal</span>
              <span className="">{formatCurrency(subTotalPrice)}</span>
            </div>

            <Separator />

            <div className="text-sx flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Entrega</span>
              <span className="">
                {Number(products[0].restaurant.deliverfee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliverfee))
                )}
              </span>
            </div>
            <Separator />

            <div className="text-sx flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Desconto</span>
              <span className="">-{formatCurrency(totalDiscount)}</span>
            </div>

            <Separator />
            <div className="text-sx flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="">{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6 w-full">Finalizar Pedido</Button>
    </div>
  );
};

export default Cart;
