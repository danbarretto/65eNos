import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService, CustomValidators, UserModel } from '../../services/authentication.service';

export type Comment = {
  userName: string,
  comment: string,
  date: string,
  id: string
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

  addComent() {
    const date = new Date()
    const dateStr = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

    this.comments.unshift({
      comment: this.comment,
      id: crypto.randomUUID(),
      userName: this.currentUser?.getFullName() ?? 'User',
      date: dateStr
    })
    this.comment = ''
  }

}
