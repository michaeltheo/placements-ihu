import { ErrorResponse, Message } from "@/types";

export function isError(
  response: Message | ErrorResponse,
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}
