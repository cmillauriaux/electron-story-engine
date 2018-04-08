import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoryService } from '../../providers/story.service';

@Component({
  selector: 'app-load-story',
  templateUrl: './load-story.component.html',
  styleUrls: ['./load-story.component.scss']
})
export class LoadStoryComponent implements OnInit {

  @Output() storyLoaded: EventEmitter<string> = new EventEmitter();
  private file: any;

  constructor(private storySvc: StoryService) { }

  ngOnInit() {
  }

  selectProjetRoot(event) {
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.storyLoaded.emit(fileReader.result);
      };
      fileReader.readAsText(this.file);
    }
  }

}
