<template>
  <div class="container">
    <v-sheet
      v-if="!otpData"
      class="otp-card"
      elevation="4"
      max-width="500"
      width="100%"
    >
      <h3 class="otp-title">Verification Code</h3>
      <div class="otp-subtitle">
        Please enter the verification code sent to your mobile
      </div>

      <v-otp-input
        v-model="otp"
        class="otp-input"
        divider="-"
        length="6"
        variant="outlined"
        focus-all
        :loading="loading"
        focused
      ></v-otp-input>

      <div class="otp-button-container">
        <v-btn
          :disabled="otp.length < 6 || loading"
          class="otp-submit-button"
          color="primary"
          @click="verifyOTP"
        >
          Submit
        </v-btn>
      </div>
    </v-sheet>

    <div v-else class="otp-data">
      <h3 class="otp-title">OTP Data</h3>
      <pre>{{ otpData }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { validateOTP } from "@/services/otpService";
import { hasErrorResponse } from "@/services/errorHandling";
import { ValidateOTPData } from "@/types/otp";

const otp = ref<string>("");
const otpData = ref<ValidateOTPData | null>(null);
const loading = ref<boolean>(false);
const $toast = useToast();

const verifyOTP = async () => {
  try {
    if (otp.value.length === 6) {
      loading.value = true;
      const response = await validateOTP(otp.value);
      if (hasErrorResponse(response)) {
        $toast.error(`${response.error}`, { position: "bottom" });
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
</script>
<style lang="scss" scoped>
.container {
  @apply mx-auto px-4 py-8 flex justify-center;
}

.otp-card {
  @apply py-8 px-6 mx-auto  text-center bg-white rounded-lg shadow-lg;
}

.otp-title {
  @apply text-2xl font-semibold mb-4;
}

.otp-subtitle {
  @apply text-base font-light mb-6 text-gray-600;
}

.otp-input {
  @apply mb-8 flex justify-center;
}

.otp-input input {
  @apply border border-gray-300 rounded-lg p-2 text-lg w-12 h-12 mx-1 text-center;
}

.otp-input input:focus {
  @apply border-blue-500 outline-none;
}

.otp-button-container {
  @apply flex justify-center;
}

.otp-submit-button {
  @apply py-2 px-4 rounded-lg shadow-md text-white;
  background-color: #007bff;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    @apply bg-gray-400 cursor-not-allowed;
  }
}

.otp-data {
  @apply py-8 px-6 mx-auto  text-center bg-white rounded-lg shadow-lg max-w-md w-full;
}

.otp-data h3 {
  @apply text-2xl font-semibold mb-4;
}

.otp-data pre {
  @apply text-left bg-gray-100 p-4 rounded-lg shadow-inner text-sm;
}
</style>
