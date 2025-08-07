import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs/internal/observable/throwError";
import { BehaviorSubject, catchError, filter, switchMap, tap } from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false)

export const authTokenInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    const authService: AuthService = inject(AuthService)
    const token: string | null  = authService.token;

    if(!token) return next(req)

    if(isRefreshing$.value) return refreshaAndRetry(authService, req, next)

    req = addToken(req, authService.token!)
    
    return next(req).pipe(
        catchError((err) => {
            if(err.status === 403){
                return refreshaAndRetry(authService, req, next)
            }
            return throwError(err)
        })
    )

}

const refreshaAndRetry = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    if (!isRefreshing$.value) {
        isRefreshing$.next(true);
        return authService.refreshToken().pipe(
            switchMap(() => {
                req = addToken(req, authService.token!)
                return next(req).pipe(
                    tap(()=>{
                        isRefreshing$.next(false)
                    })
                )
            })
        )
    }

    if (req.url.includes('refresh')) {
        return next(addToken(req, authService.token!))
    }

    return isRefreshing$.pipe(
        filter(isRefreshing => !isRefreshing),
        switchMap(() => next(addToken(req, authService.token!)))
    )
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}