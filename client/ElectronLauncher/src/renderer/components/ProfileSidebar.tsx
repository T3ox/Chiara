import type { AuthProfile } from '../../types';
import { UserIcon } from './icons';

type ProfileSidebarProps = {
  profile: AuthProfile | null;
  isOpen: boolean;
  isAuthenticated: boolean;
  onOpen: () => void;
  onClose: () => void;
  onLogout: () => Promise<void>;
};

function getRemainingGb(profile: AuthProfile | null) {
  if (!profile) return null;
  if (typeof profile.gbTotal === 'number' && profile.gbTotal > 0) {
    return {
      remaining: Math.max(profile.gbTotal - (profile.gbUsed || 0), 0),
      total: profile.gbTotal
    };
  }
  if (typeof profile.mbTotal === 'number' && profile.mbTotal > 0) {
    return {
      remaining: Math.max((profile.mbTotal - (profile.mbUsed || 0)) / 1024, 0),
      total: profile.mbTotal / 1024
    };
  }
  return null;
}

export function ProfileSidebar({
  profile,
  isOpen,
  isAuthenticated,
  onOpen,
  onClose,
  onLogout
}: ProfileSidebarProps) {
  const remainingQuota = getRemainingGb(profile);
  const usedPercentage = remainingQuota
    ? Math.min(100, Math.max(0, 100 - (remainingQuota.remaining / remainingQuota.total) * 100))
    : 0;

  return (
    <>
      {isAuthenticated && (
        <button className="profile-btn" title="Profilo utente" type="button" onClick={onOpen}>
          <UserIcon />
        </button>
      )}

      <aside className={`profile-sidebar${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
        <div className="profile-sidebar-header">
          <span>Profilo</span>
          <button className="profile-close" title="Chiudi" type="button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="profile-avatar">
          <UserIcon />
        </div>

        <div className="profile-info">
          <div className="profile-field">
            <span className="profile-label">Nome</span>
            <span className="profile-value">{profile?.name || '—'}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email</span>
            <span className="profile-value">{profile?.email || '—'}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Pacchetto</span>
            <span className="profile-value">{profile?.package || '—'}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Spazio rimanente</span>
            <div className="profile-gb-bar">
              <div className="profile-gb-fill" style={{ width: `${usedPercentage}%` }} />
            </div>
            <span className="profile-gb-label">
              {remainingQuota ? `${remainingQuota.remaining.toFixed(1)} GB rimanenti` : 'Quota non disponibile'}
            </span>
          </div>
        </div>
        <button className="btn btn-secondary profile-logout" type="button" onClick={onLogout}>
          Logout
        </button>
      </aside>

      <div className={`profile-overlay${isOpen ? ' visible' : ''}`} onClick={onClose} />
    </>
  );
}
