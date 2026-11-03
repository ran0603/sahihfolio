import "server-only";

import { eq } from "drizzle-orm";
import { db, resultSnapshots } from "@sahihfolio/database";
import {
  resultSnapshotOutputSchema,
  type FinderIntakeInput,
  type ResultSnapshotOutput,
} from "@sahihfolio/shared";

export type ResultSnapshot = {
  publicId: string;
  input: FinderIntakeInput;
  output: ResultSnapshotOutput;
  dataVersion: string;
  createdAt: Date;
};

export async function getResultSnapshot(
  publicId: string,
): Promise<ResultSnapshot | null> {
  const [row] = await db
    .select()
    .from(resultSnapshots)
    .where(eq(resultSnapshots.publicId, publicId))
    .limit(1);

  if (!row) return null;

  const parsedOutput = resultSnapshotOutputSchema.safeParse(row.output);

  if (!parsedOutput.success) {
    // Log this in your error tracker; do not render unvalidated DB JSON.
    console.error("Invalid result snapshot output", {
      publicId,
      issues: parsedOutput.error.issues,
    });

    return null;
  }

  return {
    publicId: row.publicId,
    input: row.input as FinderIntakeInput,
    output: parsedOutput.data,
    dataVersion: row.dataVersion,
    createdAt: row.createdAt,
  };
}
