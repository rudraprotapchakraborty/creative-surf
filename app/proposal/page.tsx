import { generateMetadata } from "@/lib/metadata"
import ProposalForm from "./ProposalForm"
import { Suspense } from "react"

export const metadata = generateMetadata({
  title: "Get a Proposal",
  description: "Request a custom proposal for your digital marketing needs and start growing your business today.",
  path: "/proposal",
})

export default function ProposalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposalForm />
    </Suspense>)
}

