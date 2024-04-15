import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";
import { mobileSize } from "@/constants/common";

export const isMobile = () => {
  const { width } = useWindowSize();
  return computed(() => width.value <= mobileSize);
};
