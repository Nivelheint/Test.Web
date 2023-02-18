export interface Advertisement {
  id: number;
  authorId: number;
  author: string;
  title: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
  startDate: string;
  finishedDate: string;
}

export interface AdvertisementResponse {
  result: Advertisement[],
  pageInfo: {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
}
