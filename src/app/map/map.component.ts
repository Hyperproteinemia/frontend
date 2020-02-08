import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  availableTags: string[] = ['Food', 'Excursion', 'Alcohol', 'Museums', 'Literature'];
  appliedTags: string[] = [];

  addTagFilter(tag: string) {
    let index = this.availableTags.indexOf(tag);
    if (index > -1) {
      this.appliedTags.push(tag);
      this.availableTags.splice(index, 1);
    }
  }

  removeTagFilter(tag: string) {
    let index = this.appliedTags.indexOf(tag);
    if (index > -1) {
      this.availableTags.push(tag);
      this.appliedTags.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit() {}

}
