import { Component } from '@angular/core';
import { Post } from '../post';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
// Gọi phương thức find từ PostService để lấy thông tin bài viết.
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });

    this.form = new FormGroup({ // Khởi tạo FormGroup với các điều khiển.
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required),
    });
  }

  get f() { // Phương thức để lấy giá trị từ form.
    return this.form.controls;
  }
  // Phương thức xử lý giá trị từ form và gửi lên server để cập nhật bài viết.
  submit() {
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res: any) => {
      alert('Data Update Successfull !');
      this.router.navigateByUrl('post/index');
    });
  }
}
