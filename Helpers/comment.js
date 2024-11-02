export const mapToDomainType = (raw) => {
    return {
        comment_id: raw['comment_id'],
        user_id: raw['user_id'],
        post_id: raw['post_id'],
        content: raw['content'],
        upvotes: raw['upvotes'],
        downvotes: raw['downvotes']
    }
}

export const mapToFrontEndType = (raw) => {
    return {
        comment_id: raw['comment_id'],
        user_id: raw['user_id'],
        post_id: raw['post_id'],
        content: raw['content'],
        upvotes: raw['upvotes'].length,
        downvotes: raw['downvotes'].length
    }
}