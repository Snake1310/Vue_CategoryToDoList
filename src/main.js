import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronDown,
    faChevronUp,
    faPencilAlt,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import App from "./App.vue";

library.add(faPlus, faPencilAlt, faTrash, faChevronUp, faChevronDown);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
