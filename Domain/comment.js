class Comment {
    constructor(id, user_id, post_id, content) {
        this.comment_id = id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.content = content;
        this.upvotes = 0;
        this.downvotes = 0;
    }

    upvote() {
        this.upvotes++;
    }

    downvote() {
        this.downvotes++;
    }
}