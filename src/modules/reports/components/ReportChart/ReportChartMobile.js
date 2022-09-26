import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  LabelList,
  YAxis,
  Tooltip,
} from 'recharts';

import styles from './ReportChart.module.css';

export const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <p
        className={styles.customTooltipLabel}
      >{`${label} : ${payload[0].value}`}</p>
    );
  }
  return null;
};

const ReportChartMobile = ({ data }) => {
  const renderBarLabel = ({ x, y, width, value }) => {
    const labelText = value ? `${value} UAH` : '';
    return width > 100 ? (
      <text x={width} y={y} textAnchor="end" fontSize={10} dx={0} dy={-10}>
        {labelText}
      </text>
    ) : (
      <text x={100} y={y} textAnchor="end" fontSize={10} dx={0} dy={-10}>
        {labelText}
      </text>
    );
  };

  const renderCategoryLabel = ({ x, y, width, value }) => {
    let labelText = value;
    if (value.length > 8) {
      labelText = value.substr(0, 8) + '...';
    }
    return (
      <text x={x} y={y} dx={0} dy={-10} fontSize={10}>
        {labelText}
      </text>
    );
  };

  return (
    <div className={styles.chartMobileWrapper}>
      <BarChart
        width={270}
        height={50 * data.length}
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
      >
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
        <XAxis hide axisLine={true} type="number" scale="linear" />
        <YAxis dataKey="description" type="category" hide />

        <Bar
          isAnimationActive={false}
          dataKey="value"
          barSize={15}
          radius={[0, 10, 10, 0]}
          label={renderBarLabel}
          fill="#52555f"
          minPointSize={10}
        >
          {data.map((item, idx) => (
            <Cell key={`cell-${idx}`} fill={idx % 3 ? '#FFDAC0' : '#ff751d'} />
          ))}
          <LabelList
            dataKey="description"
            content={renderCategoryLabel}
            fill="#52555F"
          />
        </Bar>
      </BarChart>
    </div>
  );
};

export default ReportChartMobile;
