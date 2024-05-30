import { Injectable } from "@angular/core";
import * as articles from '../assets/content/articles.json'

export type NewsArticle = {
    id: number,
    title: string,
    subtitle: string,
    imagePath: string,
    audioPath: string,
    content: string
}

@Injectable({ providedIn: 'root' })
export class NewsService {

    getNewsArticle(id: string): NewsArticle {
        return articles[id]
    }

}