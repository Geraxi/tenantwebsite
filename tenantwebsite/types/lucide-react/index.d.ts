// Type declarations for lucide-react - Augments the module to include all icons
// This file ensures TypeScript recognizes all lucide-react icons we use

import type { FC, SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number
  strokeWidth?: string | number
  absoluteStrokeWidth?: boolean
  title?: string
}

export type Icon = FC<IconProps>

// Augment the lucide-react module to include all icons we need
declare module 'lucide-react' {
  // Core icons
  export const Plus: Icon
  export const CheckCircle2: Icon
  export const AlertCircle: Icon
  export const FileText: Icon
  export const ArrowLeft: Icon
  export const ArrowRight: Icon
  
  // User icons
  export const User: Icon
  export const Users: Icon
  export const UserCheck: Icon
  
  // Communication icons
  export const Mail: Icon
  export const Phone: Icon
  
  // Location icons
  export const MapPin: Icon
  
  // Action icons
  export const Download: Icon
  export const Upload: Icon
  export const Settings: Icon
  
  // Navigation icons
  export const LayoutDashboard: Icon
  export const ChevronLeft: Icon
  export const ChevronRight: Icon
  
  // Building/Property icons - THESE ARE THE ONES VERCEL IS LOOKING FOR
  export const Building: Icon
  export const Building2: Icon
  export const Home: Icon
  export const House: Icon
  
  // Financial icons
  export const DollarSign: Icon
  
  // Other icons
  export const Rocket: Icon
  export const CheckSquare: Icon
  export const File: Icon
  export const LogOut: Icon
  export const LogIn: Icon
}
