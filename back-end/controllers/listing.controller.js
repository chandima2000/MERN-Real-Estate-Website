import Listing from "../models/listing.model.js";

export const createListing = async (req,res,next) => {

        try {
            const listing = await Listing.create(req.body);  //save the data from the website body.
            return res.status(201).json(listing);

        } catch (error) {
            next(error);
            
        }

}