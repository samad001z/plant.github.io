import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Loader, CircleCheck as CheckCircle, Image as ImageIcon } from 'lucide-react';
import { AppLayout } from '../components/Layout';
import { Button, Card } from '../components/UI';
import { scanService } from '../services/api';

function ScanPage({ user, onLogout, onScanComplete }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB');
      return;
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await scanService.analyzeImage(selectedImage);
      onScanComplete(result);
      navigate('/result');
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <AppLayout user={user} onLogout={onLogout}>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan Your Plant</h1>
          <p className="text-gray-600">Upload or capture a photo to detect plant diseases</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="text-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-6"
                >
                  <Loader className="h-16 w-16 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Plant</h3>
                <p className="text-gray-600 mb-4">Our AI is examining the image...</p>
                <div className="max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="mb-6">
                <div
                  className={`border-3 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : imagePreview
                      ? 'border-gray-200'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {imagePreview ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <img
                        src={imagePreview}
                        alt="Selected plant"
                        className="max-h-96 mx-auto rounded-lg shadow-medium"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center justify-center text-green-600"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">Image ready for analysis</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div className="py-12">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ImageIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Drag and drop your plant image here
                      </h3>
                      <p className="text-gray-500 mb-6">or choose from the options below</p>
                    </div>
                  )}
                </div>
              </Card>

              {!imagePreview && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className="cursor-pointer hover:shadow-large p-8 text-center"
                      onClick={() => cameraInputRef.current?.click()}
                    >
                      <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Photo</h3>
                      <p className="text-sm text-gray-600">Use your camera to capture</p>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className="cursor-pointer hover:shadow-large p-8 text-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                      <p className="text-sm text-gray-600">Choose from your gallery</p>
                    </Card>
                  </motion.div>
                </div>
              )}

              <input
                type="file"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center"
                >
                  <X className="h-5 w-5 mr-2" />
                  {error}
                </motion.div>
              )}

              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAnalyze}
                    icon={<Camera className="h-5 w-5" />}
                  >
                    Analyze Plant
                  </Button>
                </motion.div>
              )}

              <Card className="mt-6 bg-blue-50 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Tips for Best Results</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Take clear, well-lit photos of affected leaves
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Get close to capture details of the problem
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Avoid blurry or dark images
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Include multiple leaves if possible
                  </li>
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

export default ScanPage;
