<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const profile = ref();
const authStore = useAuthStore();

interface TokenResponse {
  access_token: string;
  expires_in: number;
  user: any;
}

const fetchToken = async () => {
  const body = {
    client_id: config.public.CLIENT_ID,
    client_secret: config.public.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: route.query.code,
  };

  const { data, error } = await useFetch("https://login.iee.ihu.gr/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(Object.entries(body) as string[][]).toString(),
  });

  if (error.value) {
    console.error("Token fetch error:", error.value);
    return null;
  }

  return data.value as TokenResponse;
};

const fetchProfile = async (accessToken: string) => {
  const { data, error } = await useFetch<any>(
    "https://api.iee.ihu.gr/profile",
    {
      method: "GET",
      headers: {
        "x-access-token": accessToken,
      },
    }
  );

  if (error.value) {
    console.error("Profile fetch error:", error.value);
    return null;
  }

  return data.value;
};

onMounted(async () => {
  const tokenResponse = await fetchToken();
  if (!tokenResponse?.access_token) {
    console.log("Failed to obtain access token");
    return;
  }

  const userProfile = await fetchProfile(tokenResponse.access_token);
  if (!userProfile) {
    console.log("Failed to fetch user profile");
    return;
  }

  profile.value = userProfile;
  authStore.login(tokenResponse.access_token, userProfile);

  if (authStore.isLoggedIn()) {
    console.log("User is logged in");
    router.push("/"); // Redirect to the home page
  } else {
    console.log("User is not logged in");
  }
});
</script>
