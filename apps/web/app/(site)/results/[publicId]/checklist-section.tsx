export default function ChecklistSection() {
  return (
    <section data-m="checklist" className="card2">
      <div className="cl-top">
        <h2
          style={{
            fontSize: "24px",
            margin: 0,
            fontWeight: 600,
            letterSpacing: "-.01em",
          }}
        >
          Before you open an account, verify
        </h2>
      </div>
      <p className="sec-n" style={{ marginTop: "6px" }}>
        Information changes. These six checks take a few minutes and protect you
        from surprises.
      </p>
      <div className="segs" aria-hidden="true">
        <i className=""></i>
        <i className=""></i>
        <i className=""></i>
        <i className=""></i>
        <i className=""></i>
        <i className=""></i>
      </div>
      <p className="cl-count" aria-live="polite" data-cl-count="">
        <b>0</b> of 6 checked. Ticks stay on this device.
      </p>
      <div>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="0" />
          <span>
            <b>Residency eligibility</b>
            <small>
              Confirm the provider accepts residents of Malaysia and note the
              documents it asks for.
            </small>
          </span>
        </label>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="1" />
          <span>
            <b>Account type</b>
            <small>
              Check whether it offers an Islamic (swap-free) account and ask
              what that changes.
            </small>
          </span>
        </label>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="2" />
          <span>
            <b>Fees</b>
            <small>
              Check trading, currency-conversion, custody and withdrawal fees on
              the provider’s current fee page.
            </small>
          </span>
        </label>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="3" />
          <span>
            <b>Tax reporting</b>
            <small>
              Find out what tax documents the provider issues and what you may
              need to report in Malaysia. Ask a qualified tax adviser if unsure.
            </small>
          </span>
        </label>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="4" />
          <span>
            <b>Withdrawal process</b>
            <small>
              Check how long withdrawals take, any limits, and any fees.
            </small>
          </span>
        </label>
        <label className="clrow">
          <input className="rin" type="checkbox" data-ck="5" />
          <span>
            <b>Current screening methodology</b>
            <small>
              Confirm the methodology is still current and see how it treats
              debt and non-permissible income.
            </small>
          </span>
        </label>
      </div>
    </section>
  );
}
