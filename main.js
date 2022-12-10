import { defineCustomElement } from 'vue';
import Tooltip from './components/Custom-Tooltip.ce.vue';
const CustomTooltip = defineCustomElement(Tooltip);
customElements.define('custom-tooltip', CustomTooltip);