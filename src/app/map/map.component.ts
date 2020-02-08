import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IEvent, ILoadEvent} from 'angular8-yandex-maps/lib/types/types';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AreaService} from '../services/area.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  clusterer = {
    preset: 'islands#invertedVioletClusterIcons',
    hasBaloon: false
  };
  editor = ClassicEditor;
  editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'indent',
      'outdent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
    ]
  };
  editorData = '';
  private ymaps;
  private map;
  private addButton;
  private circle;
  editorOpened = false;

  availableTags: string[] = ['Food', 'Excursion', 'Alcohol', 'Museums', 'Literature'];
  appliedTags: string[] = [];
  addButtonParams = {
    data: {
      content: 'New Area'
    },
    options: {
      float: 'right',
      selectOnClick: false,
      maxWidth: 150
    }
  };

  constructor(private cdr: ChangeDetectorRef,
              private areaService: AreaService) {
  }

  ngOnInit() {
  }


  addTagFilter(tag: string) {
    const index = this.availableTags.indexOf(tag);
    if (index > -1) {
      this.appliedTags.push(tag);
      this.availableTags.splice(index, 1);
    }
  }

  removeTagFilter(tag: string) {
    const index = this.appliedTags.indexOf(tag);
    if (index > -1) {
      this.availableTags.push(tag);
      this.appliedTags.splice(index, 1);
    }
  }

  addButtonLoad(event: ILoadEvent) {
    this.addButton = event.instance;
    this.addButton.events.once('click', this.addNewArea);
  }

  addNewArea = (event) => {
    this.circle = new this.ymaps.Circle([
      [55.76, 37.60],
      1000
    ], {}, {
      fillColor: '#9ccde677',
      strokeColor: '#658494',
      strokeOpacity: 0.8,
      strokeWidth: 2
    });
    this.map.geoObjects.add(this.circle);
    this.circle.editor.startEditing();
    this.addButton.data.set('content', 'Add description');
    this.addButton.events.once('click', this.openDescriptionEditor);
  }

  openDescriptionEditor = (event) => {
    this.editorOpened = true;
    this.cdr.detectChanges();
  }

  onMapLoad(event: ILoadEvent) {
    console.log('map', event);
    this.ymaps = event.ymaps;
    this.map = event.instance;
  }

  saveArea(event: MouseEvent) {
    console.log(this.circle.geometry.getCoordinates());
    console.log(this.circle.geometry.getRadius());
    this.editorOpened = false;
    this.map.geoObjects.remove(this.circle);
    this.addButton.data.set('content', 'New Area');
    this.addButton.events.once('click', this.addNewArea);
    this.areaService.createArea({
      radius: this.circle.geometry.getRadius(),
      x: this.circle.geometry.getCoordinates()[0],
      y: this.circle.geometry.getCoordinates()[1]
    }, {
      heading: 'Heading',
      content: this.editorData,
    }, []).subscribe(res => {
      console.log(res);
    });
    this.editorData = '';
  }

  onOpenedChange(opened: boolean) {
    this.editorOpened = opened;
  }

  cancel() {
    this.addButton.events.once('click', this.openDescriptionEditor);
    this.editorOpened = false;
  }
}
