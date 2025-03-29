'use client';

import { useState, useEffect } from 'react';
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
import { cn } from "@/lib/utils";
import React from 'react';

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
  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Music Catalog</h1>
          
          <NavigationMenu className="max-w-full overflow-x-auto">
            <NavigationMenuList className="flex flex-wrap justify-center gap-1">
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <Link href={category.path} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {category.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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