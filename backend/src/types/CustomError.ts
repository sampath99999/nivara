export interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  stack?: string;
}