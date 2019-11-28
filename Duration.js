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
        if(0 > milliseconds) {
            hours = 1 + hours;
        }
        return hours;
    }

    function getRemainingMinutes(milliseconds) {
        let hours = millisecondsTohours(milliseconds)
        let hourPercent = Math.abs(hours) - Math.abs(Math.floor(hours))
        if(0 > milliseconds) {
            hourPercent = 1 - hourPercent;
        }
        let minutes =  hourPercent * MINUTES_PER_HOUR


        return Math.floor(minutes) 
    }

    function zeroPad(length = 2, number) {
        return String(number).padStart(length, '0')
    }
    
    return {
        get minutes() {
            return getRemainingMinutes(milliseconds) 
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
        plus(duration) {
            return Duration.fromMilliseconds(milliseconds + duration.milliseconds)
        },
        minus(duration) {
            return Duration.fromMilliseconds(milliseconds - duration.milliseconds)
        },
        get milliseconds() {return milliseconds },
        toFormat(format) {
            if('h:mm' == format) {
                return `${milliseconds < 0 ? '-' : ''} ${Math.floor(millisecondsTohours(milliseconds))}:${zeroPad(2, getRemainingMinutes(milliseconds))}`
            }
        }
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