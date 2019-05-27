import dayjs from './web_modules/dayjs.js'
export default function addDuration(duration, time = dayjs()) {
    return time.add(duration.milliseconds, 'millisecond')
}