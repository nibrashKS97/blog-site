import { createClient } from "next-sanity";

export const client = createClient ({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: 'jh6f4w0r',
    useCdn: false,
})