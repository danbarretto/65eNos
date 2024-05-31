import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';

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
  imports: [MaterialModule, FormsModule],
  standalone: true
})
export class CommentSectionComponent {

  @Input() commentTopic: string

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

  constructor() { }


  addComent() {
    const date = new Date()
    const dateStr = `${date.getDate()}/${String(date.getMonth()+1).padStart(2, '0')}/${date.getFullYear()}`

    this.comments.unshift({
      comment: this.comment,
      id: crypto.randomUUID(),
      userName: 'USER NAME',
      date: dateStr
    })
    this.comment = ''
  }

}
