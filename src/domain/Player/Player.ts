import { Assert } from "../../helpers/Assert";
export type PlayerRole = "hunter" | "haunted";
export class Player {
  name: string;
  role?: PlayerRole;
  constructor(name: string) {
    Assert.isNotNull(name, "Player name");
    this.name = name;
  }
  changeRoleTo(role: PlayerRole) {
    this.role = role;
  }
}
