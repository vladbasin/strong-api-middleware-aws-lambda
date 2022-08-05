import { ErrorResponsePayload, StrongApiOptionsType } from '@vladbasin/strong-api-middleware';
import { IFunction } from '../contracts/IFunction';

export type HandleApiRequestOptionsType<
    TRequestPayload,
    TResponseDataPayload,
    TResponseErrorPayload = ErrorResponsePayload
> = {
    function: IFunction<TRequestPayload, TResponseDataPayload, TResponseErrorPayload>;
    request: Pick<StrongApiOptionsType<TRequestPayload>['request'], 'payload'>;
    response: StrongApiOptionsType<TRequestPayload>['response'] & {
        isBase64Encoded?: boolean;
    };
    json?: StrongApiOptionsType<TRequestPayload>['json'];
};
