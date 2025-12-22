import React, { useEffect, useMemo, useState } from "react";
import "./Friends.css";

/* ======================================================
   DATABASE-READY JSON (SAMPLE API RESPONSE)
   (Replace with real backend response later)
====================================================== */
const FRIENDS_DB_RESPONSE = {
  friends: [
    {
      _id: "u1",
      name: "Aarav Patel",
      xp: 1420,
      rank: 1,
      status: "online",
      avatar: null,
      lastActive: "2025-01-21T10:20:00Z"
    },
    {
      _id: "u2",
      name: "Sneha Rao",
      xp: 1290,
      rank: 2,
      status: "offline",
      avatar: null,
      lastActive: "2025-01-20T18:00:00Z"
    },
    {
      _id: "u3",
      name: "Vikram Singh",
      xp: 1180,
      rank: 3,
      status: "online",
      avatar: null,
      lastActive: "2025-01-21T11:00:00Z"
    },
    {
      _id: "u4",
      name: "Maya Iyer",
      xp: 960,
      rank: 4,
      status: "away",
      avatar: null,
      lastActive: "2025-01-19T15:00:00Z"
    },
    {
      _id: "u5",
      name: "Rohan Gupta",
      xp: 890,
      rank: 5,
      status: "online",
      avatar: null,
      lastActive: "2025-01-21T09:40:00Z"
    }
  ]
};

/* ======================================================
   FAKE DB FETCH (DROP-IN FOR REAL API)
====================================================== */
function fetchFriendsFromDatabase() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FRIENDS_DB_RESPONSE);
    }, 300);
  });
}

/* ======================================================
   FRIENDS COMPONENT
====================================================== */
export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [filter, setFilter] = useState("top"); // top | online | recent
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriendsFromDatabase().then((data) => {
      setFriends(data.friends);
      setLoading(false);
    });
  }, []);

  const filteredFriends = useMemo(() => {
    let list = [...friends];

    // Filter: Online
    if (filter === "online") {
      list = list.filter((f) => f.status === "online");
    }

    // Filter: Recent (last active)
    if (filter === "recent") {
      list.sort(
        (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
      );
    }

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((f) => f.name.toLowerCase().includes(q));
    }

    // Sort: Top XP
    if (filter === "top") {
      list.sort((a, b) => b.xp - a.xp);
    }

    return list;
  }, [friends, filter, query]);

  const openProfile = (id) => {
    window.location.href = `/profile/${id}`;
  };

  if (loading) {
    return <div className="sd-loading">Loading friends...</div>;
  }

  return (
    <div className="sd-friends-page">

      {/* HEADER */}
      <header className="sd-friends-header">
        <h2>Friends</h2>

        <div className="sd-friends-controls">
          <input
            className="sd-friends-search"
            placeholder="Search friends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="sd-friends-filters">
            <button
              className={filter === "top" ? "active" : ""}
              onClick={() => setFilter("top")}
            >
              Top Rated
            </button>
            <button
              className={filter === "online" ? "active" : ""}
              onClick={() => setFilter("online")}
            >
              Online
            </button>
            <button
              className={filter === "recent" ? "active" : ""}
              onClick={() => setFilter("recent")}
            >
              Recent
            </button>
          </div>
        </div>
      </header>

      {/* FRIENDS GRID */}
      <main className="sd-friends-grid">
        {filteredFriends.length === 0 ? (
          <div className="sd-empty">No friends found.</div>
        ) : (
          filteredFriends.map((f) => (
            <article
              key={f._id}
              className="sd-friend-card"
              onClick={() => openProfile(f._id)}
            >
              <div className="sd-avatar-wrap">
                {f.avatar ? (
                  <img src={f.avatar} alt={f.name} />
                ) : (
                  <div className="sd-avatar placeholder">
                    {f.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
                <span className={`sd-presence ${f.status}`} />
              </div>

              <div className="sd-friend-info">
                <div className="sd-friend-top">
                  <h3>{f.name}</h3>
                  <span>{f.xp} XP</span>
                </div>

                <div className="sd-friend-meta">
                  <span>#{f.rank}</span>
                  <a
                    href={`/profile/${f._id}`}
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
        <small>Friends loaded from database-ready JSON structure</small>
      </footer>
    </div>
  );
}
