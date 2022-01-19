import { GridHeight } from "./Grid/Height/GridHeight";
import { GridWidth } from "./Grid/Width/GridWidth";

export class Grid {
  width: number;
  height: number;
  constructor(gridWidth: number, gridHeight: number) {
    this.width = new GridWidth(gridWidth).width;
    this.height = new GridHeight(gridHeight).height;
  }
}
