import { ApiRequestType, ApiResponseType, ErrorResponsePayload } from '@vladbasin/strong-api-middleware';
import { Result } from '@vladbasin/ts-result';

export interface IFunction<TRequestPayload, TResponseDataPayload, TResponseErrorPayload = ErrorResponsePayload> {
    executeAsync(
        request: ApiRequestType<TRequestPayload>
    ): Result<ApiResponseType<TResponseDataPayload, TResponseErrorPayload>>;
}
