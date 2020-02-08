import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ILoadEvent} from 'angular8-yandex-maps/lib/types/types';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AreaService} from '../services/area.service';
import {Tag} from '../entities/tag';
import {TagsService} from '../services/tags.service';
import {AreaDto} from '../entities/area-dto';
import {ArticleService} from '../services/article.service';
import {Article} from '../entities/article';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
  encapsulation: ViewEncapsulation.None
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
  areas: AreaDto[];
  private ymaps;
  private map;
  private addButton;
  private circle;
  private circleParams = {
    fillColor: '#9ccde677',
    strokeColor: '#658494',
    strokeOpacity: 0.8,
    strokeWidth: 2
  };
  editorOpened = false;
  currentArticle: Article;
  availableTags: Tag[] = [];
  appliedTags: Tag[] = [];
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
  articleOpened = false;

  constructor(private cdr: ChangeDetectorRef,
              private areaService: AreaService,
              private tagService: TagsService,
              private articleService: ArticleService) {
  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(data => {
      this.availableTags = [...data, ...this.availableTags];
    });
  }

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

  addButtonLoad(event: ILoadEvent) {
    this.addButton = event.instance;
    this.addButton.events.once('click', this.addNewArea);
  }

  addNewArea = (event) => {
    this.circle = new this.ymaps.Circle([
      [55.76, 37.60],
      1000
    ], {}, this.circleParams);
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
    this.areaService.getAreas().subscribe(areas => {
      console.log(areas);
      this.areas = areas;
      this.drawCircles();
    });
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

  drawCircles() {
    const circles = this.areas.forEach(area => {
      const circle = new this.ymaps.Circle([
        [area.area.x, area.area.y],
        area.area.radius
      ], {}, this.circleParams);
      circle.events.add('click', (event) => {
        this.showArticle(area.articleId);
      });
      this.map.geoObjects.add(circle);
    });
  }

  showArticle(id) {
    this.articleService.getArticle(id).subscribe(article => {
      this.currentArticle = article;
      this.articleOpened = true;
      this.cdr.detectChanges();
    });
  }

  closeArticle(event: boolean) {
    console.log(322);
    this.articleOpened = event;
    this.cdr.detectChanges();
  }
}
