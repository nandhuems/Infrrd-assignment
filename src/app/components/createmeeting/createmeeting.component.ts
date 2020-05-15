import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.scss']
})
export class CreatemeetingComponent implements OnInit, OnChanges {

  @Input() public meetingRooms: any;
  @Output() public bookMeetingRoom: EventEmitter<any> = new EventEmitter <any>();
  @Output() public findCurrentStatus: EventEmitter<any> = new EventEmitter <any>();

  meetingDetails: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.meetingDetails = this.meetingRooms;
  }

  bookMeating(room) {
    this.bookMeetingRoom.emit(room);
  }

  deleteBooking(roomIndex, bookingIndex){
    this.meetingDetails[roomIndex].bookings.splice(bookingIndex, 1);
    this.findCurrentStatus.emit();
  }

}
