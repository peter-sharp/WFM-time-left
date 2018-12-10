const Duration = {}



Duration.fromObject = function(obj) {
    const state = Object.assign({hours: 0, minutes: 0, seconds: 0}, obj);
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