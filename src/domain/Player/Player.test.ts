import { MissingFieldError } from "../Errors/MissingFieldError";
import { Player } from "./Player";

describe("Player", () => {
  beforeEach(() => {
    Player.resetPlayers();
  });

  describe("creation", () => {
    test("Max players should be two", () => {
      expect(() => new Player("Tommy", "hunter")).not.toThrowError();
      expect(() => new Player("Laurence", "haunted")).not.toThrowError();
      expect(() => new Player("Ella", "hunter")).toThrowError(
        "Maximum current player reached (2)"
      );
    });
  });

  describe("name", () => {
    it("should have a name", () => {
      expect(new Player("Tommy", "hunter").name).toBe("Tommy");
    });
    it("should throw an error if empty", () => {
      expect(() => new Player(null as unknown as any, "haunted").name).toThrow(
        new MissingFieldError("Player name")
      );
    });
  });
  describe("role", () => {
    it("can be passed", () => {
      expect(new Player("Tommy", "hunter").role).toBe("hunter");
    });

    it("can be skipped, in this case a random role will be generated", () => {
      const role = new Player("Tommy").role;
      expect(role === "haunted" || role === "hunter").toBeTruthy();
    });

    it("if a player already has a role, the second player will have the other role", () => {
      new Player("Tommy", "hunter");
      expect(new Player("Ella").role).toBe("haunted");
      Player.resetPlayers();
      new Player("Tommy", "haunted");
      expect(new Player("Ella").role).toBe("hunter");
    });

    it("should throw an error if role is not hunter or haunted", () => {
      expect(() => new Player("Tommy", "goalkeeper" as any).role).toThrow(
        new Error("Unknown player role : goalkeeper")
      );
    });
  });

  describe("getPlayers", () => {
    it("should return the current players", () => {
      new Player("Tommy", "hunter");
      new Player("Laurence", "haunted");
      expect(Player.getPlayers()).toStrictEqual([
        { name: "Tommy", role: "hunter" },
        { name: "Laurence", role: "haunted" },
      ]);
    });
  });
  describe("resetPlayers", () => {
    it("should reset the current players", () => {
      new Player("Tommy", "hunter");
      new Player("Laurence", "haunted");
      expect(Player.getPlayers()).toStrictEqual([
        { name: "Tommy", role: "hunter" },
        { name: "Laurence", role: "haunted" },
      ]);
      Player.resetPlayers();
      expect(Player.getPlayers()).toStrictEqual([]);
    });
  });
});
