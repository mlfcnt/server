import { Assert } from "../../../helpers/Assert";

export class GridHeight {
  height: number;
  constructor(height: number) {
    Assert.isNotNull(height, "Height");
    Assert.isMin(height, 1, "Height");
    this.height = height;
  }
}
