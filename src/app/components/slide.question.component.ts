import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { IQuestion, CHECKBOXES, RADIOBUTTON } from '../common/question.desc';

@Component({
  selector: 'slide-question',
  templateUrl: './slide.question.component.html',
  styleUrls: ['./slide.question.component.css']
})
export class SlideQuestionComponent implements OnInit {
  @Input() content: IQuestion;
  form: FormGroup;
  items = [];
  model = { option: '' };
  readonly Checkboxes: string;
  readonly RadioButton: string;

  constructor(private formBuilder: FormBuilder) {
    this.Checkboxes = CHECKBOXES;
    this.RadioButton = RADIOBUTTON;
  }

  ngOnInit() {
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
