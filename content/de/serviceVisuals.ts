export interface ServiceVisual {
  photo: string;
  alt: string;
  /** CSS object-position, per-image, chosen to avoid letterboxing on a
   * cover-fit crop while keeping the subject in frame. */
  objectPosition: string;
}

/** Index-aligned with `privateServices` / `businessServices`. Alternation
 * (text-left/visual-right vs. visual-left/text-right) is derived from index
 * parity in ServiceStoryRow, not stored here, so it survives an audience
 * switch unchanged. Sources: docs/photo-sources.md. */
export const privateServiceVisuals: ServiceVisual[] = [
  { photo: "/images/services/private-health.webp", alt: "Familie am Küchentisch im Sonnenlicht", objectPosition: "center 35%" },
  { photo: "/images/services/private-home.webp", alt: "Modernes Einfamilienhaus", objectPosition: "center 55%" },
  { photo: "/images/services/private-car.webp", alt: "Familie packt das Auto für eine Reise", objectPosition: "center 40%" },
  { photo: "/images/services/private-pension.webp", alt: "Reifes Paar bei Kaffee und Planung zuhause", objectPosition: "center 45%" },
  { photo: "/images/services/private-cyber.webp", alt: "Berufstätige Frau am Laptop im Büro", objectPosition: "center 30%" },
];

export const businessServiceVisuals: ServiceVisual[] = [
  { photo: "/images/services/business-liability.webp", alt: "Führungskraft im Gespräch mit Mitarbeitenden im Büro", objectPosition: "center 35%" },
  { photo: "/images/services/business-fleet.webp", alt: "Firmenfahrzeug vor einem Lagergebäude", objectPosition: "center 55%" },
  { photo: "/images/services/business-pension.webp", alt: "Beratungsgespräch zu beruflicher Vorsorge", objectPosition: "center 30%" },
  { photo: "/images/services/business-property.webp", alt: "Moderne Geschäftsliegenschaft", objectPosition: "center 50%" },
  { photo: "/images/services/business-health.webp", alt: "Team im offenen Bürogespräch", objectPosition: "center 30%" },
  // PLACEHOLDER — no dedicated cyber/legal business photo exists yet;
  // reuses the liability-editorial crop (distinct from index 0's photo)
  // as an honest stand-in until genuine imagery is sourced for this
  // 6th, client-added service.
  { photo: "/images/services/business-liability-editorial.webp", alt: "Beratungsgespräch im modernen Büro", objectPosition: "center 30%" },
];
