export interface IUser {
  name: string
  email: string
  password?: string
  role: 'admin' | 'user'
  shortDescription: string
  longDescription: string
  profilePicture?: string
  resume?: string
  whyPortfolio?: string // Explaining why the user is on the portfolio
  profileViews?: number
  resumeDownloads?: number
  isTrackingEnabled?: boolean
  selectedTemplate?: string
}
