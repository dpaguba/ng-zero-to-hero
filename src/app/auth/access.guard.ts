import { inject } from "@angular/core"
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const canActiveAuth = () => {
    const isLoggedIn: boolean= inject(AuthService).isAuthenticated; 

    return isLoggedIn ? true : inject(Router).createUrlTree(['/login']);
}