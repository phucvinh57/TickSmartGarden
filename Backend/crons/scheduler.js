const schedule = require('node-schedule');
const actuatorRepo = require('../repository/actuator')
const scheduleRepo = require('../repository/schedule')

const FINISH_COUNT = 0

class Scheduler{
    constructor(){
        this.job = []
    }

    fireCron(cron_expr, scheduleInfo){
        const key = [scheduleInfo.name, scheduleInfo.actuator_ID].join('/')

        const job = schedule.scheduleJob(cron_expr, () => {
            actuatorRepo.turnOn(scheduleInfo.actuator_ID)
            console.log(`Schedule ${key} is triggered at ${new Date()}`)
            scheduleRepo.updateCount(scheduleInfo.actuator_ID, scheduleInfo.name, scheduleInfo.count - 1)
            if(scheduleInfo.count - 1 == FINISH_COUNT) {this.cancel(key)}
            
            if (scheduleInfo.count > FINISH_COUNT) {scheduleInfo.count -= 1}
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

module.exports = startScheduling
