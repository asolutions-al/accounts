import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon
  variant?: "primary" | "secondary" | "outline"
  size?: "default" | "sm" | "lg"
  loading?: boolean
}

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  (
    {
      className,
      icon: Icon,
      children,
      variant = "primary",
      size = "default",
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "w-full",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground",
          variant === "outline" && "border",
          size === "lg" && "h-12 text-base",
          size === "sm" && "h-9 text-sm",
          loading && "opacity-50",
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {children}
          </div>
        )}
      </Button>
    )
  }
)

AuthButton.displayName = "AuthButton"
