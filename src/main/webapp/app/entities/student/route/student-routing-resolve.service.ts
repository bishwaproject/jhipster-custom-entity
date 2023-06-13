import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudent } from '../student.model';
import { StudentService } from '../service/student.service';

@Injectable({ providedIn: 'root' })
export class StudentRoutingResolveService implements Resolve<IStudent | null> {
  constructor(protected service: StudentService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudent | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((student: HttpResponse<IStudent>) => {
          if (student.body) {
            return of(student.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
