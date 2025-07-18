export class PostFilterDTO {
  cursor?: string;
  maxPrice?: number;
  minPrice?: number;
  postType?: string;
  propertyType?: string;
  region?: string;
  search?: string;
  street?: string;
  take?: number;
  township?: string;

  constructor(data: Partial<PostFilterDTO>) {
    Object.assign(this, data);
  }
}
