
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, MapPin, UsersRound, TrendingUp, Star, Flame, Users, Calendar, Trophy, Target, ChevronRight, Plus, Activity, Zap, Volleyball, User, SlidersHorizontal } from "lucide-react";

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
            rating: 4.8,
            difficulty: "Intermediate",
            prize: "₹5,000"
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
            rating: 4.6,
            difficulty: "Advanced",
            prize: "₹10,000"
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
            rating: 4.9,
            difficulty: "Beginner",
            prize: "₹3,000"
        }
    ];

        const quickStats = [
            { label: "Active Events", value: "1.2K+", icon: Activity, color: "from-primary to-primary/80", bgColor: "bg-primary/10" },
            { label: "Total Players", value: "45K+", icon: Users, color: "from-secondary to-secondary/80", bgColor: "bg-secondary/10" },
            { label: "Tournaments", value: "280+", icon: Trophy, color: "from-primary/80 to-primary/60", bgColor: "bg-primary/5" },
        ];

    const quickActions = [
        { label: "Create Event", icon: Plus, color: "from-primary to-primary/80", bgColor: "bg-primary/10" },
        { label: "Join Event", icon: Users, color: "from-secondary to-secondary/80", bgColor: "bg-secondary/10" },
        { label: "View Events", icon: Calendar, color: "from-primary/80 to-primary/60", bgColor: "bg-primary/5" },
    ];

    const getParticipationPercentage = (current: number, max: number) => {
        return Math.round((current / max) * 100);
    };

    return (
        <div className="p-4 space-y-4 overflow-y-auto h-full scrollbar-hide border-l border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between">
            <Button variant="outline" className="w-full text-primary flex items-center justify-start gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-all duration-200">
                <SlidersHorizontal className="w-5 h-5" />
                <span className="text-sm font-medium">Apply filters</span>
            </Button>
            </div>
            <div className="grid grid-cols-1 border rounded-lg mb-4">
                <div className="flex items-center justify-between m-4 my-2">
                    <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                            Quick Actions
                        </h2>
                    </div>
                    {/* <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 text-sm font-medium">
                        View All
                        <ChevronRight size={14} className="ml-1" />
                    </Button> */}
                </div>
                {quickActions.map((stat, index) => (
                    <Card
                        key={index}
                        className={`border-0 shadow-none hover:bg-secondary rounded-none transition-all duration-300 cursor-pointer p-0 m-0
                            ${index === quickActions.length - 1 ? "rounded-b-lg" : ""}
                        `}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                    {/* <p className="font-bold text-xl text-foreground">{stat.value}</p> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
             
            {/* Quick Stats */}
            <div className="grid grid-cols-1 border rounded-lg mb-4">
                <div className="flex items-center justify-between m-4 my-2">
                    <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                            Activities
                        </h2>
                    </div>
                
                </div>
                {quickStats.map((stat, index) => (
                    <Card
                        key={index}
                        className={`border-0 shadow-none hover:bg-secondary rounded-none transition-all duration-300 cursor-pointer p-0 m-0
                            ${index === quickStats.length - 1 ? "rounded-b-lg" : ""}
                        `}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                    <p className="font-bold text-xl text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 border rounded-lg mb-4">
                <div className="flex items-center justify-between m-4 my-2">
                    <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                            Trending Events
                        </h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 text-sm font-medium">
                        View All
                        <ChevronRight size={14} className="ml-1" />
                    </Button>
                </div>
                {trendingEvents.map((event, index) => (
                    <Card
                        key={index}
                        className={`border-0 shadow-none hover:bg-secondary rounded-none transition-all duration-300 cursor-pointer p-0 m-0
                            ${index === trendingEvents.length - 1 ? "rounded-b-lg" : ""}
                        `}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm`}>
                                    <Volleyball className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">{event.sport}</p>
                                    <p className="font-bold text-sm text-foreground">{event.title}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 border rounded-lg mb-4">
                <div className="flex items-center justify-between m-4 my-2">
                    <div className="flex items-center gap-2">
                    <UsersRound size={14} className="text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                             People
                        </h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 text-sm font-medium">
                        View All
                        <ChevronRight size={14} className="ml-1" />
                    </Button>
                </div>
                {[1,2,3].map((i) => (
                    <Card
                        key={i}
                        className={`border-0 shadow-none hover:bg-secondary rounded-none transition-all duration-300 cursor-pointer p-0 m-0
                            ${i === 3 ? "rounded-b-lg" : ""}
                        `}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3 justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm`}>
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">John Doe</p>
                                        <p className="font-bold text-sm text-foreground">John Doe</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="text-xs h-7 px-3 border-border hover:bg-muted">
                                    Follow
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


            
           

            
        </div>
    );
}
