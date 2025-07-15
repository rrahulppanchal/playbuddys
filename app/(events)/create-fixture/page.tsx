"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, X, CalendarIcon, Clock, ListChecks, ListOrdered, LocateFixed, Gamepad2, AlignLeft, Users, MapPin, Link2, ImagePlus, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/layout/header";

// Sports and types data
const sports = [
    { id: 1, sport: "Cricket" },
    { id: 2, sport: "Football" },
    { id: 3, sport: "Hockey" },
    { id: 4, sport: "Badminton" },
    { id: 5, sport: "Tennis" },
    { id: 6, sport: "Table Tennis" },
    { id: 7, sport: "Kabaddi" },
    { id: 8, sport: "Martial Arts" },
    { id: 9, sport: "Mountaineering" },
    { id: 10, sport: "Rock Climbing" },
    { id: 11, sport: "Chess" },
    { id: 12, sport: "Carrom" },
    { id: 13, sport: "Snooker/Billiards" },
    { id: 14, sport: "Cycling" },
    { id: 15, sport: "Swimming" },
    { id: 16, sport: "Golf" },
    { id: 17, sport: "Volleyball" },
    { id: 18, sport: "Basketball" },
    { id: 19, sport: "Pickleball" },
];

const types = [
    { sport_id: 1, type: "Test" },
    { sport_id: 1, type: "ODI" },
    { sport_id: 1, type: "T20" },
    { sport_id: 1, type: "T10" },
    { sport_id: 1, type: "100-Ball" },
    { sport_id: 1, type: "Box Cricket" },
    { sport_id: 1, type: "Tennis Ball" },
    { sport_id: 1, type: "Season Ball" },
    { sport_id: 1, type: "Tape Ball" },
    { sport_id: 2, type: "11-a-side" },
    { sport_id: 2, type: "7-a-side" },
    { sport_id: 2, type: "5-a-side (Futsal)" },
    { sport_id: 2, type: "Penalty Shootout" },
    { sport_id: 3, type: "Field Hockey" },
    { sport_id: 3, type: "Ice Hockey" },
    { sport_id: 3, type: "Indoor Hockey" },
    { sport_id: 4, type: "Singles" },
    { sport_id: 4, type: "Doubles" },
    { sport_id: 4, type: "Mixed Doubles" },
    { sport_id: 4, type: "Team Events" },
    { sport_id: 5, type: "Singles" },
    { sport_id: 5, type: "Doubles" },
    { sport_id: 5, type: "Mixed Doubles" },
    { sport_id: 5, type: "Clay Court" },
    { sport_id: 5, type: "Grass Court" },
    { sport_id: 5, type: "Hard Court" },
    { sport_id: 6, type: "Singles" },
    { sport_id: 6, type: "Doubles" },
    { sport_id: 6, type: "Mixed Doubles" },
    { sport_id: 6, type: "Team Events" },
    { sport_id: 7, type: "Standard Style" },
    { sport_id: 7, type: "Circle Style" },
    { sport_id: 7, type: "Beach Kabaddi" },
    { sport_id: 8, type: "Judo" },
    { sport_id: 8, type: "Karate" },
    { sport_id: 8, type: "Taekwondo" },
    { sport_id: 8, type: "Kickboxing" },
    { sport_id: 8, type: "MMA" },
    { sport_id: 8, type: "Kalaripayattu" },
    { sport_id: 8, type: "Gatka" },
    { sport_id: 9, type: "Alpine" },
    { sport_id: 9, type: "Expedition" },
    { sport_id: 9, type: "Ice Climbing" },
    { sport_id: 10, type: "Bouldering" },
    { sport_id: 10, type: "Lead Climbing" },
    { sport_id: 10, type: "Speed Climbing" },
    { sport_id: 11, type: "Classical" },
    { sport_id: 11, type: "Rapid" },
    { sport_id: 11, type: "Blitz" },
    { sport_id: 11, type: "Bullet" },
    { sport_id: 12, type: "Singles" },
    { sport_id: 12, type: "Doubles" },
    { sport_id: 13, type: "Snooker (6-red)" },
    { sport_id: 13, type: "Snooker (15-red)" },
    { sport_id: 13, type: "English Billiards" },
    { sport_id: 13, type: "Pool" },
    { sport_id: 14, type: "Road" },
    { sport_id: 14, type: "Track" },
    { sport_id: 14, type: "BMX" },
    { sport_id: 14, type: "MTB" },
    { sport_id: 15, type: "Freestyle" },
    { sport_id: 15, type: "Backstroke" },
    { sport_id: 15, type: "Breaststroke" },
    { sport_id: 15, type: "Butterfly" },
    { sport_id: 15, type: "Medley" },
    { sport_id: 16, type: "Stroke Play" },
    { sport_id: 16, type: "Match Play" },
    { sport_id: 16, type: "Driving Range" },
    { sport_id: 16, type: "Mini Golf" },
    { sport_id: 17, type: "Indoor" },
    { sport_id: 17, type: "Beach" },
    { sport_id: 17, type: "Sitting Volleyball" },
    { sport_id: 18, type: "5v5" },
    { sport_id: 18, type: "3v3" },
    { sport_id: 19, type: "Singles" },
    { sport_id: 19, type: "Doubles" },
    { sport_id: 19, type: "Mixed Doubles" },
    { sport_id: 19, type: "Indoor" },
    { sport_id: 19, type: "Outdoor" },
    { sport_id: 19, type: "Recreational" },
    { sport_id: 19, type: "Competitive" },
];

