import { defineDecorator, ParserType } from '@vladbasin/strong-api-mapping';

export const authContext = (options: { key?: string; parser?: ParserType }): PropertyDecorator =>
    defineDecorator({
        source: 'authContext',
        useKey: true,
        isKeyCaseSensitive: false,
        key: options.key,
        parser: options.parser,
        isCustom: true,
    });
