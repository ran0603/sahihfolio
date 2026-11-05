import { randomUUID } from "crypto";
import { db } from "@sahihfolio/database";
import { resultSnapshots } from "@sahihfolio/database/schema";
import type { FinderIntakeInput } from "@sahihfolio/shared";

export async function createResultSnapshot({
  input,
  output,
}: {
  input: FinderIntakeInput;
  output: unknown;
}) {
  const publicId = randomUUID();

  const [row] = await db
    .insert(resultSnapshots)
    .values({
      publicId,
      input,
      output,
      dataVersion: "v1",
    })
    .returning({
      publicId: resultSnapshots.publicId,
    });

  return {
    publicId: row.publicId,
    country: {
      code: input.countryCode,
      name: input.countryCode, // Replace with DB country name in #11/#12.
      currency: null,
    },
  };
}
