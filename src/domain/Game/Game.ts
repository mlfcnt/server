import { Assert } from "../../helpers/Assert";
import { MaxInstancesError } from "../Errors/MaxInstancesError";
import { Grid } from "../Grid";
import { Player } from "../Player/Player";

export class Game {
  static MAX_PLAYERS_PER_GAME = 2;
  grid: Grid;
  static games: Game[] = [];
  static playersAcrossAllGames: Player[] = [];
  id: number;
  creator: Player;
  players: Player[] = [];

  constructor(height: number, width: number, creator: Player) {
    Assert.canCreateAnotherInstance("Game", 5, Game.getGames().length);
    Assert.isNotNull(height, "height");
    Assert.isNotNull(width, "width");
    Assert.isNotNull(creator, "Creator");
    this.id = this.generateGameId();
    this.grid = new Grid(width, height);
    Game.games.push(this);
    this.creator = creator;
    this.addPlayerToGame(creator);
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

  addPlayerToGame(player: Player) {
    Assert.canCreateAnotherInstance(
      "Players for this game",
      Game.MAX_PLAYERS_PER_GAME,
      this.players.length
    );
    this.players.push(player);
    Game.playersAcrossAllGames.push(player);
  }

  resetPlayers() {
    this.players = [];
  }
}
