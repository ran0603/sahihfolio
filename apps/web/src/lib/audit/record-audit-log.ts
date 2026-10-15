import { db } from "@sahihfolio/database";
import { auditLogs } from "@sahihfolio/database/schema";

export type AuditLogInput = {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  changedFields: Record<
    string,
    {
      before: unknown;
      after: unknown;
    }
  >;
};

export async function recordAuditLog(input: AuditLogInput) {
  await db.insert(auditLogs).values({
    actorId: input.actorId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    changedFields: input.changedFields,
  });
}
