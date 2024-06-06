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
    category: Category,
    publicationDate: string
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

    getSortedByPublicationDate(): void {
        const sortedArticles = [...this._articles$.getValue()].sort((a, b) => {
            return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        });
        this._articles$.next(sortedArticles);
    }

    searchArticle(query: string) {
        if (query === '') {
            this.resetArticles()
            return
        }
        query = query.toLowerCase()
        const arts = articles.filter(art =>
            art.title.toLowerCase().includes(query) ||
            art.content.toLowerCase().includes(query) ||
            art.subtitle.toLowerCase().includes(query))
        this._articles$.next(arts as NewsArticle[])
    }

}