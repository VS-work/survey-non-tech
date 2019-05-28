import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { IQuestion, CHECKBOXES, RADIOBUTTON } from '../common/question.desc';

@Component({
  selector: 'slide-question',
  templateUrl: './slide.question.component.html',
  styleUrls: ['./slide.question.component.css']
})
export class SlideQuestionComponent implements OnDestroy {
  @Input() intervalValue: number;
  @Output() answer: EventEmitter<string | string[]> = new EventEmitter();
  @Output() remain: EventEmitter<number> = new EventEmitter();
  form: FormGroup;
  items = [];
  model: { option: string };
  readonly Checkboxes: string;
  readonly RadioButton: string;
  private _content: IQuestion;
  private questInterval;
  private timerInterval;
  private restTime: number;

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

  ngOnDestroy() {
    this.clearIntervals();
  }

  fillItems() {
    this.restTime = this.intervalValue / 1000;
    this.model = { option: '' };
    this.form = this.formBuilder.group({
      items: new FormArray([])
    });
    this.items = this.content.answers.map(answer => ({ id: answer, name: answer }));
    this.items.map(() => {
      const control = new FormControl(false);
      (this.form.controls.items as FormArray).push(control);
    });
    this.clearIntervals();
    this.questInterval = setInterval(async () => {
      this.submit();
    }, this.intervalValue);
    this.timerInterval = setInterval(() => {
      this.remain.emit(--this.restTime);
    }, 1000);
  }

  submit() {
    const result = this.form.value.items
      .map((v, i) => v ? this.items[i].id : null)
      .filter(v => v !== null);
    this.answer.emit(this.content.config.type === this.RadioButton ? this.model.option : result);
    this.clearIntervals();
  }

  private clearIntervals() {
    if (this.questInterval) {
      clearInterval(this.questInterval);
      this.questInterval = null;

    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
