import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg.component';

@Component({
    selector: 'app-profile-header',
    standalone: true,
    templateUrl: './profile-header.component.html',
    styleUrl: './profile-header.component.scss',
    imports: [ImgUrlPipe, CommonModule, SvgIconComponent]
})
export class ProfileHeaderComponent {

  profile = input<Profile>()

}
