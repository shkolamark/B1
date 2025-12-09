"use client";

import { Calendar } from "@/components/Layouts/sidebar/icons";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"; // локаль [web:30]
import "flatpickr/dist/flatpickr.css";
import { useEffect, useId, useRef } from "react";

type DatePickerProps = {
    label?: string;
    value: string; // формат, соответствующий dateFormat, например "Y-m-d"
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

const DatePicker = ({
    label = "Дата",
    value,
    onChange,
    placeholder = "дд.мм.гггг",
    disabled,
    className,
}: DatePickerProps) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        flatpickr.localize(Russian); // включаем русский язык [web:30]

        const fp = flatpickr(inputRef.current, {
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "Y-m-d", // внутренний формат значения [web:27]
            altInput: true,
            altFormat: "d.m.Y", // отображаемый формат
            allowInput: true,
            defaultDate: value || undefined,
            onChange: (_selectedDates, dateStr) => {
                onChange(dateStr);
            },
        });

        return () => {
            fp.destroy();
        };
    }, [onChange, value]);

    useEffect(() => {
        // синхронизируем внешнее value с flatpickr при изменении извне [web:31]
        if (!inputRef.current) return;
        const instance = (inputRef.current as any)._flatpickr as flatpickr.Instance | undefined;
        if (instance && value !== instance.input.value) {
            instance.setDate(value, true);
        }
    }, [value]);

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    ref={inputRef}
                    disabled={disabled}
                    className="form-datepicker w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                    placeholder={placeholder}
                    data-class="flatpickr-right"
                />
                <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                    <Calendar className="size-5 text-[#9CA3AF]" />
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
