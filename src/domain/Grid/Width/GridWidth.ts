import { Assert } from "../../../helpers/Assert";

export class GridWidth {
  width: number;
  constructor(width: number) {
    Assert.isNotNull(width, "Width");
    Assert.isMin(width, 1, "Width");
    this.width = width;
  }
}
