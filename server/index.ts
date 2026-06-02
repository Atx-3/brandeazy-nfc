import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
const prisma = new PrismaClient()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID') {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value || ''
      const name = profile.displayName || ''
      const googleId = profile.id
      
      let user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            googleId,
            cardType: 'Standard'
          }
        })
      } else if (!user.googleId) {
        user = await prisma.user.update({
          where: { email },
          data: { googleId }
        })
      }
      return done(null, user)
    } catch (err: any) {
      return done(err)
    }
  }))
}

// Create a mock user on start if it doesn't exist to simulate auth
async function initSeed() {
  try {
    const count = await prisma.user.count()
    if (count === 0) {
      await prisma.user.create({
        data: {
          email: 'alex@sterling.com',
          name: 'Alexander Sterling',
          cardType: 'Metal'
        }
      })
      console.log('Seeded initial user.')
    }
  } catch (err) {
    console.error('Failed to seed:', err)
  }
}
initSeed()

// GET /api/users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET /api/orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerEmail, productType, totalPrice, shippingAddress } = req.body
    
    // Auto-generate an order number
    const orderNumber = '#BE-' + Math.floor(10000 + Math.random() * 90000)

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        productType,
        totalPrice,
        shippingAddress
      }
    })
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// PATCH /api/orders/:id/status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    })
    res.json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

// Google OAuth endpoints
app.get('/api/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
    return res.status(500).send('Google Auth is not configured. Please add GOOGLE_CLIENT_ID to server/.env')
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next)
})

app.get('/api/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const user: any = req.user
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'brandeazy_super_secret_key_123', { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
  res.redirect('http://localhost:5173/admin')
})

app.get('/api/auth/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ success: true })
})

app.get('/api/auth/me', async (req, res) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'brandeazy_super_secret_key_123')
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) return res.status(401).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
