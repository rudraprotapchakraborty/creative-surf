import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const teamMembers = [
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#FEF9C3]", // Yellow pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#DCF5E6]", // Green pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#D5F5F6]", // Mint pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#DBEAFE]", // Blue pastel
  },
  {
    image: "/placeholder.svg",
    bgColor: "bg-[#FCE7F3]", // Pink pastel
  },
];

const TeamSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Here you can handle the form submission, e.g., log the email, send it to an API, etc.
    console.log("Submitted email:", email);
    setIsSubmitting(false);
  };

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Team Images */}
          <div className="flex justify-center -space-x-4 mb-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`relative rounded-full w-24 h-24 border-4 border-white ${member.bgColor}`}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={`Team Member ${index + 1}`}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E293B]">Meet Creative Surf</h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#1E293B] mb-12">
            Your world-class, tech-enabled marketing agency with over{" "}
            <span className="text-blue-600 border-b-4 border-blue-600">3 million</span> hours of combined expertise.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow text-base sm:text-lg h-12"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg h-12 px-4 sm:px-8"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Get a free proposal"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
