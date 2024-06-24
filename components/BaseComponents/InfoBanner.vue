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
    <v-alert :color="bannerColor" icon="fa-solid fa-info" stacked>
      <div v-html="bannerText"></div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import { InternshipStatus } from "@/types";

const PENDING_REVIEW_STATUS_TEXT = `
        <div class='infoBanner-text'>
          <p>Παρακαλώ πατήστε το κουμπί <span class="infoBanner-text--bold">'Προσθήκη δικαιολογητικού'</span>, επιλέξτε τον τύπο του δικαιολογητικού έναρξης που θέλετε να ανεβάσετε, έπειτα επιλέξτε το αρχείο που θέλετε να ανεβάσετε (τα αρχεία δικαιολογητικών πρέπει να είναι PDF) και πατήστε το κουμπί 'Ανέβασμα'. Με το επιτυχές ανέβασμα του αρχείου θα δείτε ότι ο πίνακας των δικαιολογητικών θα ανανεωθεί αυτόματα. Η κατάσταση της Πρακτικής σας θα αλλάξει όταν το Γραφείο Πρακτικής Άσκησης εξετάσει τα αρχεία που έχετε ανεβάσει.</p>
        </div>`;

const ACTIVE_STATUS_TEXT = `
          <div class='infoBanner-text'>
          <div>Η κατάσταση της Πρακτικής σας είναι Ενεργή. Πλέον τα δικαιολογητικά έναρξης 
          σας έχουν εξεταστεί με επιτυχία. Πλέον μπορείτε
           να ενημερώσετε την πρακτική σας άσκηση πατώντας το
            κουμπί <span class="infoBanner-text--bold">'Ενημέρωση Πρακτικής'</span>,
             και να εισάγετε την εταιρεία στην οποία θα θέλατε να πραγματοποιήσετε
              την πρακτική σας άσκηση (Σε περίπτωση που δεν βρείτε την εταιρεία που θα θέλατε να κάνετε
               πρακτική, παρακαλώ επικοινωνήστε με το Γραφείο Πρακτικής Άσκησης).</div> 
              <div> Επιπλέον θα μπορείτε, πατώντας το κουμπί <span class="infoBanner-text--bold">'Προσθήκη δικαιολογητικού'
               </span>, να ανεβάσετε και τα δικαιολογητικά λήξης επιλέγοντας τον κατάλληλο τύπο αρχείου (Τα αρχεία που θα ανεβάσετε πρέπει να είναι PDF). Σημείωση: δεν μπορείτε να ανεβάσετε όλα τα δικαιολογητικά μέσω 
               της ιστοσελίδας, κάποια δικαιολογητικά θα πρέπει να τα καταθέσετε στο Γραφείο Πρακτικής Άσκησης.</div>
                 <div>Η ημερομηνία έναρξης και η ημερομηνία λήξης θα ενημερωθούν από το Γραφείο Πρακτικής Άσκησης. </div>
                 Η επιλογή για τη συμπλήρωση του ερωτηματολογίου θα είναι διαθέσιμη μετά το τέλος της πρακτικής. Για τη συμπλήρωση του ερωτηματολογίου του ασκούμενου, πατήστε το κουμπί 
                   <span class="infoBanner-text--bold">'Έναρξη Ερωτηματολογίου'</span>
                    που βρίσκεται κάτω από τον πίνακα των δικαιολογητικών. 
                    Για τη συμπλήρωση του ερωτηματολογίου της εταιρείας, ακολουθήστε τα βήματα
                     που βρίσκονται στο πλαίσιο <span class="infoBanner-text--bold">'Ερωτηματολογίου
                      Εταιρείας'</span>
                      <div>
                  Η κατάσταση της πρακτικής σας θα αλλάξει όταν το Γραφείο Πρακτικής Άσκησης ελέγξει τα δικαιολογητικά σας.</div></div> 
                  
        </div>`;

const ENDED_STATUS_TEXT = `
          <div class='infoBanner-text'>
          <p>Βρίσκεστε στο τέλος της πρακτικής σας άσκησης.</p>
        </div>`;

const props = defineProps<{
  status: InternshipStatus;
}>();

const bannerColor = computed(() => {
  switch (props.status) {
    case InternshipStatus.PENDING_REVIEW:
      return "warning";
    case InternshipStatus.ACTIVE:
      return "success";
    case InternshipStatus.ENDED:
      return "red-lighten-2";
    default:
      return "";
  }
});

const bannerText = computed(() => {
  switch (props.status) {
    case InternshipStatus.PENDING_REVIEW:
      return PENDING_REVIEW_STATUS_TEXT;
    case InternshipStatus.ACTIVE:
      return ACTIVE_STATUS_TEXT;
    case InternshipStatus.ENDED:
      return ENDED_STATUS_TEXT;
    default:
      return "";
  }
});
</script>

<style lang="scss">
.infoBanner-text {
  @apply leading-6 p-1  rounded-md shadow;
  div {
    @apply pt-4;
  }
  &--bold {
    @apply font-bold;
  }
}
</style>
