import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSearchMode: boolean = false;
  @Input() hasBackMode: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  changeSearchMode(isSearchMode: boolean) {
    this.isSearchMode = isSearchMode;
    document.querySelector('header')!.classList.toggle('active');
  }

  goToBack() {
    const currentUrl = this.activatedRoute.snapshot.url;
    const lastUrlIndex = currentUrl.length - 2;
    this.router.navigateByUrl(currentUrl[lastUrlIndex].path)
  }
}
