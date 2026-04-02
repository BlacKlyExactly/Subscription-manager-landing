import { Typography } from "@/lib/components/ui/typography";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


type TestimonialProps = {
  quote: string;
  name: string;
  avatar?: string;
  avatarFallback?: string;
  stars: number;
}

const MAX_STARS = 5;

export function Testimonial({ quote, name, avatar, avatarFallback, stars }: TestimonialProps) {
  stars = Math.min(Math.max(stars, 0), MAX_STARS);
  const emptyStars = MAX_STARS - stars;

  return (
    <article className="border border-foreground/10 bg-card py-6 px-8 rounded-3xl max-w-[calc(100vw-64px)] md:max-w-119 space-y-6">
      <Quote className="size-6 text-transparent fill-primary" />
      <Typography size="blockquote" className="text-left mt-8 md:mt-4">
        {quote}
      </Typography>
      <div className="w-full flex justify-between flex-col gap-8 md:gap-0 md:flex-row">
        <div className="flex gap-3 items-center justify-start">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <Typography size="small" className="text-foreground/90">{name}</Typography>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: stars }).map((_, i) => (
            <Star className="fill-primary text-primary size-5" key={i} />
          ))}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <Star className="text-primary size-5" key={i} />
          ))}
        </div>
      </div>
    </article>
  )
}
