import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, catchError } from 'rxjs';

import { JwtService } from './jwt.service';
import { map, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>('/users/login', { ...credentials })
      .pipe(tap((user) => this.setAuth(user)));
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<User>('/users/register', { ...credentials })
      .pipe(
        tap(( user ) => this.setAuth(user)),
      );
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/user/GetCurrentUser').pipe(
      tap({
        next: (user) => this.setAuth(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay()
    );
  }

  // update(user: Partial<User>): Observable<{ user: User }> {
  //   return this.http.put<{ user: User }>("/user", { user }).pipe(
  //     tap(({ user }) => {
  //       this.currentUserSubject.next(user);
  //     })
  //   );
  // }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
