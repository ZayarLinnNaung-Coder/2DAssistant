import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer.service";
import {ActivatedRoute} from "@angular/router";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-view-user-data',
  templateUrl: './view-user-data.component.html',
  styleUrls: ['./view-user-data.component.scss']
})
export class ViewUserDataComponent implements OnInit {

  luckyTicketOptions = [
    'ဒဲ့', 'R', 'ခွေ', 'ပတ်', 'ထိပ်', 'နောက်', 'အပူး', 'နက္ခတ်', 'ပါ၀ါ'
  ];

  targetCustomer: Customer;

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      this.targetCustomer = this.customerService.getCustomerByCustomerId(param['userId']);
      console.log(this.targetCustomer)
    })
  }

  private debugBase64(base64URL){
    let win = window.open();
    win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }
  takeScreenshot() {
    const screenshotTarget = document.body;

    html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png");
      this.debugBase64(base64image)
    });
  }
}
