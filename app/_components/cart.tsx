import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { CreateOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const Cart = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { data } = useSession();

  const { products, subtotalPrice, totalDiscounts, totalPrice, clearCart } =
    useContext(CartContext);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;
    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await CreateOrder({
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        deliverfee: restaurant.deliverfee,
        deliverTimeMinutes: restaurant.deliverTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id as string | undefined },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className=" flex-auto space-y-4">
              {products.map((product) => (
                <CartItem cartProduct={product} key={product.id} />
              ))}
            </div>
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="text-sx flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="">{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="text-sx flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Entrega
                    </span>
                    <span className="">
                      {Number(products[0].restaurant.deliverfee) === 0 ? (
                        <span className="uppercase text-primary">Grátis</span>
                      ) : (
                        formatCurrency(
                          Number(products[0].restaurant.deliverfee),
                        )
                      )}
                    </span>
                  </div>
                  <Separator />

                  <div className="text-sx flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Desconto
                    </span>
                    <span className="">-{formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator />
                  <div className="text-sx flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="">{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              Finalizar Pedido
            </Button>
          </>
        ) : (
          <h2 className="text-center font-semibold">
            Não há itens no seu carrinho no momento
          </h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido você estará confirmando sua compra.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isConfirmDialogOpen}>
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishOrderClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
