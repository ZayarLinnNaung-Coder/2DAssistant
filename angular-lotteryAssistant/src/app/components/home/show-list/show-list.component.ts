import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  showAmLuckyPersonList: boolean = false;
  showPmLuckyPersonList: boolean = false;

  showOnlyAM: boolean = false;
  showOnlyPM: boolean = false;
  showALL: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  filterTime(time: string, event: Event) {
    if(time == 'am'){
      this.showOnlyAM = true;
      this.showOnlyPM = false;
      this.showALL = false;
    }else if(time == 'pm'){
      this.showOnlyAM = false;
      this.showOnlyPM = true;
      this.showALL = false;
    }else if(time == 'all'){
      this.showOnlyAM = false;
      this.showOnlyPM = false;
      this.showALL = true;
    }

    document.querySelectorAll('.time').forEach(timeClass => {
      timeClass.classList.remove('active')
    });

    (<HTMLElement> event.currentTarget).classList.add('active')
  }
}
