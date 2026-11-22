import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { pipe, refCount, shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class MovieService {

    private readonly http=inject(HttpClient);
    private readonly url=environment.url_api
    private readonly key=environment.api_key
    private readonly movieUrl=environment.url_movie_api

    public movieList = signal<Movie[]>([]);
    public selectedMovie=signal<Movie | null>(null);
    public wishList = signal<Movie[]>(JSON.parse(localStorage.getItem('wishlist') ?? '[]'));


    getMovieList():Observable<Movie[]>{
        return this.http.get<MovieResponse>(
            `${this.url}now_playing?api_key=${this.key}`).pipe(
                map(response=> response.results),
                shareReplay({bufferSize: 1, refCount: true})
            );
}
    set(movie: Movie | null) {
        this.selectedMovie.set(movie);
    }
    getMovieById(id:number):Observable<Movie>{
        return this.http.get<Movie>(
            `${this.movieUrl}${id}?api_key=${this.key}`
        );
    }
    addToWishList(movie: Movie | null) {
        if (!movie || this.wishList().some(m => m.id === movie.id)) return;
        this.wishList.update(wishList => [...wishList, movie]);
        localStorage.setItem('wishlist',JSON.stringify(this.wishList()));
    }
    

}
