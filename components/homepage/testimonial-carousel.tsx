"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Testimonial } from "./testimonial";

export function TestimonialCarousel() {
  return (
    <Carousel plugins={[
      Autoplay({
        delay: 4000
      })
    ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="-pl-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-auto shrink-0 pl-3">
            <Testimonial
              name="Julia Swędzicipa"
              avatarFallback="JS"
              stars={3}
              quote="After all, he said, everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
