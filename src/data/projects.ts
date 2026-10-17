import { source } from "@/i18n/messages";
export type Project = {
    id: string;
    name: string;
    location: string;
    title: string;
    description: string;
    features: string[];
    href: string;
    screenshot: string;
    screenshotEnglish?: string;
    previewOnly?: boolean;
    note?: string;
    testimonial?: {
        quote: string;
        name: string;
        role: string;
    };
};
export type PortfolioProject = Project & {
    gallery: { src: string; caption: string; width: number; height: number }[];
};
export const propertyProjects: PortfolioProject[] = [
    {
        id: "sovereign-estates",
        name: "Sovereign Private Estates",
        location: source("portfolio.real_estate"),
        title: source("portfolio.sovereign_title"),
        description: source("portfolio.sovereign_description"),
        features: [source("portfolio.catalogue_filters"), source("portfolio.property_details"), source("portfolio.viewing_form")],
        href: "/showcase/sovereign-estates",
        screenshot: "/projects/estates/sovereign-catalogue.webp",
        screenshotEnglish: "/projects/estates/sovereign-catalogue.webp",
        previewOnly: true,
        note: source("portfolio.visual_preview"),
        gallery: [
            { src: "/projects/estates/sovereign-home.webp", caption: source("portfolio.home_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/sovereign-catalogue.webp", caption: source("portfolio.catalogue_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/sovereign-property.webp", caption: source("portfolio.property_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/sovereign-mobile.webp", caption: source("portfolio.mobile_screen"), width: 390, height: 844 },
        ],
    },
    {
        id: "obsidian-tower",
        name: "The Obsidian Tower",
        location: source("portfolio.residential"),
        title: source("portfolio.obsidian_title"),
        description: source("portfolio.obsidian_description"),
        features: [source("portfolio.residence_types"), source("portfolio.amenities_gallery"), source("portfolio.viewing_form")],
        href: "/showcase/obsidian-tower",
        screenshot: "/projects/estates/obsidian-home.webp",
        screenshotEnglish: "/projects/estates/obsidian-home.webp",
        previewOnly: true,
        note: source("portfolio.visual_preview"),
        gallery: [
            { src: "/projects/estates/obsidian-home.webp", caption: source("portfolio.home_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/obsidian-residences.webp", caption: source("portfolio.residences_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/obsidian-amenities.webp", caption: source("portfolio.amenities_screen"), width: 1440, height: 1000 },
            { src: "/projects/estates/obsidian-mobile.webp", caption: source("portfolio.mobile_screen"), width: 390, height: 844 },
        ],
    },
];
export const projects: Project[] = [
    {
        id: "speedcar",
        name: "Speed Car Jo",
        location: source("centre.amman_jordan"),
        title: source("projects.window_tinting_tailored_to_the_customer_s"),
        description: source("projects.customers_compare_films_and_warranties_choose_glass"),
        features: [source("projects.service_and_price_comparison"), source("projects.glass_selection_and_pricing"), source("projects.vehicle_details_and_whatsapp_requests")],
        href: "/speedcar",
        screenshot: "/projects/speedcar.webp",
    },
    {
        id: "wash33",
        name: "WASH 33",
        location: source("centre.amman_jordan"),
        title: source("projects.car_care_that_comes_to_the_customer"),
        description: source("projects.a_mobile_service_page_that_combines_service"),
        features: [source("projects.wash_and_detailing_services"), source("projects.vehicle_location_selection"), source("projects.detailed_whatsapp_requests")],
        href: "/wash33",
        screenshot: "/projects/wash33.webp",
    },
    {
        id: "perfect",
        name: "Perfect Auto Care",
        location: source("centre.amman_jordan"),
        title: source("projects.showcase_the_work_make_booking_easy"),
        description: source("projects.a_project_gallery_services_with_clear_prices"),
        features: [source("projects.filterable_project_gallery"), source("projects.service_prices_and_durations"), source("projects.request_summary_before_whatsapp")],
        href: "/perfect",
        screenshot: "/projects/perfect.webp",
    },
    {
        id: "dopamine",
        name: "DOPAMINE Auto Spa",
        location: source("projects.muscat_oman"),
        title: source("projects.a_booking_journey_built_around_the_car"),
        description: source("projects.a_step_by_step_flow_for_choosing"),
        features: [source("projects.packages_by_vehicle_type"), source("projects.mobile_friendly_booking_steps"), source("projects.review_before_sending")],
        href: "/autoSpa",
        screenshot: "/projects/dopamine.webp",
        note: source("projects.prices_in_this_demo_are_illustrative_and"),
    },
    {
        id: "blitz",
        name: "Blitz Auto Detailing",
        location: source("centre.amman_jordan"),
        title: source("projects.from_service_details_to_appointment_requests"),
        description: source("projects.customers_see_each_service_s_price_and"),
        features: [source("projects.service_details_and_process"), source("projects.car_care_questions_answered"), source("projects.requests_sent_to_the_centre_s_number")],
        href: "/blitz",
        screenshot: "/projects/blitz.webp",
    },
];
