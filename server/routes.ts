import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import OpenAI from "openai";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { advancedRestorationService } from "./advanced-restoration.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Upload and enhance photo
  app.post("/api/photos/upload", upload.single('photo'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create photo record
      const photo = await storage.createPhoto({
        originalUrl: req.file.path,
        status: "processing"
      });

      // Process image in background
      processImageAsync(photo.id, req.file.path);

      res.json({ 
        photoId: photo.id,
        message: "Photo uploaded successfully, processing started" 
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  // Get photo status and results
  app.get("/api/photos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const photo = await storage.getPhoto(id);
      
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }

      // If photo is completed, return base64 encoded images
      if (photo.status === "completed" && photo.originalUrl && photo.enhancedUrl) {
        try {
          const originalBuffer = await fs.promises.readFile(photo.originalUrl);
          const enhancedBuffer = await fs.promises.readFile(photo.enhancedUrl);
          
          const originalBase64 = originalBuffer.toString('base64');
          const enhancedBase64 = enhancedBuffer.toString('base64');

          res.json({
            ...photo,
            originalImage: `data:image/jpeg;base64,${originalBase64}`,
            enhancedImage: `data:image/jpeg;base64,${enhancedBase64}`
          });
        } catch (fileError) {
          console.error("File read error:", fileError);
          res.json(photo);
        }
      } else {
        res.json(photo);
      }
    } catch (error) {
      console.error("Get photo error:", error);
      res.status(500).json({ message: "Failed to get photo" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Message sent successfully", contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function processImageAsync(photoId: number, originalPath: string) {
  try {
    console.log(`Starting professional AI restoration for photo ${photoId}`);
    
    // Ensure uploads directory exists
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
    }

    // Create accessible URL for the AI service
    const originalUrl = `http://localhost:5000/uploads/${path.basename(originalPath)}`;
    
    try {
      // Use advanced AI restoration service with intelligent colorization
      console.log(`Applying advanced AI restoration with intelligent colorization for photo ${photoId}`);
      
      const enhancedPath = await advancedRestorationService.restorePhoto(originalPath, {
        enhanceContrast: true,
        colorizeBlackWhite: true,
        repairDamage: true,
        enhanceFaces: true,
        upscaleResolution: true,
        targetScale: 2.5
      });

      console.log(`Advanced AI restoration completed for photo ${photoId}`);

      // Update photo record with AI-enhanced result
      await storage.updatePhoto(photoId, {
        enhancedUrl: enhancedPath,
        status: "completed"
      });

      console.log(`Photo ${photoId} professionally restored with accurate colorization`);
      
    } catch (aiError) {
      console.warn(`Professional AI restoration failed for photo ${photoId}, applying fallback enhancement:`, aiError);
      
      // Fallback to advanced Sharp processing if AI fails
      const processedBuffer = await sharp(originalPath)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 95 })
        .toBuffer();

      const enhancedBuffer = await sharp(processedBuffer)
        .modulate({
          brightness: 1.2,     // Enhanced brightness
          saturation: 1.4,     // Enhanced saturation
          hue: 0
        })
        .sharpen()  // Enhanced sharpening
        .gamma(1.2)           // Better contrast
        .normalize()          // Auto-level adjustment
        .toBuffer();

      const timestamp = Date.now();
      const enhancedPath = `uploads/enhanced_${timestamp}_${photoId}.jpg`;
      await fs.promises.writeFile(enhancedPath, enhancedBuffer);

      await storage.updatePhoto(photoId, {
        enhancedUrl: enhancedPath,
        status: "completed"
      });

      console.log(`Fallback enhancement completed for photo ${photoId}`);
    }
    
    // Clean up files after 24 hours
    setTimeout(() => {
      try {
        fs.unlink(originalPath, () => {});
        const enhancedPath = `uploads/enhanced_${Date.now()}_${photoId}.jpg`;
        fs.unlink(enhancedPath, () => {});
      } catch (cleanupError) {
        console.warn('File cleanup error:', cleanupError);
      }
    }, 24 * 60 * 60 * 1000);

  } catch (error) {
    console.error(`Failed to process photo ${photoId}:`, error);
    await storage.updatePhoto(photoId, {
      status: "failed"
    });
  }
}
