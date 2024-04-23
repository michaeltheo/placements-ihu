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
          Διαγραφή Δικαιολογιτικού
        </v-card-title>

        <v-card-text class="dialog__content">
          <p>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το δικαιολογητικό;
            <span class="dialog__file-name">{{ file?.file_name }}</span>
          </p>
        </v-card-text>

        <v-card-actions class="dialog__actions">
          <v-btn class="dialog__btn dialog__btn--delete" @click="deleteFile">
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
import { withDefaults, watchEffect, ref, defineProps, defineEmits } from "vue";
import { useAuthStore } from "@/stores/auth";
import { deleteDikaiologitika } from "@/services/dikaiologitkaService";
import type {
  DikaiologitikaFile,
  UpdateDeleteResponse,
} from "@/types/dikaiologitika";
const $toast = useToast();

const authStore = useAuthStore();
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    file?: DikaiologitikaFile | null;
  }>(),
  {
    file: null,
  },
);

const emit = defineEmits(["update:modelValue", "refreshFilesList"]);
const localDialog = ref(props.modelValue);

watchEffect(() => {
  localDialog.value = props.modelValue;
});

const deleteFile = async () => {
  if (!props.file) {
    $toast.error("Something unexpected happened", {
      position: "bottom",
    });
    return;
  }
  try {
    const response: UpdateDeleteResponse = await deleteDikaiologitika(
      props.file.id,
      authStore.placements_access_token,
    );
    if (response.error) {
      $toast.error(`${response.error}`, { position: "bottom" });
    } else {
      $toast.success(`${response?.detail}`, { position: "bottom" });
      emit("refreshFilesList");
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
