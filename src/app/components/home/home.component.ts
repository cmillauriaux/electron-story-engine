import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../providers/story.service';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { Choice } from 'story-engine-library/lib/models/Choice';
import { UUID } from 'angular2-uuid';
import { Condition } from 'story-engine-library/lib/models/Condition';
import { ElectronService } from 'ngx-electron';
import { CharacterModel } from '../../../../../javascript-story-engine/lib/models/Character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private events = [];
  private file: any;
  private stories: StoryModel[] = new Array<StoryModel>();
  private scenes: SceneModel[] = new Array<SceneModel>();
  private sequences: SequenceModel[] = new Array<SequenceModel>();
  private characters: CharacterModel[] = new Array<CharacterModel>();
  private currentStory: StoryModel;
  private currentScene: SceneModel;
  private currentSequence: SequenceModel;
  private currentCharacter: CharacterModel;

  constructor(private storySvc: StoryService, private _electronService: ElectronService) { }

  ngOnInit() {
  }

  storyLoaded(story) {
    this.storySvc.openDatabase(story);
    this.listStories();
  }

  fileSelected(file: string) {
    this.storySvc.file = file;
  }

  exitStory() {
    this.currentStory = undefined;
  }

  async listStories() {
    this.stories = await this.storySvc.listStories();
    if (this.stories.length === 1) {
      this.selectStory(this.stories[0].id);
    }
  }

  async listScenes() {
    this.scenes = await this.storySvc.listScenes(this.currentStory.id);
  }

  async listCharacters() {
    this.characters = await this.storySvc.listCharacters(this.currentStory.id);
  }

  async selectStory(storyId: string) {
    this.currentStory = await this.storySvc.loadStory(storyId);
    this.listScenes();
    this.listCharacters();
  }

  async selectScene(sceneId: string) {
    this.currentScene = await this.storySvc.loadScene(this.currentStory.id, sceneId);
    this.sequences = await this.storySvc.listSequences(this.currentStory.id, sceneId);
  }

  async selectSequence(sequenceId: string) {
    this.currentSequence = await this.storySvc.loadSequence(this.currentStory.id, this.currentScene.id, sequenceId);
    this.currentCharacter = undefined;
  }

  async selectCharacter(characterId: string) {
    this.currentCharacter = await this.storySvc.loadCharacter(this.currentStory.id, characterId);
    this.currentSequence = undefined;
  }

  addScene() {
    const scene = {
      id: UUID.UUID().toString(),
      storyId: this.currentStory.id,
      title: 'Scene ' + (this.scenes.length + 1),
      version: 1,
      entrypoints: new Map<String, Condition>(),
    };
    this.scenes.push(scene);
    this.storySvc.saveScene(this.currentStory.id, scene);
  }

  addCharacter() {
    const character = {
      id: UUID.UUID().toString(),
      storyId: this.currentStory.id,
      name: 'Character ' + (this.characters.length + 1)
    };
    this.characters.push(character);
    this.storySvc.saveCharacter(this.currentStory.id, character);
  }

  addSequence(sceneId: string) {
    const sequence = {
      id: UUID.UUID().toString(),
      title: 'New scene',
      storyId: this.currentStory.id,
      sceneId: sceneId,
      version: 1,
      background: '',
      dialogs: [],
      choices: [],
      next: new Map<string, Condition>(),
    };
    this.sequences.push(sequence);
    this.storySvc.saveSequence(this.currentStory.id, sequence);
  }

  async saveStory() {
    const story = await this.storySvc.exportDatabase(this.currentStory.id);
    this._electronService.ipcRenderer.send('save-story', {
      file: this.storySvc.file,
      data: story
    });
  }
}
