"use client"

import { signInWithDemo } from "@/app/actions/demo-sign-in"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const DemoSignInBtn = () => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirectUrl")
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoSignIn = async () => {
    setIsLoading(true)
    const res = await signInWithDemo({ redirectUrl })
    if (res?.error) toast.error(res.error)
    setIsLoading(false)
  }

  const Icon = isLoading ? Loader : UserIcon

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full"
      onClick={handleDemoSignIn}
      disabled={isLoading}
    >
      <Icon className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
      {t("Demo Account")}
    </Button>
  )
}

export { DemoSignInBtn }
