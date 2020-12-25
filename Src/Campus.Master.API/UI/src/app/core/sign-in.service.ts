import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticatedUser } from '../auth/shared/models/authenticated-user';
import { HttpClient } from '@angular/common/http';
import { StateTransfer } from '../models/state-transfer';
import { ProfileInformation } from '../auth/shared/models/profile-information';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SignInService {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  login(user: AuthenticatedUser): Observable<StateTransfer> {
    return this.http.post<StateTransfer>(environment.authenticateProfile, user);
  }

  getProfileInformation(): Observable<ProfileInformation> {
    return this.http.get<ProfileInformation>(environment.getProfileInformation);
  }

  isAuthenticated(): Observable<boolean> {
    return this.getProfileInformation().pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(['']);
        this.toastr.error('Your are not authorized', '401');
        return of(false);
      })
    );
  }
}
