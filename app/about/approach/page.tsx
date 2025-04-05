import { Suspense } from "react"
import ApproachPage from "./ApproachPage"

export default function ParentPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ApproachPage />
    </Suspense>
  )
}
