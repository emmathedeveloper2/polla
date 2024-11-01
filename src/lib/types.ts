export type User = {
    id: string,
    avatar: string,
    username: string,
    email: string,
    bio: string,
    verified: boolean
}

export type Poll<T> = {
    id: string,
    caption: string,
    author: string,
    options: T,
    total_comments: number,
    expand?: { author: User }
}

export type Option = {
    id: any,
    title: string,
    votes: string[]
}

export type Comment = {
    id: string,
    poll_id: string,
    author: string,
    text: string,
    expand?: { author: User }
}

export type FormState = {
    loading: boolean,
    success?: boolean,
    error?: string,
}

export type PocketBasePageResponse<T> = {
    items: T[],
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number
}