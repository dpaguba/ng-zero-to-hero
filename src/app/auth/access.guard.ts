import { inject } from "@angular/core"
import { AuthServiceService } from "./auth-service.service";
import { Router } from "@angular/router";

export const canActiveAuth = () => {
    const isLoggedIn: boolean= inject(AuthServiceService).isAuthenticated; 

    return isLoggedIn ? true : inject(Router).createUrlTree(['/login']);
}