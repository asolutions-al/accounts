"use client"

import { AuthButton } from "@/components/button/auth-button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, CheckCircle, Mail, RefreshCw } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
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
  code: z.string().length(6, "Verification code must be 6 digits"),
})

type SchemaT = z.infer<typeof schema>

export function ConfirmEmailForm({
  email,
  verifyAction,
  resendAction,
}: {
  email: string
  verifyAction: (values: SchemaT) => Promise<ResT<true>>
  resendAction: (email: string) => Promise<ResT<true>>
}) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isResending, setIsResending] = useState(false)

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email,
      code: "",
    },
  })

  async function onSubmit(values: SchemaT) {
    const result = await verifyAction(values)

    if (result.error) {
      return toast.error(result.error.message)
    }

    if (result.success) {
      toast.success(t("Email verified successfully"))
      const path = searchParams.get("redirectUrl") || "/"
      router.push(path)
    }
  }

  async function handleResendCode() {
    setIsResending(true)
    const result = await resendAction(email)

    if (result.success) toast.success(t("Code resent successfully"))

    if (result.error) toast.error(result.error.message)

    setIsResending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Email display */}
            <div className="flex items-center justify-center rounded-lg border bg-muted p-4">
              <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{email}</span>
            </div>

            {/* Verification Code field */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Verification Code")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      className="text-center text-lg tracking-widest"
                      maxLength={6}
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-center text-sm text-muted-foreground">
              {t("Enter the 6-digit code from your email")}
            </p>

            {/* Verify Button */}
            <AuthButton
              type="submit"
              icon={CheckCircle}
              size="lg"
              loading={form.formState.isSubmitting}
            >
              {t("Verify Email")}
            </AuthButton>

            {/* Resend Code Button */}
            <AuthButton
              type="button"
              variant="outline"
              icon={RefreshCw}
              loading={isResending}
              onClick={handleResendCode}
            >
              {t("Resend Code")}
            </AuthButton>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                href={`/login?${searchParams.toString()}`}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t("Back to login")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
