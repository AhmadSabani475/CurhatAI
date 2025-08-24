'use client';

import { TrendingUp } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { date: '2024-07-01', positivity: 55 },
  { date: '2024-07-02', positivity: 48 },
  { date: '2024-07-03', positivity: 60 },
  { date: '2024-07-04', positivity: 72 },
  { date: '2024-07-05', positivity: 65 },
  { date: '2024-07-06', positivity: 80 },
  { date: '2024-07-07', positivity: 75 },
];

const chartConfig = {
  positivity: {
    label: 'Positivity',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function EmotionChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
        />
        <YAxis
            domain={[0,100]}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Line
          dataKey="positivity"
          type="natural"
          stroke="var(--color-positivity)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
}
