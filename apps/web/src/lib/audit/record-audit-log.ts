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
  createdAt?: Date;
};

export async function recordAuditLog(input: AuditLogInput) {
  await db.insert(auditLogs).values({
    actorId: input.actorId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    changedFields: input.changedFields,
    createdAt: new Date(),
  });
}
