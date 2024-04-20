<template>
  <div class="flex justify-center items-center p-4">
    <v-dialog
      v-model="localDialog"
      max-width="500px"
      persistent
      class="rounded-lg"
    >
      <v-card class="bg-red-100">
        <v-card-title
          class="text-white bg-red-600 text-lg font-bold p-4 rounded-t-lg"
        >
          Διαγραφή Δικαιολογιτικού
        </v-card-title>

        <v-card-text class="px-4 py-6 text-red-900 text-base">
          <p>
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το δικαιολογητικό;
            <span class="font-semibold">{{ file?.file_name }}</span>
          </p>
        </v-card-text>

        <v-card-actions class="flex justify-center gap-4 pb-4">
          <v-btn
            class="bg-red-500 hover:bg-red-600 hover:text-white py-2 px-4 rounded-md"
            @click="deleteFile"
          >
            Διαγραφή
          </v-btn>
          <v-btn
            class="hover:bg-gray-500 hover:text-white py-2 px-4 rounded-md"
            @click="emitClose"
          >
            Άκυρο
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import { withDefaults, watch, ref, defineProps, defineEmits } from "vue";
import { deleteDikaiologitika } from "@/services/dikaiologitkaService";
import type {
  DikaiologitikaFile,
  UpdateDeleteResposne,
} from "@/types/dikaiologitika";
const $toast = useToast();

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    file?: DikaiologitikaFile | null;
  }>(),
  {
    file: null,
  }
);

// Determine the dialog mode based on the editItem
const emit = defineEmits(["update:modelValue", "refreshFilesList"]); // Emit events for dialog control and refreshing files list
const localDialog = ref(props.modelValue); // Local state for dialog visibility

// Watcher to synchronize the dialog visibility state
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Function to handle form submission
const deleteFile = async () => {
  console.log("🚀 ~ deleteFile ~ props.file:", props.file);
  if (props.file) {
    const response: UpdateDeleteResposne = await deleteDikaiologitika(
      props.file?.id
    );
    if (response.error) {
      $toast.error(`${response.error}`, {
        position: "bottom",
      });
    } else {
      $toast.success(`${response?.detail}`, {
        position: "bottom",
      });
      emit("refreshFilesList"); // Request to refresh the files list
      emitClose(); // Close dialog after a delay
    }
  } else {
    $toast.error("Somehting unexpected happen", {
      position: "bottom",
    });
  }
};

// Function to emit event to close the dialog and reset form state
const emitClose = () => {
  emit("update:modelValue", false);
};
</script>
