import { cn } from "@/lib/utils"
import Image from "next/image"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export function AuthLayout({
  children,
  className,
  title = "Welcome Back",
  subtitle = "Sign in to your account to continue",
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card shadow-lg">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Auth Form */}
        <div className={cn("", className)}>{children}</div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 Asolutions. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
