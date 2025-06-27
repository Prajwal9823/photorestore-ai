import { apiRequest } from "./queryClient";

export interface PhotoUploadResponse {
  photoId: number;
  message: string;
}

export interface PhotoStatus {
  id: number;
  status: "processing" | "completed" | "failed";
  originalImage?: string;
  enhancedImage?: string;
  originalUrl: string;
  enhancedUrl?: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const uploadPhoto = async (file: File): Promise<PhotoUploadResponse> => {
  const formData = new FormData();
  formData.append('photo', file);
  
  const response = await fetch('/api/photos/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }

  return response.json();
};

export const getPhotoStatus = async (photoId: number): Promise<PhotoStatus> => {
  const response = await apiRequest('GET', `/api/photos/${photoId}`);
  return response.json();
};

export const submitContactForm = async (data: ContactFormData) => {
  const response = await apiRequest('POST', '/api/contact', data);
  return response.json();
};
