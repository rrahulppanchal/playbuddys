"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Menu, User2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import logo from "@/assets/img/logo.png";


function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

function MobileNavItem({
    href,
    title,
    description,
    onClick,
}: { href: string; title: string; description: string; onClick?: () => void }) {
    return (
        <Link
            href={href}
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            onClick={onClick}
        >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
        </Link>
    )
}

export default function Header() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const closeSheet = () => setIsOpen(false)

    return (
        <header className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 border-b sticky top-0 bg-background z-50">
            {/* Left: Logo and Brand */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => redirect("/")}>
                <Image
                    src={logo}
                    alt="Logo"
                    width={120}
                    height={40}
                    className="w-24 sm:w-32 lg:w-36 h-auto"
                    quality={80}
                />
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Beautifully designed components built with Tailwind CSS.
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built using Radix UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem href="/docs/installation" title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem href="/docs/primitives/typography" title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/docs">Docs</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>

            {/* Right: Auth Buttons and Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Desktop Auth Buttons */}
                <div className="hidden sm:flex items-center gap-3">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="rounded-full bg-transparent">
                                    <User2 size={18} />
                                    <span className="hidden md:inline ml-2">{session?.user?.name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="outline" className="rounded-full bg-transparent" onClick={() => redirect("/login")}>
                                <User2 size={18} />
                                <span className="hidden md:inline ml-2">Log In</span>
                            </Button>
                            <Button className="rounded-full" onClick={() => redirect("/get-started")}>
                                Get Started
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className="text-left">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => redirect("/")}>
                                    <Image
                                        src={logo}
                                        alt="Logo"
                                        width={120}
                                        height={40}
                                        className="w-24 sm:w-36 lg:w-36 h-auto"
                                        quality={80}
                                    />
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4">
                            {/* Mobile Navigation */}
                            <div className="space-y-2">
                                {/* <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Navigation</h3> */}
                                <div className="space-y-1">
                                    <MobileNavItem href="/" title="Home" description="Return to the homepage" onClick={closeSheet} />
                                    <MobileNavItem
                                        href="/docs"
                                        title="Documentation"
                                        description="Learn how to use our components"
                                        onClick={closeSheet}
                                    />
                                    <MobileNavItem
                                        href="/docs/installation"
                                        title="Installation"
                                        description="How to install dependencies and structure your app"
                                        onClick={closeSheet}
                                    />
                                    <MobileNavItem
                                        href="/docs/primitives/typography"
                                        title="Typography"
                                        description="Styles for headings, paragraphs, lists...etc"
                                        onClick={closeSheet}
                                    />
                                </div>
                            </div>

                            {/* Mobile Auth Section */}
                            <div className="space-y-2 p-4 border-t">
                                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Account</h3>
                                {session ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                                            <User2 size={18} />
                                            <span className="font-medium">{session?.user?.name}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <Button variant="ghost" className="w-full justify-start" onClick={closeSheet}>
                                                Profile
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={closeSheet}>
                                                Billing
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={closeSheet}>
                                                Team
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={closeSheet}>
                                                Subscription
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => {
                                                    signOut()
                                                    closeSheet()
                                                }}
                                            >
                                                Log out
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent"
                                            onClick={() => {
                                                redirect("/login")
                                                closeSheet()
                                            }}
                                        >
                                            <User2 size={18} className="mr-2" />
                                            Log In
                                        </Button>
                                        <Button
                                            className="w-full"
                                            onClick={() => {
                                                redirect("/get-started")
                                                closeSheet()
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
