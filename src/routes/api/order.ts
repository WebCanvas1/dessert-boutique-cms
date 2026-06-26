import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { readContent } from "@/lib/content-store.server";

const OrderItemSchema = z.object({
  name: z.string().min(1).max(200),
  quantity: z.number().int().min(1).max(999),
});

const OrderSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email().max(200),
  fulfilment: z.enum(["Pickup", "Delivery"]),
  dateRequired: z.string().trim().min(1).max(40),
  items: z.array(OrderItemSchema).min(1).max(50),
  notes: z.string().trim().max(2000).optional().default(""),
  agreedToTerms: z.literal(true),
});

export const Route = createFileRoute("/api/order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = OrderSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Validation failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }
        const order = parsed.data;
        const content = await readContent();
        const destination =
          process.env.ORDER_DESTINATION_EMAIL ||
          content.orderForm.destinationEmail ||
          content.contact.email;

        // Log the order server-side. To actually deliver via email, wire
        // Lovable Emails or a Resend connector and replace this block.
        console.log("[order] new enquiry → " + destination, {
          ...order,
          receivedAt: new Date().toISOString(),
        });

        return Response.json({ ok: true, destination });
      },
    },
  },
});