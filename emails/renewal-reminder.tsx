import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";
import { barebonesBoxedTailwindConfig } from "./theme";
import { BarebonesFonts } from "./theme/theme-fonts";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export interface ReminderSubscription {
  name: string;
  emoji: string | null;
  priceFormatted: string;
  renewalDateFormatted: string;
  daysUntil: number;
}

interface RenewalReminderProps {
  userName: string;
  subscriptions: ReminderSubscription[];
  dashboardUrl: string;
}

export const RenewalReminder = ({
  userName,
  subscriptions,
  dashboardUrl,
}: RenewalReminderProps) => (
  <Tailwind config={barebonesBoxedTailwindConfig}>
    <Html>
      <Head>
        <BarebonesFonts />
      </Head>

      <Body className="bg-bg-2 m-0 text-center font-sans">
        <Preview>
          {subscriptions.length === 1
            ? `${subscriptions[0].name} odnowi się za ${subscriptions[0].daysUntil === 0 ? "dzisiaj" : subscriptions[0].daysUntil === 1 ? "jutro" : `${subscriptions[0].daysUntil} dni`}`
            : `Masz ${subscriptions.length} subskrypcje do odnowienia w ciągu 3 dni`}
        </Preview>
        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-[640px]">
          <Section>
            <Section className="bg-bg mobile:px-2 px-6 py-4">
              <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-[8px] px-[40px] py-[64px] text-center">
                <Section className="mb-3">
                  <Heading as="h1" className="font-28 text-fg m-0 font-sans">
                    Nadchodzące odnowienia
                  </Heading>
                </Section>

                <Text className="font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-[380px] text-center font-sans">
                  Cześć {userName}, poniżej znajdziesz subskrypcje, które
                  odnowią się w ciągu najbliższych 3 dni.
                </Text>

                {subscriptions.map((sub, i) => (
                  <Section
                    key={i}
                    className="bg-bg mb-3 rounded-lg text-left px-5 py-4"
                  >
                    <Row>
                      <Column className="w-[40px] align-middle">
                        <Text className="font-28 m-0 leading-none">
                          {sub.emoji ?? "📦"}
                        </Text>
                      </Column>
                      <Column className="align-middle">
                        <Text className="font-16 text-fg m-0 font-sans font-semibold">
                          {sub.name}
                        </Text>
                        <Text className="font-13 text-fg-3 m-0 font-sans">
                          {sub.renewalDateFormatted}
                        </Text>
                      </Column>
                      <Column className="align-middle text-right">
                        <Text className="font-16 text-fg m-0 font-sans font-semibold">
                          {sub.priceFormatted}
                        </Text>
                        <Text
                          className={`font-13 m-0 font-sans font-medium ${
                            sub.daysUntil <= 1
                              ? "text-red-500"
                              : "text-orange-500"
                          }`}
                        >
                          {sub.daysUntil === 0
                            ? "Dzisiaj"
                            : sub.daysUntil === 1
                              ? "Jutro"
                              : `Za ${sub.daysUntil} dni`}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                ))}

                <Section className="mt-8 mb-6 text-center">
                  <Button
                    href={dashboardUrl}
                    className="bg-fg font-16 text-fg-inverted inline-block rounded-lg px-7 py-4 text-center font-sans leading-6"
                  >
                    Przejdź do dashboardu
                  </Button>
                </Section>

                <Text className="font-13 text-fg-3 mx-auto mt-8 mb-0 max-w-[400px] text-center font-sans">
                  Możesz wstrzymać lub anulować subskrypcję w dowolnym
                  momencie z poziomu dashboardu.
                </Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

RenewalReminder.PreviewProps = {
  userName: "Jan",
  dashboardUrl: "http://localhost:3000/dashboard",
  subscriptions: [
    {
      name: "Netflix",
      emoji: "🎬",
      priceFormatted: "56,99 zł",
      renewalDateFormatted: "7 maja 2026",
      daysUntil: 1,
    },
    {
      name: "Spotify",
      emoji: "🎵",
      priceFormatted: "23,99 zł",
      renewalDateFormatted: "9 maja 2026",
      daysUntil: 3,
    },
  ],
} satisfies RenewalReminderProps;

export default RenewalReminder;
