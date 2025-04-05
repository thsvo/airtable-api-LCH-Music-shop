'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import React from 'react';
import Image from 'next/image';

const categories = [
  { name: "Home", path: "/" },
  { name: "Concert Band", path: "/category/concert-band" },
  { name: "Full Orchestra", path: "/category/full-orchestra" },
  { name: "String Orchestra", path: "/category/string-orchestra" },
  { name: "Strings", path: "/category/strings" },
  { name: "Horn Music", path: "/category/horn-music" },
  { name: "Brass Music", path: "/category/brass-music" },
  { name: "Woodwinds", path: "/category/woodwinds" },
  { name: "Vocal", path: "/category/vocal" },
  { name: "Piano", path: "/category/piano" },
  { name: "Holiday", path: "/category/holiday" },
  { name: "Other", path: "/category/other" }
];

interface HeaderProps {
  records: any[];
}

export default function Header({ records }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row  items-center">
          <div className="flex w-full md:w-auto  items-center mb-4 md:mb-0">
            <Link href="/" rel="noopener noreferrer">

              <Image
                src="https://cdn.codeopx.com/LCHmusic.png" // Replace with your image path
                alt="Example Image"
                width={100}
                height={100}
              />
            </Link>



            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="p-2">
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col gap-4 mt-8 ">
                    <Link href="/" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-accent rounded-md">Home</div>
                    </Link>

                    <div className="px-4 py-2 font-medium">Ensemble</div>
                    <div className="pl-6 flex flex-col gap-2">
                      {categories.slice(1).map((category) => (
                        <Link
                          key={category.name}
                          href={category.path}
                          onClick={() => setOpen(false)}
                        >
                          <div className="px-4 py-2 hover:bg-accent rounded-md">{category.name}</div>
                        </Link>
                      ))}
                    </div>

                    <Link href="/about" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-accent rounded-md">About</div>
                    </Link>

                    <Link href="/contact" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-accent rounded-md">Contact</div>
                    </Link>
                    <Link href="/services" onClick={() => setOpen(false)}>
                      <div className="px-4 py-2 hover:bg-accent rounded-md">Services</div>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className="justify-center pl-[450px]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ensemble</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.slice(1).map((category) => (
                        <ListItem
                          key={category.name}
                          title={category.name}
                          href={category.path}
                        >
                          {category.name}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/services" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/classical-music-is" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Classical Music Is
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
