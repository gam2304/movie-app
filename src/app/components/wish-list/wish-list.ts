import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class Wishlist {
movieService=inject(MovieService)
router = inject(Router)
  navigateTo(id:number){
    this.router.navigate(['', id])
  }
}