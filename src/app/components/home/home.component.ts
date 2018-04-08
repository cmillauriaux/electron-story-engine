import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../providers/story.service';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { Choice } from 'story-engine-library/lib/models/Choice';
import { UUID } from 'angular2-uuid';

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
  private currentStory: StoryModel;
  private currentScene: SceneModel;
  private currentSequence: SequenceModel;

  constructor(private storySvc: StoryService) { }

  ngOnInit() {
  }

  storyLoaded(story) {
    this.storySvc.openDatabase(story);
    this.listStories();
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
    console.log(this.scenes);
  }

  async selectStory(storyId: string) {
    this.currentStory = await this.storySvc.loadStory(storyId);
    console.log(this.currentStory);
    this.listScenes();
  }

  async selectScene(sceneId: string) {
    this.currentScene = await this.storySvc.loadScene(this.currentStory.id, sceneId);
    this.sequences = await this.storySvc.listSequences(this.currentStory.id, sceneId);
  }

  async selectSequence(sequenceId: string) {
    this.currentSequence = await this.storySvc.loadSequence(this.currentStory.id, this.currentScene.id, sequenceId);
  }

  addScene() {
    this.scenes.push({
      id: UUID.UUID().toString(),
      storyId: this.currentStory.id,
      title: 'Scene ' + (this.scenes.length + 1),
      version: 1,
      entrypoint: '',
    });
  }
}
