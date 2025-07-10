"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pagination {
    constructor(page, limit, totalCount, data) {
        this.page = 1;
        this.totalPage = 1;
        this.limit = 10;
        this.totalCount = 1;
        this.count = 0;
        this.paginatedData = [];
        this.nextPage = null;
        this.prevPage = null;
        this.startPage = { page: 1, limit: this.limit };
        this.endPage = { page: 1, limit: this.limit };
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
    static new(page, limit, totalCount, data) {
        return new Pagination(page, limit, totalCount, data);
    }
    getResult() {
        return this;
    }
}
exports.default = Pagination;
