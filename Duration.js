const Duration = {}

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60

Duration.fromObject = function(obj) {
    obj = Object.assign({hours: 0, minutes: 0, seconds: 0}, obj)
    let milliseconds = 0

    milliseconds += obj.seconds * MILLISECONDS_PER_SECOND
    milliseconds += obj.minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
    milliseconds += obj.hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND

    return Duration.fromMilliseconds(milliseconds)
}


Duration.fromMilliseconds = function(milliseconds) {



    function millisecondsTohours(milliseconds) {
        let hours = milliseconds / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE / MINUTES_PER_HOUR
        return hours
    }
    debugger
    return {
        get minutes() {
            let hours = millisecondsTohours(milliseconds)
            let minutes = (hours - Math.floor(hours)) * MINUTES_PER_HOUR

            return Math.floor(minutes) 
        },
        as(unit) { 
            let value
            switch(unit) {
                case 'hours':
                    value = millisecondsTohours(milliseconds);
                    break
                default:
                    value = null
                    break
            }
            return value
        },
        minus(duration) {
            return Duration.fromMilliseconds(milliseconds - duration.milliseconds)
        },
        get milliseconds() {return milliseconds }
    }
}

Duration.fromAspTime = function(str) {
    let [hours, minutes, seconds] = str.split(':').map(x => parseInt(x, 10))

    hours = hours || 0
    minutes = minutes || 0
    seconds = seconds || 0

    return Duration.fromObject({hours, minutes, seconds})
}

export default Duration