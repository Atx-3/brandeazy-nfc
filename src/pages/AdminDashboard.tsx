import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

type OrderStatus = 'Order Placed' | 'Processing' | 'Laser Engraving' | 'Shipped' | 'Delivered'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  productType: string
  totalPrice: string
  status: OrderStatus
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  cardType: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'users'>('orders')
  
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/orders')
      setOrders(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users')
      setUsers(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchOrders()
    fetchUsers()
  }, [])

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, { status: newStatus })
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (e) {
      console.error(e)
    }
  }

  const allStatuses: OrderStatus[] = ['Order Placed', 'Processing', 'Laser Engraving', 'Shipped', 'Delivered']

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-outline-variant/30 flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-outline-variant/30">
          <Link to="/" className="font-headline-lg text-[24px] font-black tracking-tighter text-primary">BrandEazy <span className="text-secondary font-medium text-[16px]">Admin</span></Link>
        </div>
        <div className="p-4 flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-label-sm uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'orders' ? 'bg-primary text-on-primary' : 'text-secondary hover:bg-surface-variant/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-label-sm uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'users' ? 'bg-primary text-on-primary' : 'text-secondary hover:bg-surface-variant/50'}`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            Users
          </button>
        </div>
        <div className="p-4 border-t border-outline-variant/30">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-label-sm uppercase tracking-widest text-error hover:bg-error-container/20 transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 h-screen overflow-y-auto">
        <div className="max-w-[1200px] mx-auto space-y-8">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="font-headline-lg text-[32px] text-primary">{activeTab === 'orders' ? 'Order Management' : 'User Directory'}</h1>
              <p className="font-body-md text-secondary">View and manage all {activeTab} across the platform.</p>
            </div>
            {activeTab === 'orders' && (
              <div className="font-label-sm uppercase tracking-widest text-secondary bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/30">
                Total Orders: {orders.length}
              </div>
            )}
          </header>

          <div className="bg-surface-container-low border border-outline-variant/30 rounded-[16px] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === 'orders' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 bg-surface-container-highest/20">
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Order ID</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Customer</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Product</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Total</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Date</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-primary">
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-outline-variant/10 hover:bg-surface-variant/20 transition-colors">
                        <td className="p-4 font-mono text-sm">{order.orderNumber}</td>
                        <td className="p-4">
                          <div>{order.customerName}</div>
                          <div className="text-sm text-secondary">{order.customerEmail}</div>
                        </td>
                        <td className="p-4">{order.productType}</td>
                        <td className="p-4 font-medium">{order.totalPrice}</td>
                        <td className="p-4 text-secondary">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="bg-surface-container-highest border border-outline-variant/50 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-primary cursor-pointer"
                          >
                            {allStatuses.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 bg-surface-container-highest/20">
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">User ID</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Name</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Email</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Card Type</th>
                      <th className="p-4 font-label-sm uppercase tracking-widest text-secondary">Join Date</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-primary">
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-outline-variant/10 hover:bg-surface-variant/20 transition-colors">
                        <td className="p-4 font-mono text-sm text-secondary">{user.id.slice(0,8)}</td>
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-secondary">{user.email}</td>
                        <td className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${user.cardType === 'Metal' ? 'bg-primary text-on-primary' : 'bg-surface-variant text-primary'}`}>
                            {user.cardType}
                          </span>
                        </td>
                        <td className="p-4 text-secondary">{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {(activeTab === 'orders' ? orders : users).length === 0 && (
              <div className="p-12 text-center text-secondary">
                No data available.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
