import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

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

// Auth Mock Endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    // Return our seeded user
    const user = await prisma.user.findFirst()
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
