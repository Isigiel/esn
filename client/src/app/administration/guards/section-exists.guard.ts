import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SectionService } from '@esn/client/core/services';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SectionExistsGuard implements CanActivate {
  constructor(private sectionService: SectionService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.sectionService
      .getByKey(next.paramMap.get('id'))
      .pipe(map(section => !!section));
  }
}
