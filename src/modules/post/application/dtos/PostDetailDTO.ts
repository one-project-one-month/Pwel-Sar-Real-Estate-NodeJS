export class PostDetailDTO {
  id!: number;
  constructor(data: Partial<PostDetailDTO>) {
    Object.assign(this, data);
  }
}
