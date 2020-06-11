import req from './utils/req'
import { prop } from 'ramda'

export const init = async ({ setList, setAniLoading }) => {
  setAniLoading(true)
  const [setting, list] = await Promise.all([
    req('setting').then(prop('result')),
    req('get-menus').then(prop('result')),
  ])
  setAniLoading(false)

  window.$SLACK_CHANNEL = process.env.REACT_APP_SLACK_CHANNEL || setting.SLACK_CHANNEL
  setList(list)
}
