import React from 'react';
import CardNav from './CardNav';

const navItems = [
  {
    label: "Collections",
    bgColor: "#173332",
    textColor: "#F4F0E8",
    links: [
      { label: "Living Room", href: "#collections", ariaLabel: "Living Room Collection" },
      { label: "Bedroom Haven", href: "#collections", ariaLabel: "Bedroom Collection" },
      { label: "Dining Suites", href: "#collections", ariaLabel: "Dining Collection" }
    ]
  },
  {
    label: "Bespoke",
    bgColor: "#234948",
    textColor: "#F4F0E8",
    links: [
      { label: "Custom Craft", href: "#bespoke", ariaLabel: "Custom Craftsmanship" },
      { label: "Tailored Living", href: "#everyday-living", ariaLabel: "Everyday Living" },
      { label: "Made to Fit", href: "#bespoke", ariaLabel: "Made to Fit Process" }
    ]
  },
  {
    label: "Studio",
    bgColor: "#2E5856",
    textColor: "#F4F0E8",
    links: [
      { label: "Our Philosophy", href: "#approach", ariaLabel: "Our Approach" },
      { label: "Visit Showroom", href: "#showroom", ariaLabel: "Visit Showroom" },
      { label: "Google Maps", href: "https://maps.app.goo.gl/35472XG3X1YvK4Z68", ariaLabel: "Open Google Maps" }
    ]
  }
];

export default function Header({ onQuoteClick, isLoaded }) {
  return (
    <CardNav
      logo="/logo-black.webp"
      logoAlt="Heaven Furniture Mart"
      items={navItems}
      baseColor="#ffffff"
      menuColor="#173332"
      buttonBgColor="#173332"
      buttonTextColor="#F4F1EA"
      ease="power3.out"
      onCtaClick={onQuoteClick}
      isLoaded={isLoaded}
    />
  );
}
