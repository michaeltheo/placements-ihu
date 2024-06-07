<template>
  <div class="container">
    <v-sheet
      v-if="!otpData"
      class="otp-card"
      elevation="5"
      max-width="700"
      width="100%"
    >
      <h3 class="otp-card__title">Ερωτηματολόγιο Πρακτικής Άσκησης</h3>
      <div class="otp-card__subtitle">
        Παρακαλούμε εισάγετε τον κωδικό επαλήθευσης που σας έστειλε ο φοιτητής
        της πρακτικής άσκησης.
      </div>

      <v-otp-input
        v-model="otp"
        placeholder="X"
        divider="-"
        length="6"
        variant="outlined"
        focus-all
        :loading="loading"
        focused
      ></v-otp-input>

      <div class="otp-card__button-container">
        <v-btn
          :disabled="otp.length < 6 || loading"
          class="otp-card__submit-button"
          color="primary-blue-color"
          @click="verifyOTP"
        >
          Είσοδος
        </v-btn>
      </div>
    </v-sheet>

    <div v-else class="otp-data" data-aos="zoom-in">
      <h3 class="otp-data__title">
        Καλώς ήρθατε, {{ otpData.internship_company }}
      </h3>
      <div class="otp-data__info">
        <p><strong>Στοιχεία Πρακτικής Άσκησης:</strong></p>
        <p>
          Φοιτητής: {{ otpData.user_firstName }} {{ otpData.user_lastName }}
        </p>
        <p>
          Ημερομηνία Έναρξης: {{ formatDate(otpData.internship_startDate) }}
        </p>
        <p>Ημερομηνία Λήξης: {{ formatDate(otpData.internship_endDate) }}</p>
      </div>
      <div class="otp-data__description">
        <v-alert
          class="data__description--alert"
          border="start"
          color="primary-blue-color"
          title="Ερωτηματολόγιο Πρακτικής"
          variant="tonal"
        >
          Η συμπλήρωση του ερωτηματολογίου είναι διαθέσιμη μόνο μία φορά.
          Παρακαλώ ελέγξτε τις απαντήσεις σας.
        </v-alert>
      </div>
      <Questionnaire
        :questionnaireType="QuestionnaireType.COMPANY"
        :internship-id="otpData?.internship_id"
        :token="otpData?.token"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { validateOTP } from "@/services/otpService";
import { hasErrorResponse } from "@/services/errorHandling";
import { ValidateOTPData } from "@/types/otp";
import { QuestionnaireType } from "@/types";

const otp = ref<string>("");
const otpData = ref<ValidateOTPData>();
const loading = ref<boolean>(false);
const $toast = useToast();

const verifyOTP = async () => {
  try {
    if (otp.value.length === 6) {
      loading.value = true;
      const response = await validateOTP(otp.value);
      if (hasErrorResponse(response)) {
        $toast.error(`${response.error}`, { position: "bottom" });
        otp.value = "";
      } else {
        otpData.value = response.data;
      }
    }
  } finally {
    loading.value = false;
  }
};

// Watch the OTP variable to trigger verifyOTP when it reaches 6 characters
watch(otp, (newVal) => {
  if (newVal.length === 6) {
    verifyOTP();
  }
});

/**
 * Formats a date string to 'dd-MM-yy' format.
 * @param dateString - The date string to format.
 * @returns The formatted date string or "N/A" if invalid.
 */
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("el-GR", options);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.container {
  @apply mx-auto px-4 py-8 flex justify-center;
}

.otp-card {
  @apply py-8 px-6 mx-auto text-center bg-white rounded-lg shadow-lg;
  color: $primary-dark-blue-color;

  &__title {
    @apply text-2xl font-semibold mb-4;
  }

  &__subtitle {
    @apply text-lg font-semibold mb-6;
  }

  &__button-container {
    @apply flex justify-center;
  }

  &__submit-button {
    @apply py-2 px-4 rounded-lg shadow-md text-white;
    background-color: $primary-dark-blue-color;
    transition: background-color 0.3s;

    &:disabled {
      @apply bg-gray-400 cursor-not-allowed;
    }
  }
}

.otp-data {
  @apply py-8 px-6 mx-auto text-center bg-white rounded-lg shadow-lg w-full;
  color: $primary-dark-blue-color;

  &__title {
    @apply text-2xl font-semibold mb-4;
  }

  &__info {
    @apply text-left p-4 rounded-lg shadow-xl mb-4;

    p {
      @apply mb-2 text-lg;
    }
  }

  &__description {
    @apply flex justify-center text-left text-lg mb-4;
    &--alert {
      @apply w-fit;
    }
  }
}
</style>
