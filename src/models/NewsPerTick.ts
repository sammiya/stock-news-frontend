import News from "./News";

export type NewsPerTick = {
  date: string;
  newsList: News[];
  change?: number;
};

export default NewsPerTick;
