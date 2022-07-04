import { $ } from "../helpers/util.js";
import Dates from "../models/Dates.js";

export const flightsController = async (req, res, next) => {
    const { startDate, endDate } = req.query;

    try {
        await queryValidator(req.query)
        const dateList = $().listFromDateRange(startDate, endDate)
        const report = new Dates(dateList)
        report.generateDates().generateFlights()
        res.status(200).json(report)
    } catch (err) {
        const error = new Error()
        error.message = err
        error.status = 400
        next(error)
    }
};

async function queryValidator(queryObj) {
    try {
        await Promise.all([
            $().isValid(
                queryObj.startDate, {
                "status": "failed",
                "reason": "startDate is empty"
            }),
            $().isValid(
                queryObj.endDate, {
                "status": "failed",
                "reason": "endDate is empty"
            }),
            $().isValidDateAsync(
                queryObj.startDate, {
                "status": "failed",
                "reason": "startDate format is invalid"
            }),
            $().isValidDateAsync(
                queryObj.endDate, {
                "status": "failed",
                "reason": "endDate format is invalid"
            }),
            $().isValidDateRange(
                queryObj.startDate,
                queryObj.endDate, {
                "status": "failed",
                "reason": "endDate cannot be before startDate"
            })
        ]);
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(error);
    }
};