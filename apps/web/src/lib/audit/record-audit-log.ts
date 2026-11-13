import { db } from "@sahihfolio/database";
import { auditLogs } from "@sahihfolio/database/schema";
import { AuditLog } from "@sahihfolio/shared";

export async function recordAuditLog(input: AuditLog) {
  await db.insert(auditLogs).values({
    actorId: input.actorId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    changedFields: input.changedFields,
    createdAt: new Date(),
  });
}
