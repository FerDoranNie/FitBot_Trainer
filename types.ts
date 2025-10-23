
import type React from 'react';

export enum ConversationState {
  IDLE,
  AWAITING_GREETING,
  AWAITING_TIME,
  AWAITING_EQUIPMENT,
  AWAITING_PROFILE,
  GENERATING_EXERCISES,
  AWAITING_EXERCISE_SELECTION,
  GENERATING_INSTRUCTIONS,
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text?: string;
  component?: React.ReactNode;
}

export interface Equipment {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface WorkoutParams {
  time: number | null;
  equipment: string[];
  age: number | null;
  gender: string | null;
  activityLevel: string | null;
}

export interface Exercise {
  name: string;
  description: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SidebarData {
  estimatedCalories: number | null;
  foodEquivalent: string | null;
  sources: GroundingChunk[];
}
