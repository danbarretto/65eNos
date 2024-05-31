import { Injectable } from "@angular/core";
import { articles } from '../assets/content/articles.json'

export type NewsArticle = {
    id: string,
    title: string,
    subtitle: string,
    imagePath: string,
    audioPath: string,
    content: string,
    commentTopic: string,
    imageAlt: string
}

@Injectable({ providedIn: 'root' })
export class NewsService {

    getNewsArticle(id: string) {
        return articles.find(art => art.id === id)
    }

    getArticles() {
        return articles
    }

}