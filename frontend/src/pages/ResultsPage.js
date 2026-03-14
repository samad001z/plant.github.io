import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, TrendingUp, Leaf, Camera, Hop as Home, CircleAlert as AlertCircle, Info } from 'lucide-react';
import { AppLayout } from '../components/Layout';
import { Button, Card, Badge } from '../components/UI';

function ResultsPage({ user, onLogout, result }) {
  const navigate = useNavigate();

  if (!result) {
    return (
      <AppLayout user={user} onLogout={onLogout}>
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
          <Card className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Available</h3>
            <p className="text-gray-600 mb-6">Please scan a plant first to see results</p>
            <Button variant="primary" onClick={() => navigate('/scan')}>
              Scan Plant
            </Button>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const confidence = result.disease?.confidence || 0;
  const isHealthy = result.isHealthy || false;

  const getSeverityConfig = (severity) => {
    const configs = {
      high: {
        color: 'danger',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600',
        icon: <AlertTriangle className="h-8 w-8" />
      },
      medium: {
        color: 'warning',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-600',
        icon: <TrendingUp className="h-8 w-8" />
      },
      low: {
        color: 'info',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600',
        icon: <Info className="h-8 w-8" />
      },
      none: {
        color: 'success',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600',
        icon: <CheckCircle className="h-8 w-8" />
      }
    };
    return configs[severity] || configs.none;
  };

  const severityConfig = getSeverityConfig(result.severity);

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnosis Results</h1>
          <p className="text-gray-600">AI analysis of your plant image</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`mb-6 ${severityConfig.bgColor} border ${severityConfig.borderColor}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-full ${severityConfig.textColor} bg-white/50`}>
                  {isHealthy ? <CheckCircle className="h-8 w-8" /> : severityConfig.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {result.disease?.name || 'Unknown'}
                  </h2>
                  {result.disease?.scientificName && (
                    <p className="text-sm text-gray-600 italic mt-1">
                      {result.disease.scientificName}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant={severityConfig.color} className="text-base px-4 py-2">
                {isHealthy ? 'Healthy' : result.severity?.toUpperCase()}
              </Badge>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Confidence Score
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Accuracy</span>
                  <span className="font-semibold text-gray-900">
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {confidence >= 0.9
                    ? 'Very High Confidence'
                    : confidence >= 0.75
                    ? 'High Confidence'
                    : confidence >= 0.5
                    ? 'Medium Confidence'
                    : 'Low Confidence'}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={severityConfig.bgColor}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-primary" />
                Plant Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Status:</span>
                  <span className={`font-semibold ${severityConfig.textColor}`}>
                    {isHealthy ? 'Healthy' : 'Needs Attention'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Severity Level:</span>
                  <span className={`font-semibold ${severityConfig.textColor} capitalize`}>
                    {result.severity || 'None'}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {result.disease?.description || 'No description available'}
            </p>
          </Card>
        </motion.div>

        {result.recommendations && result.recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Disclaimer</h4>
              <p className="text-sm text-gray-700">
                This is an AI-based prediction and may not be 100% accurate. For serious plant
                health issues, please consult local agriculture experts or visit a nearby Krishi
                Vigyan Kendra (KVK).
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/scan')}
            icon={<Camera className="h-5 w-5" />}
          >
            Scan Another Plant
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/dashboard')}
            icon={<Home className="h-5 w-5" />}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

export default ResultsPage;
