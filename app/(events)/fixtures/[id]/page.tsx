
"use client";

import { useState, useEffect } from "react";
import { useAllEvents } from "@/services/event/hooks";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Bell, Bookmark, CalendarIcon, ChartSpline, Clock, Eye, Heart, ListFilterIcon, MapPin, Menu, Share2, SlidersHorizontal, UserRoundPlus, UsersRound } from "lucide-react";
import { MoreHorizontal, Flag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import logo from "@/assets/img/logo.png"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow, parseISO } from "date-fns";
import { sports } from "../../create-fixture/page";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CustomProgressBar } from "@/components/ui/custom-progress";
import Right from "../right";
import Left from "../left";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const TABS = [
    { label: "All events", value: "all" },
    { label: "For you", value: "for-you" },
    { label: "Completed", value: "completed" },
    { label: "Search", value: "search" },
    { label: "New events", value: "new-events" },
];

export default function FixturePage() {
    const { data, isLoading, error } = useAllEvents();
    const [selectedTab, setSelectedTab] = useState("all");
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    // Dummy filter state
    const [filterSport, setFilterSport] = useState(false);
    const [filterCity, setFilterCity] = useState(false);
    const [filterPrivacy, setFilterPrivacy] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Function to get sport name by ID
    const getSportName = (sportId: number) => {
        const sport = sports.find(s => s.id === sportId);
        return sport ? sport.sport : `Sport ${sportId}`;
    };

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Failed to load events. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // For now, only 'all' tab is functional
    const filteredEvents = data?.events || [];

    return (
        <div className="container mx-auto">
            {!isLargeScreen && (
                <div className="flex items-center gap-2 px-3 border-b border-border justify-between">
                    <div className="flex items-center gap-2">

                        <Sheet>
                            <SheetTrigger><Menu className="w-5 h-5 text-primary" /></SheetTrigger>
                            <SheetContent side="left">
                                <Left />
                            </SheetContent>
                        </Sheet>
                        <Image
                            src={logo}
                            alt="User profile photo"
                            width={180}
                            quality={80}
                        />
                    </div>

                    <div className="flex items-center px-0 flex-shrink-0 gap-3">
                        <Bell className="w-5 h-5 text-primary" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-muted transition-all duration-200 rounded-full w-9 h-9">
                                    <SlidersHorizontal className="w-6 h-6 text-primary" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="shadow-xl border border-border rounded-xl">
                                <DropdownMenuCheckboxItem
                                    checked={filterSport}
                                    onCheckedChange={setFilterSport}
                                >
                                    Sport
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={filterCity}
                                    onCheckedChange={setFilterCity}
                                >
                                    City
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={filterPrivacy}
                                    onCheckedChange={setFilterPrivacy}
                                >
                                    Privacy
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 h-screen" style={{
                gridTemplateColumns: isLargeScreen ? "20% 50% 30%" : "1fr"
            }}>
                {/* Left column (20%) - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:flex h-[100vh] overflow-hidden">
                    <Left />
                </div>
                {/* Center column (100% on mobile, 50% on desktop) - Event content */}
                <div className="overflow-auto h-[100vh] col-span-1 lg:col-span-1 scrollbar-hide bg-background border-x border-border">


                    {/* Events Feed */}
                    <div className="divide-y divide-border">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="px-4 py-4 hover:bg-muted/50 transition-colors duration-200">
                                    <div className="flex gap-3">
                                        <Skeleton className="w-12 h-12 rounded-full" />
                                        <div className="flex-1 space-y-3">
                                            <Skeleton className="h-4 w-1/3" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-20 w-full rounded-xl" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </div>
                                    </div>
                                </div>
                            ))
                            : (<>
                                <div className="flex items-center justify-start gap-4 border-b border-border p-2 sticky top-0 z-20 bg-secondary/10 backdrop-blur-sm">
                                    <Button variant="outline" size="icon" className="text-primary rounded-full w-7 h-7">
                                        <ArrowLeft className="w-4 h-4" />
                                    </Button>
                                    <h1 className="text-md font-bold">Cricket Match Game 2 League 1</h1>
                                </div>
                                <article
                                    className="px-4 py-4 hover:bg-muted/50 transition-all duration-200 border-b border-border hover:border-border/80"
                                >

                                    <div className="flex gap-3">
                                        {/* Profile Picture */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={"https://lh3.googleusercontent.com/a/ACg8ocIE-PR7pmlpn79C3HD17hGwC22yHnXuTxI-x2AIqKlfry9DnAx1=s96-c"}
                                                alt="Rahul Panchal"
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Header */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-[15px]">
                                                    <span className="font-bold text-foreground hover:underline cursor-pointer">
                                                        Rahul Panchal
                                                    </span>
                                                    <span className="text-muted-foreground">·</span>
                                                    <span className="text-muted-foreground text-sm">
                                                        {formatDistanceToNow(parseISO("2025-07-26T20:15:52.274Z"), { addSuffix: true }).replace(/^about /, "")}
                                                    </span>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted rounded-full">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="shadow-xl border border-border rounded-lg w-50">
                                                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                                            <Flag className="w-4 h-4 text-destructive" />
                                                            <span className="text-destructive">Report</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <Bookmark className="w-4 h-4" />
                                                            <span>Save</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Event Title */}
                                            <div className="text-[18px] font-bold text-foreground leading-6 mb-2">
                                                Cricket Match Game 2 League 1
                                            </div>

                                            {/* Description */}
                                            <div className="text-[15px] text-muted-foreground mb-3 leading-5">
                                                This interface is part of a sports or event management application that allows the user to configure and set up details for a game. The main features and options displayed in the interface.
                                            </div>

                                            {/* Event Details Card */}
                                            <div className="border border-border rounded-2xl p-4 mb-3 bg-gradient-to-br from-muted/50 to-primary/10 hover:shadow-sm transition-all duration-200">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-0 text-xs font-medium px-3 py-1.5 rounded-full">
                                                        📈 Filling up
                                                    </Badge>
                                                    <Badge className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/20 border-0 text-xs font-medium px-3 py-1.5 rounded-full">
                                                        🏏 Cricket
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">2025-08-01</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">01:30</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">Jhansi, Uttar Pradesh</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <UsersRound className="w-4 h-4 text-primary" />
                                                        <span className="font-medium">22 needed</span>
                                                    </div>
                                                </div>

                                                {/* Venue Address Section */}
                                                <div className="mb-3 p-3 bg-muted/30 rounded-xl border border-border/50">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <div className="flex-1">
                                                            <div className="text-xs font-semibold text-muted-foreground mb-1">Venue Address</div>
                                                            <div className="text-sm text-foreground leading-relaxed">
                                                                Central Cricket Ground, Near Railway Station,
                                                                Civil Lines, Jhansi, Uttar Pradesh 284001
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Google Maps Link Section */}
                                                <div className="mb-3 p-3 bg-muted/30 rounded-xl border border-border/50">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-4 h-4 text-primary mt-0.5 flex-shrink-0">
                                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs font-semibold text-muted-foreground mb-1">Location on Map</div>
                                                            <a
                                                                href="https://maps.google.com/?q=Central+Cricket+Ground+Jhansi+Uttar+Pradesh"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200 flex items-center gap-1"
                                                            >
                                                                Open in Google Maps
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Contact Details Section */}
                                                <div className="mb-3 p-3 bg-muted/30 rounded-xl border border-border/50">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-4 h-4 text-primary mt-0.5 flex-shrink-0">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-xs font-semibold text-muted-foreground mb-1">Contact Details</div>
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm text-foreground font-medium">Phone:</span>
                                                                    <a
                                                                        href="tel:+919876543210"
                                                                        className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200"
                                                                    >
                                                                        +91 98765 43210
                                                                    </a>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-sm text-foreground font-medium">WhatsApp:</span>
                                                                    <a
                                                                        href="https://wa.me/919876543210"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200 flex items-center gap-1"
                                                                    >
                                                                        +91 98765 43210
                                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 mb-5">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <UsersRound className="w-3 h-3 text-primary" />
                                                            <span>{22}/{13} joined</span>
                                                        </div>
                                                        <span className="text-primary font-medium">
                                                            {getParticipationPercentage(13, 22)}% filled
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-primary/40 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 rounded-full"
                                                            style={{ width: `${getParticipationPercentage(13, 22)}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Join Event Button in Card */}
                                                <Button
                                                    size="sm"
                                                    className="w-full text-sm h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02] rounded-xl"
                                                >
                                                    Request to Join Event
                                                </Button>
                                            </div>

                                            {/* Action Buttons */}

                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center justify-between gap-0 w-full">
                                            <button className="flex items-center gap-0 text-muted-foreground hover:text-destructive transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-destructive/10 transition-colors">
                                                    <Heart className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium">234</span>
                                            </button>

                                            <button className="flex items-center gap-0 text-muted-foreground hover:text-primary transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                                                    <MessageCircle className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium">12</span>
                                            </button>

                                            <button className="flex items-center gap-0 text-muted-foreground hover:text-secondary transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-secondary/10 transition-colors">
                                                    <Share2 className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium">344K</span>
                                            </button>

                                            <button className="flex items-center gap-0 text-muted-foreground hover:text-primary/80 transition-colors group">
                                                <div className="p-2 rounded-full group-hover:bg-primary/5 transition-colors">
                                                    <Eye className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium">434</span>
                                            </button>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="mt-4">
                                        <form className="relative">
                                            <Textarea
                                                className="w-full rounded-xl border border-input bg-background p-3 pr-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                rows={3}
                                                placeholder="Add a comment..."
                                            />
                                            <button
                                                type="submit"
                                                className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                                            >
                                                Post
                                            </button>
                                        </form>
                                    </div>
                                </article>
                            </>
                            )}

                    </div>
                    {/* Dummy comments for this post */}
                    <div className="">
                        {/* Comment 1 */}
                        {/* Comment 1 */}
                        <div className="flex items-start">
                            <div className="flex-1 border-b px-4 py-2">
                                <div className="flex items-start justify-start gap-2">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="User 1"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground text-sm">Amit Sharma</span>
                                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                                        </div>
                                        <div className="text-[15px] text-foreground">
                                            Looking forward to this match! Who else is coming?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment 2 */}
                        <div className="flex items-start">
                            <div className="flex-1 border-b px-4 py-2">
                                <div className="flex items-start justify-start gap-2">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/44.jpg"
                                        alt="User 2"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground text-sm">Priya Verma</span>
                                            <span className="text-xs text-muted-foreground">1 hour ago</span>
                                        </div>
                                        <div className="text-[15px] text-foreground">
                                            Can someone share the location details again?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment 3 */}
                        <div className="flex items-start">
                            <div className="flex-1 border-b px-4 py-2">
                                <div className="flex items-start justify-start gap-2">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/65.jpg"
                                        alt="User 3"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-foreground text-sm">Rahul Singh</span>
                                            <span className="text-xs text-muted-foreground">just now</span>
                                        </div>
                                        <div className="text-[15px] text-foreground">
                                            I’ll bring the drinks! See you all there.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-4 text-muted-foreground text-sm">
                            No more comments available.
                        </div>
                    </div>
                </div>
                {/* Right column (30%) - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:flex h-[100vh] overflow-hidden">
                    <Right />
                </div>
            </div>
        </div>
    );
}


const getParticipationPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
};
