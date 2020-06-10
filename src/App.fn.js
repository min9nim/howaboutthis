import req from './utils/req'
import { prop } from 'ramda'

export const init = async ({ setList }) => {
  const [setting, list] = await Promise.all([
    req('setting').then(prop('result')),
    req('get-menus').then(prop('result')),
  ])
  window.$SLACK_CHANNEL = setting.SLACK_CHANNEL
  setList(list)
}
