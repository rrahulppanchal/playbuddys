
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CustomProgressBar } from "@/components/ui/custom-progress";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { sports } from "@/app/(events)/create-fixture/page";
import Left from "@/app/(events)/fixtures/left";
import Right from "@/app/(events)/fixtures/right";

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
        <div className="hidden lg:flex h-[100vh] overflow-hidden">
          <Left />
        </div>
        <div className="overflow-auto h-[100vh] col-span-1 lg:col-span-1 scrollbar-hide bg-background border-x border-border">


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
                  <h1 className="text-md font-bold">User Profile</h1>
                </div>
                <article
                  className="px-4 py-4 hover:bg-muted/50 transition-all duration-200 border-b border-border hover:border-border/80"
                >

                  <div className="flex gap-3 mb-3">
                    {/* Profile Picture */}
                    <div className="flex flex gap-4 items-start">
                      <img
                        src={"https://lh3.googleusercontent.com/a/ACg8ocIE-PR7pmlpn79C3HD17hGwC22yHnXuTxI-x2AIqKlfry9DnAx1=s96-c"}
                        alt="Rahul Panchal"
                        className="w-32 h-32 rounded-sm object-cover ring-2 ring-border"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-foreground text-3xl text-primary">
                          Rahul Panchal
                        </p>
                        <p className=" text-md">
                          @rahul
                        </p>
                        <p className="text-md">
                          Longevity isn’t enough. Live at your peak. Extend your peak. Enjoy your life
                        </p>
                      </div>
                    </div>

                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-2">
                        <span>
                          <CalendarIcon className="w-4 h-4 text-primary" />
                        </span>
                        <span>
                          Joined 2025
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span>
                          <MapPin className="w-4 h-4 text-primary" />
                        </span>
                        <span>
                          Mumbai, India
                        </span>
                      </p>
                    </div>
                  </div>


                </article>
              </>
              )}

          </div>

        </div>
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
