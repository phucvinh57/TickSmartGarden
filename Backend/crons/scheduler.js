const schedule = require('node-schedule');
const actuatorRepo = require('../repository/actuator')
const scheduleRepo = require('../repository/schedule')
const dbQuery = require('../repository/db')

const FINISH_COUNT = 0

class Scheduler{
    constructor(){
        this.job = []
    }

    fireCron(cron_expr, scheduleInfo){
        const key = [scheduleInfo.name, scheduleInfo.actuator_ID].join('/')

        const job = schedule.scheduleJob(cron_expr, () => {
            if (! actuatorRepo.isPolicyHold(scheduleInfo.actuator_ID)) {
                actuatorRepo.turnOn(scheduleInfo.actuator_ID, scheduleInfo.operatingTime)
                console.log(`Schedule ${key} is triggered at ${new Date()}`)
                scheduleRepo.updateCount(scheduleInfo.actuator_ID, scheduleInfo.name, scheduleInfo.count - 1)
                if(scheduleInfo.count - 1 == FINISH_COUNT) {this.cancel(key)}
                
                if (scheduleInfo.count > FINISH_COUNT) {scheduleInfo.count -= 1}
                var LOG_ACTION = `Bật bởi lịch ${scheduleInfo.name}`
                dbQuery(`INSERT INTO log(hardwareID, timestamp, activity) VALUES (?, NOW(), ?)`, [scheduleInfo.actuator_ID, LOG_ACTION])
            }
            else {
                var LOG_ACTION = `Tới lịch bơm nhưng không bơm vì có một chính sách đang kích hoạt`
                dbQuery(`INSERT INTO log(hardwareID, timestamp, activity) VALUES (?, NOW(), ?)`, [scheduleInfo.actuator_ID, LOG_ACTION])
                console.log('Policy is hold. Cannot schedule')
            }
        })

        this.job[key] = job
    }

    schedule(scheduleInfo){

        if(scheduleInfo.count === 0){
            console.log(`Schedule ${scheduleInfo.name}/${scheduleInfo.actuator_ID} has finished`)
            return
        }

        const step = scheduleInfo.cycle

        var cron_expr = null
        const unit = scheduleInfo.unit
        const minute = scheduleInfo.startTime.getMinutes()
        const hour = scheduleInfo.startTime.getHours()

        if(unit === 'min'){cron_expr = `*/${step} * * * *`}
        else if(unit === 'hour'){cron_expr = `${scheduleInfo.startTime.getMinutes()} */${step} * * *`}
        else if(unit === 'day'){cron_expr = `${minute} ${hour} */${step} * *`}
        else if(unit === 'week'){cron_expr = `${minute} ${hour} */${step * 7} * *`}

        if(new Date() > scheduleInfo.startTime){
            this.fireCron(cron_expr, scheduleInfo)
        } 
        else{
            schedule.scheduleJob(scheduleInfo.startTime, () => {
                this.fireCron(cron_expr, scheduleInfo)
            })
        }
    }

    cancel(key){
        this.job[key] && this.job[key].cancel()
    }
}

const scheduler = new Scheduler()

const startScheduling = async () => {
    const schedules = await scheduleRepo.getAllSchedule()
    for(var i = 0; i < schedules.length; i++){
        try{
            scheduler.schedule(schedules[i])
        }
        catch(error){
            console.log(error)
        }
    }
}

const updateScheduler = (name, startTime, count, cycle, cycleUnit, hardwareID, operatingTime) => {
    const scheduleInfo = {name: name, startTime: startTime, count : count, cycle: cycle, unit: cycleUnit, actuator_ID: hardwareID, operatingTime: operatingTime}
    scheduler.cancel(`${scheduleInfo.name}/${scheduleInfo.actuator_ID}`)
    scheduler.schedule(scheduleInfo)
}

const deleteScheduler = (name, hardwareID) => {
    scheduler.cancel(`${name}/${hardwareID}`)
}

module.exports = {startScheduling, updateScheduler, deleteScheduler}
