import { Assert } from "../../helpers/Assert";
import { Grid } from "../Grid";
import { Player, PlayerRole } from "../Player/Player";
export class Game {
  static MAX_PLAYERS_PER_GAME = 2;
  grid: Grid;
  static games: Game[] = [];
  static playersAcrossAllGames: Player[] = [];
  id: number;
  creator: Player;
  players: Player[] = [];
  status = "created";

  constructor(height: number, width: number, creator: Player) {
    Assert.canCreateAnotherInstance("Game", 5, Game.getGames().length);
    Assert.isNotNull(height, "height");
    Assert.isNotNull(width, "width");
    Assert.isNotNull(creator, "Creator");
    this.id = this.generateGameId();
    this.grid = new Grid(width, height);
    Game.games.push(this);
    this.creator = creator;
    this.addPlayer(creator);
  }

  static getGames() {
    return Game.games;
  }

  static resetGames() {
    Game.games = [];
  }

  static getPlayersAcrossAllGames() {
    return Game.playersAcrossAllGames;
  }

  static resetPlayersAcrossAllGames() {
    Game.playersAcrossAllGames = [];
  }

  private generateGameId() {
    return Game.games.length + 1;
  }

  public addPlayer(player: Player) {
    Assert.canCreateAnotherInstance(
      "Players for this game",
      Game.MAX_PLAYERS_PER_GAME,
      this.players.length
    );
    this.players.push(player);
    Game.playersAcrossAllGames.push(player);
    this.startGame();
  }

  resetPlayers() {
    this.players = [];
  }

  static findGameInstanceById(id: Game["id"]) {
    const games = Game.getGames();
    const game = games.find((x) => x.id === id);
    if (game) return game;
    throw new Error(`Cannot find a game with id ${id}`);
  }

  private startGame() {
    if (this.players.length > 1) {
      this.assignPlayerRoles();
      this.status = "full";
    }
  }

  private assignPlayerRoles() {
    const roles: PlayerRole[] = ["hunter", "haunted"];
    const randomRole = roles[Math.round(Math.random())];
    if (randomRole === "hunter") {
      this.players[0].role = "hunter";
      this.players[1].role = "haunted";
    } else {
      this.players[0].role = "haunted";
      this.players[1].role = "hunter";
    }
  }
}
