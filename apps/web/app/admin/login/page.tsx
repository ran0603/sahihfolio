export default function LoginPage() {
  return (
    <div data-m="card">
      <div className="lg-card">
        <div className="lg-mark" aria-hidden="true">
          <span className="mono">Sf</span>
        </div>
        <h1 tabIndex={-1}>Sign in to Admin</h1>
        <p className="lg-sub">
          Sahihfolio internal tools. We’ll email you a link that works
          once.
        </p>

        <form className="lf" noValidate>
          <div className="fld">
            <label className="lbl" htmlFor="m1-le">
              Work email
            </label>
            <input
              id="m1-le"
              className="inp lemail "
              type="email"
              inputMode="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value=""
              aria-describedby="m1-lh"
            />
            <p className="hint" id="m1-lh">
              Access is by invitation only.
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "16px" }}
          >
            Email me a sign-in link
          </button>
        </form>
        <p className="lg-next">
          After signing in you’ll go to{" "}
          <code>/admin/screening-reports/exmp-aaoifi</code>.
        </p>
      </div>
      <p className="lg-foot">
        Internal tool. Sign-ins are logged.{" "}
        <a href="#" data-act="site">
          Back to the public site
        </a>
      </p>
    </div>
  )
}