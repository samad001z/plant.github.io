import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, TrendingUp, Leaf, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Zap, Calendar, Activity } from 'lucide-react';
import { AppLayout } from '../components/Layout';
import { Button, Card, StatCard } from '../components/UI';

function ModernHomePage({ user, onLogout }) {
  const navigate = useNavigate();

  const quickStats = [
    { icon: <CheckCircle className="h-6 w-6" />, label: 'Healthy Plants', value: '142', color: 'success' },
    { icon: <AlertTriangle className="h-6 w-6" />, label: 'Need Attention', value: '23', color: 'warning' },
    { icon: <Activity className="h-6 w-6" />, label: 'Total Scans', value: '165', color: 'primary' },
  ];

  const recentActivity = [
    { type: 'scan', plant: 'Tomato', status: 'healthy', time: '2 hours ago' },
    { type: 'scan', plant: 'Potato', status: 'disease', time: '5 hours ago' },
    { type: 'scan', plant: 'Cucumber', status: 'healthy', time: '1 day ago' },
  ];

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Farmer'}!
          </h1>
          <p className="text-gray-600">Monitor and protect your crops with AI technology</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Scan Your Plants</h2>
                <p className="text-white/90">Get instant AI-powered disease detection</p>
              </div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/scan')}
                icon={<Camera className="h-5 w-5" />}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Start Scanning
              </Button>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <StatCard
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/scan')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <Camera className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-900">Scan Plant</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-900">View Dashboard</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/history')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary/5 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-900">Scan History</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button
                  onClick={() => navigate('/history')}
                  className="text-sm text-primary hover:text-primary-700 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.status === 'healthy'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        <Leaf className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.plant}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        activity.status === 'healthy'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {activity.status === 'healthy' ? 'Healthy' : 'Disease'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-blue-50 border border-blue-200">
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
                <p className="text-sm text-gray-700">
                  For best results, take photos of your plants in natural daylight and ensure the
                  affected areas are clearly visible. This helps our AI provide more accurate
                  diagnoses.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}

export default ModernHomePage;
