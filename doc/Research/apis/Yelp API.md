# Yelp API

## Overview
With Yelp Fusion API, you can simply create an `App` that has free access. In order to use the API, you may use the API key provided by the App.

The usual workflow is to first get a Business ID from the `Business Search` endpoint, and then fetch its reviews from the reviews endpoint.

## Prerequisites
- Yelp App

## Limitations
- Daily API limit: 5000

## Useful Endpoints
- Business Search (Retrieve Business by keyword and location): `https://api.yelp.com/v3/businesses/search?term=<KEYWORD>&location=<LOCATION>`
- Reviews: `https://api.yelp.com/v3/businesses/<BUSINESS_ID>/reviews`

## References

- [Yelp App Portal](https://www.yelp.com/developers/v3/manage_app)
- [API Documentation](https://www.yelp.com/developers/documentation/v3/business)