// Indian states and cities (sample, add more as needed)
const indianStates = [
    { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
    { name: "Karnataka", cities: ["Bengaluru", "Mysuru", "Mangalore", "Hubli"] },
    { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Saket"] },
    { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
    { name: "West Bengal", cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"] },
    { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Agra", "Varanasi"] },
    // ...add more states and cities as needed
];

// Time intervals (15 min gap)
const timeIntervals = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const min = (i % 4) * 15;
    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
});

// Zod schema
const schema = z.object({
    gameName: z.string().min(1, "Game name is required"),
    description: z.string().min(1, "Description is required"),
    peopleNeeded: z.number().min(1, "At least 1 person is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    addressLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    sport: z.number().min(1, "Sport is required"),
    types: z.array(z.string()).min(1, "Select at least one type"),
    coverPhoto: z
        .instanceof(File)
        .optional()
        .or(z.literal(undefined)),
});

type FormValues = z.infer<typeof schema>;

export default function CreateFixture() {
    const [sportOpen, setSportOpen] = React.useState(false);
    const [typeOpen, setTypeOpen] = React.useState(false);
    const [stateOpen, setStateOpen] = React.useState(false);
    const [cityOpen, setCityOpen] = React.useState(false);
    const [timeOpen, setTimeOpen] = React.useState(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            gameName: "",
            description: "",
            peopleNeeded: 1,
            state: "",
            city: "",
            address: "",
            addressLink: "",
            date: "",
            time: "",
            sport: undefined,
            types: [],
        },
    });

    const selectedSport = watch("sport");
    const selectedTypes = watch("types");
    const selectedState = watch("state");

    // Filter types by selected sport
    const filteredTypes = selectedSport
        ? types.filter((t) => t.sport_id === selectedSport)
        : [];

    // Filter cities by selected state
    const filteredCities =
        selectedState && selectedState.length > 0
            ? indianStates.find((s) => s.name === selectedState)?.cities || []
            : [];

    // Reset types when sport changes
    React.useEffect(() => {
        setValue("types", []);
    }, [selectedSport, setValue]);

    // Reset city when state changes
    React.useEffect(() => {
        setValue("city", "");
    }, [selectedState, setValue]);

    const onSubmit = (data: FormValues) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (<><Header />
        <form
            className="w-full max-w-4xl mx-auto py-10 px-4 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Heading */}
            <h1 className="text-3xl font-bold text-center mb-2">Create Event</h1>

            {/* Game Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Game Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Game Name */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <Gamepad2 className="h-5 w-5 text-green-700" />
                            Game Name
                        </label>
                        <Controller
                            control={control}
                            name="gameName"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    className={cn("w-full", errors.gameName && "border-red-500")}
                                    placeholder="Enter game name"
                                />
                            )}
                        />
                        {errors.gameName && (
                            <p className="text-xs text-red-500 mt-1">{errors.gameName.message}</p>
                        )}
                    </div>
                    {/* Sport */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <ListOrdered className="h-5 w-5 text-green-700" />
                            Sport
                        </label>
                        <Controller
                            control={control}
                            name="sport"
                            render={({ field }) => (
                                <Popover open={sportOpen} onOpenChange={setSportOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={sportOpen}
                                            className={cn("w-full justify-between items-center", errors.sport && "border-red-500")}
                                        >
                                            {field.value
                                                ? sports.find((s) => s.id === field.value)?.sport
                                                : "Select sport"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search sport..." />
                                            <CommandList>
                                                <CommandEmpty>No sport found.</CommandEmpty>
                                                {sports.map((sport) => (
                                                    <CommandItem
                                                        key={sport.id}
                                                        value={sport.sport}
                                                        onSelect={() => {
                                                            field.onChange(sport.id);
                                                            setSportOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === sport.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {sport.sport}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.sport && (
                            <p className="text-xs text-red-500 mt-1">{errors.sport.message}</p>
                        )}
                    </div>
                    {/* Type */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <ListChecks className="h-5 w-5 text-green-700" />
                            Type
                        </label>
                        <Controller
                            control={control}
                            name="types"
                            render={({ field }) => (
                                <>
                                    <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={typeOpen}
                                                className={cn("w-full justify-between items-center", errors.types && "border-red-500")}
                                                disabled={!selectedSport}
                                            >
                                                {field.value.length > 0
                                                    ? `${field.value.length} selected`
                                                    : "Select type(s)"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search type..." />
                                                <CommandList>
                                                    <CommandEmpty>No type found.</CommandEmpty>
                                                    {filteredTypes.map((typeObj) => (
                                                        <CommandItem
                                                            key={typeObj.type}
                                                            value={typeObj.type}
                                                            onSelect={() => {
                                                                if (field.value.includes(typeObj.type)) {
                                                                    field.onChange(
                                                                        field.value.filter((t: string) => t !== typeObj.type)
                                                                    );
                                                                } else {
                                                                    field.onChange([
                                                                        ...field.value,
                                                                        typeObj.type,
                                                                    ]);
                                                                }
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    field.value.includes(typeObj.type)
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {typeObj.type}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {field.value.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2 w-full">
                                            {field.value.map((type: string) => (
                                                <span
                                                    key={type}
                                                    className="inline-flex items-center px-2 py-1 bg-primary text-muted rounded text-xs"
                                                >
                                                    {type}
                                                    <X
                                                        className="ml-1 h-3 w-3 cursor-pointer"
                                                        onClick={() =>
                                                            field.onChange(
                                                                field.value.filter((t: string) => t !== type)
                                                            )
                                                        }
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                        {errors.types && (
                            <p className="text-xs text-red-500 mt-1">{errors.types.message}</p>
                        )}
                    </div>
                    {/* Number of People Needed */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <Users className="h-5 w-5 text-green-700" />
                            Number of People Needed
                        </label>
                        <Controller
                            control={control}
                            name="peopleNeeded"
                            render={({ field }) => (
                                <div>
                                    <Slider
                                        min={1}
                                        max={30}
                                        step={1}
                                        value={[field.value]}
                                        onValueChange={([val]) => field.onChange(val)}
                                        className="w-full"
                                    />
                                    <div className="text-sm mt-2 text-green-700 font-semibold">
                                        Selected: {field.value}
                                    </div>
                                </div>
                            )}
                        />
                        {errors.peopleNeeded && (
                            <p className="text-xs text-red-500 mt-1">{errors.peopleNeeded.message}</p>
                        )}
                    </div>
                    {/* Description (moved to end) */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <AlignLeft className="h-5 w-5 text-green-700" />
                            Description
                        </label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    className={cn("w-full", errors.description && "border-red-500")}
                                    placeholder="Enter description"
                                    rows={3}
                                />
                            )}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Date & Time Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <CalendarIcon className="h-5 w-5 text-green-700" />
                            Date to Start Event
                        </label>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                                errors.date && "border-red-500"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value
                                                ? format(new Date(field.value), "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={date => {
                                                field.onChange(date ? date.toISOString().split("T")[0] : "");
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.date && (
                            <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
                        )}
                    </div>
                    {/* Time */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <Clock className="h-5 w-5 text-green-700" />
                            Time
                        </label>
                        <Controller
                            control={control}
                            name="time"
                            render={({ field }) => (
                                <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={timeOpen}
                                            className={cn("w-full justify-between items-center", errors.time && "border-red-500")}
                                        >
                                            {field.value
                                                ? field.value
                                                : "Select time"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0 max-h-[300px] overflow-y-auto">
                                        <Command>
                                            <CommandInput placeholder="Search time..." />
                                            <CommandList>
                                                <CommandEmpty>No time found.</CommandEmpty>
                                                {timeIntervals.map((time) => (
                                                    <CommandItem
                                                        key={time}
                                                        value={time}
                                                        onSelect={() => {
                                                            field.onChange(time);
                                                            setTimeOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === time
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {time}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.time && (
                            <p className="text-xs text-red-500 mt-1">{errors.time.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* State */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <LocateFixed className="h-5 w-5 text-green-700" />
                            State
                        </label>
                        <Controller
                            control={control}
                            name="state"
                            render={({ field }) => (
                                <Popover open={stateOpen} onOpenChange={setStateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={stateOpen}
                                            className={cn("w-full justify-between items-center", errors.state && "border-red-500")}
                                        >
                                            {field.value
                                                ? field.value
                                                : "Select state"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search state..." />
                                            <CommandList>
                                                <CommandEmpty>No state found.</CommandEmpty>
                                                {indianStates.map((state) => (
                                                    <CommandItem
                                                        key={state.name}
                                                        value={state.name}
                                                        onSelect={() => {
                                                            field.onChange(state.name);
                                                            setStateOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === state.name
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {state.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.state && (
                            <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
                        )}
                    </div>
                    {/* City */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <MapPin className="h-5 w-5 text-green-700" />
                            City
                        </label>
                        <Controller
                            control={control}
                            name="city"
                            render={({ field }) => (
                                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={cityOpen}
                                            className={cn("w-full justify-between items-center", errors.city && "border-red-500")}
                                            disabled={!selectedState}
                                        >
                                            {field.value
                                                ? field.value
                                                : "Select city"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search city..." />
                                            <CommandList>
                                                <CommandEmpty>No city found.</CommandEmpty>
                                                {filteredCities.map((city) => (
                                                    <CommandItem
                                                        key={city}
                                                        value={city}
                                                        onSelect={() => {
                                                            field.onChange(city);
                                                            setCityOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value === city
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {city}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.city && (
                            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
                        )}
                    </div>
                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <MapPin className="h-5 w-5 text-green-700" />
                            Address
                        </label>
                        <Controller
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    className={cn("w-full", errors.address && "border-red-500")}
                                    placeholder="Enter address"
                                    rows={2}
                                />
                            )}
                        />
                        {errors.address && (
                            <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
                        )}
                    </div>
                    {/* Link to Address */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 mb-2 font-medium">
                            <Link2 className="h-5 w-5 text-green-700" />
                            Link to Address
                        </label>
                        <Controller
                            control={control}
                            name="addressLink"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="url"
                                    className={cn("w-full", errors.addressLink && "border-red-500")}
                                    placeholder="Paste Google Maps link (optional)"
                                />
                            )}
                        />
                        {errors.addressLink && (
                            <p className="text-xs text-red-500 mt-1">{errors.addressLink.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Cover Photo Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Cover Photo</CardTitle>
                </CardHeader>
                <CardContent>
                    <Controller
                        control={control}
                        name="coverPhoto"
                        render={({ field }) => (
                            <div
                                className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-8 px-4"
                                style={{
                                    background: "var(--card)",
                                    borderColor: "var(--border)",
                                }}
                            >
                                <div
                                    className="flex flex-col items-center mb-4 w-full border-2 border-dashed rounded-xl py-6"
                                    style={{
                                        background: "var(--background)",
                                        borderColor: "var(--border)",
                                    }}
                                >
                                    <div
                                        className="rounded-full p-4 mb-2"
                                        style={{ background: "var(--secondary)" }}
                                    >
                                        <ImagePlus className="h-8 w-8" style={{ color: "var(--primary)" }} />
                                    </div>
                                    <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--primary)" }}>
                                        Upload Cover Photo
                                    </h2>
                                    <p className="text-sm mb-2" style={{ color: "var(--secondary-foreground)" }}>
                                        Drag and drop your image here, or click to browse
                                    </p>
                                    <label
                                        htmlFor="cover-photo-upload"
                                        className="flex flex-col items-center justify-center w-full cursor-pointer"
                                    >
                                        <div
                                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg transition mb-2"
                                            style={{
                                                borderColor: "var(--accent)",
                                            }}
                                        >
                                            <UploadCloud className="h-8 w-8 mb-2" style={{ color: "var(--primary)" }} />
                                            <span className="text-sm" style={{ color: "var(--primary)" }}>
                                                Drag & drop or click to select
                                            </span>
                                        </div>
                                        <input
                                            id="cover-photo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={e => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                        />
                                    </label>
                                </div>
                                {field.value instanceof File && (
                                    <img
                                        src={URL.createObjectURL(field.value)}
                                        alt="Cover Preview"
                                        className="mt-4 rounded-lg max-h-48 object-cover border"
                                    />
                                )}
                            </div>
                        )}
                    />
                    {errors.coverPhoto && (
                        <p className="text-xs text-red-500 mt-1">{errors.coverPhoto.message}</p>
                    )}
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                >
                    Cancel
                </Button>
                <Button type="submit">
                    Submit
                </Button>
            </div>
        </form></>
    );
}
