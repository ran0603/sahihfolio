"use client";

export default function CountryEditLoadingPage() {
  return (
    <div data-m="skeleton" aria-busy="true">
      <i
        className="skel-line"
        style={{ width: "30%", height: "36px", marginBottom: "12px" }}
      ></i>
      <i
        className="skel-line"
        style={{ width: "45%", marginBottom: "20px" }}
      ></i>
      <div className="ad-card" style={{ display: "grid", gap: "14px" }}>
        <i className="skel-line" style={{ height: "52px" }}></i>
        <i className="skel-line" style={{ height: "52px" }}></i>
        <i className="skel-line" style={{ height: "52px" }}></i>
        <i className="skel-line" style={{ height: "52px" }}></i>
      </div>
    </div>
  );
}
