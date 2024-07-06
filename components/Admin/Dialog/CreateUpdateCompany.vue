<!--
/**
 * AdminDialogCreateUpdateCompany Component
 *
 * This component renders a dialog for creating or updating a company.
 * It contains a form with fields for the company's name and tax identification number (AFM).
 * The dialog is controlled by a prop and emits events to handle closing and refreshing the company list.
 *
 * @param {boolean} modelValue - Controls the visibility of the dialog.
 * @param {Company | null}  editCompany - If provided, the dialog will be in edit mode and pre-fill the form with the company's details.
 *
 * Emits:
 * - update:modelValue (boolean): Emits an event to update the visibility of the dialog.
 * - refreshCompaniesList (): Emits an event to refresh the list of companies.
 */
-->
<template>
  <div class="company-dialog">
    <v-dialog
      v-model="localDialog"
      max-width="600px"
      persistent
      class="copmany-dialog__container"
    >
      <v-card>
        <v-card-title class="company-dialog--title">
          {{
            editCompany
              ? `Επεξεργασία Εταιρείας: ${editCompany?.name}`
              : "Προσθήκη Εταιρείας"
          }}
        </v-card-title>
        <v-form ref="form" @submit.prevent="submitForm">
          <div class="company-dialog__form">
            <v-text-field
              v-model="companyName"
              label="Εισάγεται το Όνομα της Εταιρείας"
              outlined
              class="company-dialog__form--textField"
              :rules="companyNameRule"
              dense
              clearable
            />
            <v-text-field
              v-model="companyAFM"
              label="Εισάγεται το A.Φ.Μ της Εταιρείας"
              outlined
              class="company-dialog__form--textField"
              :rules="companyAfmRule"
              dense
              clearable
            />
          </div>
          <v-card-actions class="company-dialog__actions">
            <v-btn
              type="submit"
              :disabled="loading"
              class="company-dialog__actions__btn--add"
            >
              <template v-if="loading">
                <v-icon
                  color="white"
                  icon="fas fa-circle-notch fa-spin"
                ></v-icon>
              </template>
              <template v-else>
                {{ editCompany ? "Ενημέρωση" : "Προσθήκη" }}
              </template>
            </v-btn>
            <v-btn
              class="company-dialog__actions__btn--cancel"
              @click="emitClose"
            >
              Κλείσιμο
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
import {
  adminCreateCompany,
  adminUpdateCompany,
} from "@/services/companyService";
import type { Company, CompanyBase } from "@/types/company";
import { hasErrorResponse } from "@/services/errorHandling";

// Props definition
const props = defineProps<{
  modelValue: boolean;
  editCompany?: Company | null;
}>();
const emit = defineEmits(["update:modelValue", "refreshCompaniesList"]);

// Toast notification setup

// State and computed properties
const isEditMode = computed(() => props.editCompany !== null);
const companyName = ref<string | undefined>(
  props.editCompany?.name ?? undefined,
);
const companyAFM = ref<string | undefined>(props.editCompany?.AFM ?? undefined);
const form = ref<any>(null);
const loading = ref(false);
const localDialog = ref(props.modelValue);

// Validation rules
const companyNameRule = [
  (value: string) => !!value || "Πρέπει να εισάγεται ένα όνομα.",
];
const companyAfmRule = [
  (value: any) => !!value || "Πρέπει να εισάγεται ένα Α.Φ.Μ.",
];

// Watch for changes in the editCompany prop and update the form fields
watch(
  () => props.editCompany,
  (newCompany) => {
    if (newCompany) {
      companyName.value = newCompany.name;
      companyAFM.value = newCompany.AFM;
    } else {
      companyName.value = undefined;
      companyAFM.value = undefined;
    }
  },
  { immediate: true },
);

// Watch for changes in the modelValue prop to control dialog visibility
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  },
);

// Handle form submission
const submitForm = async () => {
  if (!form.value?.validate() || !companyAFM.value || !companyName.value) {
    toast.error(
      "Η υποβολή της φόρμας απέτυχε λόγω σφαλμάτων επικύρωσης ή έλλειψης δεδομένων.",
    );
    return;
  }

  loading.value = true;
  try {
    let response: any;
    const companyData: CompanyBase = {
      name: companyName.value,
      AFM: companyAFM.value,
    };
    if (isEditMode.value && props.editCompany) {
      response = await adminUpdateCompany(props.editCompany.id, companyData);
    } else {
      response = await adminCreateCompany(companyData);
    }

    if (hasErrorResponse(response)) {
      toast.error(`${response.error}`);
    } else {
      toast.success(`${response.detail || response.message?.detail}`);
      emit("refreshCompaniesList");
      emitClose();
    }
  } catch (error) {
    toast.error(`${error}`);
  } finally {
    loading.value = false;
  }
};

// Handle closing the dialog
const emitClose = () => {
  companyName.value = undefined;
  companyAFM.value = undefined;
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

/* Custom styles for the company dialog */
.company-dialog {
  &__container {
    @apply rounded-lg;
  }

  &--title {
    @apply text-lg font-bold text-center;
    color: $primary-dark-blue-color;
  }
  &__form {
    @apply space-y-4 p-4;
    &--textField {
      @apply bg-white text-blue-900 p-2;
    }
  }
  &__actions {
    @apply flex justify-end space-x-4 mt-4  py-2 px-4 rounded-md;
    &__btn {
      &--add {
        @apply bg-blue-500 hover:bg-blue-700 text-white;
      }
      &--cancel {
        @apply py-2 px-4 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400;
      }
    }
  }
}
</style>
