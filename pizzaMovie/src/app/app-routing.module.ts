import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './pages/preview/preview.component';
import { HomeComponent } from './pages/home/home.component';
import { PopularComponent } from './pages/home/components/popular/popular.component';
import { GoHomeGuard } from './guards/go-home.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GoPreviewGuard } from './guards/go-preview.guard';
import { PlayComponent } from './pages/play/play.component';


const routes: Routes = [
  { path: '', component: PreviewComponent, canActivate: [GoPreviewGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [GoPreviewGuard]},
  { path: 'home', component: HomeComponent, canActivate: [GoHomeGuard]},
  { path: 'play', component: PlayComponent, canActivate: [GoHomeGuard]},
  { path: 'about-us', component: AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }