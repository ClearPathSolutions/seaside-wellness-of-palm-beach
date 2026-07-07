import type { DetailContent } from "./types";
import conditionsContent from "./content/conditions.json";
import treatmentsContent from "./content/treatments.json";
import areasContent from "./content/areas.json";
import miscContent from "./content/misc.json";

function toMap(arr: unknown): Map<string, DetailContent> {
  return new Map((arr as DetailContent[]).map((d) => [d.slug, d]));
}

export const conditionDetails = toMap(conditionsContent);
export const treatmentDetails = toMap(treatmentsContent);
export const areaDetails = toMap(areasContent);
export const miscDetails = toMap(miscContent);
