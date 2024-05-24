<template>
  <div class="create-internship-dialog">
    <v-dialog
      v-model="localDialog"
      max-width="600px"
      persistent
      class="create-internship-dialog__container"
    >
      <v-card class="create-internship-dialog__card">
        <v-card-title class="create-internship-dialog__title">
          {{
            isUpdate
              ? "Ενημέρωση Πρακτικής Άσκησης"
              : "Δημιουργία Πρακτικής Άσκησης"
          }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              v-model="selectedProgram"
              :items="programOptions"
              :rules="internshipProgramRules"
              label="Επιλέξτε Πρόγραμμα"
              class="create-internship-dialog__select"
              outlined
              clearable
              dense
              :disabled="isUpdate"
            ></v-select>
            <v-autocomplete
              v-if="isUpdate"
              v-model="companyId"
              v-model:search-input="search"
              :items="companyOptions"
              item-value="id"
              item-title="name"
              label="Επιλέξτε Εταιρεία"
              class="create-internship-dialog__field"
              :rules="internshipCompanyRules"
              outlined
              dense
              clearable
              @update:search-input="fetchCompanies"
            ></v-autocomplete>
            <v-text-field
              v-if="isUpdate"
              v-model="startDate"
              label="Ημερομηνία Έναρξης"
              class="create-internship-dialog__field"
              outlined
              dense
              type="date"
              :rules="[dateValidationRule]"
            ></v-text-field>
            <v-text-field
              v-if="isUpdate"
              v-model="endDate"
              label="Ημερομηνία Λήξης"
              class="create-internship-dialog__field"
              outlined
              dense
              type="date"
              :rules="[dateValidationRule]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="create-internship-dialog__actions">
          <v-btn
            class="create-internship-dialog__btn create-internship-dialog__btn--submit"
            @click="submitForm"
          >
            {{ isUpdate ? "Ενημέρωση" : "Δημιουργία" }}
          </v-btn>
          <v-btn
            class="create-internship-dialog__btn create-internship-dialog__btn--cancel"
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
import { createOrUpdateInternship } from "@/services/internshipService";
import { getAllCompanies } from "@/services/companyService";
import { InternshipUpdate } from "@/types/internship";
import { InternshipProgram } from "@/types";
import { Company } from "@/types/company";
import { hasErrorResponse } from "@/services/errorHandling";

// Define props with default values
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    isUpdate?: boolean;
    internship?: InternshipUpdate | null;
  }>(),
  {
    isUpdate: false,
    internship: null,
  },
);

// Define emits
const emit = defineEmits([
  "update:modelValue",
  "internshipCreated",
  "internshipUpdated",
  "refreshInternship",
]);

// Reactive properties
const localDialog = ref(props.modelValue);
const selectedProgram = ref<InternshipProgram | null>(
  props.internship?.program ?? null,
);
const companyId = ref<number | null>(props.internship?.company_id ?? null);
const startDate = ref<string | null>(
  props.internship?.start_date?.split("T")[0] ?? null,
);
const endDate = ref<string | null>(
  props.internship?.end_date?.split("T")[0] ?? null,
);
const $toast = useToast();
const search = ref("");
const companyOptions = ref<Company[]>([]);
const valid = ref(false);
const form = ref<any>(null);

// Watchers to handle prop changes
watch(
  () => props.modelValue,
  (newVal) => {
    localDialog.value = newVal;
    if (newVal && props.isUpdate && props.internship) {
      selectedProgram.value = props.internship.program;
      companyId.value = props.internship.company_id ?? null;
      startDate.value = props.internship.start_date
        ? props.internship.start_date.split("T")[0]
        : null;
      endDate.value = props.internship.end_date
        ? props.internship.end_date.split("T")[0]
        : null;
    }
  },
);

watch(
  () => props.internship,
  (newInternship) => {
    if (newInternship && props.isUpdate) {
      selectedProgram.value = newInternship.program;
      companyId.value = newInternship.company_id ?? null;
      startDate.value = newInternship.start_date
        ? newInternship.start_date.split("T")[0]
        : null;
      endDate.value = newInternship.end_date
        ? newInternship.end_date.split("T")[0]
        : null;
    }
  },
);

watchEffect(() => {
  if (search.value) {
    fetchCompanies();
  } else {
    companyOptions.value = [];
  }
});

// Validation rules
const internshipProgramRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις ένα τύπο πρακτικής.",
];
const internshipCompanyRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις μια εταιρεία.",
];
const dateValidationRule = (value: string) => {
  if (!value) return "Η ημερομηνία είναι απαραίτητη.";
  if (startDate.value && endDate.value) {
    if (new Date(startDate.value) > new Date(endDate.value)) {
      return "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης.";
    }
  }
  return true;
};

// Fetch companies on mount
onMounted(async () => {
  await fetchCompanies();
});

/**
 * Fetch companies based on search input
 */
const fetchCompanies = async () => {
  const response = await getAllCompanies(undefined, undefined, search.value);
  if (response.data && !hasErrorResponse(response)) {
    companyOptions.value = response.data;
  } else {
    companyOptions.value = [];
  }
};

const programOptions = Object.values(InternshipProgram);

/**
 * Handle form submission
 */
const submitForm = () => {
  if (form.value?.validate()) {
    if (props.isUpdate) {
      updateInternship();
    } else {
      createInternship();
    }
  }
};

/**
 * Create new internship
 */
const createInternship = async () => {
  if (selectedProgram.value) {
    const response = await createOrUpdateInternship({
      program: selectedProgram.value,
    });

    if (response && !("error" in response)) {
      $toast.success("Πρακτική Άσκηση δημιουργήθηκε επιτυχώς!", {
        position: "bottom",
      });
      emit("internshipCreated", response.data);
      emitClose();
    } else {
      $toast.error(`${response.error}`, {
        position: "bottom",
      });
    }
  }
};

/**
 * Update existing internship
 */
const updateInternship = async () => {
  if (
    selectedProgram.value &&
    companyId.value !== null &&
    startDate.value !== null &&
    endDate.value !== null
  ) {
    const response = await createOrUpdateInternship({
      program: selectedProgram.value,
      company_id: companyId.value,
      start_date: startDate.value,
      end_date: endDate.value,
    });

    if (response && !("error" in response)) {
      $toast.success("Πρακτική Άσκηση ενημερώθηκε επιτυχώς!", {
        position: "bottom",
      });
      emit("internshipUpdated", response.data);
      emit("refreshInternship");
      emitClose();
    } else {
      $toast.error(`${response.error}`, {
        position: "bottom",
      });
    }
  }
};

/**
 * Emit close event to close the dialog
 */
const emitClose = () => {
  selectedProgram.value = null;
  companyId.value = null;
  startDate.value = null;
  endDate.value = null;
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.create-internship-dialog {
  &__container {
    @apply rounded-lg;
  }

  &__card {
    @apply rounded-lg;
  }

  &__title {
    @apply text-lg font-bold text-blue-900;
  }

  &__select,
  &__field {
    @apply bg-white text-blue-900 p-2;
  }

  &__actions {
    @apply justify-start space-x-2;
  }

  &__btn {
    @apply hover:text-white py-2 px-4 rounded-md;

    &--submit {
      @apply bg-blue-500 hover:bg-blue-700;
    }

    &--cancel {
      @apply hover:bg-red-600;
    }
  }
}
</style>
