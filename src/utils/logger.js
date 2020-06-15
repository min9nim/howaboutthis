import createLogger, { consoleTransport, simpleFormat } from 'if-logger'
import moment from 'moment'

moment.locale('ko')

function customTransport(level, message, formatMessage) {
  /*
   * level: 'debug'
   * message: 'some text'
   * formatMessage: '[debug] some text'
   */
  //api.pushLog(level + ' : ' + message)
}

export default createLogger({
  level: process.env.REACT_APP_LOG_LEVEL,
  format: simpleFormat,
  tags: [() => moment().utc().add(9, 'hours').format('MM/DD HH:mm:ss')],
  transports: [consoleTransport, customTransport],
})
