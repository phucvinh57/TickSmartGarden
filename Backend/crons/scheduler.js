const schedule = require('node-schedule');
const actuatorModel = require('../models/actuator')
const scheduleModel = require('../models/schedule')

const INFINITY_REPETITION = 0

class Scheduler{
    constructor(){
        this.job = []
    }

    fireSchedule(cron_expr, scheduleInfo){

        const job = schedule.scheduleJob(cron_expr, () => {
            actuatorModel.turnOn(scheduleInfo.actuator_ID)
            console.log('fire')
            scheduleModel.updateCount(scheduleInfo.actuator_ID, scheduleInfo.name, scheduleInfo.count + 1)
            scheduleInfo.count += 1
            if(scheduleInfo.count >= scheduleInfo.repetition && schedule.repetition != INFINITY_REPETITION)
                {this.cancel(key)}
        })

        const key = [scheduleInfo.name, scheduleInfo.actuator_ID].join('/')
        this.job[key] = job
    }

    schedule(scheduleInfo){

        if(scheduleInfo.count == scheduleInfo.repetition && scheduleInfo.repetition != INFINITY_REPETITION){
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
            this.fireSchedule(cron_expr, scheduleInfo)
        } 
        else{
            schedule.scheduleJob(scheduleInfo.startTime, () => {
                this.fireSchedule(cron_expr, scheduleInfo)
            })
        }
    }

    cancel(key){
        this.job[key] && this.job[key].cancel()
    }
}

module.exports = (new Scheduler())
