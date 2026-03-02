import { IUser } from './user.interface'
import { UserModel } from './user.model'

const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(
    'name email role selectedTemplate createdAt',
  )
  return result
}

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id)
  return result
}

const updateUserIntoDB = async (id: string, payload: Partial<IUser>) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id)
  return result
}

const updateUserRoleIntoDB = async (id: string, role: string) => {
  const result = await UserModel.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  )
  return result
}

const trackProfileEventIntoDB = async (
  id: string,
  eventType: 'view' | 'resume',
) => {
  const user = await UserModel.findById(id)

  if (!user) {
    throw new Error('User not found')
  }

  if (user.isTrackingEnabled === false) {
    return user
  }

  const updateField = eventType === 'view' ? 'profileViews' : 'resumeDownloads'

  const result = await UserModel.findByIdAndUpdate(
    id,
    { $inc: { [updateField]: 1 } },
    { new: true },
  )

  return result
}

const getMeFromDB = async (email: string, role: string) => {
  const result = await UserModel.findOne({ email, role })
  return result
}

export const UserService = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  updateUserRoleIntoDB,
  trackProfileEventIntoDB,
  getMeFromDB,
}
