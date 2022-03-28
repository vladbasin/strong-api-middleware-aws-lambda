import { defineDecorator, ParserType } from '@vladbasin/strong-api-mapping';

export const requestContext = (options: { key?: string; parser?: ParserType }): PropertyDecorator =>
    defineDecorator({
        source: 'requestContext',
        useKey: true,
        isKeyCaseSensitive: false,
        key: options.key,
        parser: options.parser,
        isCustom: true,
    });
