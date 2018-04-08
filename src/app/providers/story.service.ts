import { Injectable } from '@angular/core';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { PersistanceLoki } from 'story-engine-library/lib/controllers/persistance-loki';
import { ipcRenderer } from 'electron';

@Injectable()
export class StoryService {

    private persistance: PersistanceLoki;

    constructor() {
    }

    openDatabase(story: string) {
        this.persistance = new PersistanceLoki(story);
    }

    async loadStory(storyId: string) {
        return await this.persistance.getStory(storyId);
    }

    async loadScene(storyId: string, sceneId: string) {
        return await this.persistance.getScene(storyId, sceneId);
    }

    async loadSequence(storyId: string, sceneId: string, sequenceId: string) {
        return await this.persistance.getSequence(storyId, sceneId, sequenceId);
    }

    async listStories(): Promise<StoryModel[]> {
        return await this.persistance.listStories();
    }

    async listScenes(storyId: string): Promise<SceneModel[]> {
        return await this.persistance.listScenes(storyId);
    }

    async listSequences(storyId: string, sceneId: string): Promise<SequenceModel[]> {
        return await this.persistance.listSequences(storyId, sceneId);
    }

}
