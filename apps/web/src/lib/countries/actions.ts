"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, getTableColumns, ne, sql } from "drizzle-orm";

import { Country, db, providers } from "@sahihfolio/database";
import { countries } from "@sahihfolio/database";

import {
  archiveCountrySchema,
  CountryInput,
  countryInputSchema,
  flattenZodErrors,
  uuidParamSchema,
} from "@sahihfolio/shared";

import { requireAdminRole } from "@/lib/auth/require-admin-role";
import { recordAuditLog } from "../audit/record-audit-log";

function parseLines(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return [];

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseJsonArraySafe(
  value: FormDataEntryValue | null,
): { success: true; data: unknown[] } | { success: false; error: string } {
  if (typeof value !== "string" || value.trim() === "") {
    return { success: true, data: [] };
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return {
        success: false,
        error: "Regulatory notes must be a JSON array.",
      };
    }

    return { success: true, data: parsed };
  } catch {
    return {
      success: false,
      error: "Regulatory notes must be valid JSON.",
    };
  }
}

export async function getCountries(): Promise<
  Array<Country & { totalProviders: number }>
> {
  return await db
    .select({
      ...getTableColumns(countries),
      totalProviders: sql<number>`
    (
      select count(*)
      from ${providers}
      where ${providers.countries} @> to_jsonb(${countries.code}::text)
    )
  `.mapWith(Number),
    })
    .from(countries);
}

export async function createCountry(_prev: unknown, formData: FormData) {
  const user = await requireAdminRole("editor");

  const regulatoryNotesResult = parseJsonArraySafe(
    formData.get("regulatoryNotes"),
  );

  if (!regulatoryNotesResult.success) {
    return {
      status: "error" as const,
      errors: {
        regulatoryNotes: [regulatoryNotesResult.error],
      },
    };
  }

  const parsed = countryInputSchema.safeParse({
    code: formData.get("code"),
    name: formData.get("name"),
    currency: formData.get("currency"),
    regulatoryNotes: regulatoryNotesResult.data,
    restrictions: parseLines(formData.get("restrictions")),
    sourceUrls: parseLines(formData.get("sourceUrls")),
    lastReviewedAt: formData.get("lastReviewedAt"),
    status: formData.get("status") ?? "draft",
  });

  if (!parsed.success) {
    return {
      status: "error" as const,
      errors: flattenZodErrors(parsed.error),
    };
  }

  const existing = await db
    .select({ id: countries.id })
    .from(countries)
    .where(eq(countries.code, parsed.data.code))
    .limit(1);

  if (existing.length > 0) {
    return {
      status: "error" as const,
      errors: {
        code: ["A country with this ISO code already exists."],
      },
    };
  }

  const countryToInsert: CountryInput = {
    code: parsed.data.code,
    name: parsed.data.name,
    currency: parsed.data.currency,
    regulatoryNotes: parsed.data.regulatoryNotes,
    restrictions: parsed.data.restrictions,
    sourceUrls: parsed.data.sourceUrls,
    lastReviewedAt: parsed.data.lastReviewedAt,
    status: parsed.data.status,
  };

  const [created] = await db
    .insert(countries)
    .values(countryToInsert)
    .returning({ id: countries.id });

  await recordAuditLog({
    actorId: user.id,
    action: "country.created",
    entityType: "country",
    entityId: created.id,
    changedFields: {
      code: { before: undefined, after: parsed.data.code },
      name: { before: undefined, after: parsed.data.name },
      currency: { before: undefined, after: parsed.data.currency },
      status: { before: undefined, after: parsed.data.status },
      regulatoryNotes: {
        before: undefined,
        after: parsed.data.regulatoryNotes,
      },
      restrictions: { before: undefined, after: parsed.data.restrictions },
      sourceUrls: { before: undefined, after: parsed.data.sourceUrls },
      lastReviewedAt: { before: undefined, after: parsed.data.lastReviewedAt },
    },
  });

  revalidatePath("/admin/countries");
  redirect(`/admin/countries/${created.id}/edit`);
}

export async function updateCountry(_prev: unknown, formData: FormData) {
  const user = await requireAdminRole("editor");
  const parsedId = uuidParamSchema.safeParse(formData.get("id"));

  if (!parsedId.success) {
    return {
      status: "error" as const,
      errors: { form: ["Invalid country ID."] },
    };
  }

  const parsed = countryInputSchema.safeParse({
    code: formData.get("code"),
    name: formData.get("name"),
    currency: formData.get("currency"),
    regulatoryNotes: parseLines(formData.get("regulatoryNotes")),
    restrictions: parseLines(formData.get("restrictions")),
    sourceUrls: parseLines(formData.get("sourceUrls")),
    lastReviewedAt: formData.get("lastReviewedAt"),
    status: formData.get("status") ?? "draft",
  });

  if (!parsed.success) {
    return {
      status: "error" as const,
      errors: flattenZodErrors(parsed.error),
    };
  }

  const duplicate = await db
    .select({ id: countries.id })
    .from(countries)
    .where(
      and(
        eq(countries.code, parsed.data.code),
        ne(countries.id, parsedId.data.id),
      ),
    )
    .limit(1);

  if (duplicate.length > 0) {
    return {
      status: "error" as const,
      errors: {
        code: ["A country with this ISO code already exists."],
      },
    };
  }

  await db
    .update(countries)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(countries.id, parsedId.data.id));

  await recordAuditLog({
    actorId: user.id,
    action: "country.updated",
    entityType: "country",
    entityId: parsedId.data.id,
    changedFields: {
      code: { before: undefined, after: parsed.data.code },
      name: { before: undefined, after: parsed.data.name },
      currency: { before: undefined, after: parsed.data.currency },
      status: { before: undefined, after: parsed.data.status },
      regulatoryNotes: {
        before: undefined,
        after: parsed.data.regulatoryNotes,
      },
      restrictions: { before: undefined, after: parsed.data.restrictions },
      sourceUrls: { before: undefined, after: parsed.data.sourceUrls },
      lastReviewedAt: { before: undefined, after: parsed.data.lastReviewedAt },
    },
  });

  revalidatePath("/admin/countries");
  revalidatePath(`/admin/countries/${parsedId.data.id}/edit`);

  return {
    status: "success" as const,
    message: "Country updated.",
  };
}

export async function archiveCountry(_prev: unknown, formData: FormData) {
  const user = await requireAdminRole("admin");

  const parsed = archiveCountrySchema.safeParse({
    id: formData.get("id"),
    reason: formData.get("reason") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error" as const,
      errors: flattenZodErrors(parsed.error),
    };
  }

  await db
    .update(countries)
    .set({
      status: "archived",
      updatedAt: new Date(),
    })
    .where(eq(countries.id, parsed.data.id));

  await recordAuditLog({
    actorId: user.id,
    action: "country.archived",
    entityType: "country",
    entityId: parsed.data.id,
    changedFields: {
      status: { before: "active", after: "archived" },
      reason: { before: undefined, after: parsed.data.reason },
    },
  });

  revalidatePath("/admin/countries");

  return {
    status: "success" as const,
    message: "Country archived.",
  };
}
