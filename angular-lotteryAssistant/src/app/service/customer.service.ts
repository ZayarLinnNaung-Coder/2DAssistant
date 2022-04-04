import { Injectable } from '@angular/core';
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] = [
    {
      customerId: '1',
      username: 'ဇေယျာလင်းနောင်',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 3, 4, 10, 11, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 1},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
    {
      customerId: btoa('randomId') + (Math.random() * 100),
      username: 'ဇေယျာလင်းနောင်',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 4, 1, 10, 11, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 1},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
    {
      customerId: btoa('randomId') + (Math.random() * 100),
      username: 'လှလှ',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 3, 1, 15, 11, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 1},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
    {
      customerId: btoa('randomId') + (Math.random() * 100),
      username: 'ဇေယျာလင်းနောင်',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 3, 4, 10, 11, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 1},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
    {
      customerId: btoa('randomId') + (Math.random() * 100),
      username: 'မြမြ',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 3, 4, 14, 11, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 1},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
    {
      customerId: btoa('randomId') + (Math.random() * 100),
      username: 'လှလှ',
      address: 'ပတ္တမြားလမ်း',
      date: new Date(2022, 3, 4, 14, 59, 54),
      tickets: [
        {numb: '12', option: 0, amount: 500},
        {numb: '45', option: 1, amount: 500},
        {numb: '73', option: 1, amount: 500},
        {numb: '8923', option: 2, amount: 500, extraOption: 0},
        {numb: '97', option: 0, amount: 500},
      ],
      totalAmount: 12000
    },
  ]


  constructor() { }

  getTodayCustomers(){
    const todayDate = new Date();
    const today = `${todayDate.getDate()}/${todayDate.getMonth()+1}/${todayDate.getFullYear()}`;
    return this.customers.filter(customer => today == `${customer.date.getDate()}/${customer.date.getMonth()+1}/${customer.date.getFullYear()}`)
  }

  getCustomerByCustomerId(targetCustomerId: string): Customer{
    return this.customers.find(customer => customer.customerId == targetCustomerId)
  }

  addNewCustomer(newCustomer: Customer){
    this.customers.push(newCustomer)
  }
}
