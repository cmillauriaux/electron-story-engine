import { Component, OnInit, Input } from '@angular/core';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { Choice } from 'story-engine-library/lib/models/Choice';

@Component({
  selector: 'app-edit-sequence',
  templateUrl: './edit-sequence.component.html',
  styleUrls: ['./edit-sequence.component.scss']
})
export class EditSequenceComponent implements OnInit {

  @Input() currentSequence: SequenceModel;

  constructor() { }

  ngOnInit() {
  }

  addDialog() {
    this.currentSequence.dialogs.push({
      character: '',
      text: '',
      foreground: ''
    });
  }

  addChoice()  {
    this.currentSequence.choices.push({
      title: 'Choice ' + (this.currentSequence.choices.length + 1),
      order: this.currentSequence.choices.length + 1,
      conditions: [],
      consequences: []
    });
  }

  deleteChoice(index: number) {
    this.currentSequence.choices.splice(index, 1);
  }

  deleteDialog(index: number) {
    this.currentSequence.dialogs.splice(index, 1);
  }

  upDialog(index: number) {
    this.array_move(this.currentSequence.dialogs, index, index - 1);
  }

  downDialog(index: number) {
    this.array_move(this.currentSequence.dialogs, index, index + 1);
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
