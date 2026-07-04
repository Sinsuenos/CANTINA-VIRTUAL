export function SmokeParticles() {
  return (
    <div className="smoke-container">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="smoke-particle"
          style={{
            left: `${15 + i * 14}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}