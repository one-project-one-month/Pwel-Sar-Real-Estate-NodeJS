interface sublingPage {
  limit: number;
  page: number;
}

class Pagination<T extends object[]> {
  public count = 0;
  public endIdx;
  public limit = 10;
  public endPage: null | sublingPage = { limit: this.limit, page: 1 };
  public nextPage: null | sublingPage = null;
  public page = 1;
  public paginatedData: [] | T = [];

  public prevPage: null | sublingPage = null;

  public startIdx;
  public startPage: null | sublingPage = { limit: this.limit, page: 1 };
  public totalCount = 1;
  public totalPage = 1;

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
      this.page - 1 <= 0 ? null : { limit: this.limit, page: this.page - 1 };
    this.nextPage =
      this.page >= this.totalPage
        ? null
        : { limit: this.limit, page: this.page + 1 };
    this.endPage = {
      limit: this.limit,
      page: this.totalPage,
    };
    this.startPage = {
      limit: this.limit,
      page: 0,
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
