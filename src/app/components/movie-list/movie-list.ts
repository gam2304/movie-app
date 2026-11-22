import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';


@Component({
  imports: [],
  selector: 'app-movie-list',
  styleUrl: './movie-list.css',
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  router = inject(Router);
  movieService = inject(MovieService);
  ngOnInit(): void {

    this.movieService.getMovieList().subscribe(
      Response => {this.movieService.movieList.set(Response)},
    )
  }
  navigateTo(Movie: Movie) {
    this.router.navigate([Movie.id]);
  }
}
