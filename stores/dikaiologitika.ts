import { defineStore } from "pinia";
import { InternshipProgram } from "@/types/dikaiologitika";

type State = {
  dikaiologitikaTypes: InternshipProgram;
};

export const useDikaiologitkaStore = defineStore("dikaiologitika", {
  state: (): State => ({
    dikaiologitikaTypes: {},
  }),
  actions: {
    setDikaiologitka(dikaiologitika: InternshipProgram) {
      this.dikaiologitikaTypes = dikaiologitika;
    },
  },
});
