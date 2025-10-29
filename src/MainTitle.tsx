function MainTitle() {
  return (
    <main className="hero">
      <h1 className="hero__title">
        <span className="accent">Green Bites</span> 
      </h1>
      <p className="hero__subtitle">Track meals, macros, and micronutrients with clarity.</p>
      <div className="hero__actions">
        <button className="btn btn--primary" aria-label="Sign Up">Sign Up</button>
        <button className="btn btn--ghost" aria-label="Log In">Log In</button>
      </div>
    </main>
  )
}

export default MainTitle