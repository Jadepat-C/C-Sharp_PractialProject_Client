import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isExpanded = false;

  constructor() { }  

  /**
   * Collapse the navigation menu.
   */
  collapse() {
    this.isExpanded = false;
  }

  /**
   * Toggle the navigation menu between expanded and collapsed states.
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
