import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService, UserModel } from '../../services/authentication.service';
import { ErrorStateMatcher } from '@angular/material/core';

export type Comment = {
  userName: string,
  comment: string,
  date: string,
  id: string
}

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class CommentSectionComponent implements OnInit {

  @Input() commentTopic: string
  commentFormControl = new FormControl('', [() => !this.currentUser ? { 'invalid': true } : null])

  commentErrorMatcher = new CustomErrorStateMatcher();

  currentUser: UserModel

  comments: Comment[] = [
    {
      id: '1',
      comment: 'Eu faço muitos amigos no forró',
      userName: 'Maria Berlinda',
      date: '30/05/2024'
    },
    {
      id: '2',
      comment: 'Eu gosto de tartarugas',
      userName: 'José Inácio',
      date: '24/04/2024'
    }
  ]

  comment: string = ''

  constructor(private authService: AuthenticationService) { }


  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser()
  }

  canComment(): boolean {
    return this.comment !== '' && this.currentUser !== undefined && this.currentUser.isValid();
  }

  addComent() {
    if (!this.canComment()) {
      return;
    }

    const date = new Date()
    const dateStr = date.toLocaleDateString('pt-BR')

    this.comments.unshift({
      comment: this.comment,
      id: crypto.randomUUID(),
      userName: this.currentUser?.getFullName() ?? 'User',
      date: dateStr
    })
    this.comment = ''
  }

}
