import { EventEmitter, Injectable } from "@angular/core";
import { articles } from '../assets/content/articles.json'
import { BehaviorSubject, Subject } from "rxjs";

export type NewsArticle = {
    id: string,
    title: string,
    subtitle: string,
    imagePath: string,
    audioPath: string,
    summary: string,
    content: string,
    commentTopic: string,
    imageAlt: string,
    category: Category,
    publicationDate: string
}

export type Category = 'saúde' | 'bem-estar' | 'dicas' | 'social'

@Injectable({ providedIn: 'root' })
export class NewsService {

    onCategoryCleared = new EventEmitter<void>()

    usedArticles: NewsArticle[] = articles as NewsArticle[]
    private _articles$ = new BehaviorSubject<NewsArticle[]>(articles as NewsArticle[])
    query: string;
    get articles$() {
        return this._articles$.asObservable()
    }

    currentCat: Category;

    getNewsArticle(id: string): NewsArticle {
        return articles.find(art => art.id === id) as NewsArticle
    }

    clearCategory() {
        this.currentCat = undefined
        this.resetArticles()
        this.onCategoryCleared.emit()
    }

    resetArticles() {
        if (this.currentCat) {
            this.filterByCategory(this.currentCat)
            return
        }
        this.usedArticles = articles as NewsArticle[]
        this._articles$.next(this.usedArticles)
    }

    filterByCategory(category: Category) {
        this.currentCat = category
        this.usedArticles = articles.filter(art => art.category === category) as NewsArticle[]
        if (this.query !== '') {
            this.searchArticle(this.query)
            return
        }
        this._articles$.next(this.usedArticles)
    }

    getSortedByPublicationDate(): void {
        const sortedArticles = this.usedArticles.sort((a, b) => {
            return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        });
        this._articles$.next(sortedArticles);
    }

    searchArticle(query: string) {
        this.query = query
        if (query === '') {
            this.resetArticles()
            return
        }
        query = query.toLowerCase()
        const arts = this.usedArticles.filter(art =>
            art.title.toLowerCase().includes(query) ||
            art.content.toLowerCase().includes(query) ||
            art.subtitle.toLowerCase().includes(query))
        this._articles$.next(arts as NewsArticle[])
    }

}