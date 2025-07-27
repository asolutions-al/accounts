import { SignOutBtn } from "@/components/button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ERP_URL } from "@/constants/env"
import { createClient } from "@/utils/supabase/server"
import {
  ArrowRight,
  BarChart3,
  Building2,
  Cog,
  ExternalLink,
  Users,
} from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"

const Page = async () => {
  const client = await createClient()
  const {
    data: { user },
  } = await client.auth.getUser()

  const signOut = async () => {
    "use server"

    const client = await createClient()
    await client.auth.signOut()
    return redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8">
              <Image
                src="/logo.png"
                alt="Asolutions Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Asolutions</h1>
              <p className="text-xs text-muted-foreground">
                Business Management Solutions
              </p>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <SignOutBtn performAction={signOut} />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* <div className="mb-12 text-center">
          <div className="mx-auto mb-6 h-20 w-20">
            <Image
              src="/logo.png"
              alt="Asolutions Logo"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>

          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Welcome to Asolutions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Access your business management tools and streamline your operations
          </p>
        </div> */}

        {/* Products Section */}
        <section className="mb-12">
          {/* <h3 className="mb-8 text-center text-2xl font-semibold">Products</h3> */}

          <div className="mx-auto max-w-4xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building2 className="h-6 w-6 text-primary" />
                  Asolutions ERP
                </CardTitle>
                <CardDescription className="text-base">
                  Complete Enterprise Resource Planning solution for modern
                  businesses
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <a
                    href={`${ERP_URL}/auth/callback`}
                    className="inline-flex items-center"
                  >
                    Launch ERP System
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a
                    href={`${ERP_URL}/auth/callback`}
                    className="inline-flex items-center"
                    target="_blank"
                  >
                    Open in New Tab
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            {/* ERP Features */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h4 className="mb-2 font-semibold">Employee Management</h4>
                <p className="text-sm text-muted-foreground">
                  Manage staff, roles, and permissions
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h4 className="mb-2 font-semibold">Analytics & Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time insights and reporting
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h4 className="mb-2 font-semibold">Company Structure</h4>
                <p className="text-sm text-muted-foreground">
                  Organize departments and hierarchy
                </p>
              </Card>

              <Card className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Cog className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h4 className="mb-2 font-semibold">Process Automation</h4>
                <p className="text-sm text-muted-foreground">
                  Automate workflows and tasks
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page
