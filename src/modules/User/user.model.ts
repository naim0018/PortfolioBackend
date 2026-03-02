import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    whyPortfolio: { type: String, required: false },
    profilePicture: { type: String, required: false },
    resume: { type: String, required: false },
    profileViews: { type: Number, default: 0 },
    resumeDownloads: { type: Number, default: 0 },
    isTrackingEnabled: { type: Boolean, default: true },
    selectedTemplate: { type: String, required: false },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this as any
  if (user.isModified('password') && user.password) {
    user.password = await bcrypt.hash(user.password, 12)
  }
  next()
})

userSchema.post('save', function (doc: any, next) {
  doc.password = ''
  next()
})

export const UserModel = model<IUser>('User', userSchema)
