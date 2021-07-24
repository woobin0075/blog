import express from 'express'

//Model
import Post from '../../models/post'

const router = express.Router()

// api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get")
    res.json(postFindResult)
})

router.post('/', async(req, res, next) => {
    try {
        console.log(req, "req")
        const {title, contents, fileUrl, creator} = req.body
        const newPost = await Post.create({
            title, //title: title 형식으로 쓰는 건데 둘이 같으면 title,로 하나만 쓰면 됨
            contents, 
            fileUrl,
            creator
        });
        res.json(newPost);
    } catch (error) {
        console.log(error);
    }
})

export default router;