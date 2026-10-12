"use client";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";
import s from "./booking-site.module.css";

export default function BookingSelect({ id, name, label, value, items, error, disabled, onChange }: {
  id: string; name: string; label: string; value: string;
  items: { value: string; label: string }[]; error?: string; disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const { direction } = useI18n();
  return <Field.Root className={s.field} name={name} invalid={!!error} disabled={disabled}>
    <Field.Label htmlFor={id}>{label}</Field.Label>
    <Select.Root items={items} value={value} onValueChange={next => { if (next !== null) onChange(next); }} disabled={disabled} name={name}>
      <Select.Trigger id={id} className={s.selectTrigger} aria-invalid={!!error}>
        <Select.Value /><Select.Icon><ChevronDown size={17} aria-hidden="true" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={s.selectPositioner} sideOffset={6} alignItemWithTrigger={false}>
          <Select.Popup className={`${s.portalTheme} ${s.selectPopup}`} dir={direction}>
            <Select.List>{items.map(item => <Select.Item className={s.selectItem} value={item.value} key={item.value}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator><Check size={17} aria-hidden="true" /></Select.ItemIndicator>
            </Select.Item>)}</Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
    {error ? <Field.Error match className={s.error}>{error}</Field.Error> : null}
  </Field.Root>;
}
