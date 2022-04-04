import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {HomeComponent} from "./components/home/home.component";
import {IconsModule} from "./icons/icons.module";
import { AddTicketComponent } from './components/home/add-ticket/add-ticket.component';
import { ShowListComponent } from './components/home/show-list/show-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "angular-notifier";
import { ViewUserDataComponent } from './components/home/view-user-data/view-user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddTicketComponent,
    ShowListComponent,
    ViewUserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12

        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
