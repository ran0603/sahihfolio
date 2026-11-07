import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, admin } from "better-auth/plugins";
import { db, schema } from "@sahihfolio/database";
import { isAdminEmailAllowed } from "@/lib/admin-users";
import { sendAdminInviteEmail } from "../email/send-admin-invite-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    magicLink({
      expiresIn: 300,
      sendMagicLink: async ({ email, url }) => {
        const allowed = await isAdminEmailAllowed(email);
        if (!allowed) return;

        await sendAdminInviteEmail({
          to: email,
          signInUrl: url,
        });
      },
    }),
    admin({
      adminRoles: ["admin"],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
