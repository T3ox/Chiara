import { FormEvent, useState } from 'react';

type LoginPanelProps = {
  isAuthenticated: boolean;
  loginStatus: string;
  loginError: boolean;
  sessionLabel: string;
  isPending: boolean;
  onPasswordLogin: (identifier: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
};

export function LoginPanel({
  isAuthenticated,
  loginStatus,
  loginError,
  sessionLabel,
  isPending,
  onPasswordLogin,
  onGoogleLogin,
  onLogout
}: LoginPanelProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onPasswordLogin(identifier, password);
    setPassword('');
  };

  const handleGoogleLogin = async () => {
    await onGoogleLogin();
    setPassword('');
  };

  return (
    <section className="login-section">
      <div className="login-heading">
        <div>
          <h3>Accesso</h3>
          <p>{sessionLabel}</p>
        </div>
        <span className={`login-badge${isAuthenticated ? ' authenticated' : ''}`}>
          {isAuthenticated ? 'Autenticato' : 'Non autenticato'}
        </span>
      </div>

      {!isAuthenticated && (
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username o email</span>
            <input
              type="text"
              autoComplete="username"
              required
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="btn" type="submit" disabled={isPending}>
            Accedi
          </button>
        </form>
      )}

      {!isAuthenticated && (
        <div className="oauth-actions">
          <button className="btn-secondary google-login" type="button" onClick={handleGoogleLogin} disabled={isPending}>
            <span className="google-mark" aria-hidden="true">
              G
            </span>
            Accedi con Google
          </button>
        </div>
      )}

      <div className="login-footer">
        <span className={`login-status${loginError ? ' error' : ''}`}>{loginStatus}</span>
        {isAuthenticated && (
          <button className="btn-secondary" type="button" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </section>
  );
}
