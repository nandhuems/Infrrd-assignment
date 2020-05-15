import { Component, OnInit } from '@angular/core';
import { CommonService } from './components/service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  meetingRooms: Array<any> = [{
    name: 'Meeting Room #1',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #2',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #3',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #4',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #5',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  }, {
    name: 'Meeting Room #6',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #7',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #8',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #9',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  },
  {
    name: 'Meeting Room #10',
    bookings: [],
    contentCollapsed: false,
    status: 'Available'
  }];
  toggleModel = false;
  bookingError = '';
  bookingRequest: any = {};
  showAllertMessage = '';
  selectedRoom: any = {};
  isSearch: any = false;
  showAllertMessageSuccess: any = '';
  createRequest: any = {
    date: null,
    time: {
      from: null,
      to: null
    },
    agenda: '',
    userName: ''
  };

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  searchRoomAvailability(searchInput: any, isBook?) {
    // console.log(searchInput);
    this.bookingRequest = searchInput;
    this.showAllertMessage = '';
    if (searchInput.date) {
      const requestedDate = new Date(searchInput.date);
      const currentDate1 = this.commonService.formatDate(new Date());
      const currdateValid = new Date(currentDate1);
      if ((+requestedDate < +currdateValid) && isBook) {
        this.showAllertMessage = 'Past dates can\'t be accepted';
        this.hideErrorMessage(2000);
        return false;
      } else if (!searchInput.time.from) {
        this.showAllertMessage = 'From time is required';
        this.hideErrorMessage(2000);
        return false;
      } else if (!searchInput.time.to) {
        this.showAllertMessage = 'To time is required';
        this.hideErrorMessage(2000);
        return false;
      } else if (!searchInput.agenda && isBook) {
        this.showAllertMessage = 'Agenda is required';
        this.hideErrorMessage(2000);
        return false;
      } else if (!searchInput.userName && isBook) {
        this.showAllertMessage = 'User name is required';
        this.hideErrorMessage(2000);
        return false;
      } else if (requestedDate.getDay() === 6 || requestedDate.getDay() === 0) {
        this.showAllertMessage = 'Bookings available only on weekdays';
        this.hideErrorMessage(2000);
        return false;
      } else if (this.commonService.parseTime(searchInput.time.from) < 900 || this.commonService.parseTime(searchInput.time.to) > 1800) {
        this.showAllertMessage = 'Time Range must be bitween 9:00 AM - 6:00 PM';
        this.hideErrorMessage(2000);
        return false;
      } else if (this.commonService.parseTime(searchInput.time.to) - this.commonService.parseTime(searchInput.time.from) < 30) {
        this.showAllertMessage = 'Meeting duration must be more thane 30 Min';
        this.hideErrorMessage(2000);
        return false;
      } else {
        if(!isBook){
          this.isSearch = true;
          this.hideErrorMessage(500);
          this.checkMeetingstatus();
        }
        return true;
      }
    } else {
      this.showAllertMessage = 'Date is required';
      this.hideErrorMessage(2000);
      return false;
    }
  }

  checkMeetingstatus() {
    const currentDate = this.commonService.formatDate(new Date());
    let minutes: any = new Date().getMinutes();
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    const timeNow = `${new Date().getHours()}:${minutes}`;

    this.meetingRooms = this.meetingRooms.map(element => {
      if (element.bookings.length) {
        element.bookings.forEach(booking => {
          if (booking.date === currentDate && this.commonService.roomAvailablity(timeNow, booking.time.from, booking.time.to)) {
            element.status = 'In-Use';
          } else if (this.bookingRequest.date && this.bookingRequest.date === booking.date && this.isRoomBooked(booking)) {
            element.status = 'Booked';
          } else {
            element.status = 'Available';
          }
        });
      } else {
        element.status = 'Available';
      }
      return element;
    });
  }

  hideErrorMessage(time) {
    setTimeout(item => {
      this.showAllertMessage = '';
      this.showAllertMessageSuccess = '';
      this.isSearch = false;
    }, time);
  }

  isRoomBooked(booking) {
    let booked = false;
    if (booking.date === this.bookingRequest.date) {

      if (this.commonService.parseTime(this.bookingRequest.time.from) <= this.commonService.parseTime(booking.time.from)) {

        if (this.commonService.parseTime(this.bookingRequest.time.to) < this.commonService.parseTime(booking.time.from)) {

          if (this.commonService.parseTime(this.bookingRequest.time.to) < this.commonService.parseTime(booking.time.from)) {
            // booked = true;
          }
        } else if (this.commonService.parseTime(this.bookingRequest.time.from) <= this.commonService.parseTime(booking.time.from)) {
          booked = true;
        }
      }
    }
    else {
      booked = false;
    }
    return booked;
  }

  confirmBooking(room) {
    this.selectedRoom = room;
    this.toggleModel = true;
  }

  bookRoom() {
    this.bookingError = '';
    this.showAllertMessageSuccess = '';
    if (this.createRequest.date && this.searchRoomAvailability(this.createRequest, true)) {
      this.meetingRooms = this.meetingRooms.map(element => {
        if (element.name === this.selectedRoom.name) {
          if (element.status === 'Available') {
            element.bookings.push(this.createRequest);
            this.createRequest = {
              date: null,
              time: {
                from: null,
                to: null
              },
              agenda: '',
              userName: ''
            };
            this.showAllertMessageSuccess = 'Meeting Room Booked Successfully';
            this.hideErrorMessage(2000);
            this.toggleModel = false;
          } else {
            this.showAllertMessage = 'This room is not avaliable for selected schedule';
            this.hideErrorMessage(2000);
          }
        }
        return element;
      });
      // this.meetingRooms = this.meetingRooms;
    }
  }

}
