'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Scan, FileText } from 'lucide-react';

type PredictionResult = {
  prediction: string;
  confidence_percentages: Record<string, number>;
};

export function ScanSection() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleImageUpload = useCallback((file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setActiveTab('preview');
    setResults(null);
  }, [previewUrl]);

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setResults(data);
      setActiveTab('results');
      toast({ title: 'Analysis complete', description: `Found: ${data.prediction}` });
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
      setActiveTab('preview');
    } finally {
      setIsLoading(false);
    }
  };

  const resetScan = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setResults(null);
    setActiveTab('upload');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [previewUrl]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="grid grid-cols-3 border-b">
            <button
              type="button"
              className={`p-4 font-medium flex items-center justify-center ${
                activeTab === 'upload' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => !isLoading && setActiveTab('upload')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </button>
            <button
              type="button"
              className={`p-4 font-medium flex items-center justify-center ${
                activeTab === 'preview' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              } ${!previewUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => previewUrl && !isLoading && setActiveTab('preview')}
              disabled={!previewUrl || isLoading}
            >
              <Scan className="mr-2 h-4 w-4" />
              Preview
            </button>
            <button
              type="button"
              className={`p-4 font-medium flex items-center justify-center ${
                activeTab === 'results' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              } ${!results ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => results && !isLoading && setActiveTab('results')}
              disabled={!results || isLoading}
            >
              <FileText className="mr-2 h-4 w-4" />
              Results
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-12 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Click to upload image</p>
                </button>
              </div>
            )}

            {activeTab === 'preview' && previewUrl && (
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Analyze Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetScan}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'results' && results && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold">Diagnosis:</h4>
                    <p className="text-lg capitalize">
                      {results.prediction.toLowerCase().replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Confidence Levels:</h4>
                    <div className="space-y-2">
                      {Object.entries(results.confidence_percentages).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <div className="w-32 capitalize">{key.toLowerCase().replace('_', ' ')}:</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-blue-600 h-4 rounded-full"
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-16 text-right">
                            {(value * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={resetScan}
                    className="w-full"
                  >
                    Start New Scan
                  </Button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
