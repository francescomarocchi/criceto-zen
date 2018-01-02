import mongoose, { Schema } from 'mongoose'

const videoSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

videoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      url: this.url,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Video', videoSchema)

export const schema = model.schema
export default model
