type ServerCardProps = {
  name: string;
  id: string;
  description: string;
  active?: boolean;
};

export default function ServerCard({
  name,
  id,
  description,
  active
}: ServerCardProps) {
  return (
    <div className={"server-card" + (active ? " active" : "")}>
      <div className="badge">{active ? "Online" : "Offline"}</div>
      <h3 className="title">{name}</h3>
      <p className="id">({id})</p>
      <p className="description">{description}</p>
    </div>
  );
}
