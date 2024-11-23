import type {
  ResponseMessages,
  ResponseStatus,
} from '@/utils/response-status.enum';

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  status: ResponseStatus;
  statusCode: number;
  message: ResponseMessages;
  data: T[];
  meta: Meta;
}

export interface Pagination {
  page: number;
  limit: number;
}
