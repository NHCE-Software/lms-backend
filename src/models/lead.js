import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const StatusSchema = new Schema(
    {
        call: {
            type: Number,
        },
        response: {
            type: String,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

export const LeadSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        userID:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        phonenumber: {
            type: String,
            trim: true,
        },
        course: {
            type: [String],
            trim: true,
        },
        status: [StatusSchema],
    },
    {
        collection: 'leads',
    }
);
LeadSchema.pre('insertMany',function (next){
    var leads = this;
    leads.forEach(lead => {
        console.log(lead)
    }
    );
    next();

})
export const Lead = mongoose.model('Lead', LeadSchema);
export const LeadTC = composeWithMongoose(Lead);
