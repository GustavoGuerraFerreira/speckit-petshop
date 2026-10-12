import {
  Award,
  Car,
  Clock,
  HeartHandshake,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/types/content';

export const ICONS: Readonly<Record<IconName, LucideIcon>> = {
  'shield-check': ShieldCheck,
  award: Award,
  wind: Wind,
  'heart-handshake': HeartHandshake,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  video: Video,
  car: Car,
  clock: Clock,
  'paw-print': PawPrint,
};
