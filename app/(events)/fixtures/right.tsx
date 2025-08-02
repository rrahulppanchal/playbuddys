import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPin, UsersRound, TrendingUp, Star } from "lucide-react";

export default function Right() {
  const trendingEvents = [
    {
      id: 1,
      title: "Weekend Cricket League",
      sport: "Cricket",
      date: "2025-01-15",
      time: "14:00",
      location: "Mumbai",
      participants: 18,
      maxParticipants: 22,
      trending: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Football Championship",
      sport: "Football",
      date: "2025-01-16",
      time: "16:30",
      location: "Delhi",
      participants: 8,
      maxParticipants: 11,
      trending: true,
      rating: 4.6
    },
    {
      id: 3,
      title: "Badminton Tournament",
      sport: "Badminton",
      date: "2025-01-17",
      time: "10:00",
      location: "Bangalore",
      participants: 12,
      maxParticipants: 16,
      trending: false,
      rating: 4.9
    },
    {
      id: 4,
      title: "Tennis Doubles",
      sport: "Tennis",
      date: "2025-01-18",
      time: "09:00",
      location: "Chennai",
      participants: 4,
      maxParticipants: 4,
      trending: true,
      rating: 4.7
    }
  ];

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full scrollbar-hide">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Trending Events</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="space-y-3">
        {trendingEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-semibold line-clamp-2">{event.title}</CardTitle>
                {event.trending && (
                  <Badge variant="destructive" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">{event.sport}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{event.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarIcon className="w-3 h-3" />
                <span>{event.date}</span>
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <UsersRound className="w-3 h-3" />
                  <span>{event.participants}/{event.maxParticipants}</span>
                </div>
                <Button size="sm" className="text-xs h-6 px-2">
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2">Create Your Event</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Start organizing sports events and connect with players in your area.
          </p>
          <Button className="w-full text-xs h-8">Create Event</Button>
        </CardContent>
      </Card>
    </div>
  );
}