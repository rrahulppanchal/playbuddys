"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage
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
import { Skeleton } from "@/components/ui/skeleton";

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
    const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(session?.user?.image);
    const [isEditing, setIsEditing] = useState(false);
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

    // Show loading while session is being determined
    if (status === "loading") {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center min-h-[80vh] bg-background mt-8">
                    <Card className="bg-background w-full max-w-md sm:max-w-lg mx-auto p-8 rounded-2xl shadow-md border-none" style={{background:"white"}}>
                        <CardContent className="flex flex-col items-center gap-6">
                            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                            <div className="w-full flex flex-col gap-5 mt-4">
                                {Array.from({length: 8}).map((_, i) => (
                                    <div key={i}>
                                        <Skeleton className="h-4 w-28 mb-2" />
                                        <Skeleton className="h-10 w-full rounded" />
                                    </div>
                                ))}
                                <div className="flex justify-end gap-2 mt-6">
                                    <Skeleton className="h-10 w-20 rounded" />
                                    <Skeleton className="h-10 w-36 rounded" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    }

    if (status === "unauthenticated") {
        redirect("/");
    }

    // Optionally, you can allow image change later:
    // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };

    return (
    <>
    <Header />
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto shadow-xl rounded-xl border-none bg-gradient-to-tr from-white/85 to-gray-50/40">
        <CardContent className="p-0">
            <section className="flex flex-col items-center w-full px-6 pt-8 pb-2">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-md bg-background">
                    {avatarUrl ?
                        <AvatarImage src={avatarUrl as any} alt="Profile avatar" />
                        : <AvatarFallback className="text-2xl">?</AvatarFallback>
                    }
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Connected from your account provider.</span>
                </div>

                {/* Headline */}
                <h2 className="mt-4 text-2xl font-bold text-center text-primary">Your Profile</h2>
                <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
                    {isEditing ? 'Edit your information below.' : 'View your profile information.'}
                </p>
            </section>

            <Separator className="mb-6" />

            <section className="px-6 pb-8">
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i}>
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-9 w-full rounded" />
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="w-full text-center py-6 text-red-500 text-base">
                    {(error as Error)?.message || 'Failed to load profile.'}
                </div>
              ) : (
                <>
                  {!isEditing ? (
                    // View Mode - Read Only
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                          <p className="text-base font-medium">{profile?.name || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="text-base">{profile?.email || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Username</label>
                          <p className="text-base">{profile?.username || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <p className="text-base">{profile?.phone || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Bio</label>
                          <p className="text-base">{profile?.bio || 'No bio added yet.'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Website</label>
                          <p className="text-base">
                            {profile?.website ? (
                              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {profile.website}
                              </a>
                            ) : 'Not set'}
                          </p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Twitter</label>
                          <p className="text-base">{profile?.twitter || 'Not set'}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Instagram</label>
                          <p className="text-base">{profile?.instagram || 'Not set'}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button
                          onClick={() => setIsEditing(true)}
                          className="text-base"
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode - Form
                    <Form {...form}>
                      <form className="space-y-5" onSubmit={form.handleSubmit(async (values) => {
                          try {
                              const { email, ...updateData } = values;
                              await updateProfile(updateData);
                              toast.success("Profile updated!");
                              setIsEditing(false);
                          } catch (e) {
                              toast.error("Failed to update: " + (e as Error).message);
                          }
                      })}>

                        {/* Display Name */}
                        <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="flex items-center gap-1 text-base">Display Name<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input autoFocus placeholder="Your name" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Email */}
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Email</FormLabel>
                        <FormControl>
                            <Input disabled placeholder="user@email.com" className="bg-slate-100 text-base cursor-not-allowed" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Username */}
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="flex items-center gap-1 text-base">Username<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input placeholder="@username" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Phone */}
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="Add your phone" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Bio */}
                        <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Short bio</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A few words about you..." className="min-h-[84px] resize-none text-base" maxLength={200} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Social Links label */}
                        <div>
                            <span className="block mb-1 font-medium text-base text-muted-foreground">Social</span>
                        </div>

                        {/* Website */}
                        <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Website</FormLabel>
                        <FormControl>
                            <Input placeholder="https://your-website.com" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Twitter */}
                        <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Twitter</FormLabel>
                        <FormControl>
                            <Input placeholder="@yourtwitter" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        {/* Instagram */}
                        <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                            <FormItem>
                        <FormLabel className="text-base">Instagram</FormLabel>
                        <FormControl>
                            <Input placeholder="@yourinstagram" className="text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                        )}
                        />

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto text-base"
                                onClick={() => {
                                    setIsEditing(false);
                                    // Reset form to original values
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
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="w-full sm:w-auto text-base"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </>
              )}
            </section>
        </CardContent>
      </Card>
    </main>
    </>
    );
}
