import StockPrice from "./StockPrice";
import News from "./News";

export type DailyStockProps = {
  date: string;
  change?: number;
  volume: number;
  newsList?: News[];
} & StockPrice;

export default DailyStockProps;
