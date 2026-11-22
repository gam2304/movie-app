import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MovieService } from '../../services/movie-service';

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  protected movieService=inject(MovieService)
  
  ngOnInit(): void {
    
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieById(id!)
      })).subscribe(movie=>this.movieService.set(movie))
  }
  backToMovieList() {
    this.router.navigate(['/']);
  }
  addToWishList() {
    this.movieService.addToWishList(this.movieService.selectedMovie());
}
}
