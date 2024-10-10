<template>
  <div data-aos="zoom-in" class="guide">
    <div class="guide__container">
      <div class="guide__container--header">
        {{ Department.IT_TEITHE }}
      </div>
      <div class="guide__container--header--internship-program">
        Προϋποθέσεις για
        {{ InternshipProgram.TEITHE_JOB_RECOGNITION }}
      </div>
      <div class="guide__container__stepper">
        <v-stepper
          non-linear
          hide-actions
          edit-icon="fa:fas fa-search"
          :editable="true"
          color="primary-blue-color"
          prev-text="Προηγούμενο"
          next-text="Επόμενο"
          :items="['Δικαιολογητικά Έναρξης', 'Δικαιολογητικά Λήξης']"
        >
          <template v-slot:item.1>
            <div class="guide__container__stepper__requirements">
              <p
                class="guide__container__stepper__requirements__text font-bold"
              >
                Μέσω τις πλατφόρμας θα πρέπει να ανεβάσετε τα ακόλουθα
                δικαιολογητικά έναρξης.
              </p>
              <v-table class="guide__container__stepper__table">
                <tbody>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Αίτηση Πρακτικής Άσκησης</td>
                    <td>
                      Την συμπληρώνετε και την ανεβάζετε μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            `${AnagronisiErgasiasUrls.PLIROFORIKI.AitisiPraktikisAskisis}`
                          )
                        "
                      >
                        <v-icon size="large" color="primary-blue-color"
                          >fa:fas fa-download</v-icon
                        >
                        <v-tooltip activator="parent" location="top"
                          >Κατέβασμα Δικαιολογητικού</v-tooltip
                        >
                      </v-btn>
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Βεβαίωση Πρακτικής</td>
                    <td>
                      Το συγκεκριμένο δικαιολογητικό θα το ανεβάσει η γραμματεία
                      για εσάς, <span>αφού</span> έχετε ανεβάσει εσείς ήδη την
                      “Αίτηση Πρακτικής Άσκησης".
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Αίτηση Αναγνώρισης</td>
                    <td>
                      Την συμπληρώνετε και την ανεβάζετε μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            `${AnagronisiErgasiasUrls.PLIROFORIKI.AitisiAnagnorisis}`
                          )
                        "
                      >
                        <v-icon size="large" color="primary-blue-color"
                          >fa:fas fa-download</v-icon
                        >
                        <v-tooltip activator="parent" location="top"
                          >Κατέβασμα Δικαιολογητικού</v-tooltip
                        >
                      </v-btn>
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Βεβαίωση Απασχόλησης και Ασφάλισης Ασκούμενου
                    </td>
                    <td>
                      Την συμπληρώνει ο φορέας απασχόλησης. Είτε τη συμπληρώνει
                      ηλεκτρονικά και την υπογράφει μέσω <span>GOV</span>, σας
                      τη στέλνει και την ανεβάζετε (Προσοχή: ΌΧΙ απλά ψηφιακή
                      υπογραφή), είτε την εκτυπώνει, τη συμπληρώνει, τη
                      σφραγίζει και φέρνετε το <span>πρωτότυπο</span> με τη
                      σφραγίδα στο Γραφείο Πρακτικής Άσκησης (αιθ. 209, κτ.
                      Πληροφορικής).
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            `${AnagronisiErgasiasUrls.PLIROFORIKI.BebaiosiApasxolisisKaiAsfalisisAskoumenou}`
                          )
                        "
                      >
                        <v-icon size="large" color="primary-blue-color"
                          >fa:fas fa-download</v-icon
                        >
                        <v-tooltip activator="parent" location="top"
                          >Κατέβασμα Δικαιολογητικού</v-tooltip
                        >
                      </v-btn>
                    </td>
                  </tr>

                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Σύμβαση Εργασίας</td>
                    <td>
                      Ζητάτε από τον φορέα απασχόλησης την Αναγγελία Πρόσληψης
                      (Ε3) και την ανεβάζετε μέσω της πλατφόρμας.
                      <span>ΠΡΟΣΟΧΗ</span>: Σε περίπτωση που έχει γίνει
                      τροποποίηση της αρχικής σύμβασης, θα χρειαστεί να
                      ανεβάσετε και το έντυπο Ε4.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Βιβλιάριο Πρακτικής Άσκησης</td>
                    <td>
                      Ο/η φοιτητής/φοιτήτρια <span>πρέπει</span> να παραλάβει το
                      Βιβλιάριο Πρακτικής Άσκησης, μόλις υποβάλει τη Σύμβαση
                      Πρακτικής στο Γραφείο Πρακτικής Άσκησης (αιθ. 209, κτ.
                      Πληροφορικής).
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </template>
          <template v-slot:item.2>
            <div class="guide__container__stepper__requirements">
              <p
                class="guide__container__stepper__requirements__text font-bold"
              >
                Μέσω τις πλατφόρμας θα πρέπει να ανεβάσετε τα ακόλουθα
                δικαιολογητικά Λήξης.
              </p>
              <v-table class="guide__container__stepper__table">
                <tbody>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Αντίγραφο του εντύπου Ε3.5</td>
                    <td>
                      Ο/η φοιτητής/τρια ζητάει το έντυπο Ε3.5 από την εταιρεία
                      στην οποία εκπονεί πρακτική άσκηση και έπειτα το ανεβάζει
                      μέσω της πλατφόρμας.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Βεβαιωση Ολοκληρωσης Πρακτικης Ασκησης
                    </td>
                    <td>
                      Την συμπληρώνει ο φορέας απασχόλησης. Είτε τη συμπληρώνει
                      ηλεκτρονικά και την υπογράφει μέσω <span>GOV</span>, σας
                      τη στέλνει και την ανεβάζετε (Προσοχή: ΌΧΙ απλά ψηφιακή
                      υπογραφή), είτε την εκτυπώνει, τη συμπληρώνει, τη
                      σφραγίζει και φέρνετε το <span>πρωτότυπο</span> με τη
                      σφραγίδα στο Γραφείο Πρακτικής Άσκησης (αιθ. 209, κτ.
                      Πληροφορικής).
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            `${AnagronisiErgasiasUrls.PLIROFORIKI.BebaiosiOlokrirosisPraktikisAskisis}`
                          )
                        "
                      >
                        <v-icon size="large" color="primary-blue-color"
                          >fa:fas fa-download</v-icon
                        >
                        <v-tooltip activator="parent" location="top"
                          >Κατέβασμα Δικαιολογητικού</v-tooltip
                        >
                      </v-btn>
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Βεβαίωση Ενσήμων (ΕΦΚΑ)</td>
                    <td>
                      Ο/η φοιτητής/τρια εκδίδει “Λογαριασμό Ασφάλισης” για τους
                      μήνες που εκπόνησε πρακτική άσκηση, μέσω της ιστοσελίδας
                      του ΕΦΚΑ, κάνοντας χρήση των κωδικών taxisnet.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Αποδείξεις Εξόφλησης Μηνιαίας Αποζημίωσης Φοιτητή/τριας
                    </td>
                    <td>
                      Ο/η φοιτητής/τρια εκδίδει τα αποδεικτικά πληρωμής μέσω
                      ebanking/app, για κάθε μήνα που εκπόνησε πρακτική άσκηση.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Ερωτηματολόγιο Αξιολόγησης Πρακτικής Άσκησης από τον
                      Επιβλέποντα Φορέα
                    </td>
                    <td>
                      Η συμπλήρωση του Ερωτηματολόγιο για τον Επιβλέποντα φορέα
                      θα γίνει μέσω τις πλατόρμας. Δεν χρείαζεται να ανεβάσετε
                      κάποιο διακιολογιτικό.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Ερωτηματολόγιο Αξιολόγησης Πρακτικής Άσκησης από τον/την
                      Ασκούμενο/η
                    </td>
                    <td>
                      Η συμπλήρωση του Ερωτηματολόγιο απο τον Ασκούμενο θα γίνει
                      μέσω τις πλατόρμας. Δεν χρείαζεται να ανεβάσετε κάποιο
                      διακιολογιτικό.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Αίτηση Ολοκλήρωσης Πρακτικής Άσκησης.
                    </td>
                    <td>
                      Την συμπληρώνετε και την υπογράφετε, και την ανεβάζετε
                      μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            `${AnagronisiErgasiasUrls.PLIROFORIKI.AitisiOloklirosisPraktikisAskisis}`
                          )
                        "
                      >
                        <v-icon size="large" color="primary-blue-color"
                          >fa:fas fa-download</v-icon
                        >
                        <v-tooltip activator="parent" location="top"
                          >Κατέβασμα Δικαιολογητικού</v-tooltip
                        >
                      </v-btn>
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Βιβλιάριο Πρακτικής Άσκησης</td>
                    <td>
                      Το Βιβλιάριο Πρακτικής Άσκησης θα <span>πρέπει</span> να
                      το επιστρέψετε <span>σωστά</span> συμπληρωμένο στο Γραφείο
                      Πρακτικής Άσκησης (αιθ. 209, κτ. Πληροφορικής).
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </template>
        </v-stepper>
      </div>
      <BaseComponentsContinueButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Department, InternshipProgram } from "@/types";
