import { randomUUID } from "crypto";
import { db } from "@sahihfolio/database";
import { resultSnapshots } from "@sahihfolio/database/schema";
import type { FinderIntakeInput } from "@sahihfolio/shared";

export async function createResultSnapshot({
  input,
  output,
  oldDataVersion,
}: {
  input: FinderIntakeInput;
  output: unknown;
  oldDataVersion?: number;
}) {
  const publicId = randomUUID();

  const [row] = await db
    .insert(resultSnapshots)
    .values({
      publicId,
      input,
      output,
      dataVersion: `v${oldDataVersion ? oldDataVersion + 1 : 1}`,
    })
    .returning({
      publicId: resultSnapshots.publicId,
      input: resultSnapshots.input,
      output: resultSnapshots.output,
      dataVersion: resultSnapshots.dataVersion,
    });

  return {
    publicId: row.publicId,
    country: {
      code: input.countryCode,
      name: input.countryCode, // Replace with DB country name in #11/#12.
      currency: null,
    },
    input: row.input,
    output: row.output,
    dataVersion: row.dataVersion,
  };
}
