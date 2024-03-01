import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req,res,next) => {

        try {
            const listing = await Listing.create(req.body);  //save the data from the website body.
            return res.status(201).json(listing);

        } catch (error) {
            next(error);
            
        }

};



export   const deleteListing = async (req,res,next) => {

        const listing = await Listing.findById(req.params.id);
        if(!listing) {
            return next(errorHandler(404, "Listing not Found!" ))
        }

        if(req.user.id !== listing.userRef) {
            return next(errorHandler(401,"You don't have permission to perform this action"));
        }

        try {
            await Listing.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted Successfully");
        } catch (error) {
            next(error)
        }
};



export const updateListing = async (req,res,next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, "Listing not Found!" ))
    }

    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401,"You don't have permission to perform this action"));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);  
    } catch (error) {
        next(error)
    }
};