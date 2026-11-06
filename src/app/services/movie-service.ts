import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { pipe } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class MovieService {

    private readonly http=inject(HttpClient);
    private readonly url=environment.url_api
    private readonly key=environment.api_key

    public movieList: Movie[]= []

    getMovieList():Observable<Movie[]>{
        return this.http.get<MovieResponse>(
            `${this.url}now_playing?api_key=${this.key}`).pipe(
                map(response=> response.results)
            )
}

}
