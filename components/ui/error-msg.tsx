import { Typography } from "@/components/ui/typography"
import { PropsWithChildren } from "react"

export const ErrorMsg = ({ children }: PropsWithChildren) => {
  return (
    <Typography size="small" className="text-red-500">
      {children}
    </Typography>
  )
}
