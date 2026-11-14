"use client";

import {
  CountryProfile,
  Source,
  RegulatoryNote,
  Restriction,
} from "@sahihfolio/shared";
import CountryEditForm, { CountryFormData } from "./country-edit-form";
import {
  CircleCheck,
  Pen,
  Loader2,
  TriangleAlert,
  Info,
  CircleX,
} from "lucide-react";
import CountryEditSide from "./country-edit-side";
import { statusOptions } from "../../../constants";
import { calculateDaysSince, getDateString } from "src/lib/date-utils";
import { useState, useTransition } from "react";
import Link from "next/link";
import {
  updateCountry,
  publishCountry,
  unpublishCountry,
  archiveCountry,
  unarchiveCountry,
} from "src/lib/countries/actions";

export default function CountryEditContent({
  country: initialCountry,
  sources,
}: {
  country: CountryProfile;
  sources: Source[];
}) {
  const [country, setCountry] = useState<CountryProfile>(initialCountry);
  const [formData, setFormData] = useState<CountryFormData>({
    name: initialCountry.name,
    currency: initialCountry.currency,
    regulatoryNotes: initialCountry.regulatoryNotes || [],
    restrictions: initialCountry.restrictions || [],
    sourceUrls: initialCountry.sourceUrls || [],
  });
  const [lastReviewedAt, setLastReviewedAt] = useState<Date>(
    new Date(initialCountry.lastReviewedAt),
  );
  const [isPending, startTransition] = useTransition();
  const [confirmAction, setConfirmAction] = useState<
    "publish" | "draft" | "archive" | null
  >(null);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    title: string;
    body?: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

  const isArchived = country.status === "archived";

  const isDirty =
    formData.name !== country.name ||
    formData.currency !== country.currency ||
    JSON.stringify(formData.regulatoryNotes) !==
      JSON.stringify(country.regulatoryNotes || []) ||
    JSON.stringify(formData.restrictions) !==
      JSON.stringify(country.restrictions || []) ||
    JSON.stringify(formData.sourceUrls) !==
      JSON.stringify(country.sourceUrls || []) ||
    new Date(lastReviewedAt).toISOString() !==
      new Date(country.lastReviewedAt).toISOString();

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    body?: string,
  ) => {
    setToast({ type, title, body });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleMarkReviewed = () => {
    setLastReviewedAt(new Date());
    showToast(
      "info",
      "Review recorded",
      "Reviewed today. Save to persist the change.",
    );
  };

  const handleSave = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!isDirty || isArchived || isPending) return;
    setErrors(null);

    startTransition(async () => {
      const data = new FormData();
      data.append("id", country.id);
      data.append("code", country.code);
      data.append("name", formData.name);
      data.append("currency", formData.currency);
      // Ensure each regulatory note and restriction has a source.id
      const ensureSourceId = (item: RegulatoryNote | Restriction) => {
        if (!item.source?.id) {
          item.source = { ...item.source, id: crypto.randomUUID() };
        }
        return item;
      };
      const notesWithIds = formData.regulatoryNotes.map(ensureSourceId);
      const restrictionsWithIds = formData.restrictions.map(ensureSourceId);
      // Clean source URLs: remove empty entries
      const cleanedSourceUrls = formData.sourceUrls.filter(
        (u) => u.trim().length > 0,
      );
      data.append("regulatoryNotes", JSON.stringify(notesWithIds));
      data.append("restrictions", JSON.stringify(restrictionsWithIds));
      data.append("sourceUrls", JSON.stringify(cleanedSourceUrls));
      data.append("lastReviewedAt", lastReviewedAt.toISOString());
      data.append("status", country.status);

      const res = await updateCountry(null, data);
      if (res.status === "success") {
        setCountry((prev) => ({
          ...prev,
          name: formData.name,
          currency: formData.currency,
          regulatoryNotes: formData.regulatoryNotes,
          restrictions: formData.restrictions,
          sourceUrls: formData.sourceUrls,
          lastReviewedAt,
          updatedAt: new Date(),
        }));
        showToast(
          "success",
          `${formData.name} saved`,
          country.status === "published"
            ? "Changes are live in the Finder."
            : "Country changes saved.",
        );
      } else {
        const errorMsg =
          res.errors && "form" in res.errors
            ? res.errors.form?.[0]
            : "Could not save country.";
        setErrors(res.errors);
        showToast("error", "Error saving", errorMsg);
      }
    });
  };

  const handlePublish = async () => {
    setConfirmAction(null);
    startTransition(async () => {
      const res = await publishCountry(country.id);
      if (res.status === "success") {
        setCountry((prev) => ({ ...prev, status: "published" }));
        showToast(
          "success",
          `${country.name} published`,
          "It now appears in the Finder’s country list.",
        );
      } else {
        setErrors(res.errors);
        showToast("error", "Failed to publish", res.errors?.form?.[0]);
      }
    });
  };

  const handleUnpublish = async () => {
    setConfirmAction(null);
    startTransition(async () => {
      const res = await unpublishCountry(country.id);
      if (res.status === "success") {
        setCountry((prev) => ({ ...prev, status: "draft" }));
        showToast(
          "success",
          `${country.name} moved to draft`,
          "It no longer appears in the Finder.",
        );
      } else {
        setErrors(res.errors);
        showToast("error", "Failed to update status", res.errors?.form?.[0]);
      }
    });
  };

  const handleArchive = async () => {
    setConfirmAction(null);
    startTransition(async () => {
      const form = new FormData();
      form.append("id", country.id);
      const res = await archiveCountry(null, form);
      if (res.status === "success") {
        setCountry((prev) => ({ ...prev, status: "archived" }));
        showToast(
          "success",
          `${country.name} archived`,
          "You can restore it as a draft.",
        );
      } else {
        setErrors(res.errors);
        showToast("error", "Failed to archive", res.errors?.form?.[0]);
      }
    });
  };

  const handleUnarchive = async () => {
    startTransition(async () => {
      const res = await unarchiveCountry(country.id);
      if (res.status === "success") {
        setCountry((prev) => ({ ...prev, status: "draft" }));
        showToast("success", `${country.name} restored`, "Restored as draft.");
      } else {
        showToast("error", "Failed to restore", res.errors?.form?.[0]);
      }
    });
  };

  const daysSinceReview = calculateDaysSince(lastReviewedAt);

  return (
    <>
      {toast && (
        <div className="toasts" aria-live="polite">
          <div
            className={`toast t-${toast.type}`}
            role={toast.type === "error" ? "alert" : "status"}
          >
            <div className="t-body">
              <strong>{toast.title}</strong>
              {toast.body && <span>{toast.body}</span>}
            </div>
            <button
              type="button"
              className="icon-btn sm"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <section data-m="head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/admin/countries" data-act="navto" data-n="Countries">
            Countries
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{country.name}</span>
        </nav>
        <div className="ad-head">
          <div>
            <h1 tabIndex={-1}>
              {country.name} <span className="cc">{country.code}</span>
            </h1>
            <div className="hb">
              <span
                className={`badge b-${statusOptions[country.status]?.state || "neutral"}`}
              >
                {statusOptions[country.status]?.label || country.status}
              </span>
              <span className="muted">
                Last reviewed {getDateString(lastReviewedAt)}
              </span>
            </div>
          </div>
          <div className="ad-act hact">
            <span className="sv-w" role="status">
              {isPending ? (
                <span className="svl">
                  <Loader2 className="ic animate-spin" width={14} height={14} />
                  Saving…
                </span>
              ) : isDirty ? (
                <span className="svl dirty">
                  <Pen className="ic" width={14} height={14} /> Unsaved changes
                </span>
              ) : (
                <span className="svl">
                  <CircleCheck className="ic" width={14} height={14} /> No
                  changes
                </span>
              )}
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              data-act="mark"
              disabled={isArchived || isPending}
              onClick={handleMarkReviewed}
            >
              <CircleCheck className="ic" width={18} height={18} />
              Mark as reviewed today
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-act="save"
              disabled={!isDirty || isArchived || isPending}
              onClick={() => handleSave()}
            >
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section data-m="notice" style={{ marginBottom: "16px" }}>
        {isArchived && (
          <div className="alert a-info flat" role="status">
            <Info className="ic" width={20} height={20} />
            <div className="a-body">
              <strong>This country is archived</strong>
              <span>
                {" "}
                It isn’t in the Finder, and it can’t be edited. Restore it as a
                draft to make changes.
              </span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ marginLeft: "auto" }}
              onClick={handleUnarchive}
            >
              Restore as draft
            </button>
          </div>
        )}
        {!isArchived &&
          country.status === "published" &&
          daysSinceReview > 90 && (
            <div className="alert a-warning flat" role="status">
              <TriangleAlert className="ic" width={20} height={20} />
              <div className="a-body">
                <strong>Last reviewed {daysSinceReview} days ago</strong>
                <span>
                  {" "}
                  Check the notes and sources. Then use “Mark as reviewed
                  today”.
                </span>
              </div>
            </div>
          )}
        {!isArchived && country.status === "published" && isDirty && (
          <div
            className="alert a-info flat"
            role="status"
            style={{ marginTop: "8px" }}
          >
            <Info className="ic" width={20} height={20} />
            <div className="a-body">
              <strong>This country is published</strong>
              <span> Saved changes appear in the Finder straight away.</span>
            </div>
          </div>
        )}
      </section>

      <div data-m="form">
        {errors && (
          <div className="alert a-error flat" role="alert">
            <CircleX className="ic a-ic" width={20} height={20} />
            <div className="a-body">
              <strong>Fix {Object.keys(errors).length} things to save</strong>
              <ul className="esum">
                {Object.values(errors).map((error, index) => (
                  <li key={"errors_" + index}>
                    <button
                      type="button"
                      className="link-btn"
                      data-act="efocus"
                      data-fp={Object.keys(errors)[index]}
                      onClick={() => {
                        const field = Object.keys(errors)[index];
                        const element = document.querySelector(
                          `[name="${field}"]`,
                        );
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {error}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="nw">
          <CountryEditForm
            country={{
              ...country,
              lastReviewedAt,
            }}
            sources={sources}
            data={formData}
            onChange={setFormData}
            onSubmit={handleSave}
            isBusy={isPending}
            disabled={isArchived}
          />
          <CountryEditSide
            country={{
              ...country,
              name: formData.name,
              currency: formData.currency,
              regulatoryNotes: formData.regulatoryNotes,
              restrictions: formData.restrictions,
              sourceUrls: formData.sourceUrls,
              lastReviewedAt,
            }}
            handleUnpublish={handleUnpublish}
            handlePublish={handlePublish}
            handleArchive={handleArchive}
            handleUnarchive={handleUnarchive}
            confirmAction={confirmAction}
            setConfirmAction={setConfirmAction}
            isBusy={isPending}
          />
        </div>
      </div>
    </>
  );
}
