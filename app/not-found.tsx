"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl mx-auto relative">
                <Card className="border-0 shadow-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
                    <CardHeader className="text-center space-y-6 pb-8">
                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-bounce-slow">
                            <FileQuestion className="w-14 h-14 text-primary drop-shadow-lg" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-6xl font-extrabold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tracking-tight">
                                404
                            </CardTitle>
                            <CardDescription className="text-2xl text-muted-foreground font-semibold">Oops! Page not found</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-10">
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto text-lg">
                                The page you&apos;re looking for doesn&apos;t exist or has been moved.<br />Don&apos;t worry, it happens to the best of us!
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-6">
                            <h3 className="font-semibold text-center text-foreground text-lg">What would you like to do?</h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Button asChild className="h-10 text-md font-semibold group shadow-md">
                                    <Link href="/">
                                        <Home className="w-3 h-3 group-hover:scale-110 transition-transform" />
                                        Go Home
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="h-10 text-md font-semibold group bg-transparent shadow-md">
                                    <Link href="#" onClick={e => { e.preventDefault(); window.history.back(); }}>
                                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                        Go Back
                                    </Link>
                                </Button>
                            </div>

                            
                        </div>

                        <Separator />

                        <div className="text-center space-y-4">
                            <p className="text-base text-muted-foreground">Still having trouble? Here are some helpful links:</p>

                            <div className="flex flex-wrap justify-center gap-4 text-base">
                                <Link href="/docs" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                                    Documentation
                                </Link>
                                <span className="text-muted-foreground">•</span>
                                <Link href="/help" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                                    Help Center
                                </Link>
                                <span className="text-muted-foreground">•</span>
                                <Link href="/contact" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Decorative elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float2" />
                </div>
                <style jsx global>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: none; }
                    }
                    .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
                    @keyframes bounce-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    .animate-float { animation: float 8s ease-in-out infinite; }
                    @keyframes float2 {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(20px); }
                    }
                    .animate-float2 { animation: float2 10s ease-in-out infinite; }
                `}</style>
            </div>
        </div>
    )
}
