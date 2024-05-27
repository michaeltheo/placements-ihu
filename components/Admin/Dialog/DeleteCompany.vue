<template>
  <div class="dialog__overlay">
    <v-dialog
      v-model="localDialog"
      max-width="500px"
      persistent
      class="dialog__container"
    >
      <v-card class="dialog__card">
        <v-card-title class="dialog__title">
          <v-icon class="dialog__icon" color="white">fa-solid fa-trash</v-icon>
          Διαγραφή Εταιρείας
        </v-card-title>

        <v-card-text class="dialog__content">
          <p>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτη την εταιρέια
            <span class="dialog__file-name">{{ company?.name }}</span>
          </p>
        </v-card-text>

        <v-card-actions class="dialog__actions">
          <v-btn
            class="dialog__btn dialog__btn--delete"
            @click="deleteSelectedCompany"
          >
            Διαγραφή
          </v-btn>
          <v-btn class="dialog__btn dialog__btn--cancel" @click="emitClose">
            Άκυρο
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { adminDeleteCompany } from "@/services/companyService";
import type { Company } from "@/types/company";
import { hasErrorResponse } from "@/services/errorHandling";

const props = defineProps<{
  modelValue: boolean;
  company?: Company | undefined;
}>();

const emit = defineEmits(["update:modelValue", "refreshCompaniesList"]);
const localDialog = ref(props.modelValue);
const $toast = useToast();

watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  },
);

const deleteSelectedCompany = async () => {
  try {
    if (!props.company) return;
    const response = await adminDeleteCompany(props.company?.id);
    if (hasErrorResponse(response)) {
      $toast.error(`${response.error}`, { position: "bottom" });
    } else {
      $toast.success(`${response?.detail}`, { position: "bottom" });
      emit("refreshCompaniesList");
      emitClose();
    }
  } catch (error) {
    $toast.error("Error processing request", { position: "bottom" });
  }
};

const emitClose = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.dialog__overlay {
  @apply flex justify-center items-center p-4;
}

.dialog__container {
  @apply rounded-lg;
}

.dialog__title {
  @apply bg-red-600 text-white text-lg font-bold p-4 rounded-t-lg;
}

.dialog__content {
  @apply px-4 py-6 text-red-900 text-base;
}

.dialog__file-name {
  @apply font-semibold;
}

.dialog__actions {
  @apply flex justify-center gap-4 pb-4;
}

.dialog__btn {
  @apply hover:text-white py-2 px-4 rounded-md;

  &--delete {
    @apply bg-red-500 hover:bg-red-600;
  }

  &--cancel {
    @apply hover:bg-gray-500;
  }
}
</style>
