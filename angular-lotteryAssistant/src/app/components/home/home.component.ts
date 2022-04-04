import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todayCustomers: Customer[] = [];
  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.todayCustomers = this.customerService.getTodayCustomers();
  }

  viewUserData(userDataId: string) {
    this.router.navigateByUrl(`/home/view-user-data?userId=${userDataId}`)
  }
}
