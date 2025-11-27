import {
  type Property,
  type InsertProperty,
  type Testimonial,
  type InsertTestimonial,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Properties
  getAllProperties(): Promise<Property[]>;
  getPropertyById(id: string): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact Submissions
  createContactSubmission(
    submission: InsertContactSubmission
  ): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private testimonials: Map<string, Testimonial>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.properties = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed properties
    const sampleProperties: InsertProperty[] = [
      {
        title: "Waterfront Luxury Mansion",
        description:
          "An extraordinary waterfront estate featuring contemporary architecture, floor-to-ceiling windows, and breathtaking ocean views. This magnificent property offers the ultimate in luxury living with an infinity pool, private beach access, and meticulously landscaped grounds.",
        price: 8500000,
        location: "Malibu",
        bedrooms: 6,
        bathrooms: 7,
        squareFeet: 8500,
        propertyType: "Mansion",
        status: "available",
        imageUrl: "/generated_images/luxury_waterfront_mansion_hero.png",
        featured: true,
        amenities: [
          "Infinity Pool",
          "Private Beach Access",
          "Home Theater",
          "Wine Cellar",
          "Smart Home System",
          "Gourmet Kitchen",
          "Ocean Views",
          "Outdoor Kitchen",
        ],
      },
      {
        title: "Modern Downtown Penthouse",
        description:
          "Sophisticated urban living at its finest. This stunning penthouse features sleek contemporary design, panoramic city views, and premium finishes throughout. Located in the heart of downtown with world-class amenities and concierge services.",
        price: 5200000,
        location: "Manhattan",
        bedrooms: 4,
        bathrooms: 4,
        squareFeet: 4200,
        propertyType: "Penthouse",
        status: "available",
        imageUrl: "/generated_images/urban_penthouse_property.png",
        featured: true,
        amenities: [
          "City Views",
          "Rooftop Terrace",
          "24/7 Concierge",
          "Fitness Center",
          "Private Elevator",
          "High-End Appliances",
          "Floor-to-Ceiling Windows",
          "Smart Home",
        ],
      },
      {
        title: "Hillside Villa with Mountain Views",
        description:
          "Perched on a hillside with sweeping mountain vistas, this contemporary villa combines modern minimalism with natural beauty. Features include an open floor plan, seamless indoor-outdoor living, and premium materials throughout.",
        price: 6800000,
        location: "Aspen",
        bedrooms: 5,
        bathrooms: 6,
        squareFeet: 6200,
        propertyType: "Villa",
        status: "available",
        imageUrl:
          "/generated_images/hillside_villa_mountain_views.png",
        featured: true,
        amenities: [
          "Mountain Views",
          "Ski-In/Ski-Out",
          "Hot Tub",
          "Wine Room",
          "Home Gym",
          "Heated Floors",
          "Gas Fireplace",
          "Private Garage",
        ],
      },
      {
        title: "Beachfront Estate",
        description:
          "Experience paradise in this stunning beachfront estate with direct ocean access. Modern tropical architecture meets luxury living with expansive terraces, infinity pool, and lush landscaping creating your private oasis.",
        price: 12500000,
        location: "Miami Beach",
        bedrooms: 7,
        bathrooms: 8,
        squareFeet: 10500,
        propertyType: "Estate",
        status: "available",
        imageUrl: "/generated_images/beachfront_estate_tropical.png",
        featured: false,
        amenities: [
          "Private Beach",
          "Infinity Pool",
          "Outdoor Pavilion",
          "Summer Kitchen",
          "Home Spa",
          "Tennis Court",
          "Guest House",
          "Tropical Gardens",
        ],
      },
      {
        title: "Mediterranean Villa",
        description:
          "Classic elegance meets modern comfort in this beautiful Mediterranean-style villa. Featuring timeless architecture, terracotta roofs, arched windows, and a private courtyard with fountain. A true masterpiece of design.",
        price: 4750000,
        location: "Beverly Hills",
        bedrooms: 5,
        bathrooms: 5,
        squareFeet: 5800,
        propertyType: "Villa",
        status: "available",
        imageUrl: "/generated_images/mediterranean_villa_classic.png",
        featured: false,
        amenities: [
          "Courtyard",
          "Fountain",
          "Outdoor Kitchen",
          "Wine Cellar",
          "Library",
          "Pool",
          "Manicured Gardens",
          "Three-Car Garage",
        ],
      },
      {
        title: "Luxury Condo with City Views",
        description:
          "Modern luxury living in the heart of the city. This exquisite condo features an open floor plan, designer finishes, marble countertops, and floor-to-ceiling windows showcasing stunning city views. Building amenities include pool, gym, and valet.",
        price: 2800000,
        location: "Manhattan",
        bedrooms: 3,
        bathrooms: 3,
        squareFeet: 2500,
        propertyType: "Luxury Condo",
        status: "available",
        imageUrl: "/generated_images/luxury_condo_interior.png",
        featured: false,
        amenities: [
          "City Views",
          "Marble Countertops",
          "Building Pool",
          "Fitness Center",
          "Valet Parking",
          "Doorman",
          "Storage",
          "Pet Friendly",
        ],
      },
    ];

    sampleProperties.forEach((prop) => {
      const id = randomUUID();
      this.properties.set(id, { ...prop, id });
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "James Mitchell",
        role: "Real Estate Investor",
        content:
          "Working with LuxeEstate was an absolute pleasure. Their professionalism and market knowledge helped me find the perfect investment property. Highly recommended!",
        rating: 5,
        avatarUrl: null,
      },
      {
        name: "Patricia Hernandez",
        role: "Homeowner",
        content:
          "The team at LuxeEstate went above and beyond to help us find our dream home. Their attention to detail and personalized service made all the difference.",
        rating: 5,
        avatarUrl: null,
      },
      {
        name: "Robert Chen",
        role: "Business Executive",
        content:
          "Exceptional service from start to finish. The property selection was outstanding, and the entire process was smooth and professional. I couldn't be happier with my purchase.",
        rating: 5,
        avatarUrl: null,
      },
      {
        name: "Elizabeth Thompson",
        role: "Entrepreneur",
        content:
          "LuxeEstate truly understands luxury real estate. They found us exactly what we were looking for and handled every detail with care and expertise.",
        rating: 5,
        avatarUrl: null,
      },
      {
        name: "Michael Rodriguez",
        role: "Retired Executive",
        content:
          "Outstanding experience! The team's knowledge of the luxury market is unparalleled. They made finding our retirement home effortless and enjoyable.",
        rating: 5,
        avatarUrl: null,
      },
      {
        name: "Sarah Williams",
        role: "Doctor",
        content:
          "From our first meeting to closing, everything was handled professionally and efficiently. LuxeEstate's commitment to excellence truly shows in their work.",
        rating: 5,
        avatarUrl: null,
      },
    ];

    sampleTestimonials.forEach((testimonial) => {
      const id = randomUUID();
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  // Properties
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getPropertyById(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter((p) => p.featured);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(
    insertTestimonial: InsertTestimonial
  ): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact Submissions
  async createContactSubmission(
    insertSubmission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { ...insertSubmission, id };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
