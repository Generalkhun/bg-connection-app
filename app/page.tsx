"use client";

import { useState, type FormEvent, type SVGProps } from "react";

type Tab = "overview" | "shelf" | "sessions" | "events";
type IconName =
  | "home"
  | "shelf"
  | "sessions"
  | "events"
  | "arrow"
  | "pin"
  | "clock"
  | "users"
  | "chevron"
  | "spark"
  | "search"
  | "plus"
  | "close"
  | "dice";

const games = [
  { title: "Wingspan", category: "ENGINE BUILDER", players: "1–5", tone: "wingspan", mark: "✦", note: "Best with a cup of tea and absolutely no rush." },
  { title: "Root", category: "ASYMMETRIC WAR", players: "2–4", tone: "root", mark: "♟", note: "Pick a faction that feels like you. Then expect chaos." },
  { title: "Dune: Imperium", category: "DECK-BUILDING", players: "1–4", tone: "dune", mark: "◈", note: "Spice must flow. Teach the first round together." },
  { title: "Cascadia", category: "PUZZLE · NATURE", players: "1–4", tone: "cascadia", mark: "◒", note: "A lovely quiet one for a slower game night." },
];

const sessions = [
  { title: "Cozy Wingspan evening", game: "Wingspan", place: "Brooklyn Game Lab", time: "Today · 6:30 PM", players: "2 spots left", distance: "0.8 mi", color: "lime" },
  { title: "Root: Woodland chaos", game: "Root", place: "The Uncommons", time: "Today · 7:00 PM", players: "1 spot left", distance: "1.4 mi", color: "purple" },
  { title: "New-to-Dune night", game: "Dune: Imperium", place: "Hex & Co. · UWS", time: "Tomorrow · 5:30 PM", players: "3 spots left", distance: "2.1 mi", color: "coral" },
  { title: "Cascadia, coffee & chill", game: "Cascadia", place: "Sip & Play", time: "Tomorrow · 6:00 PM", players: "2 spots left", distance: "2.7 mi", color: "blue" },
  { title: "Open table: anything goes", game: "Bring your favorite", place: "Brooklyn Game Lab", time: "Sat · 2:00 PM", players: "4 spots left", distance: "3.2 mi", color: "pink" },
  { title: "Tiny epic game night", game: "Small World", place: "Hex & Co. · UWS", time: "Sat · 4:30 PM", players: "2 spots left", distance: "3.7 mi", color: "blue" },
  { title: "Strategy Sunday", game: "Brass: Birmingham", place: "The Uncommons", time: "Sun · 1:00 PM", players: "1 spot left", distance: "4.0 mi", color: "coral" },
];

const events = [
  { title: "Spiel Essen 2026", detail: "The world's biggest board game fair returns.", tag: "COMMUNITY", art: "essen", href: "https://boardgamegeek.com/blog/1/board-game-news" },
  { title: "New on the table", detail: "Fresh releases worth adding to your radar.", tag: "NEW RELEASES", art: "new", href: "https://boardgamegeek.com/blog/1/board-game-news" },
  { title: "The people have spoken", detail: "This year's most-loved games, ranked.", tag: "HOT LIST", art: "hot", href: "https://boardgamegeek.com/blog/1/board-game-news" },
];

const navItems: { id: Tab; label: string; icon: IconName }[] = [
  { id: "overview", label: "Your table", icon: "home" },
  { id: "shelf", label: "Game shelf", icon: "shelf" },
  { id: "sessions", label: "Find a session", icon: "sessions" },
  { id: "events", label: "Around you", icon: "events" },
];

function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...props,
  };

  switch (name) {
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></svg>;
    case "shelf":
      return <svg {...common}><path d="M4 5h16v15H4zM8 5v15m8-15v15M4 10h16" /></svg>;
    case "sessions":
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1zm13-9a3 3 0 1 0 0-6m2 9a5 5 0 0 1 3 4v1h-3" /></svg>;
    case "events":
      return <svg {...common}><path d="M4 5h16v15H4zM8 3v4m8-4v4M4 10h16m-9 4 1.5 1.5L16 12" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
    case "pin":
      return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "users":
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87m-1-11.91a4 4 0 0 1 0 7.76" /></svg>;
    case "chevron":
      return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
    case "spark":
      return <svg {...common}><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Zm7 12 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14m-7-7h14" /></svg>;
    case "close":
      return <svg {...common}><path d="m18 6-12 12M6 6l12 12" /></svg>;
    case "dice":
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01" /></svg>;
  }
}

