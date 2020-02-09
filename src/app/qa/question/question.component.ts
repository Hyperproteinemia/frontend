import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QaService} from '../../services/qa.service';
import {Question} from '../../entities/question';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent implements OnInit {
  public question: Question;
  newAnswerOpened = false;
  answerText = '';

  constructor(private route: ActivatedRoute,
              private qaService: QaService,
              public auth: AccountService) {
  }

  id: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.qaService.getQuestion(params.id).subscribe(question => {
        this.question = question;
      });
    });
  }

  submitAnswer(event: MouseEvent) {
    this.qaService.postAnswer(this.answerText, this.question.id).subscribe(res => {
      this.newAnswerOpened = false;
      this.qaService.getQuestion(this.id).subscribe(question => {
        this.question = question;
      });
    });
  }
}
