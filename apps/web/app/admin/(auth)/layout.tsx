import React from "react";
import { ThemeToggle } from "components/theme-toggle";
import { Clock, WifiOff, X } from "lucide-react";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="nav adm-top">
        <div className="adm-top-in">
          <a className="logo" href="#">
            <span className="mono">Sf</span>
            <span className="lt">Sahihfolio</span>
          </a>
          <span className="adm-tag">Admin</span>
          <div className="nav-r">
            <ThemeToggle />
          </div>
        </div>
      </header>
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
