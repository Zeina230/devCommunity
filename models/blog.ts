import mongoose, { Schema ,models, model} from "mongoose";

const BlogSchema = new Schema(
  {
    slug: {type:String, unique:true},
    title: {type: String,required: true,},
    content: {type: String,required: true},
    author: [{
  type: Schema.Types.ObjectId,
  ref: "users", required:true ,
},],
    category: {type: String,required: true,},
    isPublished: {type: Boolean,default: true},
    createdAt:{type:Date}
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;