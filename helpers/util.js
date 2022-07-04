export function $(args) {
    const self = {
        /* --------------- Date Helpers --------------- */
        oneDay: 24 * 60 * 60 * 1000,  // hours*minutes*seconds*milliseconds
        startDate: function () {
            return new Date().toISOString().slice(0, 10)
        },
        endDate: function () {
            let d = new Date()
            d.setHours(0, 0, 0, 0)
            return new Date(d.setMonth(d.getMonth() + 1)).toISOString().slice(0, 10)
        },
        schedule: function () {
            return {
                startDate: self.startDate(),
                endDate: self.endDate()
            }
        },
        randomDate: function (start, end) {
            let diff = new Date(Date.parse(end)) - new Date(Date.parse(start))
            let newDiff = diff * Math.random()
            return new Date(Date.parse(start) + newDiff).toISOString().slice(0, 10)
        },
        monthDiff: function (start, end) {
            return (new Date(Date.parse(end)).getMonth() + 1) - (new Date(Date.parse(start)).getMonth() + 1)
        },
        diffDays: function (start, end) {
            const d1 = new Date(start)
            const d2 = new Date(end)
            return Math.round(Math.abs(d1 - d2) / this.oneDay) + 1
        },
        listFromDateRange: function range(startDate, endDate) {
            var listDate = [];
            var dateMove = new Date(startDate);
            let strDate = startDate;

            while (strDate < endDate) {
                strDate = dateMove.toISOString().slice(0, 10);
                listDate.push(strDate);
                dateMove.setDate(dateMove.getDate() + 1);
            };
            return listDate;
        },
        isDateInRange: function (fromDate, toDate, checkDate) {
            const start = Date.parse(fromDate)
            const end = Date.parse(toDate)
            const check = Date.parse(checkDate)
            if (check <= end && check >= start) {
                return true
            }
            return false;
        },
        isValidDate: function (dateISOstring) {
            if (!isNaN(Date.parse(dateISOstring))) {
                return true
            } else return false
        },
        isValidDateRange: async function (startDateISOstring, endDateISOstring, customMsg) {
            return new Promise((resolve, reject) => {
                if (new Date(endDateISOstring).valueOf() < new Date(startDateISOstring)) {
                    reject(customMsg);
                } else {
                    resolve(true)
                }
            });
        },
        isValidDateAsync: async function (dateISOstring, customMsg) {
            return new Promise((resolve, reject) => {
                if (!isNaN(Date.parse(dateISOstring))) {
                    resolve(dateISOstring);
                } else {
                    reject(customMsg);
                }
            });
        },
        /* --------------- Property Helpers --------------- */
        isValid: async function (prop, customMsg) {
            return new Promise((resolve, reject) => {
                if (prop !== null && prop !== undefined) {
                    resolve(prop);
                } else {
                    reject(customMsg);
                }
            });
        },
        /* --------------- Numberic Helpers --------------- */
        random(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        sample(array) {
            return array[Math.floor(Math.random() * array.length)]
        },
        removeDuplicates: function (array, key = 'id') {
            const data = array.reduce(function (prev, next) {
                const removed = prev.filter(v => {
                    return v[key] !== next[key];
                });
                return [...removed, next];
            }, []);
            return data
        },
        isUnique: function (array = []) {
            for (let i = 0; i < array.length; i++) {
                if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
                    console.log('current index: ', array[i], 'lastIndexOf i: ', array.lastIndexOf(array[i]))
                    return false
                }
            }
            return true
        },
        /* --------------- Generate fake data Helpers --------------- */
        totalSeats: function (args) {
            let total = []
            Object.keys(args).forEach(function (cls) {
                this.push(args[cls].nCols * args[cls].nRows)
            }, total)
            return total.reduce((prev, next) => {
                return prev + next
            }, 0)
        },
        availableSeats: function (args) {
            let seats = [];
            Object.keys(args).forEach(function (cls) {
                for (let c = 0; c < this[cls].nCols; c++) {
                    for (let r = 1; r < this[cls].nRows + 1; r++) {
                        seats.push(this[cls].tier[c] + String(r))
                    }
                }
            }, args)
            return seats;
        },
    }
    return self
};

// console.log($().isUnique([1, 2, 3, 4, 5, 6, 7, 8, 9, 32, 11, 10]))

// console.log($().diffDays('2022-06-01', '2022-06-30'))
// console.log($().isDateInRange('2022-06-01', '2022-06-05', '2022-05-31'))
// console.log($().listFromDateRange('2022-06-01', '2022-06-15'))

// new Date(2022, 05, 0).getDate()
// let dateIso = new Date().toISOString().slice(0, 10)

// console.log(new Date(Date.parse('2022-06-29')))

// for (let x = 0; x < 10; x++) {
// console.log($().randomDate('2022-06-29', '2022-12-29'))
// console.log($().random(1, 10))
// }
// Math.random().toString(36).substring(6, 9)
// btoa(Math.random().toString()).substr(10, 5);

// Buffer.from(Math.random().toString()).toString("base64").substr(10, 5);

// btoa(Math.random().toString()).substr(10, 3);
// console.log($().monthDiff('2022-06-29', '2022-12-29'))
// function randomTime(start, end) {
//     // get the difference between the 2 dates, multiply it by 0-1, 
//     // and add it to the start date to get a new date 
//     var diff = end.getTime() - start.getTime();
//     var new_diff = diff * Math.random();
//     var date = new Date(start.getTime() + new_diff);
//     return date;
// }
// $("button").on("click", function () {
//     var new_time = randomTime(new Date("10-10-2015 10:30"), new Date("12-10-2015 02:10"));
//     $("#result").html(new_time);
// });

// new Array(5).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });



