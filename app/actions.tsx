"use server"

export async function subscribeToNewsletter(email: string) {
  // Basic email validation (you might want a more robust solution)
  if (!email.includes("@")) {
    throw new Error("Invalid email address.")
  }

  // Simulate a successful subscription (replace with actual API call)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate a 10% chance of failure
  if (Math.random() < 0.1) {
    throw new Error("Failed to subscribe. Please try again.")
  }

  return { success: true }
}

