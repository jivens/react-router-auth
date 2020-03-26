import { toast } from 'react-toastify';

export function broadCastError(errorMessage) {
    toast.error(errorMessage)
}

export function broadCastSuccess(successMessage) {
    toast.success(successMessage)
}

export function handleErrors(error) {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
        toast.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
    );

    if (networkError) toast.error(`[Network error]: ${networkError}`);

    // Assume you have a string message
    broadCastError(error)
}