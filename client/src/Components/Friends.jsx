
import React, { useEffect, useMemo, useState } from 'react';
import './Friends.css';

// Sample friend data — replace with real API fetch
const sampleFriends = [
  { id: 'u1', name: 'Aarav Patel', xp: 1420, avatar: '', status: 'online', rank: 1 },
  { id: 'u2', name: 'Sneha Rao', xp: 1290, avatar: '', status: 'offline', rank: 2 },
  { id: 'u3', name: 'Vikram Singh', xp: 1180, avatar: '', status: 'online', rank: 3 },
  { id: 'u4', name: 'Maya Iyer', xp: 960, avatar: '', status: 'away', rank: 4 },
  { id: 'u5', name: 'Rohan Gupta', xp: 890, avatar: '', status: 'online', rank: 5 },
];

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [filter, setFilter] = useState('top'); // 'top' | 'online' | 'recent'
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setFriends(sampleFriends), 80);
    return () => clearTimeout(t);
  }, []);

  // memoize filtered list for performance
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = friends.filter((f) => {
      if (filter === 'online') return f.status === 'online';
      if (filter === 'recent') return f.rank > 3; // demo logic
      return true;
    });

    const searched = q ? base.filter((f) => f.name.toLowerCase().includes(q)) : base;

    return searched.sort((a, b) => (filter === 'top' ? b.xp - a.xp : a.rank - b.rank));
  }, [friends, filter, query]);

  const handleCardClick = (id) => {
    // Use a safe navigation fallback that works without react-router
    // If your app uses react-router, clicking the <a> links still works.
    window.location.href = `/profile/${id}`;
  };

  return (
    <div className="sd-friends-page">
      <header className="sd-friends-header">
        <h2>Friends</h2>

        <div className="sd-friends-controls">
          <input
            aria-label="Search friends"
            placeholder="Search friends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sd-friends-search"
          />

          <div className="sd-friends-filters" role="tablist" aria-label="Friend filters">
            <button className={`sd-filter-btn ${filter === 'top' ? 'active' : ''}`} onClick={() => setFilter('top')}>
              Top Rated
            </button>
            <button className={`sd-filter-btn ${filter === 'online' ? 'active' : ''}`} onClick={() => setFilter('online')}>
              Online
            </button>
            <button className={`sd-filter-btn ${filter === 'recent' ? 'active' : ''}`} onClick={() => setFilter('recent')}>
              Recent
            </button>
          </div>
        </div>
      </header>

      <main className="sd-friends-grid">
        {filtered.length === 0 ? (
          <div className="sd-empty">No friends found.</div>
        ) : (
          filtered.map((f) => (
            <article
              key={f.id}
              className="sd-friend-card"
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(f.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(f.id)}
            >
              <div className="sd-avatar-wrap">
                {f.avatar ? (
                  <img src={f.avatar} alt={`${f.name} avatar`} className="sd-avatar" />
                ) : (
                  <div className="sd-avatar placeholder">{f.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
                )}
                <span className={`sd-presence ${f.status}`} />
              </div>

              <div className="sd-friend-info">
                <div className="sd-friend-top">
                  <h3 className="sd-friend-name">{f.name}</h3>
                  <div className="sd-friend-xp">{f.xp} XP</div>
                </div>

                <div className="sd-friend-meta">
                  <span className="sd-friend-rank">#{f.rank}</span>
                  <a
                    href={`/profile/${f.id}`}
                    className="sd-view-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </article>
          ))
        )}
      </main>

      <footer className="sd-friends-footer">
        <small>Tip: Click a card or "View Profile" to visit a friend's profile.</small>
      </footer>
    </div>
  );
}
