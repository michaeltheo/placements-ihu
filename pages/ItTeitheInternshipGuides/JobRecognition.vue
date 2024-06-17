<template>
  <div data-aos="zoom-in" class="guide">
    <div class="guide__container">
      <div class="guide__container--header">
        {{ Department.IT_TEITHE }}
      </div>
      <div class="guide__container--header--internship-program">
        Προϋποθέσεις για {{ InternshipProgram.TEITHE_JOB_RECOGNITION }}
      </div>
      <div class="guide__container__stepper">
        <div class="guide__container__stepper__intro">
          Για τους φοιτητές των πρώην τμημάτων ΤΕΙ ο Νόμος
          <button
            class="guide__link"
            @click="
              openFile(
                'https://drive.google.com/file/d/1vIgTKx_5NQD3cPCPlsfJLltvAlwzWqZm/view'
              )
            "
          >
            ΦΕΚ_173_13_11_1984_ΠΔ_483_Διευκολύνσεις σε Εργαζόμενους Φοιτητές
          </button>
          στο Άρθρο 2, παράγραφος 7, σελίδα 2090, υποχρεώνει τις εταιρίες ή τους
          οργανισμούς του δημοσίου τομέα οι οποίοι απασχολούν φοιτητές/-τριες
          (με πλήρες ωράριο και σύμβαση αορίστου χρόνου στον ιδιωτικό τομέα ή με
          ΦΕΚ διορισμού στο δημόσιο) να τοποθετήσουν τον εργαζόμενο/-η
          φοιτητή/-τρια σε θέση σχετική με το αντικείμενο για όσο διάστημα
          απαιτείται, ώστε να αναγνωριστεί η εργασία του/της σαν Πρακτική
          Άσκηση. Η αναγνώριση μπορεί να ξεκινήσει οποτεδήποτε. Μπορείτε να
          καταθέσετε από τώρα τα δικαιολογητικά σας και απαιτούνται τα παρακάτω
          :
        </div>
        <v-stepper
          non-linear
          hide-actions
          edit-icon="fa:fas fa-search"
          :editable="true"
          color="primary-blue-color"
          prev-text="Προηγούμενο"
          next-text="Επόμενο"
          :items="['Βήμα 1', 'Βήμα 2', 'Βήμα 3', 'Βήμα 4']"
        >
          <template v-slot:item.1>
            <div class="guide__container__stepper__info">
              Να καταθέσετε την
              <button
                class="guide__link"
                @click="
                  openFile(
                    'https://docs.google.com/document/d/1Lm4AG7kWu8LUdiTNldcBHVgMvXkU-sBG/edit'
                  )
                "
              >
                Αίτηση Έγκρισης Πρακτικής Άσκησης ΤΜΠ
              </button>
              , εκτυπωμένη και υπογεγραμμένη στη Γραμματεία, η οποία θα σας
              εκδώσει την ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ, την οποία και θα ανεβάσετε
              μέσω της πλατφόρμας.
            </div>
            <div class="guide__container__stepper__requirements">
              <p class="guide__container__stepper__requirements__text">
                Για να εκδώσει η Γραμματεία την ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ σε
                κάποια φοιτήτρια ή φοιτητή θα πρέπει να πληρούνται οι παρακάτω
                προϋποθέσεις:
              </p>
              <ul class="guide__container__stepper__requirements__list">
                <li>
                  Να βρίσκεται σε τυπικό
                  <span>εξάμηνο</span> μεγαλύτερο του Z'.
                </li>
                <li>
                  Να έχει παρακολουθήσει με επιτυχία τα
                  <span>2/3</span> των μαθημάτων του προγράμματος σπουδών.
                </li>
                <li>
                  Να μην οφείλει <span>κανένα</span> μάθημα ειδικότητας, τα
                  οποία είναι για τους υπάρχοντες φοιτητές, οι οποίοι
                  <span>δεν έχουν επιλέξει κατεύθυνση</span>
                  (εισαγωγή πριν το 2013) τα παρακάτω :
                </li>
                <li>
                  Εισαγωγή στα Λειτουργικά Συστήματα ( Θ+Ε ) - (Β' Εξάμηνο)
                </li>
                <li>
                  Δομές Δεδομένων και Ανάλυση Αλγορίθμων ( Θ+Ε ) - ( Γ' Εξάμηνο
                  )
                </li>
                <li>Τεχνολογία Βάσεων Δεδομένων ( Θ+Ε ) - ( Δ' Εξάμηνο )</li>
                <li>
                  Τηλεπικοινωνίες και Δίκτυα Υπολογιστών ( Θ+Ε ) - ( Δ' Εξάμηνο
                  )
                </li>
                <li>Μηχανική Λογισμικού Ι ( Θ+Ε ) - ( Ε' Εξάμηνο )</li>
                <li>
                  Τέσσερα (4) από το σύνολο των Μαθημάτων του Ζ' Εξαμήνου και
                  των Μαθημάτων Επιλογής.
                </li>
              </ul>
              <div class="guide__container__stepper__requirements__text mt-5">
                Eνώ για τους φοιτητές (εισαγωγή από το 2013 και μετά), οι οποίοι
                είναι υποχρεωμένοι να επιλέξουν κατεύθυνση, είναι τα παρακάτω :
              </div>
              <ul class="guide__container__stepper__requirements__list">
                <li>Εισαγωγή στα Λειτουργικά Συστήματα ( Θ+Ε )</li>
                <li>Δομές Δεδομένων και Ανάλυση Αλγορίθμων ( Θ+Ε )</li>
                <li>Τεχνολογία Βάσεων Δεδομένων ( Θ+Ε )</li>
                <li>Μηχανική Λογισμικού Ι ( Θ+Ε )</li>
                <li>
                  Επιλογής υποχρεωτικά Μαθήματα Κατεύθυνσης του ΣΤ' και Ζ'
                  Εξαμήνου τα οποία συμπληρώνουν 24 (από τις 30 υποχρεωτικές)
                  πιστωτικές μονάδες
                </li>
              </ul>
              <ul class="guide__container__stepper__requirements__list mt-10">
                <li>
                  Αν κάνετε πρακτική
                  <span>χωρίς ΕΣΠΑ</span> μπορείτε να οφείλετε
                  <span>το πολύ ένα </span>μάθημα ειδικότητας.
                </li>
                <li>
                  Αν οφείλετε
                  <span>περισσότερα από ένα μάθημα</span>
                  ειδικότητας, θα πρέπει να καταθέσετε μαζί με την Αίτησή σας
                  και τα αντίστοιχα δικαιολογητικά, τα οποία πιστοποιούν ότι
                  έχετε πολύ σοβαρούς λόγους (οικονομικούς, κοινωνικούς, υγείας)
                  να κάνετε πρακτική αυτό το εξάμηνο και δεν μπορείτε να
                  περιμένετε το επόμενο.
                </li>
                <li class="guide__container__stepper__requirements__note">
                  Καταθέτετε δικαιολογητικά όπως Φορολογική Δήλωση, όπου
                  φαίνεται ότι είστε εξαρτώμενο μέλος και το εισόδημα που
                  δηλώνετε είναι μικρό ή αν κάνετε μόνοι σας Φορολογική Δήλωση
                  με μικρό εισόδημα, αν είστε πολύτεκνοι, τρίτεκνοι, από
                  μονογονεϊκή οικογένεια, ορφανοί ή με γονείς με αναπηρία κ.λπ..
                </li>
              </ul>
            </div>
          </template>
          <template v-slot:item.2>
            <div class="guide__container__stepper__requirements">
              <div class="guide__container__stepper__requirements__text">
                Ο φορέας, στον οποίο εργάζεστε και θα κάνετε τυπικά και την
                πρακτική σας θα πρέπει να συμπληρώσει τα παρακάτω έντυπα :
                <ul class="guide__container__stepper__requirements__list mt-10">
                  <li>
                    <button
                      class="guide__link"
                      @click="
                        openFile(
                          'https://docs.google.com/document/d/1HdGJPytAEZkY4GDAkvTaVFi7hjhp7vCh/edit'
                        )
                      "
                    >
                      Βεβαίωση Απασχόλησης Ασκούμενου/ης
                    </button>
                    ( Την συμπληρώνει και την υπογράφει και με σφραγίδα ο Φορέας
                    και περιλαμβάνει τα αντικείμενα με τα οποία θα ασχοληθεί )
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-slot:item.3>
            <div class="guide__container__stepper__requirements">
              <div class="guide__container__stepper__requirements__text">
                <span>
                  Καταθέτετε μέσω της πλατφόρμας τα παρακάτω έντυπα:
                </span>
                <ul class="guide__container__stepper__requirements__list mt-10">
                  <li>
                    <span>ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ</span>, την οποία σας
                    χορήγησε η γραμματεία, αφού καταθέσατε Αίτηση και
                    Πιστοποιητικό Αναλυτικής Βαθμολογίας.
                  </li>
                  <li>
                    <button
                      class="guide__link"
                      @click="
                        openFile(
                          'https://docs.google.com/document/d/1HdGJPytAEZkY4GDAkvTaVFi7hjhp7vCh/edit'
                        )
                      "
                    >
                      Βεβαίωση Απασχόλησης Ασκούμενου/ης
                    </button>
                  </li>
                  <li>
                    <span>ΦΕΚ Διορισμού για τον Δημόσιο τομέα ή</span>
                  </li>
                  <li>
                    <span
                      >Σύμβαση Εργασίας πλήρους απασχόλησης στον ιδιωτικό
                      τομέα</span
                    >,
                  </li>
                </ul>
                <div class="mt-5">
                  Αν η Επιτροπή Πρακτικής Άσκησης κρίνει ότι η θέση απασχόλησης,
                  η οποία περιγράφεται στην
                  <button
                    class="guide__link"
                    @click="
                      openFile(
                        'https://docs.google.com/document/d/1HdGJPytAEZkY4GDAkvTaVFi7hjhp7vCh/edit'
                      )
                    "
                  >
                    ΒΕΒΑΙΩΣΗ ΑΠΑΣΧΟΛΗΣΗΣ ΑΣΚΟΥΜΕΝΟΥ/ΗΣ
                  </button>
                  είναι σχετική με το αντικείμενο και όλα τα υπόλοιπα
                  δικαιολογητικά σας είναι εντάξει, θα συζητηθεί η Αίτησή σας
                  στην επόμενη
                  <span>Γενική Συνέλευση του Τμήματος.</span>
                  Αν <span>εγκριθεί</span>, η Πρακτική σας Άσκηση
                  <span>ξεκινάει τυπικά την Ημερομηνία της έγκρισης</span>.
                </div>
                <div class="guide__container__stepper__requirements__note">
                  Δεν υπογράφετε καμιά Σύμβαση, ισχύει αυτή που έχετε ή το ΦΕΚ
                  διορισμού
                </div>
                <div class="mt-5">
                  Το τμήμα θα ορίσει κάποιον από τους διδάσκοντες ακαδημαϊκό
                  επόπτη (θα ενημερωθείτε γι’ αυτό) στον οποίο απευθύνεστε για
                  οποιοδήποτε πρόβλημα. Η γραμματεία ή το Γραφείο Πρακτικής
                  Άσκησης θα σας δώσει και το ΒΙΒΛΙΑΡΙΟ ΠΤΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ, στο
                  οποίο θα πρέπει κάθε εβδομάδα να γράφετε τις δραστηριότητές
                  σας, τις άδειες απουσίας κ.λ.π..
                </div>
                <div class="mt-5">
                  Περισσότερες πληροφορίες για τη συμπλήρωση του ΒΙΒΛΙΑΡΙΟΥ
                  ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ θα βρείτε στο
                  <button
                    class="guide__link"
                    @click="
                      openFile(
                        'https://praktiki.teithe.gr/wp-content/uploads/2020/08/%CE%9F%CE%B4%CE%B7%CE%B3%CF%8C%CF%82-%CE%92%CE%B9%CE%B2%CE%BB%CE%B9%CE%B1%CF%81%CE%AF%CE%BF%CF%85-%CE%A0%CF%81%CE%B1%CE%BA%CF%84%CE%B9%CE%BA%CE%AE%CF%82-%CE%86%CF%83%CE%BA%CE%B7%CF%83%CE%B7%CF%82-%CE%95%CE%A3%CE%A0%CE%91-2020.pdf'
                      )
                    "
                  >
                    σύνδεσμο
                  </button>
                  .
                </div>
              </div>
            </div>
          </template>
          <template v-slot:item.4>
            <div class="guide__container__stepper__requirements">
              <div class="guide__container__stepper__requirements__text">
                Όταν συμπληρώσετε το εξάμηνο από τη μέρα που άρχισε να μετράει η
                Αναγνώριση, καταθέτετε στο Γραφείο Πρακτικής Άσκησης ή στη
                Γραμματεία τα παρακάτω έντυπα :
                <ul class="guide__container__stepper__requirements__list mt-10">
                  <li>
                    <button
                      class="guide__link"
                      @click="
                        openFile(
                          'https://docs.google.com/document/d/1QPM8xWsgsKS-Apq6hJ31LqwySSJpWap5/edit'
                        )
                      "
                    >
                      Βεβαίωση Ολοκλήρωσης Πρακτικής Άσκησης
                    </button>
                    ( Την συμπληρώνει και την υπογράφει και με σφραγίδα ο Φορέας
                    και περιλαμβάνει τα αντικείμενα με τα οποία θα ασχοληθεί )
                  </li>
                  <li>
                    <button
                      class="guide__link"
                      @click="
                        openFile(
                          'https://docs.google.com/document/d/1Qurvk2DBG6BfpDvBo8pIz3B8lAz5hgjn/edit'
                        )
                      "
                    >
                      Αίτηση Ολοκλήρωσης Πρακτικής Άσκησης
                    </button>
                    ( Την συμπληρώνει και την υπογράφει και με σφραγίδα ο Φορέας
                    και περιλαμβάνει τα αντικείμενα με τα οποία θα ασχοληθεί )
                  </li>
                  <li>Ένσημα</li>
                  <li>Βεβαίωση Ενσήμων</li>
                  <li>Αποδείξεις Πληρωμής για τους 6 μήνες</li>
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

      &__intro {
        @apply mb-10 text-lg leading-relaxed;
        color: $primary-dark-blue-color;
      }

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
      &__button {
        @apply hover:bg-gray-200 transition-colors duration-500;
      }
    }
  }
}

.guide__link {
  @apply font-semibold underline cursor-pointer hover:text-blue-700;
}

span {
  font-weight: bold;
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
:deep .v-icon {
  display: none;
}
</style>
