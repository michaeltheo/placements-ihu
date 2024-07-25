<!--
/**
 * EditProfileDialog Component
 *
 * Dialog component for editing the user profile information.
 * This dialog allows users to update their profile details such as first name, last name,
 * registration year, registration number (AM), telephone number, email, and department.
 * The role and AM fields are disabled and cannot be edited directly.
 *
 * @prop {boolean} modelValue - Controls the visibility of the dialog.
 *
 * @emits update:modelValue - Emits an event to update the visibility of the dialog.
 */
-->
<template>
  <div class="edit-profile-dialog">
    <v-dialog
      v-model="localDialog"
      max-width="600px"
      persistent
      class="edit-profile-dialog__container"
    >
      <v-card class="edit-profile-dialog__card">
        <v-card-title class="edit-profile-dialog__title">
          Επεξεργασία Προφίλ
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="firstName"
              label="Όνομα"
              class="edit-profile-dialog__field"
              outlined
              dense
              :rules="[requiredRule]"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Επώνυμο"
              class="edit-profile-dialog__field"
              outlined
              dense
              :rules="[requiredRule]"
            ></v-text-field>
            <v-text-field
              v-model="regYear"
              label="Έτος Εγγραφής"
              class="edit-profile-dialog__field"
              outlined
              dense
              type="number"
              :rules="[requiredRule, positiveNumberRule]"
            ></v-text-field>
            <v-text-field
              v-model="AM"
              label="Αριθμός Μητρώου"
              class="edit-profile-dialog__field"
              outlined
              :rules="[requiredRule]"
              dense
              disabled
            ></v-text-field>
            <v-text-field
              v-model="role"
              label="Role"
              class="edit-profile-dialog__field"
              outlined
              disabled
              :rules="[requiredRule]"
              dense
            ></v-text-field>
            <v-text-field
              v-model="telephoneNumber"
              label="Τηλέφωνο"
              class="edit-profile-dialog__field"
              outlined
              type="number"
              :rules="[requiredRule, positiveNumberRule, phoneNumberRule]"
              dense
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              class="edit-profile-dialog__field"
              outlined
              dense
              :rules="[requiredRule, emailRule]"
            ></v-text-field>
            <v-select
              v-model="department"
              :items="departmentOptions"
              label="Επιλέξτε Τμήμα"
              class="edit-profile-dialog__field"
              outlined
              clearable
              :rules="[requiredRule]"
              dense
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="edit-profile-dialog__actions">
          <v-btn
            class="edit-profile-dialog__btn edit-profile-dialog__btn--submit"
            :disabled="!valid"
            @click="submitForm"
          >
            Αποθήκευση
          </v-btn>
          <v-btn
            class="edit-profile-dialog__btn edit-profile-dialog__btn--cancel"
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
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
import { Department } from "@/types";
import { updateUserProfile } from "@/services/userService";

// Define props
const props = defineProps<{ modelValue: boolean }>();

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Reactive properties
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const departmentOptions = Object.values(Department);
const localDialog = ref(props.modelValue);
const firstName = ref(user.value.first_name || "");
const lastName = ref(user.value.last_name || "");
const regYear = ref(user.value.reg_year || "");
const AM = ref(user.value.AM || "");
const role = ref(user.value.role || "");
const telephoneNumber = ref(user.value.telephone_number || "");
const email = ref(user.value.email || "");
const department = ref<Department | undefined>(
  user.value.department || undefined
);
const valid = ref(false);
const form = ref<any>(null);

// Watchers to handle prop changes
watch(
  () => props.modelValue,
  (newVal) => {
    localDialog.value = newVal;
    if (newVal) {
      firstName.value = user.value.first_name || "";
      lastName.value = user.value.last_name || "";
      regYear.value = user.value.reg_year || "";
      AM.value = user.value.AM || "";
      role.value = user.value.role || "";
      telephoneNumber.value = user.value.telephone_number || "";
      email.value = user.value.email || "";
      department.value = user.value.department || undefined;
    }
  }
);

// Validation rules
const requiredRule = (value: string) => !!value || "Το πεδίο είναι απαραίτητο.";
const emailRule = (value: string) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(value) || "Εισάγετε έγκυρο email.";
};
const positiveNumberRule = (value: number) =>
  value > 0 || "Η τιμή πρέπει να είναι θετικός αριθμός.";
const phoneNumberRule = (value: string) => {
  const pattern = /^\d+$/;
  return pattern.test(value) || "Το τηλέφωνο πρέπει να περιέχει μόνο αριθμούς.";
};

// Handle form submission
const submitForm = async () => {
  if (form.value?.validate()) {
    const updatedUser = {
      first_name: firstName.value,
      last_name: lastName.value,
      reg_year: regYear.value,
      AM: AM.value,
      telephone_number: telephoneNumber.value,
      email: email.value,
      department: department.value,
    };

    const response = await updateUserProfile(user.value.id, updatedUser);

    if (response && !response.error) {
      toast.success(`${response.message?.detail}`);
      authStore.setUser(response.data);
      emitClose();
    } else {
      toast.error(`${response.error}`);
    }
  }
};

// Emit close event to close the dialog
const emitClose = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.edit-profile-dialog {
  &__container {
    @apply rounded-lg;
  }

  &__card {
    @apply rounded-lg;
  }

  &__title {
    @apply text-lg font-bold text-blue-900;
  }

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
