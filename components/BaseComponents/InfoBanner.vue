<!--
/**
 * InfoBanner Component
 *
 * This component displays an informational banner with different messages and colors based on the internship status.
 * It uses Vuetify's v-alert component to show messages and icons, and the content changes dynamically based on the
 * provided status prop.
 *
 * @prop {InternshipStatus} status - The current status of the internship which determines the banner's content and color.
 */
-->
<template>
  <div class="shadow-lg">
    <v-alert
      :color="bannerColor"
      icon="fa-solid fa-info"
      stacked
      variant="tonal"
      :title="bannerTitle"
    >
      <div v-html="bannerText"></div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { InternshipStatus } from "@/types";

const SUMIT_START_FILES_STATUS_TEXT = `<div class='infoBanner-text'>
          <p>Παρακαλώ πατήστε το κουμπί <span class="infoBanner-text--bold">'Προσθήκη δικαιολογητικού'</span>, επιλέξτε τον τύπο του δικαιολογητικού έναρξης που θέλετε να ανεβάσετε, έπειτα επιλέξτε το αρχείο που θέλετε να ανεβάσετε (τα αρχεία δικαιολογητικών πρέπει να είναι PDF) και πατήστε το κουμπί <span class="infoBanner-text--bold"> 'Ανέβασμα' </span>. Με το επιτυχές ανέβασμα του αρχείου θα δείτε ότι ο πίνακας των δικαιολογητικών θα ανανεωθεί αυτόματα. Εφόσον έχετε ανεβάσει όλα τα απαραίτητα δικαιολογητικά πατήστε το κουμπί. <span class="infoBanner-text--bold">  Έλεγχος Δικαιολοητικών Έναρξης </span></p>
        </div>`;
const SUMIT_START_FILES_WITHOUT_SECRETARY_CERTIFICATION_STATUS_TEXT = `<div class='infoBanner-text'>
          <p>Παρακαλώ πατήστε το κουμπί <span class="infoBanner-text--bold">'Προσθήκη δικαιολογητικού'</span>, επιλέξτε τον τύπο του δικαιολογητικού έναρξης που θέλετε να ανεβάσετε, έπειτα επιλέξτε το αρχείο που θέλετε να ανεβάσετε (τα αρχεία δικαιολογητικών πρέπει να είναι PDF) και πατήστε το κουμπί <span class="infoBanner-text--bold"> 'Ανέβασμα' </span>. Με το επιτυχές ανέβασμα του αρχείου θα δείτε ότι ο πίνακας των δικαιολογητικών θα ανανεωθεί αυτόματα. Εφόσον έχετε ανεβάσει όλα τα απαραίτητα δικαιολογητικά πατήστε το κουμπί. <span class="infoBanner-text--bold">  Έλεγχος Δικαιολοητικών Έναρξης </span>\n<span class="infoBanner-text--bold">Προσοχή:</span>Σε αυτό το στάδιο δεν μπορείτε να ανεβάσετε το δικαιολογητικό <span class="infoBanner-text--bold">'Βεβαίωση Πρακτικής Άσκησης από την γραμματεία'</span>. Θα ανεβάσετε την <span class="infoBanner-text--bold"> Αίτηση Πρακτικής </span> και η Γραμματεία θα ελέγξει το δικαιολογητικό σας.</p>
        </div>`;

const SUMIT_END_FILES_STATUS_TEXT = `<div class='infoBanner-text'>
          <p>Παρακαλώ πατήστε το κουμπί <span class="infoBanner-text--bold">'Προσθήκη δικαιολογητικού'</span>, επιλέξτε τον τύπο του δικαιολογητικού λήξης που θέλετε να ανεβάσετε, έπειτα επιλέξτε το αρχείο που θέλετε να ανεβάσετε (τα αρχεία δικαιολογητικών πρέπει να είναι PDF) και πατήστε το κουμπί <span class="infoBanner-text--bold"> 'Ανέβασμα' </span>. Με το επιτυχές ανέβασμα του αρχείου θα δείτε ότι ο πίνακας των δικαιολογητικών θα ανανεωθεί αυτόματα. Εφόσον έχετε ανεβάσει όλα τα απαραίτητα δικαιολογητικά πατήστε το κουμπί. <span class="infoBanner-text--bold">  Έλεγχος Δικαιολοητικών Λήξης </span></p>
        </div>`;

