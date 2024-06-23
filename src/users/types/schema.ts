

import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  email: z.string().min(1, { message: "Email is required" }).refine((text) => patterns.email.test(text), {
    message: "Email not valid",
  }),
  age: z.number().min(1, { message: "Age must be greater than 0" }),
  attendingWithGuest: z.boolean(),
  guestName: z.string().min(1, { message: "Guest Name is required" }).optional().nullable(),
}).refine((data) => !data.attendingWithGuest || (data.attendingWithGuest && data.guestName), {
  message: "Guest Name is required if attending with a guest",
  path: ["guestName"],
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  email: "",
  name: "",
  age: 0,
  attendingWithGuest: false,
  guestName: null,
};
