import "./status-badge.scss";

const StatusBadge = ({ status }: { status: boolean }) => {
  const text = status ? "In Stock" : "Sold Out";
  return (
    <div className={`status-badge ${status ? "in-stock" : "sold-out"}`}>
      {text}
    </div>
  );
};

export default StatusBadge;