const PENDING_REVIEW_START_TEXT = `<div class='infoBanner-text'>
          <p>To Γραφείο Πρακτικής Θα ελέγξει τα δικαιολογητικά έναρξης που έχετε υποβάλει.</p>
        </div>`;

const PENDING_REVIEW_END_TEXT = `<div class='infoBanner-text'>
          <p>To Γραφείο Πρακτικής Θα ελέγξει τα δικαιολογητικά λήξης που έχετε ανεβάσει.</p>
        </div>`;

const ACTIVE_STATUS_TEXT = `
 <div class='infoBanner-text'>
 <div>Τα δικαιολογητικά έναρξης σας έχουν ελεγχθεί με επιτυχία. Πλέον μπορείτε να ενημερώσετε την πρακτική σας άσκηση πατώντας το κουμπί <span class="infoBanner-text--bold"> 'Ενημέρωση Πρακτικής' </span> και να εισάγετε την εταιρεία στην οποία θα θέλατε να πραγματοποιήσετε την πρακτική σας άσκηση. (Σε περίπτωση που δεν βρείτε την εταιρεία που θα θέλατε να κάνετε πρακτική, παρακαλώ επικοινωνήστε με το Γραφείο Πρακτικής Άσκησης). </div>
 <div>Η υποβολή των δικαιολογητικών λήξης <span class="infoBanner-text--bold"> θα είναι διαθέσιμη 1 βδομάδα πριν την ημερομηνία λήξης </span> της πρακτικής σας. Για να υποβάλετε τα δικαιολογητικά λήξης πατήστε το κουμπί <span class="infoBanner-text--bold"> 'Κατάθεση Δικαιολογητικών Λήξης' </span>" </div>
 </div>
`;

const ENDED_STATUS_TEXT = `
          <div class='infoBanner-text'>
          <p>Τα δικαιολογητικά λήξης σας έχουν εξεταστεί με επιτυχία.</p>
        </div>`;

const props = defineProps<{
  status: InternshipStatus;
}>();

const bannerColor = computed(() => {
  switch (props.status) {
    case InternshipStatus.SUBMIT_END_FILES:
    case InternshipStatus.SUBMIT_START_FILES:
    case InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION:
      return "warning";
    case InternshipStatus.PENDING_REVIEW_END:
    case InternshipStatus.PENDING_REVIEW_START:
      return "orange-lighten-1";
    case InternshipStatus.ACTIVE:
    case InternshipStatus.ENDED:
      return "success";
    default:
      return "";
  }
});

const bannerText = computed(() => {
  switch (props.status) {
    case InternshipStatus.SUBMIT_STAT_FILES_WITHOUT_SECRETARY_CERTIFICATION:
      return SUMIT_START_FILES_WITHOUT_SECRETARY_CERTIFICATION_STATUS_TEXT;
    case InternshipStatus.SUBMIT_START_FILES:
      return SUMIT_START_FILES_STATUS_TEXT;
    case InternshipStatus.SUBMIT_END_FILES:
      return SUMIT_END_FILES_STATUS_TEXT;
    case InternshipStatus.PENDING_REVIEW_START:
      return PENDING_REVIEW_START_TEXT;
    case InternshipStatus.PENDING_REVIEW_END:
      return PENDING_REVIEW_END_TEXT;
    case InternshipStatus.ACTIVE:
      return ACTIVE_STATUS_TEXT;
    case InternshipStatus.ENDED:
      return ENDED_STATUS_TEXT;
    default:
      return "";
  }
});

const bannerTitle = computed(() => {
  return `Πληροφορίες για την κατάσταση: ${props.status}`;
});
</script>

<style lang="scss">
.infoBanner-text {
  @apply leading-6 p-1 rounded-md shadow;
  div {
    @apply pt-4;
  }
  &--bold {
    @apply font-bold;
  }
}
</style>
