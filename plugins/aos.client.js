import AOS from "aos";
import "aos/dist/aos.css";

export default function (nuxt) {
  nuxt.hook("app:mounted", () => {
    AOS.init({
      once: false,
      mirror: false,
    });
  });
}
