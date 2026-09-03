import { Monitor } from 'lucide-react';

export function MobileBlocked() {
  return (
    <div className="blocked">
      <img src="/logo.png" alt="TIN RIDE" width={88} height={88} />
      <div className="wordmark" style={{ marginTop: 10 }}>
        <span>TIN </span>
        <span>RIDE</span>
      </div>
      <div className="road" style={{ justifyContent: 'center' }}>
        <i className="road-y" />
        <i className="road-d" />
      </div>
      <div className="blocked-icon">
        <Monitor size={28} color="#000" />
      </div>
      <h1>Not authorised on mobile</h1>
      <p>
        TIN RIDE Command is a desktop duty board for Police, FRSC, VIO, Civil Defence and partner agencies. Open this
        site on a computer to sign in and work.
      </p>
      <p className="blocked-hint">Use the TIN RIDE mobile app for rider and driver access.</p>
    </div>
  );
}
