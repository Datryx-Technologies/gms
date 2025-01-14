import { Row, Col, List, Button } from 'antd'
import EquipmentConsumptionChart from './EquipmentConsumptionChart'
import EquipmentCurrentChart from './EquipmentCurrentChart'
import EquipmentVoltageChart from './EquipmentVoltageChart'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../../../hook'
import { selectEquipments } from '../../equipments/equipmentsSlice'
import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg'
import './EquipmentsConsumption.css'

export default function EquipmentsConsumption() {
  const ids = useAppSelector(state => state.equipments.ids)
  const allEquipments = useAppSelector(selectEquipments)
  const [id, setId] = useState(ids[1])
  const allEquipmentsWithRecords = allEquipments.filter(
    equipment => equipment.collectors[0].records.length> 0 && 
    equipment.deviceId !== 0
  )
  const data = allEquipmentsWithRecords.map(equipment => {
    const length = equipment.collectors[0].records.length
    return {
      key: equipment.deviceId,
      id: equipment.deviceId, 
      name: equipment.name,
      currentAmount: equipment.collectors[0].records[length-1].currentAmount
    }
  })
  data.sort((a, b) => (a.currentAmount > b.currentAmount) ? -1 : 1)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setId(ids[1])
  }, [ids])

  const handleClick = (id: number, index: number) => {
    setId(id)
    setCurrentIndex(index)
  }

  const ListHeader = (
    <div className='flex justify-between'>
      <div className='fw5'>
        <Arrow />
        设备用能排名
      </div>
      <div className='mr3 pl3 pr3 ba b--black-20 br2'>电能</div>
    </div>
  )
  
  return (
    <div className='bg-white pa3 ma3'>
      <h1 className='blue f3'>单个设备用电查看</h1>
      <Row>
        <Col lg={6}>
        <List
          header={ListHeader}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any, index) => {
            const id = item.id
            return (
              <List.Item 
                key={id} 
                onClick={() => handleClick(id, index)}
                className={index===currentIndex ? "list active" : 'list inactive'}
              >
                <div><span className={`sequence sequence${index+1}`}>{index+1}</span>{item.name}</div>
                <div>{item.currentAmount?.toFixed(2)}kWh</div>
              </List.Item>
            )}
          }
        />
        </Col>
        <Col lg={18} xs={24}>
        <Row>
          <Col span={24} xs={24}>
            <EquipmentConsumptionChart id={id}/>
          </Col>
          <Col span={12} xs={24}>
            <EquipmentCurrentChart id={id}/>
          </Col>
          <Col span={12} xs={24}>
            <EquipmentVoltageChart id={id}/>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  )
}
