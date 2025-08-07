import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { PostInputComponent } from "../post-input/post-input.component";

@Component({
    selector: 'app-post-feed',
    standalone: true,
    templateUrl: './post-feed.component.html',
    styleUrl: './post-feed.component.scss',
    imports: [PostComponent, PostInputComponent]
})
export class PostFeedComponent {

}
