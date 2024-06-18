import React from "react";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  // Add other User fields as needed
}

export interface Category {
  id: number;
  name: string;
  // Add other Category fields as needed
}

export interface Notification {
  id: number;
  content: string;
  time: Date;
  notificationTime: Date;
  userId: number;
  cardId: number;
  // Add other Notification fields as needed
}

export interface Card {
  id: number;
  title: string;
  answer: string;
  level: number;
  lastReviewDate: Date;
  active: boolean;
  userId: number;
  user: User;
  categoryId?: number;
  category?: Category;
  notifications: Notification[];
}

const CardContext = React.createContext<Card[]>([]);

export default CardContext;
