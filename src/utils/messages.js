import { toast } from 'react-toastify';

export function broadCastError(errorMessage) {
    toast.error(errorMessage)
}

export function broadCastSuccess(successMessage) {
    toast.success(successMessage)
}

export function handleErrors({ graphQLErrors, networkError }) {
    if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
        toast.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

    if (networkError) toast.error(`[Network error]: ${networkError}`);
}