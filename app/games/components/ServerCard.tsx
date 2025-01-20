type ServerCardProps = {
  name: string;
  id: string;
};

export default function ServerCard({ name, id }: ServerCardProps) {
  return (
    <div className="server-card">
      <h3>{name}</h3>
      <p>{id}</p>
    </div>
  );
}
