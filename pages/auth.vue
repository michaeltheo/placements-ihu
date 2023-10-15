<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.js";
const route = useRoute();
const router = useRouter(); // Import the useRouter hook
const config = useRuntimeConfig();
const body = {
  client_id: config.public.CLIENT_ID,
  client_secret: config.public.CLIENT_SECRET,
  grant_type: "authorization_code",
  code: route.query.code,
};
const profile = ref();
interface TokenRespone {
  access_token: string;
  expires_in: number;
  user: number;
}

onMounted(async () => {
  const token = await useFetch("https://login.iee.ihu.gr/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(Object.entries(body) as string[][]).toString(),
  });

  if (!(token?.data?.value as TokenRespone)?.access_token) return;

  const { data: profileResponse } = await useFetch<any>(
    "https://api.iee.ihu.gr/profile",
    {
      method: "GET",
      headers: {
        "x-access-token": (token?.data?.value as TokenRespone)?.access_token,
      },
    }
  );

  profile.value = profileResponse.value;

  const authStore = useAuthStore();

  if (token?.data?.value?.access_token) {
    authStore.login(token?.data?.value?.access_token, profileResponse.value);
  }

  if (authStore.isLoggedIn()) {
    console.log("User is logged in");
    router.push("/"); // Redirect to the home page
  } else {
    console.log("User is not logged in");
  }
});
</script>
