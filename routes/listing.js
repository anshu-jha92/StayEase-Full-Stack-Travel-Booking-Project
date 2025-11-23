const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);  // yahan destructure karo
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
 
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put( isLoggedIn, validateListing, wrapAsync(listingController.updateListing))
  .delete( isLoggedIn, wrapAsync(listingController.distroyListing));


//Index Route
// router.get("/", wrapAsync(listingController.index));

// //New Route
// router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
// app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
//     const listingData = {
//         ...req.body.listing,
//         image: {
//             filename: "listingimage",
//             url: req.body.listing.imageUrl || undefined
//         }
//     };

//     delete listingData.imageUrl;

//     // const newListing = new Listing(result.value.listing);
//     const newListing = new Listing(listingData);
//     await newListing.save();
//     res.redirect("/listings");    
// }));


// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));


// app.post("/listings", wrapAsync(async(req, res, next) => {
    
//     // Step 1: listingData bana lo
//     const listingData = {
//         ...req.body.listing,
//         image: {
//             filename: "listingimage",
//             url: req.body.listing.image.url || undefined
//         }
//     };
//     console.log(listingData); // check karo kya aa raha hai

//     // Step 2: Joi validation listingData pe karo
//     let result = listingSchema.validate({ listing: listingData });
//     console.log(result);
//     if (result.error) {
//         throw ExpressError(400, result.error);
//     }

//     // Step 3: Mongoose me save listingData
//     const newListing = new Listing(listingData);
//     await newListing.save();

//     res.redirect("/listings");    
// }));


// app.post("/listings", wrapAsync(async(req, res, next)=>{
//     let result = listingSchema.validate(req.body);
//     console.log(result);
//     if (result.error) {
//         throw ExpressError(400, result.error);
//     }
//     const newListing = new Listing (req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");    
//   })
// );

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

//Update Route
// app.put("/listings/:id", async (req, res) => {
//     try {
//         let { id } = req.params;
//         const { title, description, imageUrl, price, location, country } = req.body.listing;

//         const listing = await Listing.findById(id);

//         const updatedListing = {
//             title,
//             description,
//             image: imageUrl ? {
//                 filename: "listingimage",
//                 url: imageUrl
//             } : listing.image,  // ✅ Purani image retain
//             price,
//             location,
//             country
//         };

//         await Listing.findByIdAndUpdate(id, updatedListing, { new: true, runValidators: true });
//         res.redirect(`/listings/${id}`);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong while updating the listing");
//     }
// });

// router.put("/:id", isLoggedIn, validateListing, wrapAsync(listingController.updateListing));

// app.put("/listings/:id", async(req, res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// });

//Delete Route
// router.delete("/:id", isLoggedIn, wrapAsync(listingController.distroyListing));

module.exports = router;