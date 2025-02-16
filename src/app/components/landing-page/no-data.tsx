import { RefreshCw, ServerOffIcon as DatabaseOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoDataProps {
  message?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function NoData({
  message = "No Data Available",
  description = "We couldn't find any data to display at the moment.",
  actionLabel = "Try Again",
  onAction,
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] text-center bg-gradient-to-b from-background to-muted rounded-lg shadow-sm border border-border">
      <div className="relative mb-6">
        <DatabaseOff className="w-16 h-16 text-muted-foreground" />
        <div className="absolute -top-1 -right-1 animate-ping">
          <RefreshCw className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">{message}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      <Button onClick={onAction} className="group">
        <RefreshCw className="mr-2 h-4 w-4 group-hover:animate-spin" />
        {actionLabel}
      </Button>
    </div>
  )
}

