import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TriangleAlert as AlertTriangle, TrendingUp, Activity, Calendar, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';
import { AppLayout } from '../components/Layout';
import { StatCard, Card } from '../components/UI';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardPage({ user, onLogout }) {
  const healthTrendData = [
    { month: 'Jan', healthy: 85, diseased: 15 },
    { month: 'Feb', healthy: 78, diseased: 22 },
    { month: 'Mar', healthy: 82, diseased: 18 },
    { month: 'Apr', healthy: 90, diseased: 10 },
    { month: 'May', healthy: 88, diseased: 12 },
    { month: 'Jun', healthy: 92, diseased: 8 },
  ];

  const diseaseDistribution = [
    { name: 'Late Blight', value: 35, color: '#ef4444' },
    { name: 'Powdery Mildew', value: 25, color: '#f59e0b' },
    { name: 'Leaf Spot', value: 20, color: '#eab308' },
    { name: 'Healthy', value: 20, color: '#22c55e' },
  ];

  const recentScans = [
    { id: 1, date: '2024-03-14', plant: 'Tomato', disease: 'Late Blight', confidence: 92, severity: 'high' },
    { id: 2, date: '2024-03-13', plant: 'Potato', disease: 'Healthy', confidence: 98, severity: 'none' },
    { id: 3, date: '2024-03-12', plant: 'Cucumber', disease: 'Powdery Mildew', confidence: 85, severity: 'medium' },
    { id: 4, date: '2024-03-11', plant: 'Tomato', disease: 'Bacterial Spot', confidence: 78, severity: 'medium' },
  ];

  const getSeverityBadge = (severity) => {
    const config = {
      high: { color: 'text-red-600 bg-red-100', icon: <XCircle className="h-4 w-4" /> },
      medium: { color: 'text-yellow-600 bg-yellow-100', icon: <AlertTriangle className="h-4 w-4" /> },
      low: { color: 'text-blue-600 bg-blue-100', icon: <Activity className="h-4 w-4" /> },
      none: { color: 'text-green-600 bg-green-100', icon: <CheckCircle className="h-4 w-4" /> },
    };
    return config[severity] || config.none;
  };

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your crop health and disease analytics</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Healthy Plants"
            value="142"
            icon={<Leaf className="h-6 w-6" />}
            color="success"
            trend={{ value: '12% from last week', positive: true }}
          />
          <StatCard
            title="Diseased Plants"
            value="23"
            icon={<AlertTriangle className="h-6 w-6" />}
            color="danger"
            trend={{ value: '5% from last week', positive: false }}
          />
          <StatCard
            title="Scans Today"
            value="8"
            icon={<Activity className="h-6 w-6" />}
            color="primary"
          />
          <StatCard
            title="Risk Alerts"
            value="3"
            icon={<TrendingUp className="h-6 w-6" />}
            color="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Health Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="healthy"
                  stroke="#1f7a4c"
                  strokeWidth={3}
                  dot={{ fill: '#1f7a4c', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="diseased"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Disease Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diseaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
            <button className="text-primary hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plant Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disease
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentScans.map((scan, index) => {
                  const badge = getSeverityBadge(scan.severity);
                  return (
                    <motion.tr
                      key={scan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {scan.date}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {scan.plant}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {scan.disease}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${scan.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{scan.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.icon}
                          <span className="ml-1 capitalize">{scan.severity === 'none' ? 'Healthy' : scan.severity}</span>
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