function GameCard({ game }: { game: (typeof games)[number] }) {
  return (
    <article className="game-card">
      <div className={`game-art ${game.tone}`} aria-hidden="true">
        <span className="game-art-mark">{game.mark}</span>
        <span className="game-art-label">{game.category}</span>
        <span className="game-art-title">{game.title}</span>
        <span className="game-art-detail">PLAYERS {game.players}</span>
      </div>
      <div className="game-card-caption">
        <span>{game.title}</span>
        <span className="rating">★ 4.8</span>
      </div>
      <div className={`game-note ${game.tone}`}>
        <span>✎ PLAYER NOTE</span>
        <p>“{game.note}”</p>
      </div>
    </article>
  );
}

function SessionCard({ session }: { session: (typeof sessions)[number] }) {
  return (
    <article className="session-card">
      <span className={`session-dot ${session.color}`} />
      <div className="session-copy">
        <h3>{session.title}</h3>
        <p>{session.game} <span className="separator">·</span> {session.place}</p>
        <div className="session-meta">
          <span><Icon name="clock" />{session.time}</span>
          <span><Icon name="users" />{session.players}</span>
        </div>
      </div>
      <span className="distance"><Icon name="pin" />{session.distance}</span>
      <button className="join-button" type="button" aria-label={`View ${session.title}`}><Icon name="chevron" /></button>
    </article>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark"><Icon name="dice" /></span>
      <span>BG<span className="brand-accent">Connection</span></span>
    </span>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sessionPage, setSessionPage] = useState(0);
  const [search, setSearch] = useState("");

  function enterApp(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setEntered(true);
    setActiveTab("overview");
  }

  const visibleSessions = sessions.slice(sessionPage * 5, sessionPage * 5 + 5);
  const matchingGames = games.filter((game) =>
    `${game.title} ${game.category}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (!entered) {
    return (
      <main className="landing-shell">
        <header className="landing-header">
          <Brand />
          <div className="landing-header-note"><span className="status-pulse" /> YOUR NEXT GAME NIGHT STARTS HERE</div>
        </header>

        <section className="landing-hero">
          <div className="hero-copy">
            <div className="eyebrow"><span>01</span> THE TABLE IS BIGGER TOGETHER</div>
            <h1>Find your<br /><span>people.</span><br />Play more.</h1>
            <p className="hero-description">Your shelf, your next game night, and the people who make it memorable — all in one place.</p>
            <button className="primary-button hero-button" onClick={() => enterApp()} type="button">
              Enter the app <Icon name="arrow" />
            </button>
            <div className="hero-footnote"><span className="pixel-spark">✳</span> MADE FOR PEOPLE WHO SAY “ONE MORE ROUND”</div>
          </div>

          <div className="hero-visual" aria-label="A stack of board games ready for game night">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-sun" />
            <div className="hero-board">
              <div className="board-grid" />
              <span className="board-meeple meeple-one">♟</span>
              <span className="board-meeple meeple-two">♟</span>
              <span className="board-meeple meeple-three">♟</span>
              <span className="board-token">✦</span>
              <div className="hero-board-label"><span>GAME NIGHT</span><strong>IS CALLING</strong><small>EST. JUST NOW</small></div>
            </div>
            <div className="floating-note note-left"><span className="note-star">✦</span><span>YOUR TABLE<br /><b>IS WAITING</b></span></div>
            <div className="floating-note note-right"><span className="note-live" /><span>7 OPEN TABLES<br /><b>NEAR YOU</b></span></div>
            <span className="hero-coordinate">40° 41&apos; 12.4&quot; N<br />73° 59&apos; 22.1&quot; W</span>
          </div>
        </section>

        <section className="landing-bottom">
          <div className="landing-promise"><span className="landing-index">01 / FIND YOUR TABLE</span><strong>Local games. Real people.</strong><span>Good company is closer than you think.</span></div>
          <div className="landing-promise"><span className="landing-index">02 / SHARE YOUR SHELF</span><strong>Your games, your story.</strong><span>Show the world what hits your table.</span></div>
          <div className="login-card">
            <div className="login-heading"><div><span className="eyebrow">BACK FOR ANOTHER ROUND?</span><h2>Welcome back.</h2></div><span className="login-die">✧</span></div>
            <form className="login-form" onSubmit={enterApp}>
              <label className="sr-only" htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="Email address" autoComplete="email" required />
              <label className="sr-only" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" required />
              <button className="login-submit" type="submit">Log in <Icon name="arrow" /></button>
            </form>
            <button className="google-button" type="button" disabled><span className="google-g">G</span> Register with Google <span className="coming-soon">SOON</span></button>
            <p className="login-disclaimer">Sign-in is a preview right now. Accounts are coming soon.</p>
          </div>
        </section>
        <footer className="landing-footer"><Brand compact /><span>GOOD GAMES. GOOD PEOPLE. GREAT STORIES.</span><span>© 2025 BGCONNECTION</span></footer>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="sidebar-brand" href="#" onClick={(event) => { event.preventDefault(); setActiveTab("overview"); }}><Brand /></a>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)} type="button">
              <Icon name={item.icon} /><span>{item.label}</span>{index === 0 && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-mini-card"><span className="mini-spark">✳</span><p>Better games happen<br />around a table.</p><span>GO FIND YOURS ↗</span></div>
          <button className="user-chip" type="button" onClick={() => setActiveTab("overview")}><span className="avatar avatar-small">JD</span><span><strong>Jamie Davis</strong><small>THE CURIOUS PLAYER</small></span><Icon name="chevron" /></button>
        </div>
      </aside>

      <section className="app-main">
        <header className="app-topbar">
          <div className="mobile-brand"><Brand /></div>
          <div className="location-label"><Icon name="pin" /><span>PLAYING AROUND <b>BROOKLYN, NY</b></span></div>
          <div className="topbar-right"><span className="topbar-message">SUNDAY, OCTOBER 11</span><span className="avatar avatar-top">JD</span></div>
        </header>

        <div className="dashboard-content">
          <div className="page-heading">
            <div><div className="eyebrow"><span>YOUR PLAYER CARD</span><span className="heading-slash">/</span><span>LVL 08</span></div>
              <h1>{activeTab === "overview" ? <>Hey, Jamie<span className="heading-period">.</span></> : activeTab === "shelf" ? <>Your <span className="heading-period">shelf.</span></> : activeTab === "sessions" ? <>Find your <span className="heading-period">table.</span></> : <>Out in the <span className="heading-period">world.</span></>}</h1>
              <p>{activeTab === "overview" ? "The best plans start with a little curiosity." : activeTab === "shelf" ? "A little look at what you love to play." : activeTab === "sessions" ? "Good games are better with good company." : "Little things happening in the board game universe."}</p>
            </div>
            <button className="location-button" type="button"><Icon name="pin" /> <span>Brooklyn, NY</span><span className="location-chevron">⌄</span></button>
          </div>

          {activeTab === "overview" && (
            <>
              <section className="profile-banner">
                <div className="profile-avatar-wrap"><div className="avatar avatar-large">JD</div><span className="online-dot" /></div>
                <div className="profile-copy"><div className="profile-name-line"><h2>Jamie Davis</h2><span className="profile-tag">TABLE REGULAR</span></div><p>Collector of cardboard. Finder of fun people. Usually brings snacks.</p><div className="profile-stats"><span><b>24</b> GAMES</span><i /><span><b>08</b> SESSIONS</span><i /><span><b>Brooklyn</b> BASED</span></div></div>
                <button type="button" className="edit-profile">EDIT PROFILE <span>↗</span></button>
                <div className="profile-decoration">✳</div>
              </section>

              <div className="content-grid">
                <div className="main-column">
                  <section className="panel shelf-panel">
                    <div className="section-heading"><div><div className="eyebrow">THE CURRENT ROTATION <span className="heading-slash">/</span> 04 GAMES</div><h2>On my shelf<span className="heading-period">.</span></h2></div><button className="text-link" type="button" onClick={() => setActiveTab("shelf")}>SEE ALL <Icon name="arrow" /></button></div>
                    <div className="game-grid">{games.slice(0, 4).map((game) => <GameCard key={game.title} game={game} />)}</div>
                    <button type="button" className="add-game-button" onClick={() => setActiveTab("shelf")}><Icon name="plus" /> ADD A GAME TO YOUR SHELF</button>
                  </section>

                  <section className="panel sessions-panel">
                    <div className="section-heading"><div><div className="eyebrow">GOOD PEOPLE, GOOD PLANS <span className="heading-slash">/</span> NEARBY</div><h2>Tables looking for you<span className="heading-period">.</span></h2></div><button className="text-link" type="button" onClick={() => setActiveTab("sessions")}>EXPLORE ALL <Icon name="arrow" /></button></div>
                    <div className="session-layout">
                      <a className="map-preview" href="https://www.google.com/maps/search/board+game+cafes+near+Brooklyn+NY/" target="_blank" rel="noreferrer" aria-label="Open nearby game locations in Google Maps">
                        <div className="map-street street-a" /><div className="map-street street-b" /><div className="map-street street-c" /><div className="map-park"><span>FORT GREENE<br />PARK</span></div>
                        <span className="map-pin map-pin-one">✦</span><span className="map-pin map-pin-two">✦</span><span className="map-pin map-pin-three">✦</span>
                        <span className="map-you"><i /> YOU ARE HERE</span><span className="map-open">OPEN MAP ↗</span>
                      </a>
                      <div className="session-list">
                        {sessions.slice(0, 2).map((session) => <SessionCard key={session.title} session={session} />)}
                        <button className="session-more" type="button" onClick={() => setActiveTab("sessions")}>+ 5 MORE TABLES NEAR YOU <Icon name="arrow" /></button>
                      </div>
                    </div>
                  </section>

                  <section className="bgg-panel">
                    <div className="bgg-mark">bgg<span>↗</span></div>
                    <div className="bgg-copy"><div className="eyebrow">YOUR PROFILE, CONNECTED</div><h3>Your BoardGameGeek story, all in one place.</h3><p>Link your BGG username to bring your collection and stats into your player card.</p></div>
                    <button className="bgg-connect" type="button" onClick={() => window.alert("BGG profile linking is coming soon.")}>CONNECT BGG <Icon name="arrow" /></button>
                    <span className="bgg-supabase">PROFILE SYNC · COMING SOON</span>
                  </section>
                </div>

                <aside className="side-column">
                  <section className="panel monthly-panel"><div className="eyebrow">YOUR YEAR IN PLAY <span className="heading-slash">/</span> OCT</div><div className="monthly-number">08<span>GAMES PLAYED</span></div><p>You&apos;re on a roll, Jamie.</p><div className="activity-bars" aria-label="Monthly game play activity"><i style={{ height: "36%" }} /><i style={{ height: "55%" }} /><i style={{ height: "45%" }} /><i style={{ height: "75%" }} /><i style={{ height: "58%" }} /><i style={{ height: "88%" }} /><i style={{ height: "66%" }} /><i style={{ height: "100%" }} /><i style={{ height: "70%" }} /><i style={{ height: "92%" }} /><i style={{ height: "52%" }} /><i style={{ height: "36%" }} /></div><div className="month-labels"><span>JAN</span><span>JUN</span><span>DEC</span></div><div className="month-highlight"><span>✳</span><span><b>TOP TABLE:</b> Wingspan</span><span>× 4</span></div></section>

                  <section className="panel events-panel"><div className="section-heading compact-heading"><div><div className="eyebrow">THE HOBBY, LATELY</div><h2>In the scene<span className="heading-period">.</span></h2></div><button className="icon-link" type="button" aria-label="See all events" onClick={() => setActiveTab("events")}><Icon name="arrow" /></button></div><div className="event-list">{events.slice(0, 2).map((event) => <a className="event-item" href={event.href} target="_blank" rel="noreferrer" key={event.title}><span className={`event-art ${event.art}`}><span>{event.art === "essen" ? "✦" : event.art === "new" ? "◈" : "★"}</span></span><span className="event-copy"><small>{event.tag}</small><strong>{event.title}</strong><span>{event.detail}</span></span><Icon name="chevron" /></a>)}</div></section>
                </aside>
              </div>
            </>
          )}

          {activeTab === "shelf" && (
            <section className="panel full-panel"><div className="section-heading"><div><div className="eyebrow">THE CURRENT ROTATION <span className="heading-slash">/</span> {matchingGames.length.toString().padStart(2, "0")} GAMES</div><h2>Games that make the table<span className="heading-period">.</span></h2></div><label className="search-box"><Icon name="search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a game..." aria-label="Search games" /></label></div><div className="full-game-grid">{matchingGames.map((game) => <GameCard key={game.title} game={game} />)}{matchingGames.length === 0 && <p className="empty-state">No games on the shelf match that search yet.</p>}</div><button className="add-game-button" type="button"><Icon name="plus" /> ADD A GAME TO YOUR SHELF</button><div className="notes-preview"><span className="note-icon">✳</span><div><div className="eyebrow">NOTES TRAVEL WITH YOUR SHELF</div><p>Leave a little context for the next person you invite to play.</p><span>VISIBLE ON YOUR PLAYER CARD</span></div></div></section>
          )}

          {activeTab === "sessions" && (
            <section className="panel full-panel sessions-full"><div className="section-heading"><div><div className="eyebrow">YOUR NEIGHBORHOOD <span className="heading-slash">/</span> 7 OPEN TABLES</div><h2>There&apos;s a seat for you<span className="heading-period">.</span></h2></div><button className="location-button" type="button"><Icon name="pin" /><span>Brooklyn, NY</span></button></div><div className="session-layout"><a className="map-preview map-large" href="https://www.google.com/maps/search/board+game+cafes+near+Brooklyn+NY/" target="_blank" rel="noreferrer" aria-label="Open nearby game locations in Google Maps"><div className="map-street street-a" /><div className="map-street street-b" /><div className="map-street street-c" /><div className="map-park"><span>FORT GREENE<br />PARK</span></div><span className="map-pin map-pin-one">✦</span><span className="map-pin map-pin-two">✦</span><span className="map-pin map-pin-three">✦</span><span className="map-you"><i /> YOU ARE HERE</span><span className="map-open">OPEN MAP ↗</span></a><div className="session-list">{visibleSessions.map((session) => <SessionCard key={session.title} session={session} />)}<div className="pagination"><span>SHOWING {sessionPage * 5 + 1}–{Math.min(sessionPage * 5 + 5, sessions.length)} OF {sessions.length}</span><div><button type="button" onClick={() => setSessionPage(0)} disabled={sessionPage === 0} aria-label="Previous page"><span>←</span></button><span className="page-number">{sessionPage + 1} / {Math.ceil(sessions.length / 5)}</span><button type="button" onClick={() => setSessionPage(Math.min(sessionPage + 1, Math.ceil(sessions.length / 5) - 1))} disabled={sessionPage >= Math.ceil(sessions.length / 5) - 1} aria-label="Next page"><span>→</span></button></div></div></div></div></section>
          )}

          {activeTab === "events" && (
            <section className="panel full-panel"><div className="section-heading"><div><div className="eyebrow">A FEW THINGS ON OUR RADAR <span className="heading-slash">/</span> COMMUNITY PICKS</div><h2>Good things are happening<span className="heading-period">.</span></h2></div></div><div className="event-grid">{events.map((event) => <a className="event-feature" href={event.href} target="_blank" rel="noreferrer" key={event.title}><span className={`event-feature-art ${event.art}`}><span>{event.art === "essen" ? "✦" : event.art === "new" ? "◈" : "★"}</span><small>{event.tag}</small></span><span className="event-feature-copy"><strong>{event.title}</strong><span>{event.detail}</span><span className="event-read">READ ON BOARDGAMEGEEK <Icon name="arrow" /></span></span></a>)}</div></section>
          )}
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <button key={item.id} type="button" className={activeTab === item.id ? "active" : ""} onClick={() => setActiveTab(item.id)}><Icon name={item.icon} /><span>{item.label}</span></button>)}</nav>
      </section>
    </main>
  );
}