import { AnagronisiErgasiasUrls } from "@/constants/diakaiologitikaUrls";
const openFile = (path: string) => {
  window.open(path, "_blank");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.guide {
  @apply container mx-auto px-4 py-8 space-y-12;

  &__container {
    @apply p-10 rounded-lg shadow-2xl bg-white;
    &--header {
      @apply md:text-4xl text-3xl font-extrabold mb-6 leading-snug text-center;
      color: $primary-dark-blue-color;
      &--internship-program {
        @apply text-2xl font-extrabold text-center;
        color: $primary-dark-blue-color;
      }
    }

    &__stepper {
      @apply mt-10 text-xl font-medium mb-5 space-y-8;
      color: $primary-blue-color;

      &__info {
        color: $primary-dark-blue-color;
        @apply mb-6;
      }

      &__requirements {
        @apply p-10 rounded-lg shadow-2xl bg-gray-50;

        &__text {
          @apply mt-2 text-xl mb-5;
          color: $primary-blue-color;
        }

        &__list {
          color: $primary-dark-blue-color;
          @apply pl-5 space-y-5;
          list-style: none;

          li:before {
            content: "✓";
            display: inline-block;
            margin-right: 8px;
            color: $primary-blue-color;
            font-weight: bold;
          }
        }

        &__note {
          @apply text-red-500 font-bold mt-5;
        }
      }

      &__table {
        @apply text-lg font-medium mt-5;
        color: $primary-dark-blue-color;
        width: 100%;

        &-row {
          @apply border-b border-gray-200;

          &:hover {
            @apply bg-gray-100;
          }
        }
      }

      &__button {
        @apply hover:bg-gray-200 transition-colors duration-500;
      }
    }
  }
}

.guide__link {
  @apply font-semibold underline cursor-pointer hover:text-blue-700;
}

.highlight {
  @apply bg-yellow-200 font-semibold px-2 rounded;
}
span {
  font-weight: bold;
}
tr {
  td {
    padding: 1em !important;
  }
}

:deep .v-stepper-item {
  color: $primary-blue-color;
}
:deep .v-stepper-item--selected {
  color: $primary-dark-blue-color;
  @apply bg-gray-200;
}
:deep .v-stepper-item__avatar {
  background: $primary-blue-color;
}
:deep .fa-edit {
  display: none;
}
</style>
