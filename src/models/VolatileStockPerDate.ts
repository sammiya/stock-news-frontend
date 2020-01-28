import VolatileStock from "./VolatileStock";

export type VolatileStockPerDate = {
  date: string;
  volatileStocks: { rising: VolatileStock; falling: VolatileStock }[];
};
export default VolatileStockPerDate;
