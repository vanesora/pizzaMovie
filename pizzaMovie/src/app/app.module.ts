import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { PlayComponent } from './pages/home/components/play/play.component';
import { FavoritesComponent } from './pages/home/components/favorites/favorites.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { UploadMovieComponent } from './pages/home/components/upload-movie/upload-movie.component';
import { LoginComponent } from './shared/components/header/components/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PopUpComponent } from './shared/components/pop-up/pop-up.component';
import { StikyComponent } from './shared/components/stiky/stiky.component';

import { MatDialogModule, MatDialogRef, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatCardModule } from '@angular/material';

import { BuypizzaComponent } from './shared/components/pay/buypizza.component';
import { PayComponent } from './shared/components/pay/pay.component';
import { PSEComponent } from './shared/components/pay/pse/pse.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { DataApiService } from './shared/services/data-api.service';
import { StorageService } from './shared/services/storage.service';
import { GoHomeGuard } from './guards/go-home.guard';
import { GoPreviewGuard } from './guards/go-preview.guard';
import { LastReleasesComponent } from './pages/home/components/last-releases/last-releases.component';
import { PizzaComponent } from './pages/home/components/pizza/pizza.component';
import { ProfileComponent } from './pages/home/components/profile/profile.component';
import { EditMovieComponent } from './pages/home/components/edit-movie/edit-movie.component';
import { PopularComponent } from './pages/home/components/popular/popular.component';
import { TermsComponent } from './pages/register/terms/terms.component';

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
    LastReleasesComponent,
    PizzaComponent,
    ProfileComponent,
    EditMovieComponent,
    PopUpComponent,
    PopularComponent,
    TermsComponent
  ],
  entryComponents: [
    LoadingComponent,
    PSEComponent,
    PayComponent,
    BuypizzaComponent,
    LoginComponent,
    PopUpComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HttpClientModule,
    NgbModule,
    MatCardModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    DataApiService,
    StorageService,
    GoHomeGuard,
    GoPreviewGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
