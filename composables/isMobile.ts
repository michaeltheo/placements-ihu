import { useWindowSize } from "@vueuse/core";
import { computed } from 'vue';

export const isMobile = () => {
    const { width } = useWindowSize();

    return computed(() => width.value <= 480);
};