"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from '@/services/profile/hooks';
import { redirect } from "next/navigation";

const profileSchema = z.object({
    displayName: z.string().min(2, "Display name is required"),
    email: z.string().email("Please enter a valid email address"),
    username: z.string().min(2, "Username is required"),
    phone: z.string().optional(),
    bio: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { data: session, status } = useSession();
    if (!session) {
        redirect("/");
    }
    const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(session?.user?.image);
    const { data: profile, isLoading, isError, error } = useProfile();
    const { mutateAsync: updateProfile, isPending: saving } = useUpdateProfile();
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: "",
            email: "",
            username: "",
            phone: "",
            bio: "",
            website: "",
            twitter: "",
            instagram: "",
        },
    });

    useEffect(() => {
        if (profile) {
            form.reset({
                displayName: profile.name || '',
                email: profile.email || '',
                username: profile.username || '',
                phone: profile.phone || '',
                bio: profile.bio || '',
                website: profile.website || '',
                twitter: profile.twitter || '',
                instagram: profile.instagram || '',
            });
            if (profile.image) setAvatarUrl(profile.image);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    // Placeholder for avatar upload/generate
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setAvatarUrl(url);
        }
    };

    return (<>
        <Header />
        <div className="flex justify-center items-center min-h-[80vh] mt-7 bg-background">
            <Card className="w-full max-w-xl mx-auto p-8">
                <CardContent className="flex flex-col items-center gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex gap-4 items-center">
                            <Avatar className="w-20 h-20 text-2xl">
                                {avatarUrl ? (
                                    <AvatarImage src={avatarUrl} alt="Avatar" />
                                ) : (
                                    <AvatarFallback>SC</AvatarFallback>
                                )}
                            </Avatar>
                        </div>
                        <span className="text-sm text-muted-foreground mt-2">Profile picture taken from login account.</span>
                    </div>

                    <Separator className="my-4" />

                    {isLoading ? (
                        <div className="w-full text-center py-8">Loading...</div>
                    ) : isError ? (
                        <div className="w-full text-center py-8 text-red-500">{(error as Error)?.message || 'Failed to load profile.'}</div>
                    ) : (
                        <Form {...form}>
                            <form className="w-full flex flex-col gap-4" onSubmit={form.handleSubmit(async (values) => {
                                try {
                                    const { email, ...updateData } = values;
                                    await updateProfile(updateData);
                                    toast.success("Profile updated successfully!");
                                } catch (e) {
                                    toast.error("Failed to update profile: " + (e as Error).message);
                                }
                            })}>

                                <FormField
                                    control={form.control}
                                    name="displayName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" disabled placeholder="user@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us about yourself" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="mt-2">
                                    <span className="font-medium text-base">Social Links</span>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://your-website.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twitter</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2 mt-6">
                                    <Button type="button" variant="outline">Cancel</Button>
                                    <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div></>
    );
}
