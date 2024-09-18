import { z } from "zod";

const manageContactsSchema = z.object({
    id : z.number().positive("Value must be a positive number"),
    title: z.string().min(1, "Title is required").trim(),
    client: z.string().min(1, "Client is required").trim(),
    project: z.string().min(1, "Project is required").trim(),
    type: z.string().min(1, "Type is required").trim(),
    startsAt: z.date({ required_error: "Start date is required" }),
    endsAt: z.date({ required_error: "End date is required" }),
    budget: z.number().positive("Value must be a positive number"),
    status: z.string().min(1, "Status is required").trim(),
    createdBy: z.string().min(1, "Created by is required").trim()
  });

export const manageContactValidation = {
    manageContactsSchema
}