import React from 'react';
import { Car, Truck, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VehicleTypeIconProps {
  vehicleType: string;
  className?: string;
}

const VehicleTypeIcon: React.FC<VehicleTypeIconProps> = ({ vehicleType, className }) => {
  const getVehicleIcon = (type: string) => {
    const normalizedType = type.toLowerCase();
    
    if (normalizedType.includes('suv') || normalizedType.includes('ertiga')) {
      return {
        icon: Truck,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        label: 'SUV'
      };
    }
    
    if (normalizedType.includes('sedan') || normalizedType.includes('creta')) {
      return {
        icon: Car,
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        label: 'Sedan'
      };
    }
    
    if (normalizedType.includes('compact') || normalizedType.includes('nexon')) {
      return {
        icon: Car,
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
        label: 'Compact'
      };
    }
    
    if (normalizedType.includes('premium') || normalizedType.includes('luxury')) {
      return {
        icon: Star,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
        label: 'Premium'
      };
    }
    
    if (normalizedType.includes('electric') || normalizedType.includes('ev')) {
      return {
        icon: Zap,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        label: 'Electric'
      };
    }
    
    // Default fallback
    return {
      icon: Car,
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600',
      label: 'Standard'
    };
  };

  const { icon: Icon, bgColor, iconColor, label } = getVehicleIcon(vehicleType);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", bgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{vehicleType}</p>
      </div>
    </div>
  );
};

export default VehicleTypeIcon;