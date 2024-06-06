import { Injectable } from "@angular/core";
import { articles } from '../assets/content/articles.json'
import { BehaviorSubject, Subject } from "rxjs";

export type NewsArticle = {
    id: string,
    title: string,
    subtitle: string,
    imagePath: string,
    audioPath: string,
    content: string,
    commentTopic: string,
    imageAlt: string,
    category: Category
}

export type Category = 'saúde' | 'bem-estar' | 'dicas' | 'social'

@Injectable({ providedIn: 'root' })
export class NewsService {

    private _articles$ = new BehaviorSubject<NewsArticle[]>(articles as NewsArticle[])
    get articles$() {
        return this._articles$.asObservable()
    }

    getNewsArticle(id: string): NewsArticle {
        return articles.find(art => art.id === id) as NewsArticle
    }

    resetArticles() {
        this._articles$.next(articles as NewsArticle[])
    }

    filterByCategory(category: Category) {
        this._articles$.next(articles.filter(art => art.category === category) as NewsArticle[])
    }

}