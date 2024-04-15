<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  fetchToken,
  fetchProfile,
  createOrGetUser,
} from "@/services/authService";
import { errorLog } from "@/utils/log";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

async function initiateAuthenticationProcess() {
  const code = route.query.code;
  if (!code) {
    errorLog("Authorization code not found.");
    return;
  }

  try {
    const tokenResponse = await fetchToken(code);
    if (!tokenResponse || !tokenResponse.access_token) {
      throw new Error("Failed to obtain access token");
    }

    const userProfile = await fetchProfile(tokenResponse.access_token);
    if (!userProfile) {
      throw new Error("Failed to fetch user profile");
    }

    const placementsResponse = await createOrGetUser({
      first_name: userProfile.cn,
      last_name: userProfile.sn,
      AM: userProfile.am,
    });

    if (!placementsResponse) {
      throw new Error(
        "Failed to register or retrieve user from placements system.",
      );
    }

    // Assuming this action updates both the state and local storage as needed
    authStore.login(
      tokenResponse.access_token,
      placementsResponse.data,
      tokenResponse.refresh_token,
    );
    authStore.setIsAuthenticated(true);
    // Navigation happens last, ensuring all async operations and state updates are complete
    router.push("/");
  } catch (error) {
    errorLog(error);
  }
}

onMounted(initiateAuthenticationProcess);
</script>
