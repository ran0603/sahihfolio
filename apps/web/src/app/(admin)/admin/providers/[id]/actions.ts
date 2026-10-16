"use server";

import { revalidatePath } from "next/cache";
import { getProviderWithSources } from "@/lib/providers/get-provider-with-sources";
import {
  publishProvider,
  assertPublishable,
} from "@/lib/providers/publish-provider";
import { requireAdminRole } from "@/lib/auth/require-admin-role";
import { recordAuditLog } from "@/lib/audit/record-audit-log";

export async function publishProviderAction(providerId: string) {
  const admin = await requireAdminRole(["admin", "editor"]);

  const provider = await getProviderWithSources(providerId);

  assertPublishable(provider);

  await publishProvider(providerId);
  await recordAuditLog({
    actorId: admin.id,
    action: "provider.publish",
    entityType: "provider",
    entityId: providerId,
    changedFields: {
      status: {
        before: provider.status,
        after: "published",
      },
    },
  });

  revalidatePath(`/admin/providers/${providerId}`);
}
