import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { useState, useEffect } from 'react'
import { Select, Spin, Row, Col } from "antd"
import { Link } from "react-router-dom"
import moment from "moment"
import axios from "axios"

const token = localStorage.getItem("loginToken")

const { Option } = Select

const ElectricCostChart = ({ electricCost, isLaoding }: any) => {
  const [matchDay, setMatchDay] = useState("昨天")
  const [totalKwh, setTotalKwh] = useState(103.54)
  const [yesterdayData, setYesterdayData] = useState()

  const handleChange = (value: string) => {
    setMatchDay(value)
  }

  useEffect(() => {
    const date = moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss[Z]')
    const fetchYesterDayData = async () => {
      const response: any = await axios.post('http://8.130.177.91:8080/history/search',
        {deviceId: 2, time: date})
      const records = response.data.data.collectors[0].records
      setYesterdayData(records)
    }
  })

  const handleTimeChange = (data: any) => {
    if (data) {
      const time = data.split("T")[1]
      const hourAndMin = time ? time.split(":").slice(0, 2) : null
      return hourAndMin ? hourAndMin.join(":") : null
    }
  }

  const CustomTooltip = ({ payload, label, active }: any) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label ma0">{`${handleTimeChange(label)} `}</p>
          <p className="label ma0">{`电量：${payload[0].value} kWh`}</p>
        </div>
      );
    }
  
    return null;
  }

  if (isLaoding || !electricCost) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  return (
    <>
      <div >
        <Row className="pa3" align="middle">
          <Col md={3} xs={24}>
            <h1 className="f4 blue">用电量对比</h1>
          </Col>
          <Col md={10}>
            <span>(截止12点)</span>
            <span>{`${totalKwh} kWh`}</span>
            <Select defaultValue="昨天" style={{ width: 80 }} onChange={handleChange}>
              <Option value="昨天">昨天</Option>
            </Select>
            <span>{`对比 98.26 kWh`}</span>
            <span className="red">{`+5.4%`}</span>
          </Col>
        </Row>
        {/* <div>
          <Link to="/volume-analysis" className="mr4">分析</Link>
          <Link to="" className="mr4">诊断</Link>
          <Link to="" className="mr4">预警</Link>
          <Link to="" className="mr4">控制</Link>
        </div> */}
      </div>
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={electricCost}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time"
            tickFormatter={(date) => handleTimeChange(date)}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          {/* <Line
            type="monotone"
            dataKey="昨日"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          /> */}
          <Line name="今天" type="monotone" dataKey="quantity" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        </div>
    </>
  )
}

export default ElectricCostChart