import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'app/shared/post-model';
import { PostService } from 'app/shared/post.service';
import { VotePayload } from 'app/shared/vote-button/vote-payload';
import { VoteType } from 'app/shared/vote-button/vote-type';
import { VoteService } from 'app/shared/vote.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-comm-posts',
  templateUrl: './comm-posts.component.html',
  styleUrls: ['./comm-posts.component.css']
})
export class CommPostsComponent implements OnInit {

  @Input() post: PostModel | any;

  votePayload: VotePayload;

  constructor(private postService: PostService,private localStorage:LocalStorageService,
    private voteService: VoteService,) { this.votePayload = {
      voteType: undefined,
      postId: undefined,
      userEmail : "" }
    }

  navigate : string = "";
  role : string = "";
  posts: PostModel[] | any;
  name : string = ""
  id=0;
  post_id : number = -1;

  async ngOnInit(): Promise<void>
  {
    this.name = this.localStorage.retrieve('name');
    this.role = this.localStorage.retrieve("role");
    this.id = this.localStorage.retrieve("id");
    // const res : any = await this.postService.getAllPostsByComm(this.id).toPromise();
    const res : any = await this.postService.getAllPosts().toPromise();
    this.posts = res;
    console.log(res);
    this.post_id = res[0].postId;
    console.log(this.post_id);
    this.refreshRole();
  }

  refreshRole()
  {
    console.log("this is header ",this.role)
    if(this.role == 'student')
    {
      this.navigate = "studHome";
    }
    else if(this.role == 'committee')
    {
      this.navigate = "commHome";
    }
    else if (this.role == 'admin')
    {
      this.navigate = "adminHome";
    }
  }


  upvotePost(postId:any)
  {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote(postId);
  }

  downvotePost(postId:any)
  {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote(postId);
  }

  private vote(postId:any)
  {
    this.votePayload.postId = postId;
    this.votePayload.userEmail = this.localStorage.retrieve("email");
    console.log("vote type is ",this.votePayload);
    console.log("post id is ",postId);
    this.voteService.vote(this.votePayload).subscribe(() =>
    {
      // this.updateVoteDetails();
      this.ngOnInit();
    },
    error =>
    {
      alert("could not vote");
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

  viewPost(postId:string)
  {
    this.localStorage.store('postId',postId);
    window.location.href = "view-post";
  }

  navigateTo(value:number)
  {
    if(value==1)
      window.location.href = this.navigate;
    else if(value==2)
      window.location.href = "create-post";


  }

}
