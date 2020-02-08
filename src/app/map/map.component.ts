import { Component, OnInit } from '@angular/core';
import { Tag } from '../entities/tag';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  availableTags: Tag[] = [];
  appliedTags: Tag[] = [];

  addTagFilter(tag: Tag) {
    let index = this.availableTags.indexOf(tag);
    if (index > -1) {
      this.appliedTags.push(tag);
      this.availableTags.splice(index, 1);
    }
  }

  removeTagFilter(tag: Tag) {
    let index = this.appliedTags.indexOf(tag);
    if (index > -1) {
      this.availableTags.push(tag);
      this.appliedTags.splice(index, 1);
    }
  }

  constructor(private tagService: TagsService) { }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(data=> {
      this.availableTags = [...data, ...this.availableTags];
    });
  }

}
