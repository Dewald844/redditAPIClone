import * as comment_db from "../Database/comment.js";
import * as comment_helpers from "../Helpers/comment.js";

export const createVoteArrayFromDatabase = (jsonString) => {
    let arr;
    try {
        // Replace curly braces with square brackets and remove double quotes around numbers
        const formattedString = jsonString.replace(/{/g, '[').replace(/}/g, ']').replace(/\"/g, '');
        arr = JSON.parse(formattedString);
        if (!Array.isArray(arr)) {
            console.log("JSON did not return an array");
            arr = [];
        }
    } catch (e) {
        console.log("Error parsing JSON: " + e);
        arr = [];
    }

    return arr.map(Number);
}

export const mapToFrontEndType = async (raw) => {

    const post_comments = await comment_db.readCommentsByPostId(Number(raw['post_id']));

    return {
        post_id : Number(raw['post_id']),
        post_title : raw['post_title'],
        post_content : raw['post_content'],
        created_by : Number(raw['created_by']),
        upvoteCount : createVoteArrayFromDatabase(raw['upvotearray']).length,
        downvoteCount : createVoteArrayFromDatabase(raw['downvotearray']).length,
        comments : post_comments.map(comment_helpers.mapToFrontEndType)
    }
}

export const mapToDomainType = (raw) => {
    return {
        post_id : Number(raw['post_id']),
        post_title : raw['post_title'],
        post_content : raw['post_content'],
        created_by : Number(raw['created_by']),
        upvoteCount : createVoteArrayFromDatabase(raw['upvotearray']),
        downvoteCount : createVoteArrayFromDatabase(raw['downvotearray'])
    }
}