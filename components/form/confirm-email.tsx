"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t("Verify Email")}</CardTitle>
            <CardDescription>
              {t("We sent a verification code to")} <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Verification Code")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          {...field}
                          maxLength={6}
                          className="text-center text-lg tracking-widest"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {t("Enter the 6-digit code from your email")}
              </p>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {t("Verify")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={isResending}
              >
                {t("Resend Code")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link
                href={`/login?${searchParams.toString()}`}
                className="underline"
              >
                {t("Back to login")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
