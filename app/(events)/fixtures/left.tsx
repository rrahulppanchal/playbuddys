import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    User2
} from "lucide-react";

export default function Left() {
    const navigationItems = [
        { icon: Home, label: "Home", active: true },
        { icon: Calendar, label: "My Events", badge: 3 },
        { icon: Users, label: "Teams", badge: 2 },
        { icon: Trophy, label: "Tournaments" },
        { icon: Bookmark, label: "Saved Events" },
        { icon: Bell, label: "Notifications", badge: 5 },
        { icon: Settings, label: "Settings" }
    ];

    const quickActions = [
        { icon: Plus, label: "Create Event", variant: "default" },
        { icon: Search, label: "Find Events", variant: "outline" },
        { icon: Filter, label: "Filters", variant: "outline" }
    ];

    const popularSports = [
        { name: "Cricket", icon: Gamepad2, count: 156 },
        { name: "Football", icon: Gamepad2, count: 89 },
        { name: "Badminton", icon: Gamepad2, count: 67 },
        { name: "Tennis", icon: Gamepad2, count: 43 },
        { name: "Basketball", icon: Gamepad2, count: 38 }
    ];

    return (
        <div className="p-4 space-y-6 overflow-y-auto h-full scrollbar-hide">
            {/* Profile Section */}
            <Card className="border-0 shadow-none py-1 mb-2">
                <CardContent className="p-2 cursor-pointer hover:bg-secondary rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <User2 size={18} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Rahul Panchal</h3>
                            <p className="text-xs text-muted-foreground">Mumbai, India</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">Quick Actions</h3>
                {quickActions.map((action, index) => (
                    <Button
                        key={index}
                        variant={action.variant as any}
                        className="w-full justify-start h-9"
                    >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                    </Button>
                ))}
            </div>

            {/* Navigation */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">Navigation</h3>
                {navigationItems.map((item, index) => (
                    <Button
                        key={index}
                        variant={item.active ? "secondary" : "ghost"}
                        className="w-full justify-start h-9"
                    >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                        {item.badge && (
                            <Badge variant="destructive" className="ml-auto text-xs">
                                {item.badge}
                            </Badge>
                        )}
                    </Button>
                ))}
            </div>

            {/* Popular Sports */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground">Popular Sports</h3>
                {popularSports.map((sport, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center gap-2">
                            <sport.icon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{sport.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {sport.count}
                        </Badge>
                    </div>
                ))}
            </div>

            {/* Stats Card */}
            <Card className="p-2">
                <CardContent className="px-2">
                    <h3 className="font-semibold text-sm mb-2">Your Stats</h3>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span>Events Created</span>
                            <span className="font-semibold">12</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Events Joined</span>
                            <span className="font-semibold">28</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Teams Joined</span>
                            <span className="font-semibold">5</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}