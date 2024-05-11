"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignInClick = () => signIn();
  const handleSignOutClick = () => signOut();

  return (
    <div className="flex justify-between px-5 pt-5">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW foods"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="text-left"> Menu</SheetTitle>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3 text-sm font-normal">
                  <Avatar>
                    <AvatarImage
                      src={data.user.image as string | undefined}
                      alt={data.user.name as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="flex justify-start font-semibold">
                      {data?.user?.name}
                    </h3>
                    <span className="text-sx block text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá, Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              </div>
            </>
          )}
          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              className="w-full justify-start space-x-3 text-sm font-normal"
              variant="ghost"
            >
              <HomeIcon size={16} />
              <span className="block">Inicio</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  variant="ghost"
                >
                  <ScrollTextIcon size={16} />
                  <span className="block">Meus Pedidos</span>
                </Button>

                <Button
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  variant="ghost"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>
          <div className="py-6">
            <Separator />
          </div>
          {data?.user && (
            <Button
              className="w-full justify-start space-x-3 text-sm font-normal"
              variant="ghost"
              onClick={handleSignOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da Conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
