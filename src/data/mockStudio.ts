import { source } from "@/i18n/messages";
export interface ServiceItem {
    id: string;
    name: string;
    duration: string;
    price: number;
    priceFormatted: string;
    desc?: string;
    badge?: string;
}
export interface DayOption {
    id: string;
    label: string;
    dateLabel: string;
    slotsLeft: number;
}
export interface TimeSlot {
    id: string;
    label: string;
    startMinutes?: number;
}
export interface ClientData {
    id: string;
    name: string;
    themeColor: string;
    whatsappNumber: string;
    mapCoordinates: [
        number,
        number
    ];
    heroMessage: string;
    logoUrl?: string;
    services: ServiceItem[];
    days: DayOption[];
    slots: TimeSlot[];
}
const DEFAULT_DAYS: DayOption[] = [];
const DEFAULT_SLOTS: TimeSlot[] = [
    { id: 't1', label: source("centres.10_00_am"), startMinutes: 600 },
    { id: 't2', label: source("centres.1_30_pm"), startMinutes: 810 },
    { id: 't3', label: source("centres.5_00_pm"), startMinutes: 1020 }
];
export const clientsData: Record<string, ClientData> = {
    blitz: {
        id: 'blitz',
        name: 'Blitz Auto Detailing',
        themeColor: '#E53935',
        whatsappNumber: '962781609666',
        mapCoordinates: [31.9539, 35.9106],
        heroMessage: source("centres.request_an_appointment_with_our_ida_certified"),
        days: DEFAULT_DAYS,
        slots: DEFAULT_SLOTS,
        services: [
            {
                id: 'graphene_blitz',
                name: source("centres.ceramic_graphene_protection"),
                desc: source("centres.advanced_graphene_coating_for_durable_protection_and"),
                duration: source("hero.2_working_days"),
                price: 150,
                priceFormatted: source("centres.150_jod"),
                badge: source("centre.ida_certified")
            },
            {
                id: 'dry_clean_blitz',
                name: source("centres.professional_interior_detailing"),
                desc: source("centres.deep_cabin_cleaning_and_full_sanitisation"),
                duration: source("perfect.5_hours"),
                price: 45,
                priceFormatted: source("centres.45_jod")
            }
        ]
    },
    eglow: {
        id: 'eglow',
        name: 'E-Glow Studio',
        themeColor: '#00E5FF',
        whatsappNumber: '96279XXXXXXX',
        mapCoordinates: [31.9639, 35.9206],
        heroMessage: source("centres.complete_protection_starts_here"),
        days: DEFAULT_DAYS,
        slots: DEFAULT_SLOTS,
        services: [
            {
                id: 'ppf_full',
                name: source("centres.full_body_ppf"),
                desc: source("centres.full_body_ppf_10mil_self_healing_paint"),
                duration: source("demo.3_working_days"),
                price: 1200,
                priceFormatted: source("centres.1_200_jod"),
                badge: source("centres.a_popular_premium_choice")
            }
        ]
    },
    top_level: {
        id: 'top_level',
        name: 'Top Level Car Care Center',
        themeColor: '#E53935',
        whatsappNumber: '962798001072',
        mapCoordinates: [31.9539, 35.9106],
        heroMessage: source("centres.request_an_appointment_with_top_level_car"),
        days: DEFAULT_DAYS,
        slots: DEFAULT_SLOTS,
        services: [
            {
                id: 'top_level_detailing',
                name: source("centres.complete_vehicle_detailing"),
                desc: source("centres.professional_car_cleaning_detailing_and_preparation"),
                duration: source("centres.confirmed_when_booking"),
                price: 0,
                priceFormatted: source("centres.price_on_request")
            },
            {
                id: 'top_level_car_care',
                name: source("centres.car_care_services"),
                desc: source("centres.specialist_care_for_your_vehicle_s_interior"),
                duration: source("centres.confirmed_when_booking"),
                price: 0,
                priceFormatted: source("centres.price_on_request")
            }
        ]
    },
    perfectCar: {
        id: 'perfect',
        name: 'Perfect Car Care Centre',
        themeColor: '#DC2626', // أحمر بيرفكت المطابق لشعارهم وجدار المشغل
        whatsappNumber: '962788772188',
        mapCoordinates: [31.9539, 35.9106],
        heroMessage: source("centres.request_your_car_care_appointment_at_perfect"),
        days: DEFAULT_DAYS,
        slots: DEFAULT_SLOTS,
        services: [
            {
                id: 'nano_ceramic_perfect',
                name: source("centres.ceramic_coating_paint_correction"),
                desc: source("centres.advanced_ceramic_protection_for_exceptional_gloss_and"),
                duration: source("centres.1_working_day"),
                price: 130,
                priceFormatted: source("centres.130_jod"),
                badge: source("centres.most_popular")
            },
            {
                id: 'car_polish_perfect',
                name: source("centres.professional_car_polishing"),
                desc: source("centres.remove_swirl_marks_and_fading_to_restore"),
                duration: source("perfect.5_hours"),
                price: 45,
                priceFormatted: source("centres.45_jod")
            },
            {
                id: 'dry_clean_perfect',
                name: source("centres.deep_interior_upholstery_care"),
                desc: source("centres.thorough_cabin_and_upholstery_cleaning_with_specialist"),
                duration: source("demo.4_hours"),
                price: 35,
                priceFormatted: source("centres.35_jod")
            }
        ]
    },
};
export const MOCK_STUDIO_SLOTS = [
    { id: 't1', label: source("centres.10_00_am") },
    { id: 't2', label: source("centres.5_00_pm") },
];
export const MOCK_STUDIO_SERVICES = clientsData.blitz.services;
