import mlMount from '../../utils/ml-mount-body'
import popup from './popup.vue'

const $popup = (options = {}) => {
  mlMount({ component: popup, options: Object.assign(options, { automatic: true }) })
}
$popup.alert = (options = {}) => {
  mlMount({ component: popup, options: Object.assign(options, { automatic: true }) })
}
$popup.confirm = (options = {}) => {
  mlMount({ component: popup, options: Object.assign(options, { type: 'confirm', automatic: true }) })
}
export default $popup
