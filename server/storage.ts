import { photos, contacts, type Photo, type InsertPhoto, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  getPhoto(id: number): Promise<Photo | undefined>;
  updatePhoto(id: number, updates: Partial<Photo>): Promise<Photo | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private photos: Map<number, Photo>;
  private contacts: Map<number, Contact>;
  private currentPhotoId: number;
  private currentContactId: number;

  constructor() {
    this.photos = new Map();
    this.contacts = new Map();
    this.currentPhotoId = 1;
    this.currentContactId = 1;
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.currentPhotoId++;
    const photo: Photo = {
      id,
      originalUrl: insertPhoto.originalUrl,
      enhancedUrl: insertPhoto.enhancedUrl || null,
      status: insertPhoto.status || "processing",
      createdAt: new Date(),
    };
    this.photos.set(id, photo);
    return photo;
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async updatePhoto(id: number, updates: Partial<Photo>): Promise<Photo | undefined> {
    const existing = this.photos.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.photos.set(id, updated);
    return updated;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
