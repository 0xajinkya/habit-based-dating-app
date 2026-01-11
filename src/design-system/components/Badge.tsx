import React from 'react';
import { Check, Shield, Zap, Star, Trophy, Crown, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { tokens } from '../tokens';
// --- Verified Badge ---
interface VerifiedBadgeProps {
  size?: 'sm' | 'md';
  className?: string;
}
export function VerifiedBadge({
  size = 'md',
  className
}: VerifiedBadgeProps) {
  const sizeClasses = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const iconSize = size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3';
  return <div className={cn('inline-flex items-center justify-center rounded-full bg-blue-500 text-white shadow-sm', sizeClasses, className)} aria-label="Verified User">
      <Check className={cn(iconSize, 'stroke-[3px]')} />
    </div>;
}
// --- Tier Badge ---
interface TierBadgeProps {
  tier: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  className?: string;
}
export function TierBadge({
  tier,
  showLabel = true,
  className
}: TierBadgeProps) {
  const tierConfig = tokens.colors.tiers[tier];
  const TierIcon = {
    1: Shield,
    2: Star,
    3: Trophy,
    4: Crown,
    5: Sparkles
  }[tier];
  return <div className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border', tierConfig.bg, tierConfig.text, tierConfig.border, className)}>
      <TierIcon className={cn('h-3.5 w-3.5', tierConfig.icon)} />
      {showLabel && <span>Tier {tier}</span>}
    </div>;
}
// --- Activity Dot ---
interface ActivityDotProps {
  status: 'today' | 'week' | 'inactive';
  className?: string;
}
export function ActivityDot({
  status,
  className
}: ActivityDotProps) {
  return <div className={cn('relative flex h-3 w-3', className)}>
      {status === 'today' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
      <span className={cn('relative inline-flex rounded-full h-3 w-3 border-2 border-white', tokens.colors.activity[status])}></span>
    </div>;
}
// --- Compatibility Pill ---
export function CompatibilityPill({
  className
}: {
  className?: string;
}) {
  return <div className={cn('inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 uppercase tracking-wider', className)}>
      <Zap className="h-3 w-3 fill-indigo-700" />
      Highly Compatible
    </div>;
}