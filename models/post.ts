import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

export default Post;

