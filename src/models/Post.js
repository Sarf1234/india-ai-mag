import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },

    content: { type: String, required: true },

    excerpt: { type: String },
    coverImage: { type: String },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      }
    ],

    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },

    published: { type: Boolean, default: true },

    readTime: { type: Number },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
  },
  { timestamps: true }
);
PostSchema.index({ title: "text", content: "text", excerpt: "text" });
export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema);
