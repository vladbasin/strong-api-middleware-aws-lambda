import { ErrorResponsePayload, handleStrongApiRequest } from '@vladbasin/strong-api-middleware';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Result } from '@vladbasin/ts-result';
import { RawApiRequestType } from '@vladbasin/strong-api-mapping';
import { HandleApiRequestOptionsType } from './types';
import { formatResponse } from '.';

export const handleStrongApiLambdaRequest = <
    TRequestPayload,
    TResponseDataPayload,
    TResponseErrorPayload = ErrorResponsePayload
>(
    options: HandleApiRequestOptionsType<TRequestPayload, TResponseDataPayload, TResponseErrorPayload>
) => {
    return (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        return handleStrongApiRequest<TRequestPayload>({
            request: {
                provideRaw: () =>
                    Result.Ok<RawApiRequestType>({
                        queryParams: event.queryStringParameters,
                        multiValueQueryParams: event.multiValueQueryStringParameters,
                        headers: event.headers,
                        multiValueHeaders: event.multiValueHeaders,
                        pathParams: event.pathParameters,
                        body: event.body,
                    }),
                payload: options.request.payload,
                handle: request => options.function.executeAsync(request),
            },
            response: options.response,
        })
            .onSuccess(response => formatResponse(response.raw))
            .asPromise();
    };
};
