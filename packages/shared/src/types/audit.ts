export type JsonValue =
  | string
  | number
  | boolean
  | Date
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type AuditLogChange = {
  before: JsonValue | undefined;
  after: JsonValue | undefined;
};

export type AuditLog = {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  changedFields: Record<string, AuditLogChange>;
  createdAt?: Date;
};
