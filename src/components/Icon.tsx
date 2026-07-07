import {
  Activity,
  AlertTriangle,
  Bed,
  Brain,
  ClipboardList,
  CloudRain,
  Heart,
  HeartHandshake,
  Layers,
  LifeBuoy,
  MapPin,
  Pill,
  Puzzle,
  Shield,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  User,
  Users,
  Waves,
  Wind,
  Wine,
  Zap,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  activity: Activity,
  "alert-triangle": AlertTriangle,
  bed: Bed,
  brain: Brain,
  clipboard: ClipboardList,
  "cloud-rain": CloudRain,
  heart: Heart,
  "heart-handshake": HeartHandshake,
  layers: Layers,
  lifebuoy: LifeBuoy,
  "map-pin": MapPin,
  pill: Pill,
  puzzle: Puzzle,
  shield: Shield,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  syringe: Syringe,
  target: Target,
  user: User,
  users: Users,
  waves: Waves,
  wind: Wind,
  wine: Wine,
  zap: Zap,
};

export default function Icon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Cmp = (name && map[name]) || Sparkles;
  return <Cmp className={className} aria-hidden />;
}
