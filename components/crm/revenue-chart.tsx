'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'

const monthlyData = [
  { month: 'Ott', revenue: 850 },
  { month: 'Nov', revenue: 3400 },
]

const quarterlyData = [
  { period: 'Q1', revenue: 3200 },
  { period: 'Q2', revenue: 3600 },
  { period: 'Q3', revenue: 3800 },
  { period: 'Q4', revenue: 4200 },
]

const yearlyData = [
  { year: '2022', revenue: 14000 },
  { year: '2023', revenue: 14800 },
]

export function RevenueChart() {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  const chartData = useMemo(() => {
    switch (timeframe) {
      case 'monthly':
        return monthlyData
      case 'quarterly':
        return quarterlyData
      case 'yearly':
        return yearlyData
      default:
        return monthlyData
    }
  }, [timeframe])

  const dataKey = timeframe === 'monthly' ? 'month' : timeframe === 'quarterly' ? 'period' : 'year'

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('it-IT', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Panoramica Entrate</CardTitle>
          </div>
          <div className="flex gap-1.5">
            <Button
              variant={timeframe === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('monthly')}
              className={`h-7 px-3 text-xs ${
                timeframe === 'monthly' 
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
              className={`h-7 px-3 text-xs ${
                timeframe === 'quarterly' 
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
              className={`h-7 px-3 text-xs ${
                timeframe === 'yearly' 
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
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
            <XAxis 
              dataKey={dataKey}
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 400 }}
              tickLine={false}
              axisLine={false}
              height={40}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 400 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `€${formatNumber(value)}`}
              width={70}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '10px 14px'
              }}
              labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '6px', fontSize: '13px' }}
              itemStyle={{ color: '#111827', fontSize: '13px', fontWeight: 600 }}
              formatter={(value: number) => [`€${formatNumber(value)}`, 'Entrate']}
              separator=""
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={{ fill: '#6366f1', r: 4, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: '#6366f1' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

