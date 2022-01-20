import { MaxInstancesError } from "../Errors/MaxInstancesError";
import { MissingFieldError } from "../Errors/MissingFieldError";
import { Player } from "../Player/Player";
import { Game } from "./Game";

describe("Game", () => {
  const genericPlayer = new Player("Tommy");

  beforeEach(() => {
    Game.resetGames();
    Game.resetPlayersAcrossAllGames();
  });

  it("should have an id", () => {
    expect(new Game(3, 3, genericPlayer).id).toBe(1);
    expect(new Game(3, 3, genericPlayer).id).toBe(2);
    expect(new Game(3, 3, genericPlayer).id).toBe(3);
  });

  it("should have a grid", () => {
    expect(new Game(3, 3, genericPlayer).grid).toEqual({
      width: 3,
      height: 3,
    });
  });

  describe("players", () => {
    it("should have one player at creation", () => {
      expect(() => new Game(5, 5, null as unknown as any)).toThrow(
        new MissingFieldError("Creator")
      );
      const game = new Game(5, 5, genericPlayer);
      expect(game.creator).toBe(genericPlayer);
      expect(game.players).toStrictEqual([genericPlayer]);
    });

    test("another player can join", () => {
      const game = new Game(5, 5, genericPlayer);
      expect(game.players).toStrictEqual([genericPlayer]);
      const newPlayer = new Player("Ella");
      game.addPlayerToGame(newPlayer);
      expect(game.players).toStrictEqual([genericPlayer, newPlayer]);
      expect(Game.getPlayersAcrossAllGames().length).toBe(2);
    });

    test("It can have only 2 players max", () => {
      const game = new Game(5, 5, genericPlayer);
      const newPlayer = new Player("Ella");
      game.addPlayerToGame(newPlayer);
      expect(() => game.addPlayerToGame(new Player("Nina"))).toThrow(
        new MaxInstancesError(
          "Players for this game",
          Game.MAX_PLAYERS_PER_GAME
        )
      );
    });

    it("Can be resetted", () => {
      const game = new Game(5, 5, genericPlayer);
      expect(game.players.length).toBe(1);
      game.resetPlayers();
      expect(game.players.length).toBe(0);
    });
  });

  describe("instances", () => {
    it("Can have 5 instances max at the same time", () => {
      expect(() => new Game(5, 5, genericPlayer)).not.toThrowError();
      expect(() => new Game(5, 5, genericPlayer)).not.toThrowError();
      expect(() => new Game(5, 5, genericPlayer)).not.toThrowError();
      expect(() => new Game(5, 5, genericPlayer)).not.toThrowError();
      expect(() => new Game(5, 5, genericPlayer)).not.toThrowError();
      expect(() => new Game(5, 5, genericPlayer)).toThrow(
        new MaxInstancesError("Game", 5)
      );
    });
    it("Can be resetted", () => {
      new Game(5, 5, genericPlayer);
      new Game(5, 5, genericPlayer);
      new Game(5, 5, genericPlayer);
      new Game(5, 5, genericPlayer);
      new Game(5, 5, genericPlayer);
      expect(Game.getGames().length).toBe(5);
      Game.resetGames();
      expect(Game.getGames().length).toBe(0);
    });
  });
});
