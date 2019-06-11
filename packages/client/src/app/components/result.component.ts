import { keys } from 'lodash';
import { Component, Input } from '@angular/core';
import { TestResult } from '@survey-non-tech/shared';

const quanlityLimit = 66;

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() data: TestResult;

  getStrong(): string[] {
    return this.getQualityResult('rightPercent');
  }

  getWeak(): string[] {
    return this.getQualityResult('wrongPercent');
  }

  doesNotCompleted(): boolean {
    return !this.data;
  }

  private getQualityResult(what: string) {
    const result = [];
    const tags = keys(this.data.resultByTags);
    for (const tag of tags) {
      if (this.data.resultByTags[tag][what] > quanlityLimit) {
        result.push(tag);
      }
    }
    return result;
  }
}
