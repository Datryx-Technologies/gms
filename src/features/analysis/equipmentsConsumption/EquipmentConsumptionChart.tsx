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
import { Row, Spin } from "antd"
import { useAppSelector } from "../../../hook"
import { selectEquipmentById } from "../../equipments/equipmentsSlice"

export default function EquipmentConsumptionChart({ id }: any) {
  const equipment = useAppSelector(state => selectEquipmentById(state, id))
  const status = useAppSelector(state => state.equipments.status)
  const equipmentElectric = equipment?.collectors[0].records.map(record => ({
    time: handleTimeChange(record.time),
    quantity: record.quantity
  }))
  const equipmentName = equipment?.name

  function handleTimeChange(data: any) {
    if (data) {
      const time = data.split("T")[1]
      const hourAndMin = time ? time.split(":").slice(0, 2) : null
      return hourAndMin ? hourAndMin.join(":") : null
    }
  }

  if (status === 'loading') {
    return (
      <Row 
        className="flex justify-center items-center" 
        style={{width: '830px', height: '350px'}}>  
        <Spin />
      </Row>)
  }

  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
      <LineChart
        data={equipmentElectric}
        margin={{
          top: 5,
          right: 5,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dot={false} name={`${equipmentName}实时电量`} type="monotone" dataKey="quantity" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
