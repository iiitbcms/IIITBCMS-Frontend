import { Component, OnInit } from '@angular/core';
import {PostModel} from "../shared/post-model";
import {PostService} from "../shared/post.service";
import { NavbarComponent } from 'app/navbar/navbar.component';
import { Router } from '@angular/router';
// import {banner} from "../../assets/banner.svg";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  posts: Array<PostModel> = [];

  constructor(private postService: PostService, private router:Router,) {
  }


  async ngOnInit(): Promise<void>
  {
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
  }

  signup()
  {
    window.location.href="sign-up";
  }

  register()
  {
    window.location.href="login";
  }

}
