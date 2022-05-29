import moment from "moment"
import {MAX_COUNT_DELIVERY_DATE, DELIVERY_TIME_OPTIONS} from "../constants/form"

const getDeliveryDateOptions = () => {
    return Array.from(
        { length: MAX_COUNT_DELIVERY_DATE },
        (_, i) => {
            const date = moment().add(i, 'day')
            if (date.isoWeekday() !== 7 && date.isoWeekday() !== 6
                && !(i === 0 && moment().isAfter(moment().format('YYYY-MM-DD  22:01:00'))))
            return  {
                id: i,
                label: date.format('DD-MM-YY'),
                value: date.startOf('day')
            }
            return null
        }
    ).filter(_ => _)
}

const getDeliveryTimeOptions = (deliveryDate) => {
    if (!deliveryDate) return DELIVERY_TIME_OPTIONS
    deliveryDate = moment(deliveryDate).startOf("day")
    const dateNow = moment().startOf("day")
    if (dateNow.isSame(deliveryDate)) {
        if (moment().isAfter(moment().format('YYYY-MM-DD  13:01:00'))){
            return DELIVERY_TIME_OPTIONS.slice(2)
        }
        return DELIVERY_TIME_OPTIONS.slice(1)
    }
    return DELIVERY_TIME_OPTIONS
}

export {
    getDeliveryDateOptions,
    getDeliveryTimeOptions
}
