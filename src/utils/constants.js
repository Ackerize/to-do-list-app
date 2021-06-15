import moment from "moment";

export const API_URL = 'http://localhost:3001';

export const formatDate = (date) => moment(date).format('YYYY-MM-DD')

export const formatTime = (date) => moment(date).format('HH:mm:ss')

export const formatHours = (time) => {
    time = time.split(':');
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    return moment(now).format('hh:mm A')
}