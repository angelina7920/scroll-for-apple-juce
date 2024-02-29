import { Component, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  constructor(public scrollService: ScrollService) {}

  posts: any = [];

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.scrollService
      .getPostsByPage()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(this.posts);
        },
      });
  }

  private countPage = 2;
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.countPage++;
      this.scrollService.page$.next(this.countPage);
      this.getPosts();

      console.log(this.countPage);
    }
  }
}
