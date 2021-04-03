import req, { initLoading } from './utils/req'
import { prop } from 'ramda'
import logger from './utils/logger'

export const init = async ({ setList, setAniLoading }) => {
  /* 어디서든 import 없이 접근 가능하도록 하려고 전역 변수 설정 #90 */
  window.$logger = logger

  logger.info('REACT_APP_WEBSCRAP_URL', process.env.REACT_APP_WEBSCRAP_URL)
  logger.info('REACT_APP_API_URL', process.env.REACT_APP_API_URL)
  logger.info('REACT_APP_SLACK_CHANNEL', process.env.REACT_APP_SLACK_CHANNEL)

  initLoading(setAniLoading)
  // setAniLoading(true)
  const [setting, list] = await Promise.all([
    req('setting').then(prop('result')),
    req('get-menus').then(prop('result')),
  ])
  // setAniLoading(false)

  window.$SLACK_CHANNEL =
    process.env.REACT_APP_SLACK_CHANNEL || setting.SLACK_CHANNEL

  setList(list)
}
