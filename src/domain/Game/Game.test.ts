import { Game } from "./Game";

describe("Game", () => {
  it("should have a grid", () => {
    expect(new Game(3, 3).grid).toEqual({
      width: 3,
      height: 3,
    });
  });
});
