import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './pages/preview/preview.component';
import { HomeComponent } from './pages/home/home.component';
import { GoHomeGuard } from './guards/go-home.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [GoHomeGuard]},
  { path: 'about-us', component: AboutUsComponent, canActivate: [GoHomeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }