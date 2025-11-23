const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            filename: Joi.string().default("listingimage"),
            url: Joi.string().uri().default("https://images.unsplash.com/photo-1716974707189-a06a82bd6066?q=80&w=1256&auto=format&fit=crop&ixlib=rb-4.1.0")
        }).default({   // <-- yahan poora default object explicitly dena zaruri hai
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1716974707189-a06a82bd6066?q=80&w=1256&auto=format&fit=crop&ixlib=rb-4.1.0"
        })
    }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.object({
//             filename: Joi.string().default("listingimage"),
//             url: Joi.string().uri().default("https://images.unsplash.com/photo-1716974707189-a06a82bd6066?q=80&w=1256&auto=format&fit=crop&ixlib=rb-4.1.0")
//         }).default()
//     }).required(),
// });

// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.object({
//             filename: Joi.string().required(),
//             url: Joi.string().uri().required()
//         }).required()
//     }).required(),
// });

// const Joi = require("joi");

// module.exports.listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.string().allow("", null),
//     }).required(),
// });

