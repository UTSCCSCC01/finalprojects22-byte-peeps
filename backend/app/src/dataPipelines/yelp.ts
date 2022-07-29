
import YelpBusiness from '../models/yelp/business';
import YelpReview from '../models/yelp/review';
import axios from 'axios';
/**
 * Updates the database as follows:
 *    1. Gets all yelp businessId stored in the db
 *    2. For each businessId:
 *        a. Fetches all comments created on the previous day.
 **/
export async function startPipeline() {

    try {
        // Get stored yelp businesses
        let businesses = await YelpBusiness.findAll();

        if (businesses.length == 0) return;

        // Update reviews for each business
        for (let i = 0; i < businesses.length; i++) {
            await updateComment(businesses[i]);
        }
    } catch (err) {
        console.error(err);
    }
}
const updateComment = async (business: YelpBusiness) => {
    try {
        while (true) {
            // go through the pages
            let page = 0;

            const url = 'https://www.yelp.com/biz/' + business.businessId + '/review_feed?rl=en&sort_by=date_desc&start=' + page.toString();

            const response = await axios
                .get(url)
            let data = await response.data;
            // stop if there are no reviews left
            const reviews = data['reviews']
            if (reviews === undefined || reviews.length == 0) return;


            for (let i = 0; i < reviews.length; i++) {
                const review = reviews[i];
                let reviewDate = review['localizedDate'];
                reviewDate = new Date(reviewDate);
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - reviewDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // stop if the review is from more than 1 days ago
                if (diffDays > 1) return;
                try {
                    await YelpReview.findOrCreate({
                        where: {
                            dataId: review['id'],
                        },
                        defaults: {
                            rating: review['rating'],
                            text: review['comment']['text'],
                            date: reviewDate,
                            userName: review['user']['markupDisplayName'],
                            businessId: business.id
                        }
                    })
                } catch (err) {
                    console.error(err);
                }

            }


            page += 1;

        }
    } catch (err) {
        console.error(err);
    }
}