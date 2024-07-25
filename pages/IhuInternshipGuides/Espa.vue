<template>
  <div data-aos="zoom-in" class="guide">
    <div class="guide__container">
      <div class="guide__container--header">
        {{ Department.IHU_IEE }}
      </div>
      <div class="guide__container--header--internship-program">
        Προϋποθέσεις για {{ InternshipProgram.ESPA }}
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
          :items="[
            // 'Πληροφορίες',
            'Δικαιολογητικά Έναρξης',
            'Δικαιολογητικά Λήξης',
            // 'Πρόσθετες Πληροφορίες',
          ]"
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
                    <td class="font-bold">Βεβαίωση πρακτικής</td>
                    <td>
                      Το συγκεκριμένο δικαιολογητικό θα το προσκομίσετε από τη
                      γραμματεία και έπειτα θα το ανεβάσετε μέσω της πλατφόρμας.
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Αίτηση πρακτικής</td>
                    <td>
                      Την συμπληρώνετε και την ανεβάζετε μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        class="guide__container__stepper__button"
                        variant="plain"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1dcaEGHpsp1CBEdx-a3tJnVIHd6Be4E4z/edit',
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
                      Αίτηση Φορέα για Απασχόληση Φοιτητή
                    </td>
                    <td>
                      Την συμπληρώνετε και την ανεβάζετε μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/11TNWYC1Ot_7rj-2R6rNhqzAs5-bOuxKe/edit',
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
                      Την συμπληρώνετε και την υπογράφετε, και την ανεβάζετε
                      μέσω της πλατφόρμας.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1UVWPuU9_w0fmqd62_TBEu7-QYq-qHJxg/edit?rtpof=true&sd=true',
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
                    <td class="font-bold">Δήλωση Ατομικών Στοιχείων</td>
                    <td>
                      Την συμπληρώνετε και την υπογράφετε, και την ανεβάζετε
                      μέσω της πλατφόρμας
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1UVWPuU9_w0fmqd62_TBEu7-QYq-qHJxg/edit?rtpof=true&sd=true',
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
                    <td class="font-bold">Δήλωση Μοριοδότησης</td>
                    <td>
                      Την συμπληρώνετε και την υπογράφετε, και την ανεβάζετε
                      μέσω της πλατφόρμας
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1UVWPuU9_w0fmqd62_TBEu7-QYq-qHJxg/edit?rtpof=true&sd=true',
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
                      <div>
                        Ο φοιτητής πρέπει να παραλάβει το Βιβλιάριο Πρακτικής
                        Άσκησης από το Γραφείο Πρακτικής Άσκησης στην αίθουσα
                        209 του κτιρίου Πληροφορικής. Ο φοιτητής οφείλει να
                        συμπληρώνει σωστά ΚΑΘΕ εβδομάδα στο Βιβλιάριο Πρακτικής
                        Άσκησης το Έντυπο 1.
                      </div>
                      <div>
                        Στο τέλος της εκπόνησης της πρακτικής άσκησης, πρέπει να
                        δώσει στον εργοδότη το Βιβλιάριο Πρακτικής Άσκησης για
                        να υπογράψει το Έντυπο 1 για κάθε εβδομάδα και να
                        συμπληρώσει το Έντυπο 4. Επίσης, ο φοιτητής πρέπει να
                        συμπληρώσει και την Αυτοξιολόγηση.
                      </div>
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
                    <td class="font-bold">
                      Πρωτότυπο της Βεβαίωσης Ολοκλήρωσης της Πρακτικής Άσκησης
                    </td>
                    <td>
                      <span class="highlight"
                        >Σημείωση, To συγκεριμένο διακιολογιτικό δεν μπορείτε να
                        το ανεβάσετε μέσω της πλατοφρμας πρέπει να παραδώσετε το
                        πρωτότυπο στο Γραφείο Πρακτικής Άσκησης. Ο φοιτητής θα
                        βρει το δικαιολογητικό στο email που έχει λάβει από το
                        γραφείο ΕΣΠΑ.
                      </span>
                    </td>
                  </tr>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">
                      Ερωτηματολόγιο Αξιολόγησης Πρακτικής Άσκησης από τον
                      Επιβλέποντα του φορέα
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
                      μέσω της πλατφόρμας
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1wewFZ4ZMevjOtrZYvXpYa7BzVGzoKy2c/edit',
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
                      <span class="highlight"
                        >Σημείωση, To συγκεριμένο διακιολογιτικό δεν μπορείτε να
                        το ανεβάσετε μέσω της πλατοφρμας πρέπει να παραδώσετε το
                        πρωτότυπο στο Γραφείο Πρακτικής Άσκησης.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </template>
          <template v-slot:item.4>
            <div class="guide__container__stepper__requirements">
              <div class="guide__container__stepper__requirements__text">
                <span>Αποζημίωση Φοιτητών</span>
                <ul class="guide__container__stepper__requirements__list mt-10">
                  <li>
                    Αν η θέση απασχόλησης είναι στο Δημόσιο Τομέα, θα πρέπει να
                    υπάρχει θεσμοθετημένη θέση με ασφάλιση για τον/την
                    ασκούμενο/η φοιτητή/τρια.
                  </li>
                  <li>
                    Η αποζημίωση των φοιτητών από το πρόγραμμα ΕΣΠΑ είναι 280€
                    μηνιαίως.
                  </li>
                  <li>Η συμμετοχή του φορέα απασχόλησης είναι :</li>
                  <li>Δημόσιος Τομέας : Δεν υπάρχει συμμετοχή.</li>
                  <li>Ιδιωτικός τομέας 416,80 € (696,80€ - 280,00€).</li>
                </ul>
              </div>
            </div>
          </template>
        </v-stepper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Department, InternshipProgram } from "@/types";

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
