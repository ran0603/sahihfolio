import React from "react";
import Link from "next/link";

export default function AdminLayout({
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
            <button
              type="button"
              className="icon-btn on-dark"
              data-act="theme"
              aria-label="Switch to dark theme"
            >
              <svg
                className="ic "
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="banners" hidden>
        <div className="banner b-warn" role="status" data-sb="session" hidden>
          <div className="banner-in adm-bi">
            <svg
              className="ic "
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
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
              <svg
                className="ic "
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="banner b-off" role="status" data-sb="offline" hidden>
          <div className="banner-in adm-bi">
            <svg
              className="ic "
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 20h.01"></path>
              <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
              <path d="M5 12.859a10 10 0 0 1 5.17-2.69"></path>
              <path d="M19 12.859a10 10 0 0 0-2.007-1.523"></path>
              <path d="M2 8.82a15 15 0 0 1 4.177-2.643"></path>
              <path d="M22 8.82a15 15 0 0 0-11.288-3.764"></path>
              <path d="m2 2 20 20"></path>
            </svg>
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
              <svg
                className="ic "
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
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
