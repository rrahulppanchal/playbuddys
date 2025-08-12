
"use client";

import { useState, useEffect } from "react";
import { useAllEvents } from "@/services/event/hooks";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Bell, Bookmark, CalendarIcon, ChartSpline, Clock, Eye, Heart, ListFilterIcon, MapPin, Menu, Share2, SlidersHorizontal, UserRoundPlus, UsersRound } from "lucide-react";
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
import { sports } from "../create-fixture/page";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CustomProgressBar } from "@/components/ui/custom-progress";
import Right from "./right";
import Left from "./left";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TABS = [
  { label: "All events", value: "all" },
  { label: "For you", value: "for-you" },
  { label: "Completed", value: "completed" },
  { label: "Search", value: "search" },
  { label: "New events", value: "new-events" },
];

export default function FixturePage() {
  const router = useRouter();
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
          <div className="flex w-full border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur-sm overflow-x-auto scrollbar-hide">
            <div className="flex flex-1 min-w-0">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  className={`flex-1 min-w-[120px] cursor-pointer px-4 py-2 text-[15px] font-medium transition-all duration-200 border-b-2 focus:outline-none text-center relative hover:bg-secondary ${selectedTab === tab.value
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-muted-foreground hover:text-primary"
                    }`}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

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
              : filteredEvents.map((event) => (
                <article
                  key={event._id}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/fixtures/${event._id}`);
                  }}
                  className="px-4 py-4 hover:bg-secondary/20 transition-all duration-200 cursor-pointer border-b border-border hover:border-border/80"
                >
                  <div className="flex gap-3">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                      <img
                        src={event.createdBy.image || '/assets/img/logo.png'}
                        alt={event.createdBy.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-0">
                        <div className="flex items-center gap-1 text-[15px]">
                          <span className="font-bold text-foreground hover:underline cursor-pointer">
                            {event.createdBy.name}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground text-sm">
                            {formatDistanceToNow(parseISO(event.createdAt), { addSuffix: true }).replace(/^about /, "")}
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
                        {event.gameName}
                      </div>

                      {/* Description */}
                      <div className="text-[15px] text-muted-foreground mb-3 leading-5">
                        {event.description}
                      </div>

                      {/* Event Details Card */}
                      <div className="border border-border rounded-2xl p-4 mb-3 bg-gradient-to-br from-muted/50 to-primary/10 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-0 text-xs font-medium px-3 py-1.5 rounded-full">
                            📈 Filling up
                          </Badge>
                          <Badge className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/20 border-0 text-xs font-medium px-3 py-1.5 rounded-full">
                            🏏 {getSportName(event.sport)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span className="font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium">{event.city}, {event.state}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UsersRound className="w-4 h-4 text-primary" />
                            <span className="font-medium">{event.peopleNeeded} needed</span>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("clicked");
                          }}
                          className="w-full text-sm h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02] rounded-xl"
                        >
                          Request to Join Event
                        </Button>
                      </div>

                      {/* Action Buttons */}
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
                    </div>
                  </div>
                </article>
              ))}
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