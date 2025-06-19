import { ArrowLeft, Send, Clock, Settings, User, Plus, CreditCard, History, X, DollarSign, Wallet, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Modal, ModalHeader, ModalContent, ModalTitle } from "@/components/ui/modal"
import { Link } from 'react-router-dom'
import { useState } from 'react'

function AppPage() {
  const [isCardsModalOpen, setIsCardsModalOpen] = useState(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [balance, setBalance] = useState(2847.50)
  
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4532',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8901',
      expiry: '08/25',
      isDefault: false
    }
  ])

  const handleAddCard = () => {
    // In a real app, this would open a card addition form
    const newCard = {
      id: cards.length + 1,
      type: 'Visa',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: '12/27',
      isDefault: false
    }
    setCards([...cards, newCard])
  }

  const handleSendMoney = () => {
    if (amount && recipient) {
      const sendAmount = parseFloat(amount)
      if (sendAmount > 0 && sendAmount <= balance) {
        setBalance(prev => prev - sendAmount)
        setAmount('')
        setRecipient('')
        setIsSendMoneyModalOpen(false)
        // In a real app, you would make an API call here
        alert(`Successfully sent $${sendAmount} to ${recipient}`)
      } else {
        alert('Invalid amount or insufficient balance')
      }
    } else {
      alert('Please enter both amount and recipient')
    }
  }

  const handleCardSelection = (cardId) => {
    setSelectedCards(prev => 
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    )
  }

  const handleSetDefaultCard = (cardId) => {
    setCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })))
  }

  const presetAmounts = [50, 100, 200, 500]

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="bg-web-green-600 text-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="p-2 hover:bg-web-green-700 rounded-lg transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-web-green-600 font-bold text-sm">
              P
            </div>
            <span className="text-lg font-semibold">PayWise</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-web-green-700">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back!</h1>
          <p className="text-neutral-600 text-sm">Ready to send money?</p>
        </div>

        {/* Available Balance Card */}
        <Card className="bg-gradient-to-br from-web-green-500 to-web-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-web-green-100 text-sm mb-2">Available Balance</p>
            <div className="text-3xl font-bold mb-4">${balance.toFixed(2)}</div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions - Remove Add Money, Keep Send and Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setIsSendMoneyModalOpen(true)}
            className="flex flex-col items-center p-6 h-auto bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-sm"
          >
            <Send className="h-6 w-6 mb-2" />
            <span className="text-xs font-medium">Send</span>
          </Button>
          <Button 
            onClick={() => setIsCardsModalOpen(true)}
            className="flex flex-col items-center p-6 h-auto bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-sm"
          >
            <CreditCard className="h-6 w-6 mb-2" />
            <span className="text-xs font-medium">Cards</span>
          </Button>
        </div>

        {/* Send Money Section - Update to open modal */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-web-green-600" />
              <CardTitle className="text-lg">Send Money</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Transfer money instantly using PayTag
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Recipient PayTag
              </label>
              <div className="space-y-3">
                <Input 
                  placeholder="@username" 
                  className="text-base"
                />
                <Button 
                  onClick={() => setIsSendMoneyModalOpen(true)}
                  className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-3"
                >
                  Send Money
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-web-green-600" />
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-web-green-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <History className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-medium">No recent transactions</p>
              <p className="text-xs text-neutral-400 mt-1">Your activity will appear here</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Send Money Modal (renamed from Add Money Modal) */}
      <Modal isOpen={isSendMoneyModalOpen} onClose={() => setIsSendMoneyModalOpen(false)}>
        <ModalHeader onClose={() => setIsSendMoneyModalOpen(false)}>
          <ModalTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-web-green-600" />
            <span>Send Money</span>
          </ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-6">
            {/* Balance Display */}
            <div className="text-center bg-web-green-50 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-web-green-600">${balance.toFixed(2)}</p>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Amount to Send
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 text-lg font-medium"
                />
              </div>
            </div>

            {/* Preset Amounts */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-3">Quick Amounts</p>
              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(preset.toString())}
                    className="text-xs"
                  >
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recipient Input */}
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Send to PayTag
              </label>
              <Input
                placeholder="@username"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="text-base"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMoney}
              disabled={!amount || !recipient}
              className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 mr-2" />
              Send ${amount || '0.00'}
            </Button>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-xs text-neutral-500">
                🔒 All transactions are secured with bank-level encryption
              </p>
            </div>
          </div>
        </ModalContent>
      </Modal>

      {/* Cards Modal */}
      <Modal isOpen={isCardsModalOpen} onClose={() => setIsCardsModalOpen(false)}>
        <ModalHeader onClose={() => setIsCardsModalOpen(false)}>
          <ModalTitle className="flex items-center justify-between w-full">
            <span>My Cards</span>
            {selectedCards.length > 0 && (
              <span className="text-sm text-web-green-600 font-normal">
                {selectedCards.length} selected
              </span>
            )}
          </ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            {/* Cards List */}
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={`relative rounded-xl transition-all duration-200 ${
                  selectedCards.includes(card.id)
                    ? 'ring-2 ring-web-green-500 ring-offset-2'
                    : ''
                }`}
              >
                {/* Card Selection Checkbox */}
                <button
                  onClick={() => handleCardSelection(card.id)}
                  className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full border-2 border-white bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/30 transition-colors"
                >
                  {selectedCards.includes(card.id) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </button>

                {/* Card Content */}
                <div className="bg-gradient-to-r from-neutral-800 to-neutral-700 text-white rounded-xl p-4 cursor-pointer"
                     onClick={() => handleCardSelection(card.id)}
                >
                  <div className="flex justify-between items-start mb-3 pl-8">
                    <div className="text-sm font-medium">{card.type}</div>
                    <div className="flex items-center space-x-2">
                      {card.isDefault && (
                        <span className="text-xs bg-web-green-500 px-2 py-1 rounded-full">Default</span>
                      )}
                      {!card.isDefault && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSetDefaultCard(card.id)
                          }}
                          className="text-xs bg-neutral-600 hover:bg-web-green-500 px-2 py-1 rounded-full transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-lg font-mono tracking-wider mb-2 pl-8">
                    •••• •••• •••• {card.last4}
                  </div>
                  <div className="text-xs text-neutral-300 pl-8">
                    Expires {card.expiry}
                  </div>
                </div>
              </div>
            ))}

            {/* Selected Cards Actions */}
            {selectedCards.length > 0 && (
              <div className="bg-web-green-50 rounded-xl p-4 space-y-3">
                <h4 className="font-medium text-neutral-800">Selected Cards Actions</h4>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCards([])}
                    className="flex-1"
                  >
                    Clear Selection
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-web-green-500 hover:bg-web-green-600"
                    onClick={() => {
                      // In a real app, this would perform bulk actions
                      alert(`Selected ${selectedCards.length} card(s) for bulk action`)
                    }}
                  >
                    Manage Selected
                  </Button>
                </div>
              </div>
            )}

            {/* Add New Card Button */}
            <button
              onClick={handleAddCard}
              className="w-full border-2 border-dashed border-neutral-300 hover:border-web-green-500 rounded-xl p-6 text-center transition-colors group"
            >
              <Plus className="h-8 w-8 text-neutral-400 group-hover:text-web-green-500 mx-auto mb-2 transition-colors" />
              <p className="text-sm font-medium text-neutral-600 group-hover:text-web-green-600 transition-colors">
                Add New Card
              </p>
            </button>
          </div>
        </ModalContent>
      </Modal>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-neutral-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className="flex flex-col items-center p-3 text-web-green-600">
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <Send className="h-5 w-5 mb-1" />
            <span className="text-xs">Send</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <History className="h-5 w-5 mb-1" />
            <span className="text-xs">History</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default AppPage