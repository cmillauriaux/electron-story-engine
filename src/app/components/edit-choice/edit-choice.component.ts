import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Choice } from 'story-engine-library/lib/models/Choice';

@Component({
  selector: 'app-edit-choice',
  templateUrl: './edit-choice.component.html',
  styleUrls: ['./edit-choice.component.scss']
})
export class EditChoiceComponent implements OnInit {

  @Input() choice: Choice;
  @Output() choiceDeleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addCondition(choice: Choice) {
    choice.conditions.push({type: 'SkillCondition', attribute: ''});
  }

  addConsequence(choice: Choice) {
    choice.consequences.push({type: 'SkillConsequence', name: ''});
  }

  deleteCondition(choice: Choice, index: number) {
    choice.conditions.splice(index, 1);
  }

  deleteConsequence(choice: Choice, index: number) {
    choice.consequences.splice(index, 1);
  }

  deleteChoice() {
    this.choiceDeleted.emit();
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }

}
