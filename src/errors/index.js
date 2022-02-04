import NuageError from './NuageError';
import NuageNetworkError from './NuageNetworkError';
import NuageRateLimitError from './NuageRateLimitError';
import * as Syntax from './syntax';
import * as AccessForbidden from './accessForbidden';
import * as NotFound from './notFound';
import * as Unprocessable from './unprocessable';
import * as Disabled from './disabled';

export default {
    NuageError,
    NuageNetworkError,
    NuageRateLimitError,
    ...Syntax,
    ...AccessForbidden,
    ...NotFound,
    ...Unprocessable,
    ...Disabled,
};
