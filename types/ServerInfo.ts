export default interface ServerInfo {
  name: string;
  id: string;
  description: string;
  playerCount: number;
  maxPlayerCount: number;
  active: boolean;
  startTime: number; // UNIX timestamp
}
