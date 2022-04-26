import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const CallsSchema = new Schema(
    {
        call: {
            type: Number,
        },
        remark: {
            type: String,
        },
        updatedby:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        followup: {
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
        loadedby:{
            type: [Schema.Types.ObjectId],
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
        status: {
            type: String,
            trim: true,
        },
        course: {
            type: [String],
            trim: true,
        },
        calls: [CallsSchema],
    },
    {
        collection: 'leads',
        timestamps: true
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
