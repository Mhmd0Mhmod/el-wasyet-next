import { ABILITY_IDS, can } from "@/constants/abilities";
import { useAbilities } from "@/hooks/useAbilities";

/**
 * Check if user has a specific ability
 * @example const canCreateBranch = useCan(ABILITY_IDS.CREATE_BRANCH);
 */
export function useCan(abilityId: number) {
  const { abilities } = useAbilities();
  const userAbilityIds = abilities?.map((a) => a.id) || [];
  return can(userAbilityIds, abilityId);
}
