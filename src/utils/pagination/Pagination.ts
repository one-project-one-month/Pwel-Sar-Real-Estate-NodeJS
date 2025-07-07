type sublingPage = {
  page: number;
  limit: number;
};

class Pagination<T extends object[]> {
  public page: number = 1;
  public totalPage: number = 1;
  public limit: number = 10;
  public totalCount: number = 1;
  public startIdx;
  public endIdx;
  public count: number = 0;

  public paginatedData: T | [] = [];
 
  public nextPage: sublingPage | null = null;
  public prevPage: sublingPage | null = null;
  public startPage: sublingPage | null = { page: 1, limit: this.limit };
  public endPage: sublingPage | null = { page: 1, limit: this.limit };

  constructor(page: number, limit: number, totalCount: number, data: T) {
    this.page = !page || page < 1 ? this.page : page;

    this.limit = !limit || limit < 1 ? this.limit : limit;
    this.totalCount = totalCount < 1 ? this.totalCount : totalCount;

    this.totalPage = Math.ceil(this.totalCount / this.limit);
    this.paginatedData = data;

    this.count =
      this.page <= this.totalPage
        ? this.page !== this.totalPage
          ? this.limit
          : this.totalCount % this.limit || this.limit
        : 0;
    this.startIdx = (this.page - 1) * this.limit;
    this.endIdx =
      this.page === this.totalPage ? this.totalCount : this.page * this.limit;

    this.prevPage =
      this.page - 1 <= 0 ? null : { page: this.page - 1, limit: this.limit };
    this.nextPage =
      this.page >= this.totalPage
        ? null
        : { page: this.page + 1, limit: this.limit };
    this.endPage = {
      page: this.totalPage,
      limit: this.limit,
    };
    this.startPage = {
      page: 0,
      limit: this.limit,
    };
  }

  static new<T extends object[]>(
    page: number,
    limit: number,
    totalCount: number,
    data: T
  ) {
    return new Pagination<T>(page, limit, totalCount, data);
  }

  getResult() {
    return this;
  }
}

export default Pagination;