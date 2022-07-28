
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

        // Update data for each review
        for (let i = 0; i < businesses.length; i++) {
            await updateComment(businesses[i]);
        }
    } catch (err) {
        console.error(err);
    }
}
const updateComment = async (business: YelpBusiness) => {
    const reviewsUrl = 'https://api.yelp.com/v3/businesses/' + business.businessId + '/reviews';
    try {
        const bearer = process.env.YELP_API_KEY ?? '';
        const response = await axios
            .get(reviewsUrl, {
                headers: { Authorization: 'Bearer ' + bearer },
            })
        let data = await response.data;
        console.log(data)
        if (data['reviews'] === undefined || data['reviews'].length == 0) return;

        data['reviews'].forEach(
            async (review: { [key: string]: any }) => {
                try {
                    await YelpReview.findOrCreate({
                        where: {
                            dataId: review['id'],
                        },
                        defaults: {
                            rating: review['rating'],
                            text: review['text'],
                            date: review['time_created'],
                            userName: review['user']['name'],
                            businessId: business.id
                        }
                    })
                } catch (err) {
                    console.error(err);
                }

            }
        )
    } catch (err) {
        console.error(err);
    }
}