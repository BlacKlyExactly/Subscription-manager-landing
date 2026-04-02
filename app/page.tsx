import { Button } from "@/components/ui/button";
import { Main } from "@/components/ui/main";
import { Typography } from "@/lib/components/ui/typography";
import Image from "next/image";
import cover from "@/assets/cover.png";
import { Section } from "@/components/ui/section";
import { Bell, CreditCard, Eye } from "lucide-react";
import { BlurHighlight } from "@/components/ui/blur-highlight";
import { HowItWorksCard } from "@/components/homepage/how-it-works-card";
import { CroppedContainer } from "@/components/ui/cropped-container";
import { TestimonialCarousel } from "@/components/homepage/testimonial-carousel";

export default function Home() {
  return (
    <Main>
      <CroppedContainer className="text-center flex flex-col gap-7 items-center">
        <Typography size="h1" className="lg:max-w-2xl mx-auto">
          Twoje <span className="text-primary">subskrypcje</span> kosztują więcej niż myślisz.
        </Typography>
        <Typography size="p" className="lg:max-w-lg">
          Zbierz wszystkie subskrypcje w jednym miejscu, śledź wydatki i przestań przepłacać.
        </Typography>
        <Button size="lg">Sprawdź ile przepłacasz</Button>
      </CroppedContainer>
      <CroppedContainer className="group relative hero rounded-3xl mx-6 px-0 md:mx-auto md:px-6">
        <BlurHighlight className="size-64 -left-8 -top-8" />
        <Image alt="" loading="eager" src={cover}
          className="shadow-2xl shadow-foreground/10 dark:shadow-none transform-[perspective(800px)_rotateX(9deg)_scale(0.97)] aspect-9/16 object-cover h-auto md:aspect-video rounded-3xl mt-16 card mb-8 dark:invert" />
      </CroppedContainer>
      <Section>
        <div>
          <Typography size="h2">
            Jak to działa w <span className="text-primary">3 prostych</span> krokach
          </Typography>
          <Typography className="mt-3 lg:mt-0">Zacznij w kilka minut, oszczędzaj przez lata</Typography>
        </div>
        <div className="mt-8 lg:mt-12 flex flex-col gap-4 items-center lg:flex-row">
          <HowItWorksCard
            highlight="bl"
            icon={<CreditCard />}
            title="Dodaj swoje subskrypcje"
            description="Wpisz subskrypcje ręcznie lub wybierz z bazy popularnych serwisów. Cokolwiek płacisz cyklicznie – masz to w jednym miejscu."
          >
            <BlurHighlight className="-bottom-6 left-0 opacity-30!" />
          </HowItWorksCard>
          <HowItWorksCard
            highlight="tl"
            icon={<Eye />}
            title="Dodaj swoje subskrypcje"
            description="Dashboard zsumuje wszystkie opłaty i pokaże ile wydajesz miesięcznie i rocznie. Żadna złotówka nie przecieknie niezauważona."
          >
            <BlurHighlight className="-top-6 -left-6 opacity-20!" />
          </HowItWorksCard>

          <HowItWorksCard
            highlight="tr"
            icon={<Bell />}
            title="Dodaj swoje subskrypcje"
            description="Dostaniesz powiadomienie zanim subskrypcja się odnowi. Masz czas zdecydować – zostać czy zrezygnować."
          >
            <BlurHighlight className="right-0 -top-6 opacity-30!" />
          </HowItWorksCard>
        </div>
        <Button size="lg" className="mt-8">Zacznij już teraz</Button>
      </Section>
      <Section disableCrop>
        <CroppedContainer>
          <Typography size="h2">
            Opinie użytkowników
          </Typography>
          <Typography className="mt-3 lg:mt-0">Nie wierz nam na słowo – <span className="text-primary">posłuchaj innych</span></Typography>
        </CroppedContainer>
        <div className="mt-8 lg:mt-12 mx-auto">
          <TestimonialCarousel />
        </div>
        <Button size="lg" className="mt-8">Dołącz do innych</Button>
      </Section>
    </Main >
  );
}
