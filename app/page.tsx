import { Button } from "@/components/ui/button";
import { Main } from "@/components/ui/main";
import { Typography } from "@/lib/components/ui/typography";
import Image from "next/image";
import cover from "@/assets/cover.png";
import { Section } from "@/components/ui/section";
import { Bell, CreditCard, Eye } from "lucide-react";
import { BlurHighlight } from "@/components/ui/blur-highlight";

export default function Home() {
  return (
    <Main>
      <div className="text-center flex flex-col gap-7 items-center">
        <Typography size="h1" className="lg:max-w-2xl mx-auto">
          Twoje <span className="text-primary">subskrypcje</span> kosztują więcej niż myślisz.
        </Typography>
        <Typography size="p" className="lg:max-w-lg">
          Zbierz wszystkie subskrypcje w jednym miejscu, śledź wydatki i przestań przepłacać.
        </Typography>
        <Button size="lg">Sprawdź ile przepłacasz</Button>
      </div>
      <div className="relative hero rounded-3xl shadow-2xl shadow-foreground/10 dark:shadow-black">
        <BlurHighlight className="size-64 -left-8 -top-8" />
        <Image alt="" src={cover} className="aspect-9/16 object-cover md:aspect-video rounded-3xl mt-16 card mb-8 dark:invert" />
      </div>
      <Section>
        <div>
          <Typography size="h2">
            Jak to działa w <span className="text-primary">3 prostych</span> krokach
          </Typography>
          <Typography className="mt-3 lg:mt-0">Zacznij w kilka minut, oszczędzaj przez lata</Typography>
        </div>
        <div className="mt-8 lg:mt-12 flex flex-col gap-4 items-center lg:flex-row">
          <article className="card card-highlight-bl dark:shadow-black/10 sm:w-2/3 dark:shadow-none shadow-lg shadow-foreground/5 px-6 py-7.5 lg:w-full rounded-3xl flex flex-col items-center">
            <BlurHighlight className="-bottom-6 left-0 opacity-30!" />
            <CreditCard className="text-primary size-13" />
            <Typography size="h3" className="mt-4 mb-8">
              Dodaj swoje subskrypcje
            </Typography>
            <Typography size="small">
              Wpisz subskrypcje ręcznie lub wybierz z bazy popularnych serwisów. Cokolwiek płacisz cyklicznie – masz to w jednym miejscu.
            </Typography>
          </article>
          <article className="card sm:w-2/3 shadow-lg dark:shadow-black/10 shadow-foreground/5 px-6 py-7.5 lg:w-full rounded-3xl flex flex-col items-center">
            <BlurHighlight className="-top-6 -left-6 opacity-20!" />
            <Eye className="text-primary size-13" />
            <Typography size="h3" className="mt-4 mb-8">
              Obserwuj swoje wydatki
            </Typography>
            <Typography size="small">
              Dashboard zsumuje wszystkie opłaty i pokaże ile wydajesz miesięcznie i rocznie. Żadna złotówka nie przecieknie niezauważona.
            </Typography>
          </article>
          <article className="card card-highlight-tr sm:w-2/3 dark:shadow-black/10 shadow-lg shadow-foreground/5 px-6 py-7.5 lg:w-full rounded-3xl flex flex-col items-center">
            <Bell className="text-primary size-13" />
            <Typography size="h3" className="mt-4 mb-8">
              Reaguj na przypomnienia
            </Typography>
            <Typography size="small">
              Dostaniesz powiadomienie zanim subskrypcja się odnowi. Masz czas zdecydować – zostać czy zrezygnować.
            </Typography>
            <BlurHighlight className="right-0 -top-6 opacity-30!" />
          </article>
        </div>
        <Button size="lg" className="mt-8">Zacznij już teraz</Button>
      </Section>
    </Main >
  );
}
