"use client";

import { useState, useEffect } from "react";
import { useAllEvents } from "@/services/event/hooks";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CalendarIcon, ChartSpline, Clock, Eye, Heart, ListFilterIcon, MapPin, Share2, UserRoundPlus, UsersRound } from "lucide-react";
import { MoreHorizontal, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const TABS = [
  { label: "All events", value: "all" },
  { label: "For you", value: "for-you" },
  { label: "Completed", value: "completed" },
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
      <div className="grid grid-cols-1 lg:grid-cols-3 h-screen" style={{ 
        gridTemplateColumns: isLargeScreen ? "20% 50% 30%" : "1fr"
      }}>
        {/* Left column (20%) - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex border-r h-[100vh] overflow-hidden">
          <Left />
        </div>
        {/* Center column (100% on mobile, 50% on desktop) - Event content */}
        <div className="overflow-auto h-[100vh] col-span-1 lg:col-span-1 scrollbar-hide">
          <div className="flex w-full border-b sticky top-0 z-10 bg-background">
            <>{TABS.map((tab) => (
              <button
                key={tab.value}
                className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium transition-colors border-b-2 focus:outline-none text-center ${selectedTab === tab.value
                  ? "border-primary text-primary bg-secondary"
                  : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}</>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size="icon"><ListFilterIcon /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
          <div className="grid grid-cols-1">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="rounded-none py-3 px-3 gap-2 border-r-0 border-l-0 border-t-0 bg-background shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))
              : filteredEvents.map((event) => (
                <Card
                  key={event._id}
                  className="rounded-none py-3 px-3 gap-2 border-r-0 border-l-0 border-t-0 bg-background shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardHeader className="pb-0 px-2 flex flex-row items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.createdBy.image || '/assets/img/logo.png'}
                        alt={event.createdBy.name}
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-base leading-tight flex items-center">
                          {event.createdBy.name}
                          <span className="mx-1 text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground ml-1">
                            {formatDistanceToNow(parseISO(event.createdAt), { addSuffix: true }).replace(/^about /, "")}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">{event.createdBy.email}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 p-0"><MoreHorizontal className="w-5 h-5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Flag className="w-4 h-4 text-destructive" />
                          <span className="text-destructive">Report</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  {/* <Separator style={{ border: "1px dashed #e0e0e0" }} /> */}
                  <CardContent className="px-2 pt-0 border border-dashed pb-2">
                    <div className="flex items-center gap-2 mb-1 mt-1">
                      {/* <Badge variant="destructive" className="px-2 py-1"><ChartSpline />Filling up</Badge> */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-1 mt-1 text-primary border rounded-md px-2 py-[2px] w-max bg-secondary">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="font-semibold text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold text-sm">{event.time}</span>
                        </div>
                      </div></div>
                    <div className="font-bold text-lg mb-1">{event.gameName}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{getSportName(event.sport)}</Badge>
                      {event.types && event.types.map((type, index) => (
                        <Badge key={index} variant="outline">{type}</Badge>
                      ))}
                      <Badge variant="secondary"><UsersRound />{event.peopleNeeded}</Badge>

                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                      <span className="flex gap-1"><MapPin className="h-4 w-4" /> {event.address}</span>
                      <span>City: {event.city}</span>
                      <span>State: {event.state}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="px-0 w-full">
                    <div className="w-full">
                      <div className="grid grid-cols-4 gap-2 w-full">
                        <Button variant="ghost" className="w-full"><Heart />234M</Button>
                        <Button variant="ghost" className="w-full"><Eye />434</Button>
                        <Button variant="ghost" className="w-full"><UserRoundPlus />12</Button>
                        <Button variant="ghost" className="w-full"><Share2 />344K</Button>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <blockquote className="border-l-2 italic">
                        <Badge variant="default" className="bg-background text-primary lg:text-sm"><UsersRound className="h-8 w-8"/>{event.peopleNeeded} People liked with John Doe</Badge>
                        </blockquote>
                        <Badge variant="outline" className="bg-background rounded-full text-primary lg:text-sm"><UsersRound className="h-8 w-8"/>{event.peopleNeeded} People Joined</Badge>

                        {/* <Progress value={50} className="w-[30%]" /> */}
                        {/* <CustomProgressBar value={75} text="Filled"  className="w-[50%]"/> */}
                      </div>

                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
        {/* Right column (30%) - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex border-l h-[100vh] overflow-hidden">
          <Right />
        </div>
      </div>
    </div>
  );
}