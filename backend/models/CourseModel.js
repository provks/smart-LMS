import mongoose from "mongoose";
const { Schema } = mongoose


// lesson schema
const lessonSchema = new Schema({
  title: {type: String, required: true},
  videoUrl: {type: String, required: true},
})

// module schema
const moduleSchema = new Schema({
  title: {type: String, required: true},
  lessons: [lessonSchema],
})

const courseSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, default: 0},
  instructor: {
    type: Schema.ObjectId, 
    ref: 'User',
    required: true,
  },  // creating the relation with User model
  category: {
    type: Schema.ObjectId, 
    ref: 'Category',
    required: true,
  },
  enrolledStudents: [{
    type: Schema.ObjectId, 
    ref: 'User',
  }],
  modules: [moduleSchema]
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
export default Course;