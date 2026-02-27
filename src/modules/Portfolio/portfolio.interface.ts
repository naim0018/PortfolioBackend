export interface User {
  name: string
  email: string
  password: string
  role: string
  shortDescription: string
  longDescription: string
  profilePicture: string
  resume: string
  socialLinks: SocialLinks[]
  projects: Projects[]
  skills: Skills[]
  experience: Experience[]
  education: Education[]
}

export interface SocialLinks {
  logo: string
  name: string
  description: string
  link: string
}

export interface Projects {
  title: string
  description: string
  coverImage: string
  images: string[]
  link: string
  tags: string[]
  repositoryLink: string
  notes: string
}

export interface Skills {
  name: string
  logo: string
  progress: number
  category: string
}

export interface Experience {
  title: string
  description: string
  logo: string
  link: string
  startDate: string
  endDate: string
  location: string
}

export interface Education {
  title: string
  degree: string
  description: string
  logo: string
  link: string
  startDate: string
  endDate: string
  location: string
}
