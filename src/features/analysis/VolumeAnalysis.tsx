import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  LineChart,
} from 'recharts';

const data = [
  {
    name: '1月',
    电量: 590,
    水量: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: '2月',
    电量: 868,
    水量: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: '3月',
    电量: 1397,
    水量: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: '4月',
    电量: 1480,
    水量: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: '5月',
    电量: 1520,
    水量: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: '6月',
    电量: 1400,
    水量: 780,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '7月',
    电量: 1200,
    水量: 380,
    amt: 1600,
    cnt: 380,
  },
  {
    name: '8月',
    电量: 1400,
    水量: 680,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '9月',
    电量: 1800,
    水量: 280,
    amt: 1100,
    cnt: 380,
  },
  {
    name: '10月',
    电量: 1400,
    水量: 580,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '11月',
    电量: 1400,
    水量: 880,
    amt: 1700,
    cnt: 380,
  },
  {
    name: '12月',
    电量: 1600,
    水量: 380,
    amt: 1700,
    cnt: 380,
  },
];

export default function VolumeAnalysis() {
  return (
    <>
      <h1 className="blue f3 ml4">年用量分析（2020）</h1>
      <ComposedChart
      width={1200}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" scale="band" />
      <YAxis />
      <Tooltip />
      <Legend />
      {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
      <Bar dataKey="电量" barSize={20} fill="#413ea0" />
      <Bar dataKey="水量" barSize={20} fill="#ff7300" />
    </ComposedChart> 
    </>
  )
}
