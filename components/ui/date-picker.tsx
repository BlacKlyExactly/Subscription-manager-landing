"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Wybierz datę",
  className,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date>();

  const date = value ?? internalDate;
  const setDate = onChange ?? setInternalDate;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={`w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground ${className ?? ""}`}
        >
          <CalendarIcon />
          {date ? format(date, "d MMMM yyyy", { locale: undefined }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
