
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/img/logo.png"
import {
    Home,
    Calendar,
    Users,
    Trophy,
    Settings,
    Plus,
    Search,
    Filter,
    MapPin,
    Gamepad2,
    Bell,
    Bookmark,
    User2,
    ChevronRight,
    Star,
    Zap,
    TrendingUp,
    Activity,
    FireExtinguisher
} from "lucide-react";
import Image from "next/image";

export default function Left() {
    const navigationItems = [
        { icon: Home, label: "Home", active: true },
        { icon: Calendar, label: "My Matches", badge: 3 },
        { icon: Users, label: "Upcoming", badge: 2 },
        { icon: Trophy, label: "Previous" },
        { icon: Bookmark, label: "Saved Matches" },
        { icon: Bell, label: "Notifications", badge: 5 },
        { icon: Settings, label: "People " }
    ];

    const quickActions = [
        { icon: Plus, label: "Create Event", variant: "default", gradient: true },
        { icon: Search, label: "Find Events", variant: "outline" },
        { icon: Filter, label: "Filters", variant: "outline" }
    ];

    const popularSports = [
        { name: "Cricket", icon: Gamepad2, count: 156, trend: "+12%" },
        { name: "Football", icon: Gamepad2, count: 89, trend: "+8%" },
        { name: "Badminton", icon: Gamepad2, count: 67, trend: "+15%" },
        { name: "Tennis", icon: Gamepad2, count: 43, trend: "+5%" },
        { name: "Basketball", icon: Gamepad2, count: 38, trend: "+20%" }
    ];

    return (
        <div className="p-4 space-y-4 overflow-y-auto h-full scrollbar-hide bg-background">
            {/* Profile Section */}
            <div>
                    <Image
                        src={logo}
                        alt="User profile photo"
                        width={180}
                        quality={80}
                    />
                    </div>
            <Card className="border-0 p-0 m-0 mb-4 shadow-none border transition-all duration-300">
                <CardContent className="p-0 py-3 rounded-lg transition-all duration-300">
                    
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary/80 px-4 py-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-sm">
                            <User2 size={18} className="text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm text-foreground">Rahul Panchal</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin size={10} />
                                Mumbai, India
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                                <Star size={10} className="text-primary fill-current" />
                                <span className="text-xs text-muted-foreground">4.8 rating</span>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-3 text-xs mt-4 px-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Events Created</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">12</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Events Joined</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">28</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Teams Joined</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">5</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Navigation */}
            <div className="space-y-1">
                {navigationItems.map((item, index) => (
                    <Button
                        key={index}
                        variant={item.active ? "secondary" : "ghost"}
                        className={`w-full justify-start h-11 transition-all duration-200 hover:scale-[1.01] text-sm ${
                            item.active 
                                ? "bg-secondary text-primary border border-secondary font-medium" 
                                : "hover:bg-secondary text-foreground"
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                            <Badge variant="destructive" className="text-xs px-2 py-0.5 bg-destructive text-destructive-foreground">
                                {item.badge}
                            </Badge>
                        )}
                    </Button>
                ))}
            </div>


          

            {/* Stats Card */}
            {/* <Card className="bg-gradient-to-br from-muted/50 to-primary/5 border border-border shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                        <Trophy size={16} className="text-primary" />
                        Your Performance
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Events Created</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">12</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Events Joined</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">28</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Teams Joined</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-gradient-to-r from-primary/80 to-primary/60 rounded-full"></div>
                                </div>
                                <span className="font-semibold text-foreground">5</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    );
}
