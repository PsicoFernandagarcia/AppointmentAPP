import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor(private http: HttpClient) {

  }

  public getJSON(lang:string): Observable<any> {
      return this.http.get(`../../assets/resources/lang-${lang}.json`);
  }

  public getImage():Observable<any>{
    return this.http.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=10&mkt=es-ES');
  }
}
