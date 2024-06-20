<!--
/**
 * CreateInternshipDialog Component
 *
 * Dialog component for creating or updating an internship.
 * This dialog allows users to select an internship program,
 * choose a company, and set start and end dates for the internship.
 * It includes form validation and emits events based on user actions.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {boolean} isUpdate - Indicates if the form is for updating an internship.
 * @param {Object|null} internship - The internship data for updating.
 * @param {Object} internship.program - The selected internship program.
 * @param {number} internship.company_id - The ID of the selected company.
 * @param {string} internship.start_date - The start date of the internship.
 * @param {string} internship.end_date - The end date of the internship.
 */
-->
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
              v-model="selectedDepartment"
              :items="departmentOptions"
              label="Επιλέξτε Τμήμα"
              class="create-internship-dialog__select"
              outlined
              clearable
              dense
              :disabled="isUpdate"
            ></v-select>
            <v-select
              v-model="selectedProgram"
              :items="filteredProgramOptions"
              :rules="internshipProgramRules"
              label="Επιλέξτε Πρόγραμμα"
              class="create-internship-dialog__select"
              outlined
              clearable
              dense
              :disabled="!selectedDepartment || isUpdate"
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
              :disabled="isAdmin"
              dense
              clearable
              @update:search-input="fetchCompanies"
            ></v-autocomplete>
            <template v-if="isUpdate && isAdmin">
              <v-text-field
                v-model="startDate"
                label="Ημερομηνία Έναρξης"
                class="create-internship-dialog__field"
                outlined
                :min="today"
                dense
                type="date"
                :rules="[dateValidationRule]"
              ></v-text-field>
              <v-text-field
                v-model="endDate"
                label="Ημερομηνία Λήξης"
                class="create-internship-dialog__field"
                outlined
                dense
                :min="today"
                type="date"
                :rules="[dateValidationRule]"
              ></v-text-field>
            </template>
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
import "vue-toast-notification/dist/theme-sugar.css";
import { createOrUpdateInternship } from "@/services/internshipService";
import { getAllCompanies } from "@/services/companyService";
import { InternshipCreate, InternshipUpdate } from "@/types/internship";
import { Department, InternshipProgram } from "@/types";
import { Company } from "@/types/company";
import { hasErrorResponse } from "@/services/errorHandling";

// Define props with default values
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    isUpdate?: boolean;
    isAdmin?: boolean;
    internship?: InternshipUpdate | InternshipCreate | null;
  }>(),
  {
    isUpdate: false,
    isAdmin: false,
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
const selectedDepartment = ref<Department | null>(
  props.internship?.department ?? null,
);
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

// Today property for date validation
const today = computed(() => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const day = String(todayDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

// Watchers to handle prop changes
watch(
  () => props.modelValue,
  (newVal) => {
    localDialog.value = newVal;
    if (newVal && props.isUpdate && props.internship) {
      selectedProgram.value = props.internship?.program ?? null;
      selectedDepartment.value = props.internship?.department ?? null;
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
      selectedProgram.value = newInternship?.program ?? null;
      selectedDepartment.value = newInternship?.department ?? null;
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

// Watcher to clear selectedProgram when selectedDepartment changes
watch(
  () => selectedDepartment.value,
  () => {
    if (!props.isUpdate) selectedProgram.value = null;
  },
);

// Validation rules
const internshipProgramRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις ένα τύπο πρακτικής.",
];
const internshipCompanyRules = [
  (value: any) => !!value || "Πρέπει να επιλέξεις μια εταιρεία.",
];
const dateValidationRule = (value: string) => {
  if (!value) return "Η ημερομηνία είναι απαραίτητη.";

  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;

  // Ensure the start and end dates are not the same
  if (start && end && start.getTime() === end.getTime()) {
    return "H ημερομηνία έναρξης δεν πρέπει να είναι ίδια με την ημερομηνία λήξης.";
  }

  // Ensure the end date is after the start date
  if (start && end && start > end) {
    return "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης.";
  }

  // TODO: uncomment
  // // Ensure the dates are not just one day apart
  // if (start && end) {
  //   const oneDayDifference = new Date(start);
  //   oneDayDifference.setDate(oneDayDifference.getDate() + 1);
  //   if (oneDayDifference.getTime() === end.getTime()) {
  //     return "Η ημερομηνία λήξης δεν πρέπει να είναι μία ημέρα μετά την ημερομηνία έναρξης.";
  //   }
  // }

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

// Options for departments and programs
const departmentOptions = Object.values(Department);
const programOptions: Record<Department, InternshipProgram[]> = {
  [Department.IT_TEITHE]: [
    InternshipProgram.TEITHE_OAED,
    InternshipProgram.ESPA,
    InternshipProgram.TEITHE_JOB_RECOGNITION,
  ],
  [Department.EL_TEITHE]: [
    InternshipProgram.TEITHE_OAED,
    InternshipProgram.ESPA,
    InternshipProgram.TEITHE_JOB_RECOGNITION,
  ],
  [Department.IHU_IEE]: [
    InternshipProgram.ESPA,
    InternshipProgram.EMPLOYER_DECLARATION_OF_RESPONSIBILITY,
  ],
};

// Computed property to get filtered program options based on selected department
const filteredProgramOptions = computed(() => {
  return selectedDepartment.value
    ? programOptions[selectedDepartment.value]
    : [];
});

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
  if (selectedProgram.value && selectedDepartment.value) {
    const response = await createOrUpdateInternship({
      program: selectedProgram.value,
      department: selectedDepartment.value,
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
    selectedDepartment.value &&
    companyId.value !== null &&
    (!props.isAdmin ||
      (startDate.value !== null &&
        endDate.value !== null &&
        props.internship?.id))
  ) {
    const payload: any = {
      program: selectedProgram.value,
      department: selectedDepartment.value,
      company_id: companyId.value,
    };

    if (props.isAdmin) {
      payload.id = props.internship?.id;
      payload.start_date = startDate.value;
      payload.end_date = endDate.value;
    }
    const response = await createOrUpdateInternship(payload);

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
  selectedDepartment.value = null;
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
    @apply flex justify-end space-x-2;
  }

  &__btn {
    @apply hover:text-white py-2 px-4 rounded-md;

    &--submit {
      @apply bg-blue-500 hover:bg-blue-700;
    }

    &--cancel {
      @apply py-2 px-4 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400;
    }
  }
}
</style>
