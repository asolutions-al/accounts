"use client"

import { AuthButton } from "@/components/button/auth-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, UserPlus } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { DemoSignInBtn } from "../button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SchemaT = z.infer<typeof schema>

export function SignupForm({
  performAction,
}: {
  performAction: (values: SchemaT) => Promise<{ error?: string | null }>
}) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SchemaT) {
    const { error } = await performAction(values)
    if (error) return toast.error(error)
    const params = new URLSearchParams(searchParams)
    params.set("email", values.email)
    router.push(`/confirm-email?${params.toString()}`)
    toast.success(t("Verification code sent"))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Continue with section - moved to top */}
            <div className="space-y-4">
              <DemoSignInBtn />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-3 text-muted-foreground">
                    {t("Or continue with")}
                  </span>
                </div>
              </div>
            </div>

            {/* Email and Password fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email Address")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Password")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Create a strong password"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Create Account Button */}
            <AuthButton
              type="submit"
              icon={UserPlus}
              size="lg"
              loading={form.formState.isSubmitting}
            >
              {t("Create Account")}
            </AuthButton>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t("Already have an account")}?{" "}
                <Link
                  href={`/login?${searchParams.toString()}`}
                  className="font-semibold text-foreground hover:underline"
                >
                  {t("Sign in")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
