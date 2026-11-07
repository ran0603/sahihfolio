import React from "react";
import { Clock, WifiOff, X } from "lucide-react";
import { requireAdminRole } from "src/lib/auth/require-admin-role";
import "./admin.css";
import AdminHeader from "components/admin-header";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminRole("viewer");
  const isUser = !!user.id;
  return (
    <>
      <AdminHeader isUser={isUser} user={user} />
      <div className="banners">
        <div className="banner b-warn" role="status" data-sb="session" hidden>
          <div className="banner-in adm-bi">
            <Clock className="ic" width="18" height="18" />
            <p>
              <strong>
                Your session ends in <span className="sx">5:00</span>.
              </strong>{" "}
              Unsaved changes will be lost.
            </p>
            <button type="button" className="link-btn" data-act="extend">
              Stay signed in
            </button>
            <button
              type="button"
              className="icon-btn sm"
              aria-label="Dismiss"
              data-act="banner-close"
            >
              <X className="ic" width="16" height="16" />
            </button>
          </div>
        </div>
        <div className="banner b-off" role="status" data-sb="offline" hidden>
          <div className="banner-in adm-bi">
            <WifiOff className="ic" width="18" height="18" />
            <p>
              <strong>You’re offline.</strong> Actions are paused until the
              connection returns.
            </p>
            <button type="button" className="link-btn" data-act="reconnect">
              Retry
            </button>
            <button
              type="button"
              className="icon-btn sm"
              aria-label="Dismiss"
              data-act="banner-close"
            >
              <X className="ic" width="16" height="16" />
            </button>
          </div>
        </div>
      </div>
      <div className="scroll">
        <main className="lg-main" data-view="">
          {children}
        </main>
      </div>
    </>
  );
}
