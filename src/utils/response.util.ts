import type { ResponseMessages, ResponseStatus } from '@/constants';
import type { ApiResponse, Meta } from '@/types';

export function generateApiResponse<T>(
  status: ResponseStatus,
  message: ResponseMessages,
  data: T[],
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
  statusCode: number = 200,
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
    statusCode,
    message,
    data,
    meta,
  };
}
