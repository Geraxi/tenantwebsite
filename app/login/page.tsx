import { LoginForm } from '@/components/auth/login-form'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <Image 
              src="/images/logo-removebg-preview.png" 
              alt="Tenant Logo" 
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tenant</span>
          </Link>
          <h1 className="text-3xl font-bold">Bentornato</h1>
          <p className="text-muted-foreground mt-2">Accedi al tuo account Tenant</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

