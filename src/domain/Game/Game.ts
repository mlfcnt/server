import { Assert } from "../../helpers/Assert";
import { Grid } from "../Grid";

export class Game {
  grid: Grid;
  constructor(height: number, width: number) {
    Assert.isNotNull(height, "height");
    Assert.isNotNull(width, "width");
    this.grid = new Grid(width, height);
  }
}
