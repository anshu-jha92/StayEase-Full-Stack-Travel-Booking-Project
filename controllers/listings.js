const Listing = require("../models/listing");

module.exports.index = async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error", "Listing ou requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    const listingData = {
        ...req.body.listing,
        image: {
            filename: "listingimage",
            url: req.body.listing.imageUrl || "https://images.unsplash.com/photo-1716974707189-a06a82bd6066"
        }
    };

    // Validate here
    const { error } = listingSchema.validate({ listing: listingData });
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    const newListing = new Listing(listingData);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");    
}; 

module.exports.editListing = async(req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing ou requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const { title, description, imageUrl, price, location, country } = req.body.listing;

    // const updatedListing = {
    //     title,
    //     description,
    //     image: {
    //         filename: 'listingimage', 
    //         url: imageUrl
    //     },
    //     price,
    //     location,
    //     country
    // };

    const updatedListing = {
    title,
    description,
    image: {
        filename: 'listingimage',
        url: imageUrl || "https://images.unsplash.com/photo-1716974707189-a06a82bd6066"
    },
    price,
    location,
    country
};
    await Listing.findByIdAndUpdate(id, updatedListing);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.distroyListing = async(req, res, next)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};