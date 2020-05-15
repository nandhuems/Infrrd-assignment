import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/core/header/header.component';
import { CreatemeetingComponent } from './components/createmeeting/createmeeting.component';
import { SearchComponent } from './components/core/search/search.component';
import { CommonService } from './components/service/common.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatemeetingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
