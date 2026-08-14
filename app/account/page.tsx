import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { COOKIE_NAME, verifyToken } from "@/lib/auth"
import { AccountDashboard } from "@/components/account/account-dashboard"

export const metadata = { title: "Dashboard · Creative Surf" }

/** Every signed-in account lands here; the dashboard adds admin sections by role. */
export default async function AccountPage() {
  const cookieStore = await cookies()
  const payload = verifyToken(cookieStore.get(COOKIE_NAME)?.value || "")
  if (!payload) redirect("/login?from=/account")

  return <AccountDashboard initialUser={payload} />
}
