import { Injectable } from '@angular/core';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { SceneModel } from 'story-engine-library/lib/models/Scene';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { PersistanceLoki } from 'story-engine-library/lib/controllers/persistance-loki';
import { ipcRenderer } from 'electron';
import { CharacterModel } from '../../../../javascript-story-engine/lib/models/Character';

@Injectable()
export class StoryService {

    private persistance: PersistanceLoki;
    public file: string;

    constructor() {
    }

    openDatabase(story: string) {
        this.persistance = new PersistanceLoki(story);
    }

    async exportDatabase(storyId: string): Promise<string> {
        return await this.persistance.exportStory(storyId);
    }

    async loadStory(storyId: string) {
        return await this.persistance.getStory(storyId);
    }

    async loadScene(storyId: string, sceneId: string) {
        return await this.persistance.getScene(storyId, sceneId);
    }

    async loadCharacter(storyId: string, characterId: string) {
        return await this.persistance.getCharacter(storyId, characterId);
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

    async listCharacters(storyId: string): Promise<CharacterModel[]> {
        return await this.persistance.listCharacters(storyId);
    }

    async listSequences(storyId: string, sceneId: string): Promise<SequenceModel[]> {
        return await this.persistance.listSequences(storyId, sceneId);
    }

    async saveScene(storyId: string, scene: SceneModel) {
        return await this.persistance.saveScene(storyId, scene);
    }

    async saveSequence(storyId: string, sequence: SequenceModel) {
        return await this.persistance.saveSequence(storyId, sequence);
    }

    async saveCharacter(storyId: string, character: CharacterModel) {
        return await this.persistance.saveCharacter(storyId, character);
    }
 }
