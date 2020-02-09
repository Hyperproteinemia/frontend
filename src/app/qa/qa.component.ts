import {Component, OnInit} from '@angular/core';
import {QaService} from '../services/qa.service';
import {Question} from '../entities/question';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.less']
})
export class QaComponent implements OnInit {

  questions: Question[];
  newQuestionOpened = false;
  questionText = '';

  constructor(private qaService: QaService,
              public auth: AccountService) {
  }

  ngOnInit() {
    this.qaService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  openModal(event: MouseEvent) {
    this.questionText = '';
    this.newQuestionOpened = true;
  }

  submitQuestion(event: MouseEvent) {
    this.qaService.createQuestion(this.questionText).subscribe(res => {
      this.newQuestionOpened = false;
      this.qaService.getQuestions().subscribe(questions => {
        this.questions = questions;
      });
    });
  }
}
