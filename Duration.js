const Duration = {}



Duration.fromObject = function(obj) {
    let duration = toMilliseconds(Object.assign({hours: 0, minutes: 0, seconds: 0}, obj));

    function toMilliseconds(obj) {
        const MILLISECONDS_PER_SECOND = 1000
        const SECONDS_PER_MINUTE = 60
        const MINUTES_PER_HOUR = 60

        let milliseconds = 0

        milliseconds += obj.seconds * MILLISECONDS_PER_SECOND
        milliseconds += obj.minutes * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
        milliseconds += obj.hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND

        return milliseconds
    }

    return {
        get minutes() {return state.minutes },
        as(unit) { return 0},
        minus(duration) {
            return Duration.fromObject(state)
        }
    }
}

Duration.fromAspTime = function(str) {
    const [hours, minutes, seconds] = str.split(':')
    return Duration.fromObject({hours, minutes, seconds})
}

export default Duration