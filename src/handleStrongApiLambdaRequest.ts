import { ErrorResponsePayload, handleStrongApiRequest } from '@vladbasin/strong-api-middleware';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';
import { Result } from '@vladbasin/ts-result';
import { HandleApiRequestOptionsType } from './types';
import { mapRawApiResponseToGwProxyResult } from '.';

export const handleStrongApiLambdaRequest = <
    TRequestPayload,
    TResponseDataPayload,
    TResponseErrorPayload = ErrorResponsePayload
>(
    options: HandleApiRequestOptionsType<TRequestPayload, TResponseDataPayload, TResponseErrorPayload>
) => {
    return (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
        return handleStrongApiRequest<TRequestPayload>({
            request: {
                provideRaw: () =>
                    Result.Ok({
                        api: {
                            queryParams: event.queryStringParameters,
                            multiValueQueryParams: event.multiValueQueryStringParameters,
                            headers: event.headers,
                            multiValueHeaders: event.multiValueHeaders,
                            pathParams: event.pathParameters,
                            body: event.body,
                        },
                        custom: {
                            context: { ...context },
                            requestContext: { ...event.requestContext },
                            authContext: { ...event.requestContext.authorizer },
                        },
                    }),
                payload: options.request.payload,
                handle: request => options.function.executeAsync(request),
            },
            response: options.response,
            json: options.json,
        })
            .onSuccess(response =>
                mapRawApiResponseToGwProxyResult({ ...response.raw, isBase64Encoded: options.response.isBase64Encoded })
            )
            .asPromise();
    };
};
