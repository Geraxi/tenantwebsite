'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface RevenueChartProps {
  monthlyRevenue?: number
}

export function RevenueChart({ monthlyRevenue = 0 }: RevenueChartProps) {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')
  const pathname = usePathname()
  const isDemo = pathname?.startsWith('/demo')
  const paymentsLink = isDemo ? '/demo/payments' : '/crm/payments'

  // Only show data if there's actual revenue
  const hasData = monthlyRevenue > 0

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <Card className="border shadow-sm transition-all duration-200 hover:shadow-lg group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <Link href={paymentsLink} className="block">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors cursor-pointer">Panoramica Entrate</CardTitle>
            </Link>
          </div>
          <div className="flex gap-1.5">
            <Button
              variant={timeframe === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('monthly')}
              className={`h-7 px-3 text-xs ${timeframe === 'monthly'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-background hover:bg-muted'
                }`}
            >
              Mensile
            </Button>
            <Button
              variant={timeframe === 'quarterly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('quarterly')}
              className={`h-7 px-3 text-xs ${timeframe === 'quarterly'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-background hover:bg-muted'
                }`}
            >
              Trimestrale
            </Button>
            <Button
              variant={timeframe === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('yearly')}
              className={`h-7 px-3 text-xs ${timeframe === 'yearly'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-background hover:bg-muted'
                }`}
            >
              Annuale
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center h-[320px] text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <TrendingUp className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nessun Dato Disponibile</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Aggiungi pagamenti per visualizzare il grafico delle entrate mensili
            </p>
            <Link href={paymentsLink}>
              <Button>
                Aggiungi Pagamento
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-[320px] text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vista Grafico In Sviluppo</h3>
              <p className="text-sm text-muted-foreground mb-2 max-w-sm">
                Entrate mensili: <span className="font-bold text-primary">€{formatNumber(monthlyRevenue)}</span>
              </p>
              <p className="text-xs text-muted-foreground max-w-sm">
                Il grafico dettagliato sarà disponibile a breve
              </p>
            </div>
          </>
        )}
        <div className="mt-4 pt-4 border-t">
          <Link href={paymentsLink}>
            <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
              Visualizza Tutti i Pagamenti
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

