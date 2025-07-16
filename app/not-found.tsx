import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto">
                <Card className="border-0 shadow-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <CardHeader className="text-center space-y-6 pb-8">
                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                            <FileQuestion className="w-12 h-12 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                404
                            </CardTitle>
                            <CardDescription className="text-xl text-muted-foreground">Oops! Page not found</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                                The page you're looking for doesn't exist or has been moved. Don't worry, it happens to the best of us!
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="font-semibold text-center text-foreground">What would you like to do?</h3>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button asChild className="h-12 group">
                                    <Link href="/">
                                        <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Go Home
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="h-12 group bg-transparent">
                                    <Link href="javascript:history.back()">
                                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                        Go Back
                                    </Link>
                                </Button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button asChild variant="secondary" className="h-12 group">
                                    <Link href="/docs">
                                        <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Browse Docs
                                    </Link>
                                </Button>

                                <Button asChild variant="secondary" className="h-12 group">
                                    <Link href="/contact">
                                        <FileQuestion className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                        Contact Support
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground">Still having trouble? Here are some helpful links:</p>

                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <Link href="/docs" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                                    Documentation
                                </Link>
                                <span className="text-muted-foreground">•</span>
                                <Link href="/help" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                                    Help Center
                                </Link>
                                <span className="text-muted-foreground">•</span>
                                <Link href="/contact" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Optional: Add some decorative elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    )
}
