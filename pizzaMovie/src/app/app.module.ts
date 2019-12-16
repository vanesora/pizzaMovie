import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { PlayComponent } from './pages/home/components/play/play.component';
import { FavoritesComponent } from './pages/home/components/favorites/favorites.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { UploadMovieComponent } from './pages/home/components/upload-movie/upload-movie.component';
import { LoginComponent } from './pages/preview/components/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PopUpComponent } from './shared/components/pop-up/pop-up.component';
import { StikyComponent } from './shared/components/stiky/stiky.component';
import { MatDialogModule, MatDialogRef, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule } from '@angular/material';
import { BuypizzaComponent } from './shared/components/pay/buypizza.component';
import { PayComponent } from './shared/components/pay/pay.component';
import { PSEComponent } from './shared/components/pay/pse/pse.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    PreviewComponent,
    PlayComponent,
    FavoritesComponent,
    AboutUsComponent,
    UploadMovieComponent,
    LoginComponent,
    FooterComponent,
    LoadingComponent,
    PopUpComponent,
    StikyComponent,
    PayComponent,
    BuypizzaComponent,
    PSEComponent,
    MenuComponent,
    HeaderComponent,
  ],
  entryComponents: [
    LoadingComponent,
    PSEComponent,
    PayComponent,
    BuypizzaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
