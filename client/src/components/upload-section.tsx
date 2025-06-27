import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload, Download, Share, Plus, RotateCcw } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadPhoto, getPhotoStatus, type PhotoStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import BeforeAfterSlider from "./before-after-slider";

type UploadState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

export default function UploadSection() {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: (data) => {
      setCurrentPhotoId(data.photoId);
      setUploadState('processing');
      setProgress(10);
      toast({
        title: "Upload Successful",
        description: "Your photo is being processed...",
      });
    },
    onError: (error) => {
      setUploadState('error');
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { data: photoStatus } = useQuery({
    queryKey: ['/api/photos', currentPhotoId],
    enabled: !!currentPhotoId && uploadState === 'processing',
    refetchInterval: (query) => {
      const data = query.state.data as PhotoStatus | undefined;
      return data?.status === 'processing' ? 2000 : false;
    },
    queryFn: () => getPhotoStatus(currentPhotoId!),
  });

  // Update progress and state based on photo status
  useEffect(() => {
    if (photoStatus) {
      if (photoStatus.status === 'completed') {
        setUploadState('completed');
        setProgress(100);
        toast({
          title: "Enhancement Complete!",
          description: "Your photo has been successfully enhanced.",
        });
      } else if (photoStatus.status === 'failed') {
        setUploadState('error');
        toast({
          title: "Processing Failed",
          description: "Something went wrong while processing your photo.",
          variant: "destructive",
        });
      } else if (photoStatus.status === 'processing') {
        // Simulate progress for processing state
        setProgress(prev => Math.min(prev + 5, 90));
      }
    }
  }, [photoStatus, toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setUploadState('uploading');
      setProgress(0);
      uploadMutation.mutate(file);
    }
  }, [uploadMutation, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.tiff']
    },
    maxFiles: 1,
    disabled: uploadState === 'uploading' || uploadState === 'processing'
  });

  const resetUpload = () => {
    setUploadState('idle');
    setCurrentPhotoId(null);
    setProgress(0);
    queryClient.removeQueries({ queryKey: ['/api/photos'] });
  };

  const downloadImage = () => {
    if (photoStatus?.enhancedImage) {
      const link = document.createElement('a');
      link.href = photoStatus.enhancedImage;
      link.download = 'enhanced-photo.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareImage = () => {
    if (navigator.share && photoStatus?.enhancedImage) {
      navigator.share({
        title: 'My Enhanced Photo',
        text: 'Check out my photo enhanced with AI!',
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "The page link has been copied to your clipboard.",
      });
    }
  };

  return (
    <section id="upload" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upload Your Photo</h2>
          <p className="text-xl text-gray-600">Drag and drop or click to select your image</p>
        </div>

        {uploadState === 'idle' && (
          <div className="mb-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors duration-200 cursor-pointer ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 bg-gray-50 hover:border-primary hover:bg-indigo-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CloudUpload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-700">Drop your photo here</p>
                  <p className="text-gray-500 mt-2">
                    or <span className="text-primary font-medium">click to browse</span>
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span>JPG, PNG up to 10MB</span>
                  <span>•</span>
                  <span>Best results with 1080p+</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {(uploadState === 'uploading' || uploadState === 'processing') && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {uploadState === 'uploading' ? 'Uploading your photo...' : 'Enhancing your photo...'}
                </h3>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="mb-4" />
              <div className="flex items-center text-sm text-gray-600">
                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                <span>
                  {uploadState === 'uploading'
                    ? 'Uploading image...'
                    : 'Applying AI restoration with intelligent colorization...'}
                </span>
              </div>
              {uploadState === 'processing' && (
                <p className="text-xs text-gray-500 mt-2">
                  AI analysis, intelligent colorization, damage repair, and enhancement in progress
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {uploadState === 'completed' && photoStatus && (
          <Card>
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Enhanced Photo</h3>
                <p className="text-gray-600">Slide to compare the original and enhanced versions</p>
              </div>

              <BeforeAfterSlider
                beforeImage={photoStatus.originalImage!}
                afterImage={photoStatus.enhancedImage!}
                beforeLabel="BEFORE"
                afterLabel="AFTER"
              />

              <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4">
                <Button onClick={downloadImage} className="flex-1 bg-primary hover:bg-primary/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download HD Image
                </Button>
                <Button onClick={shareImage} variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-2" />
                  Share Result
                </Button>
                <Button onClick={resetUpload} variant="outline">
                  <Plus className="h-4 w-4" />
                  New Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadState === 'error' && (
          <Card className="border-destructive">
            <CardContent className="p-6 text-center">
              <div className="text-destructive mb-4">
                <h3 className="text-lg font-semibold">Processing Failed</h3>
                <p className="text-sm">Something went wrong while processing your photo.</p>
              </div>
              <Button onClick={resetUpload} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
