import { Form, useActionData } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { NavBar } from "~/components/nav-bar";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  const submissionData = { 
    notificationType: "booking-reschedule",
    name, 
    email, 
    userId: 1,
    bookingDetails: "Mock reschedule details" 
  };

  console.log("Submitting to API:", submissionData);

  try {
    const response = await fetch(`${new URL(request.url).origin}/api/notifications/booking-created`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit reschedule request");
    }

    const responseData = await response.json();
    console.log("API Response:", responseData);

    return json({ success: true, message: "Reschedule request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting reschedule:", error);
    return json({ success: false, message: "Failed to submit reschedule request" }, { status: 500 });
  }
}

export default function Reschedule() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Reschedule Session</h1>
          
          {actionData?.success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              {actionData.message}
            </div>
          )}

          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Reschedule Request
            </Button>
          </Form>
        </div>
      </main>
    </div>
  );
} 