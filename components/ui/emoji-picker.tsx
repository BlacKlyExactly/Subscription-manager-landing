"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const EMOJI_GROUPS = [
  {
    label: "Streaming",
    emojis: ["🎬", "📺", "🎥", "🍿", "🎞️", "📽️"],
  },
  {
    label: "Muzyka",
    emojis: ["🎵", "🎶", "🎧", "🎸", "🎹", "🎤"],
  },
  {
    label: "Gry",
    emojis: ["🎮", "👾", "🕹️", "🃏", "♟️", "🎲"],
  },
  {
    label: "Software",
    emojis: ["💻", "🖥️", "⚙️", "🛠️", "🔧", "📱"],
  },
  {
    label: "Fitness",
    emojis: ["💪", "🏃", "🧘", "🚴", "🏋️", "⚽"],
  },
  {
    label: "Newsy",
    emojis: ["📰", "📖", "📚", "🗞️", "📡", "📻"],
  },
  {
    label: "Inne",
    emojis: [
      "📦",
      "✨",
      "🔔",
      "💳",
      "💰",
      "🌐",
      "☁️",
      "🔒",
      "📊",
      "🗂️",
      "🧩",
      "🚀",
    ],
  },
];

interface EmojiPickerProps {
  value?: string;
  onChange?: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (emoji: string) => {
    onChange?.(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="w-full justify-start gap-3 font-normal"
        >
          {value ? (
            <>
              <span className="text-xl">{value}</span>
              <span className="text-foreground/60">Zmień emoji</span>
            </>
          ) : (
            <span className="text-muted-foreground">Wybierz emoji...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-3" align="start">
        <Tabs defaultValue={EMOJI_GROUPS[0].label} className="flex-col">
          <TabsList className="flex flex-wrap gap-1 h-auto w-full rounded-xl bg-muted p-1">
            {EMOJI_GROUPS.map((group) => (
              <TabsTrigger
                key={group.label}
                value={group.label}
                className="rounded-lg px-2 py-1 text-xs"
              >
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {EMOJI_GROUPS.map((group) => (
            <TabsContent key={group.label} value={group.label} className="mt-3">
              <div className="grid grid-cols-10 gap-1 w-full">
                {group.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleSelect(emoji)}
                    className="flex items-center justify-center h-9 w-9 rounded-lg text-xl hover:bg-foreground/10 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
