interface MariposaCenterpieceProps {
  dead?: boolean;
}

export function MariposaCenterpiece({ dead }: MariposaCenterpieceProps = {}) {
  return (
    <div
      className="mariposa-center"
      style={dead ? { opacity: 0.1, filter: 'none', transition: 'all 0.3s' } : {}}
    >
      <span className="mariposa-wing butterfly">🦋</span>
      <div className="nectar-drips">
        <div className="nectar-drip" />
        <div className="nectar-drip" />
        <div className="nectar-drip" />
      </div>
      <div className="nectar-pool" />
    </div>
  );
}