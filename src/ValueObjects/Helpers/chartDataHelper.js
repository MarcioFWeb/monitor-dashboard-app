import { MONITOR_API_URL } from '../../ValueObjects/Enum/servicesEnum'

export const CHART_URL_CPU = `${MONITOR_API_URL}/chart/cpu`
export const CHART_URL_MEMORY = `${MONITOR_API_URL}/chart/memory`
export const CHART_URL_STATUS = `${MONITOR_API_URL}/chart/status`

export const DEFAULT_COLOR_INFO_CARD = '#49516b'
export const GREEN_COLOR_INFO_CARD = '#43a047'

export const chartDataDecorator = (arrayChartData = []) => {

  let dataChartDecorated = []

  for (let index = 0; index < arrayChartData?.labels?.length; index++) {
    let obj = {
      Time: arrayChartData?.labels[index],
      Usage: arrayChartData?.data[index]
    }
    dataChartDecorated.push(obj)    
  }

  return dataChartDecorated

}