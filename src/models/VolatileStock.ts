import Stock from "./Stock";
import News from "./News";

export type VolatileStock = Stock & {
  change: number;
  newsList?: News[];
};
export default VolatileStock;
