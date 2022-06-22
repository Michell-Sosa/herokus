const express = require("express");
const Post = require("../models/posts");
const router = express.Router();

router.post('/', (req, res, next) => {
    
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then( createdPost => {
        console.log(createdPost.id);
        res.status(200).json({
            message: "Post added successfully",
            postId:createdPost.id
        });
    });
});

module.exports = router ;