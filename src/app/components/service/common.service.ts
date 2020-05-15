import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  parseTime(time) {
    if (time) {
      return parseInt(time.split(':').join(''));
    }
  }

  roomAvailablity(time, from, to) {
    const fromTime = parseInt(from.split(':').join(''));
    const toTime = parseInt(to.split(':').join(''));
    const selectedTime = parseInt(time.split(':').join(''));
    if (fromTime <= selectedTime && toTime > selectedTime) {
      return true;
    } else {
      return false;
    }
  }
}
