import type { ApiResponse, Meta } from '@/types';
import type { ResponseMessages, ResponseStatus } from './response-status.enum';

export function generateApiResponse<T>(
  status: ResponseStatus,
  message: ResponseMessages,
  data: T[],
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
): ApiResponse<T> {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const meta: Meta = {
    totalItems,
    itemCount: data.length,
    itemsPerPage,
    totalPages,
    currentPage,
    timestamp: new Date().toISOString(),
  };

  return {
    status,
    message,
    data,
    meta,
  };
}