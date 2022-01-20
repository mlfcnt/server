import { Assert } from "../../helpers/Assert";

type PlayerRole = "hunter" | "haunted";

export class Player {
  name: string;
  private static players: Pick<Player, "name" | "role">[] = [];
  role: PlayerRole;

  constructor(name: string, role?: PlayerRole) {
    Assert.isNotNull(name, "Player name");
    this.name = name;
    this.role = this.pickUserRole(role);
    Player.players.push({
      name: this.name,
      role: this.role,
    });
  }

  static getPlayers() {
    return Player.players;
  }

  static resetPlayers() {
    Player.players = [];
  }

  private pickUserRole(role?: PlayerRole) {
    const roles: PlayerRole[] = ["hunter", "haunted"];
    if (!role) {
      const otherPlayer = Player.getPlayers();
      if (otherPlayer.length) {
        return otherPlayer[0].role === "haunted" ? "hunter" : "haunted";
      }
      const randomRole = roles[Math.round(Math.random())];
      return randomRole;
    }
    if (!roles.includes(role)) {
      throw new Error(`Unknown player role : ${role}`);
    }
    return role;
  }
}
