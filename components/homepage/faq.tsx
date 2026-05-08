import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    question: "Czy moje dane są bezpieczne?",
    answer:
      "Tak. Twoje hasło jest przechowywane w postaci zaszyfrowanej (argon2), a sesje wygasają automatycznie po 7 dniach. Nie przechowujemy żadnych danych kart płatniczych — śledzisz tylko kwoty, nie podajesz danych do płatności.",
  },
  {
    question: "Czym różni się plan Starter od Pro?",
    answer:
      "Plan Starter jest darmowy i pozwala śledzić do 5 subskrypcji z podstawowymi przypomnieniami. Plan Pro (19 zł/mies.) usuwa ten limit, dodaje szczegółowe wykresy i statystyki, eksport danych do CSV oraz priorytetowe wsparcie.",
  },
  {
    question: "Czy mogę samodzielnie dodać dowolną subskrypcję?",
    answer:
      "Tak. Możesz dodać dowolną subskrypcję ręcznie — wystarczy podać nazwę, cenę, cykl rozliczeniowy i datę następnego odnowienia. Możesz też skorzystać z wbudowanego katalogu popularnych usług, który wstępnie wypełni formularz.",
  },
  {
    question: "Jak działają przypomnienia o odnowieniu?",
    answer:
      "Na 3 dni przed odnowieniem subskrypcji wysyłamy e-mail z przypomnieniem. Dodatkowo dashboard pokazuje wszystkie subskrypcje odnawiające się w ciągu najbliższych 7 dni, dzięki czemu zawsze wiesz, co zostanie pobrane w najbliższym czasie.",
  },
  {
    question: "Czy mogę wstrzymać subskrypcję zamiast ją usuwać?",
    answer:
      "Tak. Każdą subskrypcję możesz wstrzymać — zostanie ukryta ze statystyk i wykresów, ale pozostanie zapisana w systemie. Możesz ją wznowić w dowolnym momencie.",
  },
  {
    question: "Czy mogę zrezygnować z planu Pro w dowolnym momencie?",
    answer:
      "Tak, możesz anulować plan Pro kiedy chcesz. Po anulowaniu zachowasz dostęp do funkcji Pro do końca opłaconego okresu. Następnie konto przejdzie na plan Starter.",
  },
];

export function FAQ() {
  return (
    <section className="max-w-2xl mx-auto w-full px-6 py-16 flex flex-col gap-8">
      <div className="text-center">
        <Typography size="h2">Często zadawane pytania</Typography>
        <Typography className="mt-2">
          Nie znalazłeś odpowiedzi?{" "}
          <Link href="/contact" className="text-primary underline">
            Napisz do nas
          </Link>
        </Typography>
      </div>
      <Accordion type="single" collapsible>
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
