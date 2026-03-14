import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, Activity } from 'lucide-react';
import { AppLayout } from '../components/Layout';
import { Card, Button, Input, Badge } from '../components/UI';

function HistoryPage({ user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockScans = [
    {
      id: 1,
      date: '2024-03-14 10:30 AM',
      plantType: 'Tomato',
      disease: 'Late Blight',
      confidence: 92,
      severity: 'high',
      imageUrl: null
    },
    {
      id: 2,
      date: '2024-03-13 02:15 PM',
      plantType: 'Potato',
      disease: 'Healthy',
      confidence: 98,
      severity: 'none',
      imageUrl: null
    },
    {
      id: 3,
      date: '2024-03-12 11:45 AM',
      plantType: 'Cucumber',
      disease: 'Powdery Mildew',
      confidence: 85,
      severity: 'medium',
      imageUrl: null
    },
    {
      id: 4,
      date: '2024-03-11 09:20 AM',
      plantType: 'Tomato',
      disease: 'Bacterial Spot',
      confidence: 78,
      severity: 'medium',
      imageUrl: null
    },
    {
      id: 5,
      date: '2024-03-10 03:30 PM',
      plantType: 'Bell Pepper',
      disease: 'Healthy',
      confidence: 95,
      severity: 'none',
      imageUrl: null
    },
    {
      id: 6,
      date: '2024-03-09 01:15 PM',
      plantType: 'Tomato',
      disease: 'Early Blight',
      confidence: 88,
      severity: 'low',
      imageUrl: null
    }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      high: {
        variant: 'danger',
        icon: <XCircle className="h-4 w-4" />,
        label: 'High Risk'
      },
      medium: {
        variant: 'warning',
        icon: <AlertTriangle className="h-4 w-4" />,
        label: 'Medium Risk'
      },
      low: {
        variant: 'info',
        icon: <Activity className="h-4 w-4" />,
        label: 'Low Risk'
      },
      none: {
        variant: 'success',
        icon: <CheckCircle className="h-4 w-4" />,
        label: 'Healthy'
      }
    };
    return configs[severity] || configs.none;
  };

  const filteredScans = mockScans.filter((scan) => {
    const matchesSearch =
      scan.plantType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.disease.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'healthy' && scan.severity === 'none') ||
      (filterStatus === 'diseased' && scan.severity !== 'none');
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan History</h1>
          <p className="text-gray-600">View all your past plant disease scans</p>
        </motion.div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by plant type or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-5 w-5" />}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'healthy' ? 'primary' : 'secondary'}
              onClick={() => setFilterStatus('healthy')}
            >
              Healthy
            </Button>
            <Button
              variant={filterStatus === 'diseased' ? 'primary' : 'secondary'}
              onClick={() => setFilterStatus('diseased')}
            >
              Diseased
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredScans.length > 0 ? (
            filteredScans.map((scan, index) => {
              const config = getSeverityConfig(scan.severity);
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-large transition-shadow cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                          <p className="font-medium text-gray-900">{scan.date}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">Plant Type</p>
                          <p className="font-medium text-gray-900">{scan.plantType}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">Disease</p>
                          <p className="font-medium text-gray-900">{scan.disease}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">Status</p>
                          <Badge variant={config.variant} icon={config.icon}>
                            {config.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Confidence</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${scan.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {scan.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <Card className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </Card>
          )}
        </div>

        {filteredScans.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredScans.length} of {mockScans.length} scans
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default HistoryPage;
