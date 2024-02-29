// iconTypes.ts
export enum IconSizes {
  Small = "16",
  Medium = "24",
  Large = "32",
  xLarge = "44",
  Ginormous = "512",
}

export interface SvgStructure {
  innerHTML: string;
  attributes: Record<string, string>;
}
