import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../api/Shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private _sharedService: SharedService, 
      private _router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    if (!this._sharedService.obtenerUsuarioLogin() == null) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}