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
import { AuthResponse } from "@supabase/supabase-js"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
  password: z.string().min(8),
})

export type SignupSchemaType = z.infer<typeof schema>

export function SignupForm({
  performAction,
}: {
  performAction: (values: SignupSchemaType) => Promise<AuthResponse>
}) {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const router = useRouter()
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignupSchemaType) {
    const res = await performAction(values)
    if (res.error) return toast.error(res.error.message)
    const path = searchParams.get("redirectUrl") || "/"
    router.push(path)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">{t("Sign Up")}</CardTitle>
            <CardDescription>
              {t("Enter your information to create an account")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail/com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="••••••••"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {t("Create an account")}
              </Button>
              {/* <Button variant='outline' className='w-full'>
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              {t("Already have an account")}?{" "}
              <Link
                href={`/login?${searchParams.toString()}`}
                className="underline"
              >
                {t("Sign in")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
