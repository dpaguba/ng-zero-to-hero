import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg.component';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
    imports: [ProfileHeaderComponent, CommonModule, SvgIconComponent, RouterLink, ImgUrlPipe, PostFeedComponent]
})
export class ProfilePageComponent {

  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList(5)
  route = inject(ActivatedRoute)
  
  profile$ = this.route.params
    .pipe(
      switchMap(({id}) =>{
        if(id === 'me'){
          return this.profileService.getMe();
        }else{
          return this.profileService.getAccount(id);
        }
      })
    )

}
