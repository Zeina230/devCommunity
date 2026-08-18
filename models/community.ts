import mongoose, { Schema, model, models} from "mongoose";

const CommunitySchema = new Schema(
  { 
    slug: {type: String,unique:true},
    name: {type: String,required: true},
    description: {type: String,required: true,},
    members: [{
    type: Schema.Types.ObjectId,
    ref: "users",
    default:[],
  },],
    featured: {type: Boolean,default: false,},
  },
  {timestamps: true,}
);

const Community =
 models.Community ||
 model("Community", CommunitySchema);

export default Community;