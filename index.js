/* Your Code Here */
function createEmployeeRecord (employee) {
    let employeeRecord = {
        'firstName': `${employee[0]}`,
        'familyName': `${employee[1]}`,
        'title': `${employee[2]}`,
        'payPerHour': employee[3],
        'timeInEvents': [],
        'timeOutEvents': [],
    }

    return employeeRecord
}

function createEmployeeRecords (employees) {
    let employeeRecords = employees.map(employee => createEmployeeRecord.call(this, employee))

    return employeeRecords
}

function createTimeInEvent (dateStamp) {
    let date = dateStamp.split(' ')[0]
    let hour = dateStamp.split(' ')[1]*1
    
    let timeInEvent = {
        'type': "TimeIn",
        'hour': hour,
        'date': `${date}`,
    }

    this.timeInEvents.push(timeInEvent)

    return this
}

function createTimeOutEvent (dateStamp) {
    let date = dateStamp.split(' ')[0]
    let hour = dateStamp.split(' ')[1]*1
    
    let timeOutEvent = {
        'type': "TimeOut",
        'hour': hour,
        'date': `${date}`,
    }

    this.timeOutEvents.push(timeOutEvent)

    return this
}

function hoursWorkedOnDate (date) {
    let timeInEventOnDate = this.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    let timeInOnDate = timeInEventOnDate.hour
    
    let timeOutEventOnDate = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)
    let timeOutOnDate = timeOutEventOnDate.hour

    let hoursWorked = (timeOutOnDate - timeInOnDate)/100

    return hoursWorked
}

function wagesEarnedOnDate (date) {
    let payRate = this.payPerHour

    let hoursOnDate = hoursWorkedOnDate.call(this, date)

    let payOwed = payRate*hoursOnDate

    return payOwed
}

function findEmployeeByFirstName (srcArray, first_Name) {
    return srcArray.find(record => record.firstName === first_Name)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    console.log(this)
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecords){
    let totalPay = employeeRecords.map(employeeRecord => allWagesFor.call(employeeRecord))
    
    return totalPay.reduce(function(a, eachPay){
        return a + eachPay
    }, 0)
}
