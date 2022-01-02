import { Maybe, MaybeNullable } from '@vladbasin/ts-types';
import { isNil } from 'lodash';

export const unwrapMaybeNullableRecord = <T, K>(
    arg: MaybeNullable<Record<string, Maybe<T>>>,
    converter: (item: T) => K
): Record<string, K> => {
    return isNil(arg)
        ? {}
        : Object.entries(arg).reduce<Record<string, K>>((accum, next) => {
              const key = next[0];
              const value = next[1];

              if (!isNil(value)) {
                  // eslint-disable-next-line no-param-reassign
                  accum[key] = converter(value);
              }

              return accum;
          }, {});
};
