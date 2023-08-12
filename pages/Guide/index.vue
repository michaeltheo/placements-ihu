<template>
  <div class="px-4 mx-auto grid md:grid-cols-2 md:container-fluid md:px-6">
    <!-- Navigation Links -->
    <div class="mb-4 md:pl-12">
      <div
        class="flex flex-col gap-4 md:gap-8 text-gray-400 md:items-center sm:items-start"
      >
        <p
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ 'text-blue-500': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <a :href="`#${tab.name}`">{{ tab.label }}</a>
        </p>
      </div>
    </div>
    <!-- Content Sections -->
    <div class="flex flex-col items-center md:ml-20">
      <div
        v-for="tab in tabs"
        :id="tab.name"
        :key="tab.id"
        class="text-xl md:text-2xl font-bold pb-4 md:pb-5"
      >
        {{ tab.label }}
        <p class="font-normal">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
          omnis harum voluptatem nihil est voluptatum neque deleniti eligendi
          rem reiciendis similique fugiat quo sapiente obcaecati placeat ut
          unde, nam dolor dolore nulla iure veniam error accusamus. Recusandae
          iusto fuga laudantium fugiat error, asperiores saepe esse. Nesciunt,
          provident veritatis. Minus laudantium temporibus qui. Repellat
          accusamus eveniet doloremque deleniti quod, magni perspiciatis aut
          eaque rem placeat commodi quibusdam culpa exercitationem. Alias,
          ratione?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref(0); // Default active tab

const tabs = [
  { id: 0, name: "basic-info", label: "Βασικές Πληροφορίες" },
  { id: 1, name: "organizations", label: "Φορείς" },
  { id: 2, name: "periods", label: "Χρονικές Περιόδοι" },
  { id: 3, name: "updates", label: "Ενημέρωση Φοιτητών" },
  { id: 4, name: "compensation", label: "Αποζημίωση Φοιτητών" },
  { id: 5, name: "procedures", label: "Διαδικαστικά" },
];
</script>
