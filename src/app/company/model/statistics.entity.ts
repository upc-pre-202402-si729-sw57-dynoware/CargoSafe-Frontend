import {Data} from "@angular/router";

/**
 * Statistics entity
 * @class
 * This class is used to represent the statistics entity
 * @method {constructor} - The constructor of the statistics entity
 */

export class StatisticsEntity {
  data: Data;

  constructor(data: Data) {
    this.data = data;
  }
}
