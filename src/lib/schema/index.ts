import { z } from "zod";

export const positiveInt = z.number().positive().int();

export const requiredString = z.string().min(1);
