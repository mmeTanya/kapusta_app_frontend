import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  YAxis,
  Text,
} from 'recharts';
import { CustomTooltip } from './ReportChartMobile';

import styles from './ReportChart.module.css';

const CustomXAxisTick = props => {
  let labelText = props.payload.value;
  if (props.payload.value.length > 10) {
    labelText = props.payload.value.substr(0, 10) + '...';
  }
  return <Text {...props}>{labelText}</Text>;
};

const renderBarLabel = ({ x, y, width, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#52555F"
      textAnchor="middle"
      dy={-8}
      fontSize={12}
    >{`${value} UAH`}</text>
  );
};

export default function ReportChartDesktop({ isDesktop, data }) {
  let chartWidth = isDesktop ? 758 : 634;
  if (data.length > 10) {
    chartWidth = 65 * data.length;
  }

  return (
    <div className={styles.chartView}>
      <BarChart
        width={chartWidth}
        height={415}
        margin={{ right: 0, left: 0, top: 40, bottom: 0 }}
        data={data}
        barCategoryGap={10}
        barSize={40}
        className={styles.chart}
      >
        <CartesianGrid
          x={0}
          vertical={false}
          horizontalPoints={[65, 105, 145, 185, 225, 265, 305, 345, 385]}
        />

        <Tooltip
          cursor={false}
          isAnimationActive={false}
          wrapperStyle={{
            display: 'block',
            width: '150px',
            wordWrap: 'break-word',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
          }}
          content={<CustomTooltip />}
        />
        <XAxis
          hide={false}
          axisLine={false}
          tickLine={false}
          textAnchor="middle"
          dataKey="description"
          type="category"
          tickSize={0}
          minTickGap={-1000}
          tick={
            <CustomXAxisTick
              style={{
                fill: '#52555F',
                fontSize: '12px',
                fontFamily: 'Roboto',
                fontWeight: 400,
                lineHeight: '14px',
              }}
            />
          }
          fontSize={12}
          color={'#52555F'}
        />
        <YAxis hide type="number" scale="linear" />

        <Bar
          isAnimationActive={false}
          dataKey="value"
          radius={[10, 10, 0, 0]}
          className={styles.chartBar}
        >
          {data.map((item, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 3 ? '#FFDAC0' : '#ff751d'}
            />
          ))}
          <LabelList
            dataKey="value"
            content={renderBarLabel}
            fill="#52555F"
            position="insideTop"
          />
        </Bar>
      </BarChart>
    </div>
  );
}
