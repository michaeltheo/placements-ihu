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
        <div>
          Για τους φοιτητές των πρώην τμημάτων ΤΕΙ ο Νόμος
          ΦΕΚ_173_13_11_1984_ΠΔ_483_Διευκολύνσεις σε Εργαζόμενους Φοιτητές στο
          Άρθρο 2, παράγραφος 7, σελίδα 2090, υποχρεώνει τις εταιρίες ή τους
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
          color="primary-blue-color"
          prev-text="Προηγούμενο"
          next-text="Επόμενο"
          :items="['Βήμα 1', 'Βήμα 2', 'Βήμα 3', 'Βήμα 4']"
        >
          <template v-slot:item.1>
            <div class="guide__container__stepper__info">
              Να καταθέσετε την
              <a
                :href="`https://docs.google.com/document/d/1Lm4AG7kWu8LUdiTNldcBHVgMvXkU-sBG/edit`"
                target="_blank"
                class="guide__link"
              >
                Αίτηση Έγκρισης Πρακτικής Άσκησης ΤΜΠ</a
              >, εκτυπωμένη και υπογεγραμμένη στη Γραμματεία, η οποία θα σας
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
                  <span class="font-semibold">εξάμηνο</span> μεγαλύτερο του Z'.
                </li>
                <li>
                  Να έχει παρακολουθήσει με επιτυχία τα
                  <span class="font-semibold">2/3</span> των μαθημάτων του
                  προγράμματος σπουδών.
                </li>
                <li>
                  Να μην οφείλει <span class="font-bold">κανένα</span> μάθημα
                  ειδικότητας, τα οποία είναι για τους υπάρχοντες φοιτητές, οι
                  οποίοι
                  <span class="font-bold">δεν έχουν επιλέξει κατεύθυνση</span>
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
                  <span class="font-bold">χωρίς ΕΣΠΑ</span> μπορείτε να οφείλετε
                  <span class="font-bold">το πολύ ένα </span>μάθημα ειδικότητας.
                </li>
                <li>
                  Αν οφείλετε
                  <span class="font-bold">περισσότερα από ένα μάθημα</span>
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
              <p
                class="guide__container__stepper__requirements__text font-bold"
              >
                Η ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ σας επιτρέπει γενικά να κάνετε
                πρακτική άσκηση. Αν θα κάνετε και σε ποιον φορέα, εξαρτάται απ’
                τα επόμενα βήματα :
              </p>
              <p class="guide__container__stepper__requirements__text">
                Ο φορέας, στον οποίο θα κάνετε την πρακτική σας θα πρέπει να
                συμπληρώσει τα παρακάτω έντυπα :
              </p>
              <v-table class="guide__container__stepper__table">
                <tbody>
                  <tr class="guide__container__stepper__table-row">
                    <td class="font-bold">Αίτηση Φορέα Απασχόλησης</td>
                    <td>
                      Τη συμπληρώνει και την υπογράφει και με σφραγίδα ο Φορέας
                      και περιγράφει το είδος της απασχόλησης
                    </td>
                    <td>
                      <v-btn
                        class="guide__container__stepper__button"
                        variant="plain"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1dcaEGHpsp1CBEdx-a3tJnVIHd6Be4E4z/edit'
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
                      Βεβαίωση Απασχόλησης και Ασφάλισης Ασκούμενου/ης
                    </td>
                    <td>
                      Την συμπληρώνει και την υπογράφει και με σφραγίδα ο Φορέας
                      και περιλαμβάνει τον τρόπο εργασίας και την ασφάλιση
                      έναντι κινδύνου.
                    </td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1yESgnr-qrwrRY0yOwd4wUjX-2iZ-zxud/edit'
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
                    <td class="font-bold">Δήλωση Προσωπικών Δεδομένων</td>
                    <td>Την συμπληρώνετε και την υπογράφετε.</td>
                    <td>
                      <v-btn
                        variant="plain"
                        class="guide__container__stepper__button"
                        @click="
                          openFile(
                            'https://docs.google.com/document/d/1UVWPuU9_w0fmqd62_TBEu7-QYq-qHJxg/edit?rtpof=true&sd=true'
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
                </tbody>
              </v-table>
            </div>
          </template>
          <template v-slot:item.3>
            <div class="guide__container__stepper__requirements">
              <p
                class="guide__container__stepper__requirements__text font-bold"
              >
                Ανεβάζετε Ηλεκτρονικά τα παρακάτω έντυπα :
              </p>
              <ul class="guide__container__stepper__requirements__list mt-10">
                <li>
                  <span class="font-bold">ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ</span>, την
                  οποία σας χορήγησε η γραμματεία, αφού καταθέσατε Αίτηση και
                  Πιστοποιητικό Αναλυτικής Βαθμολογίας.
                </li>
                <li>
                  <span class="font-bold">ΑΙΤΗΣΗ ΦΟΡΕΑ ΑΠΑΣΧΟΛΗΣΗΣ.</span>
                </li>
                <li>
                  <span class="font-bold"
                    >ΒΕΒΑΙΩΣΗ ΑΠΑΣΧΟΛΗΣΗΣ & ΑΣΦΑΛΙΣΗΣ ΑΣΚΟΥΜΕΝΟΥ/ΗΣ.</span
                  >
                </li>
                <li>
                  <span class="font-bold">ΔΗΛΩΣΗ ΠΡΟΣΩΠΙΚΩΝ ΔΕΔΟΜΕΝΩΝ</span>
                </li>
              </ul>
              <div class="guide__container__stepper__requirements__text mt-10">
                Αν η Επιτροπή Πρακτικής Άσκησης κρίνει ότι η θέση απασχόλησης, η
                οποία περιγράφεται στην
                <a
                  :href="`https://docs.google.com/document/d/1dcaEGHpsp1CBEdx-a3tJnVIHd6Be4E4z/edit`"
                  target="_blank"
                  class="guide__link"
                >
                  Αίτηση Φορέα Απασχόλησης</a
                >, είναι
                <span class="font-semibold">σχετική με το αντικείμενο</span> και
                όλα τα υπόλοιπα
                <span class="font-semibold">δικαιολογητικά</span> σας είναι<span
                  class="font-semibold"
                  >εντάξει</span
                >
                , θα σας δώσουμε να συμπληρώσετε την
                <span class="font-extrabold">ΕΙΔΙΚΗ ΣΥΜΒΑΣΗ ΕΡΓΑΣΙΑΣ</span>, την
                οποία θα πρέπει να υπογράψετε (εσείς και ο νόμιμος εκπρόσωπος
                του φορέα) σε 3 αντίγραφα, να τη δώσετε στη Γραμματεία για να
                την υπογράψουμε και εμείς και θα πάρετε τα 2 αντίγραφα, ένα για
                σας και ένα για τον εργοδότη.
              </div>
              <div class="text-red-500 mt-4">
                Προσοχή, χωρίς την<span class="font-semibold"
                  >ΒΕΒΑΙΩΣΗ ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ</span
                >
                , και την
                <span class="font-semibold">ΕΙΔΙΚΗ ΣΥΜΒΑΣΗ ΕΡΓΑΣΙΑΣ</span> ο
                εργοδότης ΔΕΝ ΜΠΟΡΕΙ να πάρει την αποζημίωση απ’ τον ΟΑΕΔ.
              </div>
              <div class="guide__container__stepper__requirements__text mt-5">
                Το τμήμα θα ορίσει κάποιον από τους διδάσκοντες ακαδημαϊκό
                επόπτη (θα ενημερωθείτε γι’ αυτό) στον οποίο απευθύνεστε για
                οποιοδήποτε πρόβλημα.
              </div>
              <div class="guide__container__stepper__requirements__text">
                Η γραμματεία θα σας δώσει τα 2 αντίγραφα της Σύμβασης και το
                Γραφείο Πρακτικής Άσκησης θα σας δώσει και το ΒΙΒΛΙΑΡΙΟ
                ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ, στο οποίο θα πρέπει κάθε εβδομάδα να γράφετε
                τις δραστηριότητές σας, τις άδειες απουσίας κ.λ.π..
              </div>
              <div class="guide__container__stepper__requirements__text">
                ́Έχετε δικαίωμα να απουσιάσετε από την εργασία σας 5 εργάσιμες
                ημέρες για όλο το εξάμηνο.
              </div>
              <div class="guide__container__stepper__requirements__text">
                Αν θέλετε να απουσιάσετε και κάποιο χρονικό διάστημα στην
                εξεταστική, σε συνεννόηση με τον εργοδότη μπορείτε να καλύψετε
                κάποια άλλη μέρα ή ώρα το χρονικό διάστημα που πρέπει να
                απουσιάσετε.
              </div>
              <div class="guide__container__stepper__requirements__text">
                Περισσότερες πληροφορίες για τη συμπλήρωση του ΒΙΒΛΙΑΡΙΟΥ
                ΠΡΑΚΤΙΚΗΣ ΑΣΚΗΣΗΣ θα βρείτε στο
                <a
                  :href="`https://praktiki.teithe.gr/wp-content/uploads/2020/08/%CE%9F%CE%B4%CE%B7%CE%B3%CF%8C%CF%82-%CE%92%CE%B9%CE%B2%CE%BB%CE%B9%CE%B1%CF%81%CE%AF%CE%BF%CF%85-%CE%A0%CF%81%CE%B1%CE%BA%CF%84%CE%B9%CE%BA%CE%AE%CF%82-%CE%86%CF%83%CE%BA%CE%B7%CF%83%CE%B7%CF%82-%CE%95%CE%A3%CE%A0%CE%91-2020.pdf`"
                  target="_blank"
                  class="guide__link"
                  >σύνδεσμο</a
                >.
              </div>
              <div class="guide__container__stepper__requirements__text">
                <p
                  class="guide__container__stepper__requirements__text font-bold"
                >
                  Αποζημίωση Φοιτητών
                </p>
                Αν η θέση απασχόλησης είναι στο Δημόσιο Τομέα, θα πρέπει να
                υπάρχει θεσμοθετημένη θέση με αμοιβή (176,08€) και ασφάλιση για
                τον/την ασκούμενο/η φοιτητή/τρια. Η αποζημίωση των φοιτητών
                είναι :
                <ul class="guide__container__stepper__requirements__list mt-10">
                  <li>Δημόσιος τομέας 176,08 € το μήνα.</li>
                  <li>Ιδιωτικός τομέας 696,80 € το μήνα.</li>
                </ul>
              </div>
              <div class="guide__container__stepper__requirements__text">
                Διαβάστε το
                <a
                  :href="`https://drive.google.com/file/d/1jue01sLPrR0e6JRQj7tGZIiN_NoF41Xt/view`"
                  target="_blank"
                  class="guide__link"
                >
                  Ενημερωτικό Έντυπο ΠΡΑΚΤΙΚΗ ΧΩΡΙΣ ΕΣΠΑ </a
                >για περισσότερες πληροφορίες.
              </div>
              <div class="guide__container__stepper__requirements__text">
                Σύμφωνα με το
                <a
                  :href="`https://people.iee.ihu.gr/~gouliana/Praktikh/fek%202639_28.6.19_ergani.pdf`"
                  target="_blank"
                  class="guide__link"
                  >ΦΕΚ 2639/28-06-2019 </a
                >, ο φορέας απασχόλησης είναι υποχρεωμένος να αναγγείλει στο
                ΕΡΓΑΝΗ την έναρξη πρακτικής άσκησης του ασκούμενου φοιτητή μέσω
                των Εντύπων Ε 3.5 ΟΑΕΔ και Ε 4 στην Επιθεώρηση Εργασίας
                (Σ.Ε.Π.Ε.).
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
:deep .v-stepper-item {
  color: $primary-blue-color;
}
:deep .v-stepper-item__avatar,
.v-stepper-item--selected {
  background-color: $primary-blue-color;
}
</style>
