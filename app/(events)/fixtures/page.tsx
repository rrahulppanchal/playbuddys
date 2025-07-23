"use client";

import { useState } from "react";
import { useAllEvents } from "@/services/event/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ListFilterIcon } from "lucide-react";
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

const TABS = [
  { label: "All events", value: "all" },
  { label: "For you", value: "for-you" },
  { label: "Completed", value: "completed" },
  { label: "New events", value: "new-events" },
];

export default function FixturePage() {
  const { data, isLoading, error } = useAllEvents();
  const [selectedTab, setSelectedTab] = useState("all");
  // Dummy filter state
  const [filterSport, setFilterSport] = useState(false);
  const [filterCity, setFilterCity] = useState(false);
  const [filterPrivacy, setFilterPrivacy] = useState(false);

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
      <div
        className="grid grid-cols-3"
        style={{ gridTemplateColumns: "20% 50% 30%", height: "100vh" }}
      >
        {/* Left column (20%) */}
        <div className="p-4 flex items-center border-r justify-center overflow-auto h-[100vh]">
          <span className="text-muted-foreground">Left Column (20%) Dummy Text</span>
        </div>
        {/* Center column (50%) - Event content */}
        <div className="overflow-auto h-[100vh]">
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
                    <CardContent className="pt-0">
                      <div className="font-bold text-lg mb-1">{event.gameName}</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {event.description}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">{event.sport}</Badge>
                        <Badge variant="outline">{event.city}</Badge>
                        <Badge variant="outline">{event.state}</Badge>
                        <Badge variant="outline">{event.privacy}</Badge>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                        <span>People Needed: {event.peopleNeeded}</span>
                        <span>Date: {event.date}</span>
                        <span>Time: {event.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
        {/* Right column (30%) */}
        <div className="p-4 flex items-center border-l justify-center overflow-auto h-[100vh]">
          <span className="text-muted-foreground">Right Column (30%) Dummy Text</span>
        </div>
      </div>
    </div>
  );
}