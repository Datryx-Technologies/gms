import { Progress } from 'antd'
import { useState } from 'react'
import { useAppSelector } from '../../../hook'
import { selectEquipments } from '../../equipments/equipmentsSlice'

export default function DataEquipmentInfo() {
  const equipments = useAppSelector(selectEquipments)
  const totalCollectors = equipments.length 
  const onlineCollectors = equipments.map(equipment => equipment.collectors[0]?.status === 1).length

  const totalElectrics = totalCollectors
  const onlineElectrics = onlineCollectors

  const [totalWater, setTotalWater] = useState(15)
  const [onlineWater, setOnlineWater] = useState(6)
  const [totalGas, setTotalGas] = useState(15)
  const [onlineGas, setOnlineGas] = useState(6)

  return (
    <>
      <h1 className="f4 blue  pt3 mt2">在线情况统计</h1>
      <div className="mb3">
        <h4>采集器</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineCollectors/totalCollectors*100} 
          format={percent => `${onlineCollectors}/${totalCollectors}`}
        />
      </div>
      <div className="mb3">
        <h4>电表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineElectrics/totalElectrics*100} 
          format={percent => `${onlineElectrics}/${totalElectrics}`}
        />
      </div>
      <div className="mb3">
        <h4>水表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineWater/totalWater*100} 
          format={percent => `${onlineWater}/${totalWater}`}
        />
      </div>
      <div>
        <h4>气表</h4>
        <span style={{color: "#444"}}>上线数/总数</span>
        <Progress 
          percent={onlineGas/totalGas*100} 
          format={percent => `${onlineGas}/${totalGas}`}
        />
      </div>
    </>
  )
}
