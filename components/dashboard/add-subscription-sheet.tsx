"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet as CatalogSheet,
  SheetContent as CatalogSheetContent,
  SheetHeader as CatalogSheetHeader,
  SheetTitle as CatalogSheetTitle,
  SheetTrigger as CatalogSheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMsg } from "@/components/ui/error-msg";
import { Submit } from "@/components/ui/submit";
import { subscriptionFormSchema } from "@/validation-schemas/subscription";
import { z } from "zod";
import { createSubscriptionAction, updateSubscriptionAction } from "@/actions";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { Pencil, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import type { Subscription } from "@/queries";
import { TemplatePicker } from "./template-picker";

type SubscriptionFormInput = z.input<typeof subscriptionFormSchema>;

const CATEGORIES = [
  { value: "streaming", label: "Streaming" },
  { value: "music", label: "Muzyka" },
  { value: "software", label: "Oprogramowanie" },
  { value: "gaming", label: "Gry" },
  { value: "news", label: "Wiadomości" },
  { value: "fitness", label: "Fitness" },
  { value: "other", label: "Inne" },
] as const;

const BILLING_CYCLES = [
  { value: "monthly", label: "Miesięcznie" },
  { value: "yearly", label: "Rocznie" },
  { value: "weekly", label: "Tygodniowo" },
] as const;

interface SubscriptionSheetProps {
  subscription?: Subscription;
}

export function AddSubscriptionSheet({ subscription }: SubscriptionSheetProps) {
  const isEdit = !!subscription;
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionFormInput>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: isEdit
      ? {
          name: subscription.name,
          price: String(subscription.price / 100),
          billingCycle: subscription.billingCycle,
          nextRenewalDate: new Date(subscription.nextRenewalDate).toISOString(),
          category: subscription.category ?? "other",
          emoji: subscription.emoji ?? "",
          notes: subscription.notes ?? "",
        }
      : {
          billingCycle: "monthly",
          category: "other",
        },
  });

  const onSubmit = (data: SubscriptionFormInput) => {
    startTransition(async () => {
      const result = isEdit
        ? await updateSubscriptionAction(subscription.id, data)
        : await createSubscriptionAction(data);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(
        isEdit ? "Subskrypcja zaktualizowana!" : "Subskrypcja dodana!",
      );
      if (!isEdit) reset();
      setOpen(false);
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-foreground/40 hover:text-foreground"
          >
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="size-4" />
            Dodaj subskrypcję
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? "Edytuj subskrypcję" : "Nowa subskrypcja"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Zaktualizuj dane subskrypcji."
              : "Wypełnij dane subskrypcji, którą chcesz śledzić."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 px-6 py-4"
        >
          {!isEdit &&
            (isMobile ? (
              <CatalogSheet open={catalogOpen} onOpenChange={setCatalogOpen}>
                <CatalogSheetTrigger asChild>
                  <Button variant="outline" type="button" className="w-full">
                    Wybierz z katalogu
                  </Button>
                </CatalogSheetTrigger>
                <CatalogSheetContent side="bottom" className="px-4 pb-8">
                  <CatalogSheetHeader className="px-0">
                    <CatalogSheetTitle className="px-0">
                      Wybierz usługę
                    </CatalogSheetTitle>
                  </CatalogSheetHeader>
                  <div className="mt-4">
                    <TemplatePicker
                      onSelect={(pack) => {
                        setValue("name", pack.name);
                        setValue("emoji", pack.emoji);
                        setValue("category", pack.category);
                        setValue("price", String(pack.price));
                        setValue("billingCycle", pack.billingCycle);
                        setCatalogOpen(false);
                      }}
                    />
                  </div>
                </CatalogSheetContent>
              </CatalogSheet>
            ) : (
              <Popover open={catalogOpen} onOpenChange={setCatalogOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" type="button" className="w-full">
                    Wybierz z katalogu
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-3" align="start" side="left">
                  <TemplatePicker
                    onSelect={(pack) => {
                      setValue("name", pack.name);
                      setValue("emoji", pack.emoji);
                      setValue("category", pack.category);
                      setValue("price", String(pack.price));
                      setValue("billingCycle", pack.billingCycle);
                      setCatalogOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            ))}
          <div className="grid gap-2">
            <Label>Emoji</Label>
            <Controller
              control={control}
              name="emoji"
              render={({ field }) => (
                <EmojiPicker value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Nazwa *</Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="np. Netflix"
              aria-invalid={!!errors.name}
            />
            {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Cena (PLN) *</Label>
            <Input
              {...register("price")}
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="np. 49.99"
              aria-invalid={!!errors.price}
            />
            {errors.price && <ErrorMsg>{errors.price.message}</ErrorMsg>}
          </div>
          <div className="grid gap-2">
            <Label>Cykl rozliczeniowy *</Label>
            <Controller
              control={control}
              name="billingCycle"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz cykl" />
                  </SelectTrigger>
                  <SelectContent>
                    {BILLING_CYCLES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label>Data następnej odnowy *</Label>
            <Controller
              control={control}
              name="nextRenewalDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date ? date.toISOString() : "")
                  }
                />
              )}
            />
            {errors.nextRenewalDate && (
              <ErrorMsg>{errors.nextRenewalDate.message}</ErrorMsg>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Kategoria</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notatki</Label>
            <Input
              {...register("notes")}
              id="notes"
              placeholder="Opcjonalne notatki..."
            />
          </div>
          <SheetFooter className="px-0 pb-0 pt-2">
            <Submit
              isPending={isPending}
              pendingText={isEdit ? "Zapisywanie..." : "Dodawanie..."}
            >
              {isEdit ? "Zapisz zmiany" : "Dodaj subskrypcję"}
            </Submit>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
