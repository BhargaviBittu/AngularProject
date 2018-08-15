
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
  toAddAnswer = false;
  snack_message: string;
  question_text: string;
  answer_text: string;
  viewsnack: boolean;
  list_of_questions: any;
  list_of_answers: any;
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
// Function : submitting the questions
  postQuestion() {
    console.log(this.userInfo) ;
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
  // Function : List of Questions
  getQuestion() {
    this.service.getQuestion().then((result) => {
      if (result.success) {
        this.list_of_questions = result.questionList;
        this.list_of_answers = null;
        this.snack_message = ' Questions list';
      } else {
        this.snack_message = result.message;
      }
    });
    this.viewsnack = true;
    setTimeout(() => {
      this.viewsnack = false;
    }, 2500);
  }
  // Function : User questions
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

  // Function : Retrieving all answers
  getAnswers() {
    this.service.getAnswers().then((result) => {
      if (result.success) {
        this.list_of_answers = result.AnswerList;
        this.list_of_questions = null;
        this.snack_message = ' Ans Submitted successfully';
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
  // Function : Posting the answer
  postAnswer() {
    const data = {
    ID: this.question_details.ID, Answer: this.answer_text ,
    FirstName: this.question_details.FirstName , Question: this.question_details.Question
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
// Function : Delete the unwanted questions
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
