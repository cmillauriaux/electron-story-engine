import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() scenes: SceneModel[];
  @Input() sequences: SequenceModel[];
  @Output() sceneSelected: EventEmitter<string> = new EventEmitter();
  @Output() sequenceSelected: EventEmitter<string> = new EventEmitter();
  @Output() sceneAdded: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectScene(sceneId: string) {
    this.sceneSelected.emit(sceneId);
  }

  selectSequence(sequenceId: string) {
    this.sequenceSelected.emit(sequenceId);
  }

  addScene() {
    this.sceneAdded.emit();
  }
}
