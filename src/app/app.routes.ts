import { Routes } from '@angular/router';
import { MovieDetail } from './components/movie-detail/movie-detail';
import { MovieList } from './components/movie-list/movie-list';
import { Wishlist } from './components/wish-list/wish-list';


export const routes: Routes = [
    { path: '', component: MovieList },
    { path: 'wishlist', component: Wishlist },
    { path: ':id', component: MovieDetail } ,
    { path : '**', redirectTo: '' ,pathMatch : 'full'}
];
