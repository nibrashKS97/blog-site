import { createClient } from "next-sanity";
import imageUrlBuidler from '@sanity/image-url'

export const client = createClient ({
    apiVersion: '2023-05-03',
    dataset: 'production',
    projectId: 'jh6f4w0r',
    useCdn: false,
})

const builder = imageUrlBuidler(client);

export function urlFor(source: any) {
    return builder.image(source);
}