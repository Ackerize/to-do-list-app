import moment from "moment";

export const API_URL = 'https://todo-api-app-2021.herokuapp.com';

export const formatDate = (date) => moment(date).format('YYYY-MM-DD')

export const formatTime = (date) => moment(date).format('HH:mm:ss')

export const formatHours = (time) => {
    time = time.split(':');
    let now = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    return moment(now).format('hh:mm A')
}