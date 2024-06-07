import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ToggleMenuService {

    private _toggle$ = new Subject<void>()
    public get toggle$() {
        return this._toggle$.asObservable()
    }

    toggleMenu() {
        this._toggle$.next()
    }
}