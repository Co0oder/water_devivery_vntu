const reviewModel= require('../models/reviews.model');
const { validationResult } = require('express-validator');

module.exports = {
    show: async (req,res) => {
        const data = await reviewModel.showAllReviews();
        res.json({data});
    },

    add: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const props = req.body;
        await reviewModel.addNewReview (props);
        res.json({message: "Review created"});
    },

    update: async () => {
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const id = req.params.id;
        const props = req.body;
        await reviewModel.updateReview(id,props);
        res.json({message: "Review updated"});
        return;
    },

    delete: async (req,res) => {
        const id = req.params.id;
        await reviewModel.deleteReviewById(id);
        res.json({message: `Review with id: ${id} deleted`});
    }
}