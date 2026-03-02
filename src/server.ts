import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'
let server: Server
async function main() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(config.db as string)
    console.log('✅ Database connected successfully')

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running at http://localhost:${config.port}`)
    })
  } catch (error: any) {
    console.error('❌ Database connection failed!')
    if (error.message.includes('authentication failed')) {
      console.error(
        '🔑 AUTHENTICATION ERROR: Please check your MongoDB credentials in .env',
      )
    } else {
      console.error('Error details:', error.message)
    }
    process.exit(1)
  }
}

main()

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection, shutting down the server ', err)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtRejection', () => {
  console.log('Uncaught Rejection, shutting down the server')
  process.exit(1)
})
