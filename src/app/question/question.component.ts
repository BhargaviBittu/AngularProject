import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() userInfo;
  toAddQuestion = false;
  snack_message: string;
  viewsnack: boolean;
  question_text: string;
  list_of_questions: any;
  answer_text: string;
  toAddAnswer = false;
  question_details: any;
  constructor(private service: Service) { }

  ngOnInit() {
    console.log(this.userInfo);
  }

  addQuestion() {
    this.toAddQuestion = true;
  }
  close() {
    this.toAddQuestion = false;
  }

  postQuestion() {
    const data = {
      FirstName: this.userInfo.FirstName, LastName: this.userInfo.LastName, Email: this.userInfo.Email,
      Question: this.question_text
    };
    this.service.postQuestion(data).then((result) => {
      if (result.success) {
        this.snack_message = ' Question Submitted successfully';
      } else {
        this.snack_message = result.message;
      }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);
  }

  getQuestion() {
    this.service.getQuestion().then((result) => {
      if (result.success) {
        this.list_of_questions = result.questionList;
        this.snack_message = ' Question Submitted successfully';
      } else {
        this.snack_message = result.message;
      }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);
  }

  getMyQuestion(name) {
    const data = { FirstName: name };
    this.service.getMyQuestion(data).then((result) => {
      if (result.success) {
        this.list_of_questions = result.questionList;
        this.snack_message = ' My Question Submitted successfully';
      } else {
        this.snack_message = result.message;
      }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);
  }

  answerQuestion(question_details) {
    this.toAddAnswer = true;
    this.question_details = question_details;
  }

  postAnswer() {
    const data = {
      ID: this.question_details.ID, Answer: this.answer_text
    };
    this.service.postAnswer(data).then((result) => {
      if (result.success) {
        this.snack_message = ' Answer Submitted successfully';
      } else {
        this.snack_message = result.message;
      }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);
  }

deleteQuestion(list) {
  const data = {
    ID: list.ID
  };
  this.service.deleteQuestion(data).then((result) => {
    if (result.success) {
      this.snack_message = ' Question deleted successfully';
    } else {
      this.snack_message = result.message;
    }
  });
  this.viewsnack = true;
  setTimeout(() => {
    this.viewsnack = false;
  }, 2500);
}
}