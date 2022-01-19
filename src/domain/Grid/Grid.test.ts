import { MinError } from "../Errors/MinError";
import { MissingFieldError } from "../Errors/MissingFieldError";
import { Grid } from "../Grid";

describe("Grid", () => {
  describe("Width", () => {
    it("Should have a width", () => {
      expect(new Grid(3, 1).width).toBe(3);
      expect(new Grid(5, 1).width).toBe(5);
      expect(new Grid(3000, 1000).width).toBe(3000);
    });
    describe("Errors", () => {
      it("Should throw if undefined width", () => {
        expect(() => new Grid(undefined as unknown as number, 2).width).toThrow(
          new MissingFieldError("Width")
        );
      });
      it("Should throw if null width", () => {
        expect(() => new Grid(null as unknown as number, 2).width).toThrow(
          new MissingFieldError("Width")
        );
      });
      it("Should throw if width is inferior to 1", () => {
        expect(() => new Grid(0, 1).width).toThrow(new MinError("Width", 1));
      });
    });
  });
  describe("Height", () => {
    it("Should have a height", () => {
      expect(new Grid(3, 5).height).toBe(5);
      expect(new Grid(5, 3).height).toBe(3);
      expect(new Grid(3000, 1000).height).toBe(1000);
    });
    describe("Errors", () => {
      it("Should throw if undefined height", () => {
        expect(
          () => new Grid(1, undefined as unknown as number).height
        ).toThrow(new MissingFieldError("Height"));
      });
      it("Should throw if null width", () => {
        expect(() => new Grid(1, null as unknown as number).height).toThrow(
          new MissingFieldError("Height")
        );
      });
      it("Should throw if width is inferior to 1", () => {
        expect(() => new Grid(1, 0).height).toThrow(new MinError("Height", 1));
      });
    });
  });
  describe("New Grid()", () => {
    it("Should return height and width", () => {
      const grid = new Grid(3, 5);
      expect(grid).toEqual({ height: 5, width: 3 });
    });
  });
});
