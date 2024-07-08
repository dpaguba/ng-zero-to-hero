import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom, map } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [SvgIconComponent, CommonModule, RouterModule, RouterLinkActive, RouterLink, SubscriberCardComponent, ImgUrlPipe]
})
export class SidebarComponent {

  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      icon: 'home',
      label: 'Home',
      link: 'profile/me'
    },
    {
      icon: 'chats',
      label: 'Chats',
      link: 'chats'
    },
    {
      icon: 'search',
      label: 'Search',
      link: 'search'
    },
  ]

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())
    
  }

}
