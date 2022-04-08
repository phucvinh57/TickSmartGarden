const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const TimeUnit = Object.freeze({
    SECOND: 0,
    MINUTE: 1,
    HOUR: 2,
    DAY: 3,
    MONTH: 4,
    YEAR: 5
})

class Scheduler {
    constructor({ name, startTime, count, cycle, cycleUnit, duration }) {
        this.name = name
        this.startTime = startTime
        this.cycle = cycle
        this.cycleUnit = cycleUnit
        this.count = count
        this.duration = duration // MINUTE

        
    }
}

const sched = new Scheduler({
    name: 'Tuới vườn hàng ngày',
    startTime: new Date(),
    count: 5,
    cycle: 2,
    cycleUnit: TimeUnit.SECOND,
    duration: 3 // operatingTime
})

sched.start()