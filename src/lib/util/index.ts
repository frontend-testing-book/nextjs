import * as z from "zod";
import { ZodSchema } from "zod";

export function parseAsPositiveInt(q: string | string[] | undefined) {
  const effect = z.number().positive().int();
  const val = Number(q);
  try {
    effect.parse(val);
    return val;
  } catch {
    return undefined;
  }
}

export function parseAsNonEmptyString(q: string | string[] | undefined) {
  if (typeof q === "string" && q.length > 0) return q;
}

export function validate<T extends ZodSchema>(
  target: unknown,
  schema: T
): asserts target is z.infer<T> {
  schema.parse(target);
}
