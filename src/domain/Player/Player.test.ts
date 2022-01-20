import { MissingFieldError } from "../Errors/MissingFieldError";
import { Player } from "./Player";

describe("Player", () => {
  describe("name", () => {
    it("should have a name", () => {
      expect(new Player("Tommy").name).toBe("Tommy");
    });
    it("should throw an error if empty", () => {
      expect(() => new Player(null as unknown as any).name).toThrow(
        new MissingFieldError("Player name")
      );
    });
  });
  describe("role", () => {
    it("should be undefined", () => {
      expect(new Player("Tommy").role).toBeUndefined();
    });
  });
});
