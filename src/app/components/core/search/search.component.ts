import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  @Output() meatingSearchInputs: EventEmitter<any> = new EventEmitter <any>();

  bookingRequest: any = {
    date: null,
    time:{
      from: null,
      to:null
    }
  };

  constructor() { }

  ngOnInit(): void {

  }

  searchRooms() {
    // console.log(this.bookingRequest);
    this.meatingSearchInputs.emit(this.bookingRequest);
  }

}
