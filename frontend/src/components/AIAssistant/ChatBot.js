import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from '../UI';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your PlantCare AI Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockResponses = {
    yellow: 'Yellow leaves can be caused by several factors: 1) Overwatering or poor drainage 2) Nitrogen deficiency 3) Lack of sunlight 4) Disease such as Fusarium wilt. Check your watering schedule and ensure proper drainage.',
    water: 'Most plants need watering when the top 2-3 inches of soil feel dry. Overwatering is more harmful than underwatering. Water deeply but less frequently to encourage deep root growth.',
    fertilizer: 'Use a balanced NPK fertilizer (10-10-10) every 2-3 weeks during growing season. Organic options like compost or manure are also excellent. Avoid over-fertilizing as it can burn roots.',
    pest: 'Common pests include aphids, whiteflies, and spider mites. Natural solutions: neem oil spray, insecticidal soap, or introduce beneficial insects like ladybugs. Maintain good air circulation.',
    disease: 'Common plant diseases include fungal infections, bacterial spots, and viral diseases. Prevention is key: proper spacing, good air circulation, avoiding overhead watering, and removing infected parts promptly.',
    default: 'I can help you with plant care questions! Try asking about watering, fertilizers, pests, diseases, or specific symptoms like yellow leaves.'
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('yellow') || lowerMessage.includes('yellowing')) {
      return mockResponses.yellow;
    } else if (lowerMessage.includes('water')) {
      return mockResponses.water;
    } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('fertilize')) {
      return mockResponses.fertilizer;
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('bug') || lowerMessage.includes('insect')) {
      return mockResponses.pest;
    } else if (lowerMessage.includes('disease') || lowerMessage.includes('sick')) {
      return mockResponses.disease;
    } else {
      return mockResponses.default;
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: getBotResponse(inputText),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 md:bottom-6 md:right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-large z-50 flex flex-col"
            style={{ height: '500px' }}
          >
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">PlantCare AI Assistant</h3>
                  <p className="text-xs opacity-90">Ask me anything about plant care</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about plant care..."
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                />
                <Button
                  variant="primary"
                  onClick={handleSend}
                  icon={<Send className="h-4 w-4" />}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-large z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
    </>
  );
};

export default ChatBot;
