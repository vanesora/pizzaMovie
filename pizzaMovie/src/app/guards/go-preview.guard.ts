import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GoPreviewGuard implements CanActivate {

  constructor(
    public storageService: StorageService,
    private router: Router,
  ) { }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.storageService.getValue('session')) {
        return true
      } else {
        this.storageService.setValue('page', 'Home')
        this.router.navigate(['/home']);
      }
      return false
  }
  
}
