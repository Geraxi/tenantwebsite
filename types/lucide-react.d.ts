declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number
    strokeWidth?: string | number
    absoluteStrokeWidth?: boolean
  }
  
  export type Icon = FC<IconProps>
  
  // Export all commonly used icons
  export const Plus: Icon
  export const CheckCircle2: Icon
  export const AlertCircle: Icon
  export const FileText: Icon
  export const ArrowLeft: Icon
  export const ArrowRight: Icon
  export const User: Icon
  export const Users: Icon
  export const Mail: Icon
  export const Phone: Icon
  export const MapPin: Icon
  export const Download: Icon
  export const LayoutDashboard: Icon
  export const Home: Icon
  export const House: Icon
  export const Building: Icon
  export const Building2: Icon
  export const DollarSign: Icon
  export const UserCheck: Icon
  export const Settings: Icon
  export const ChevronLeft: Icon
  export const ChevronRight: Icon
  export const Rocket: Icon
  export const Upload: Icon
  export const CheckSquare: Icon
  export const File: Icon
  // Add more as needed
}

