import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: number
  color: string
  textColor: string
}

export default function StatCard({ label, value, color, textColor }: StatCardProps) {
  return (
    <Card className={`p-6 border border-border ${color}`}>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </Card>
  )
}
