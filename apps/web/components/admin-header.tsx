"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { AdminUser } from "@/lib/auth/get-current-admin-user";
import { useState } from "react";
import {
  ChevronDown,
  Clock,
  ExternalLink,
  LogOut,
  Menu,
  Search,
  WifiOff,
  X,
} from "lucide-react";

export default function AdminHeader({
  isUser,
  user,
}: {
  isUser: boolean;
  user: AdminUser;
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="nav adm-top">
        <div className="adm-top-in">
          {isUser && (
            <button
              type="button"
              className="icon-btn on-dark burger"
              data-act="menu"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <Menu className="ic" width={22} height={22} aria-hidden="true" />
            </button>
          )}
          <Link className="logo" href="/admin">
            <span className="mono">Sf</span>
            <span className="lt">Sahihfolio</span>
          </Link>
          <span className="adm-tag">Admin</span>
          {isUser && (
            <div className="adm-search sbox" hidden>
              <Search
                className="ic lead"
                width={18}
                height={18}
                aria-hidden="true"
              />
              <input
                className="inp gsearch"
                type="search"
                placeholder="Search reports"
                aria-label="Search reports"
                autoComplete="off"
              />
            </div>
          )}
          <div className="nav-r">
            <ThemeToggle />
            {isUser && (
              <div className="uwrap">
                <button
                  type="button"
                  className="ubtn"
                  data-act="umenu"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Account menu"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <span className="av" aria-hidden="true">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="av lg"
                        width={32}
                        height={32}
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      user.name?.substring(0, 2).toUpperCase() || "U"
                    )}
                  </span>
                  <span className="un">{user.name}</span>
                  <ChevronDown
                    className="ic "
                    width="16"
                    height="16"
                    aria-hidden="true"
                  />
                </button>
                <div className="upop" hidden={!isUserMenuOpen}>
                  <div className="upop-in" role="menu">
                    <div className="up-who">
                      <span className="av lg" aria-hidden="true">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="av lg"
                            width={32}
                            height={32}
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          user.name?.substring(0, 2).toUpperCase() || "U"
                        )}
                      </span>
                      <div>
                        <b>{user.name}</b>
                        <small>{user.email}</small>
                      </div>
                    </div>
                    <div className="up-role">
                      <span className="badge b-info">{user.role}</span>
                    </div>
                    <Link
                      className="up-i"
                      href="/"
                      role="menuitem"
                      data-act="site"
                    >
                      <ExternalLink
                        className="ic "
                        width="18"
                        height="18"
                        aria-hidden="true"
                      />{" "}
                      View public site
                    </Link>
                    <button
                      type="button"
                      className="up-i"
                      role="menuitem"
                      data-act="signout"
                    >
                      <LogOut
                        className="ic"
                        width="18"
                        height="18"
                        aria-hidden="true"
                      />{" "}
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="scrim" data-act="menu"></div>
      <div className="banners" hidden>
        <div className="banner b-warn" role="status" data-sb="session" hidden>
          <div className="banner-in adm-bi">
            <Clock className="ic" width="18" height="18" aria-hidden="true" />
            <p>
              <strong>
                Your session ends in <span className="sx">4:59</span>.
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
              <X className="ic" width="16" height="16" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="banner b-off" role="status" data-sb="offline" hidden>
          <div className="banner-in adm-bi">
            <WifiOff className="ic" width="18" height="18" aria-hidden="true" />
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
              <X className="ic" width="16" height="16" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
