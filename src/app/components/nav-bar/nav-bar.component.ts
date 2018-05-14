import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { CharacterModel } from '../../../../../javascript-story-engine/lib/models/Character';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() scenes: SceneModel[];
  @Input() sequences: SequenceModel[];
  @Input() characters: CharacterModel[];
  @Output() sceneSelected: EventEmitter<string> = new EventEmitter();
  @Output() sequenceSelected: EventEmitter<string> = new EventEmitter();
  @Output() characterSelected: EventEmitter<string> = new EventEmitter();
  @Output() sequenceAdded: EventEmitter<string> = new EventEmitter();
  @Output() sceneAdded: EventEmitter<string> = new EventEmitter();
  @Output() characterAdded: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectScene(sceneId: string) {
    this.sceneSelected.emit(sceneId);
  }

  selectSequence(sequenceId: string) {
    this.sequenceSelected.emit(sequenceId);
  }

  selectCharacter(characterId: string) {
    this.characterSelected.emit(characterId);
  }

  addScene() {
    this.sceneAdded.emit();
  }

  addSequence(sceneId: string) {
    this.sequenceAdded.emit(sceneId);
  }

  addCharacter() {
    this.characterAdded.emit();
  }
}
