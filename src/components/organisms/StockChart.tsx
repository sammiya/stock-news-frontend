import React from "react";
import {
  Bar,
  BarChart,
  Brush,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import DailyStockProps from "../../models/DailyStockProps";

import isMobile from "../../utils/isMobile";

type StockChartProps = {
  data: DailyStockProps[];
  onClick: (date: string) => void;
  onEndIndexChange: (endIndex: number) => void;
};

type StockChartState = {
  brushStartIndex: number;
  brushEndIndex: number;
};

const chartMargin = isMobile
  ? { top: 5, right: 20, left: 0 }
  : { top: 10, right: 80, left: 25 };

class StockChart extends React.Component<StockChartProps, StockChartState> {
  constructor(props: StockChartProps) {
    super(props);
    this.state = {
      brushStartIndex: Math.max(
        props.data.length - 50 /*グラフに表示する初期日付（の最大）数*/,
        0
      ),
      brushEndIndex: props.data.length - 1
    };
  }

  componentDidUpdate(_prevProps: {}, prevState: StockChartState) {
    if (this.state.brushEndIndex !== prevState.brushEndIndex) {
      this.props.onEndIndexChange(this.state.brushEndIndex);
    }
  }

  render() {
    return (
      <div className="StockChart">
        <ResponsiveContainer minWidth={300} aspect={isMobile ? 2 : 2.4}>
          <ComposedChart
            onClick={selection => {
              if (selection && selection.activeLabel) {
                this.props.onClick(selection.activeLabel);
              }
            }}
            data={this.props.data.map(dailyStockProps => {
              let foo = dailyStockProps as any; /* TODO: 型つけ */
              const higherPrice = Math.max(
                dailyStockProps.opening,
                dailyStockProps.closing
              );

              // dailyStockProps.opening = higherPrice のときはグラフに表示されない
              foo.bullish = [dailyStockProps.opening, higherPrice];
              // dailyStockProps.closing = higherPrice のときはグラフに表示されない
              foo.bearish = [dailyStockProps.closing, higherPrice];

              const isBullish =
                dailyStockProps.opening < dailyStockProps.closing;

              foo.bullishWick = [
                dailyStockProps.low,
                isBullish ? dailyStockProps.high : dailyStockProps.low
              ];
              foo.bearishWick = [
                dailyStockProps.low,
                isBullish ? dailyStockProps.low : dailyStockProps.high
              ];
              return foo;
            })}
            margin={chartMargin}
            syncId="stockChart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="bullishWick"
              xAxisId="bullishWick"
              barSize={0.1}
              fillOpacity={1}
              fill="red"
              stroke="red"
            />
            <Bar
              dataKey="bearishWick"
              xAxisId="bearishWick"
              barSize={0.1}
              fillOpacity={1}
              fill="blue"
              stroke="blue"
            />
            <Bar
              dataKey="bullish"
              xAxisId="bullish"
              fillOpacity={1}
              fill="red"
              stroke="red"
            />
            <Bar
              dataKey="bearish"
              xAxisId="bearish"
              fillOpacity={1}
              fill="blue"
              stroke="blue"
            />
            <Line dataKey="avg13Weeks" xAxisId="bullish" dot={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} xAxisId="bullish" />
            <XAxis dataKey="date" xAxisId="bearish" hide />
            <XAxis dataKey="date" xAxisId="bullishWick" hide />
            <XAxis dataKey="date" xAxisId="bearishWick" hide />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
            // @ts-ignore
            <Brush
              dataKey="date"
              startIndex={this.state.brushStartIndex}
              endIndex={this.state.brushEndIndex}
              y={Number.MIN_SAFE_INTEGER} // dirty hack: ブラシを見えない位置に配置（こうしないと上下グラフの初期位置が連動しない）
            />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer minWidth={300} aspect={isMobile ? 3 : 5}>
          <BarChart
            data={this.props.data}
            margin={chartMargin}
            syncId="stockChart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" type="category" tick={{ fontSize: 12 }} />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar name="出来高" dataKey="volume" fill="#8884d8" />
            {/* recharts の Brush の型定義には gap がない */}
            // @ts-ignore
            <Brush
              dataKey="date"
              height={20}
              stroke="#8884d8"
              startIndex={this.state.brushStartIndex}
              gap={10}
              onChange={(v: { startIndex: number; endIndex: number }) => {
                this.setState({
                  brushStartIndex: v.startIndex,
                  brushEndIndex: v.endIndex
                });
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default StockChart;
