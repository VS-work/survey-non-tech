import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { IQuestion, CHECKBOXES, RADIOBUTTON } from '../common/question.desc';

@Component({
  selector: 'slide-question',
  templateUrl: './slide.question.component.html',
  styleUrls: ['./slide.question.component.css']
})
export class SlideQuestionComponent {
  form: FormGroup;
  items = [];
  model = { option: '' };
  readonly Checkboxes: string;
  readonly RadioButton: string;
  private _content: IQuestion;

  constructor(private formBuilder: FormBuilder) {
    this.Checkboxes = CHECKBOXES;
    this.RadioButton = RADIOBUTTON;
  }

  get content(): IQuestion {
    return this._content;
  }

  @Input()
  set content(input: IQuestion) {
    this._content = input;
    this.fillItems();
  }

  fillItems() {
    this.form = this.formBuilder.group({
      items: new FormArray([])
    });
    this.items = this.content.answers.map(answer => ({ id: answer, name: answer }));
    this.items.map(() => {
      const control = new FormControl(false);
      (this.form.controls.items as FormArray).push(control);
    });
  }

  submit() {
    const result = this.form.value.items
      .map((v, i) => v ? this.items[i].id : null)
      .filter(v => v !== null);
    console.log(result);
    console.log(this.model);
  }
}
