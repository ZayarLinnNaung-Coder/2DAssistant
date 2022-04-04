import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer.service";
import {Ticket} from "../../../model/ticket";
import {NotifierService} from "angular-notifier";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  private readonly notifier: NotifierService;
  ticketForm: FormGroup;
  showConfirmation: boolean;
  disableNumbInput: boolean;

  luckyTickets: Ticket[] = [];
  realTickets: Ticket[] = [];
  totalAmt: number = 0;

  targetCustomer: Customer;

  luckyTicketOptions = [
    'ဒဲ့', 'R', 'ခွေ', 'ပတ်', 'ထိပ်', 'နောက်', 'အပူး', 'နက္ခတ်', 'ပါ၀ါ'
  ];
  optionFormControlValue: number;
  private extraOptionIndex: number;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
              private notifierService: NotifierService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      address: [''],
      tickets: this.formBuilder.array([])
    })
  }

  get tickets(): FormArray{
    return this.ticketForm.get('tickets') as FormArray;
  }

  addTicketFormGroup() {
    const formGroupLength = this.tickets.controls.length;
    if(formGroupLength > 0 && this.tickets.controls[formGroupLength - 1].invalid){
      this.notifier.notify('error', 'ထိုးဇယားအားပြည့်စုံအောင်ဖြည့်ပါ')
      return;
    }

    const newTicketFormGroup = this.formBuilder.group({
      numb: [, [Validators.required, Validators.pattern('^[0-9]{2}$')]],
      option: [0],
      amount: [, [Validators.required]],
      extraOption: []
    })
    this.tickets.push(newTicketFormGroup);
  }

  onSubmitTicketForm() {
    const customer: Customer = {
      customerId: btoa(this.ticketForm.value['username'] + (Math.random() * 100)),
      username: this.ticketForm.value['username'],
      address: this.ticketForm.value['address'],
      date: new Date(),
      tickets: this.ticketForm.value['tickets'],
      realTickets: this.realTickets,
      totalAmount: this.totalAmt
    }

    this.customerService.addNewCustomer(customer);
    this.showConfirmation = false;
    this.goToBack();
    this.notifier.notify('success', 'စာရင်းသွင်းပြီးပါပြီ');
  }

  showConfirmationDialog(b: boolean) {
    this.showConfirmation = b;
    if(b == true){
      this.luckyTickets = this.ticketForm.value['tickets'];
      this.getRealTickets();
    }else{
      this.totalAmt = 0;
    }
  }

  onOptionChange(eventTarget, i) {
    if(+(<HTMLSelectElement>eventTarget).value == 0 || +(<HTMLSelectElement>eventTarget).value == 1){
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').setValidators([
        Validators.required, Validators.pattern('^[0-9]{2}$')
      ]);
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').updateValueAndValidity()
    }
    else if(+(<HTMLSelectElement>eventTarget).value == 2){
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').setValidators([
        Validators.required, Validators.pattern('^[0-9]{2,10}$')
      ]);
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').updateValueAndValidity()
    }
    else if(+(<HTMLSelectElement>eventTarget).value == 3 || +(<HTMLSelectElement>eventTarget).value == 4 || +(<HTMLSelectElement>eventTarget).value == 5){
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').setValidators([
        Validators.required, Validators.pattern('^[0-9]{1}$')
      ]);
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].get('numb').updateValueAndValidity()
    }
    if(+(<HTMLSelectElement>eventTarget).value > 5){
      (<FormArray>this.ticketForm.controls['tickets']).controls[i].patchValue({numb: ''});
      this.disableNumbInput = true;
    }else{
      this.disableNumbInput = false;
    }
  }


  getTicketExtraOption(option: number, extraOption: number): string {
    let returnString = '';
    console.log(option, extraOption)
    if(option == 2){
      if(extraOption == 1){
        returnString = 'အပူးပါ';
      }
    }

    return returnString;
  }

  private getRealTickets() {
    let index = 0;
    // luckyTicketOptions = [
    //   'ဒဲ့', 'R', 'ခွေ', 'ပတ်', 'အပူး', 'နက္ခတ်', 'ပါ၀ါ'
    // ]

    let realTickets: Ticket[] = [];

    this.luckyTickets.map(ticket => {
      ticket.numb = ticket.numb.toString();
      if(ticket.option == 0){
        this.totalAmt += ticket.amount;
        realTickets.push({numb: ticket.numb, amount: ticket.amount});
      }else if(ticket.option == 1){
        this.totalAmt += ticket.amount * 2;
        realTickets.push({numb: ticket.numb, amount: ticket.amount});
        realTickets.push({numb: this.getReverseNumber(ticket.numb), amount: ticket.amount});
      }else if(ticket.option == 2){
        const containSameNumbers = (<HTMLInputElement>document.getElementById('sameNumberCheckBox')).checked;
        this.getCombinationalNumber(ticket.numb, containSameNumbers, index).map(numb => {
          this.totalAmt += ticket.amount;
          realTickets.push({numb: numb, amount: ticket.amount});
        });
      }else if(ticket.option == 3){
        this.getRoundingNumber(ticket.numb, index).map(numb => {
          this.totalAmt += ticket.amount;
          realTickets.push({numb: numb, amount: ticket.amount});
        });
      }else if(ticket.option == 4){
        this.getStartingFixedNumber(ticket.numb).map(numb => {
          this.totalAmt += ticket.amount;
          realTickets.push({numb: numb, amount: ticket.amount});
        })
      }else if(ticket.option == 5){
        this.getEndingFixedNumber(ticket.numb).map(numb => {
          this.totalAmt += ticket.amount;
          realTickets.push({numb: numb, amount: ticket.amount});
        })
      }else if(ticket.option == 6){
        this.totalAmt += ticket.amount * 10;
        this.getSameNumber().map(numb => {
          realTickets.push({numb: numb, amount: ticket.amount});
        })
      }else if(ticket.option == 7){
        this.totalAmt += ticket.amount * 10;
        this.getStarNumber().map(numb => {
          realTickets.push({numb: numb, amount: ticket.amount});
        })
      }else if(ticket.option == 8){
        this.totalAmt += ticket.amount * 10;
        this.getPowerNumber().map(numb => {
          realTickets.push({numb: numb, amount: ticket.amount});
        })
      }

      this.realTickets = realTickets;
      index++;
    })
  }

  private getReverseNumber(numb: string): string{
    let charArray = numb.split('');
    return charArray[1] + charArray[0];
  }

  private getCombinationalNumber(numb: string, containSameNumbers: boolean, index: number): string[]{
    let charArray = numb.split('');
    let combinationalNumbers = [];

    (this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').patchValue(0);
    console.log((this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').value);
    for(let i = 0; i < charArray.length-1; i++){
      for(let j = i+1; j < charArray.length; j++){
        const x = charArray[i] + charArray[j];
        combinationalNumbers.push(x);
        combinationalNumbers.push(this.getReverseNumber(x));
      }
    }

    if(containSameNumbers){
      (this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').patchValue(1);
      console.log((this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').value);
      charArray.map(x => {
        combinationalNumbers.push(x + x);
      })
    }

    return combinationalNumbers;
  }

  private getRoundingNumber(numb: string, index: number): string[] {
    let myNumber = [];
    const noSameNumber = (<HTMLInputElement>document.getElementById('noSameNumberRadio')).checked;
    const oneSameNumber = (<HTMLInputElement>document.getElementById('oneSameNumberRadio')).checked;
    const twoSameNumber = (<HTMLInputElement>document.getElementById('twoSameNumberRadio')).checked;
    if(noSameNumber){
      (this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').patchValue(0);
      for(let i = 0; i < 10; i++){
        if(+numb == i){
          continue;
        }
        let x = numb + i;
        myNumber.push(x);
        myNumber.push(this.getReverseNumber(x));
      }
    }else if(oneSameNumber){
      (this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').patchValue(1);
      for(let i = 0; i < 10; i++){
        let x = numb + i;
        if(+numb == i){
          continue;
        }
        myNumber.push(x);
        myNumber.push(this.getReverseNumber(x));
      }
      myNumber.push(numb + numb);
    }else if(twoSameNumber){
      (this.ticketForm.controls['tickets'] as FormArray).controls[index].get('extraOption').patchValue(2);
      for(let i = 0; i < 10; i++){
        let x = numb + i;
        myNumber.push(x);
        myNumber.push(this.getReverseNumber(x));
      }
    }
    return myNumber;
  }

  private getStartingFixedNumber(numb: string): string[] {
    let myNumber = [];
    for(let i = 0; i < 10; i++){
      myNumber.push(numb + i);
    }
    return myNumber;
  }

  private getEndingFixedNumber(numb: string): string[] {
    let myNumber = [];
    for(let i = 0; i < 10; i++){
      myNumber.push(i + numb);
    }
    return myNumber;
  }

  private getSameNumber(): string[] {
    let myNumber = [];

    for(let i = 0; i< 10; i++){
      let x = i.toString() + i.toString();
      myNumber.push(x);
    }

    return myNumber;
  }

  private getStarNumber(): string[] {
    const starNumbers = ['18', '24', '35', '69', '70'];
    let myNumber = [];

    starNumbers.map(numb => {
      myNumber.push(numb);
      myNumber.push(this.getReverseNumber(numb))
    })

    return myNumber;
  }

  private getPowerNumber(): string[] {
    const powerNumbers = ['05', '16', '27', '38', '49'];
    let myNumber = [];

    powerNumbers.map(numb => {
      myNumber.push(numb);
      myNumber.push(this.getReverseNumber(numb))
    })

    return myNumber;
  }

  private goToBack() {
    const currentUrl = this.activatedRoute.snapshot.url;
    const lastUrlIndex = currentUrl.length - 2;
    this.router.navigateByUrl(currentUrl[lastUrlIndex].path)
  }
}
