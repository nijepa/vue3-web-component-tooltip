<template>
  <component
    class="cadooz-tooltip__container"
    :is="isAbbreviation ? 'abbr' : 'span'"
    :class="{ 'is-underlined': isUnderlined || isAbbreviation }"
    :style="{ cursor: isAbbreviation ? 'help' : 'pointer' }"
  >
    <span
      :class="[
        hasPosition,
        hasSize,
        hasShadow,
        {
          'cadooz-tooltip': isActive && labelText,
          'is-sticky': isSticky,
          'has-multiline': isMultiline,
          'is-underlined': isUnderlined || isAbbreviation,
        },
      ]"
    >
      <span class="text" :class="{ 'not-active': !isActive || !labelText }">{{
        labelText
      }}</span>
      <svg
        width="10"
        height="10"
        :class="[
          hasPosition,
          hasShadow,
          { 'not-active': !isActive || !labelText },
        ]"
        class="cadooz-tooltip__arrow"
      >
        <rect width="10" height="10" />
      </svg>
    </span>
    <slot />
  </component>
</template>
<script setup>
import { ref, computed, watch, onMounted, useAttrs } from "vue";

// setting props
const props = defineProps({
  active: {
    type: String,
    default: "true",
  },
  label: {
    type: String,
  },
  sticky: {
    type: Boolean,
  },
  multiline: {
    type: Boolean,
  },
  underlined: {
    type: Boolean,
  },
  abbreviation: {
    type: Boolean,
  },
  position: {
    type: String,
    default: "is-top",
    validator(value) {
      return ["is-top", "is-bottom", "is-left", "is-right"].indexOf(value) > -1;
    },
  },
  size: {
    type: String,
    default: "is-medium",
    validator(value) {
      return ["is-small", "is-medium", "is-large"].indexOf(value) > -1;
    },
  },
  background: {
    type: String,
    default: "#fff",
  },
  color: {
    type: String,
    default: "#000",
  },
  font: {
    type: String,
    default: "'Open Sans', sans-serif",
  },
  fontsize: {
    type: String,
    default: "1em",
  },
  weight: {
    type: Number,
    default: 400,
  },
  radius: {
    type: String,
    default: "4px",
  },
  shadow: {
    type: Boolean,
    default: true,
  },
});

const attrs = useAttrs();
const elem = ref(document.querySelector("#" + attrs.id));

const labelText = ref(props.label || null);
const isActive = ref(props.active === "true");
const isSticky = ref(props.sticky || false);
const isMultiline = ref(props.multiline || false);
const isUnderlined = ref(props.underlined || false);
const isAbbreviation = ref(props.abbreviation || false);
const hasPosition = ref(props.position || "is-top");
const hasSize = ref(props.size || "is-medium");
const background = ref(props.background);
const color = ref(props.color);
const font = ref(props.font);
const fontSize = ref(props.fontsize)
const radius = ref(props.radius);

const height = ref(null);
const width = ref(null);

const hasShadow = computed(() =>
  props.shadow === "false" ? "" : "has-shadow"
);

onMounted(() => {
  height.value = elem.value?.children[0]?.scrollHeight + "px";
  width.value = elem.value?.children[0]?.scrollWidth + "px";
});

watch(
  () => props.active,
  (newValue, oldValue) => {
    console.info(
      "Watch props.active function called with args:",
      newValue,
      oldValue
    );
    isActive.value = newValue === "true";
  }
);
</script>
<style lang="scss">
$tooltip-color: v-bind(color); // color
$tooltip-background: v-bind(background); // background color
$tooltip-radius: v-bind(radius); // border radius
$tooltip-weight: v-bind(weight); // font weight
$speed: 400ms; // animation speed
$small: 100px; // 140
$medium: 200px; // 250
$large: 300px; // 480
$height: v-bind(height);
$width: v-bind(width);

.cadooz-tooltip__container {
  position: relative;
  //display: flex;
  &.is-underlined {
    border-bottom: 1px dotted $tooltip-background;
    line-height: 1.2;
  }
}

.cadooz-tooltip__container:hover .cadooz-tooltip {
  opacity: 1;
  visibility: visible;
  //width: $large;
}
.not-active {
  display: none;
}
.cadooz-tooltip {
  position: absolute;
  color: $tooltip-color;
  text-align: center;
  padding: 1em 0.5em;
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  //width: 0;
  transition: opacity $speed ease-in-out, visibility $speed ease-in-out,
    width $speed ease-in-out;
  z-index: 100;
  background: $tooltip-background;
  border-radius: $tooltip-radius;
  font-family: v-bind(font);
  font-size: v-bind(fontSize);
  font-weight: $tooltip-weight;
  //width: auto;
  max-width: 100vw;
  //white-space: nowrap;
  line-height: 1.3;
  letter-spacing: normal !important;
  text-transform: none;
  /* box-shadow: rgba(0, 0, 0, 0.3) 0 2px 10px; */

  &.has-shadow {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
    filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 7px);
  }

  &.is-small {
    width: $small;
    //white-space: break-spaces;
  }
  &.is-medium {
    width: $medium;
  }
  &.is-large {
    width: $large;
  }
  &.is-top,
  &.is-bottom {
    transform: translate(-50%);
    left: 50%;
  }
  &.is-top {
    bottom: calc(100% + $height - 5px);
  }
  &.is-bottom {
    top: calc(100% + $height - 5px);
  }
  &.is-left,
  &.is-right {
    transform: translateY(50%);
    top: calc(50% + 0px);
  }
  &.is-left {
    right: calc(100% + 10px);
  }
  &.is-right {
    left: calc(100% + $width + 10px);
  }
}

.cadooz-tooltip__arrow {
  position: absolute;
  /* box-shadow: 12px 0 15px -4px rgba(31, 73, 125, 0.8), -12px 0 8px -4px rgba(31, 73, 125, 0.8); */
  rect {
    fill: $tooltip-background;
  }
  &.has-shadow {
    box-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  }
  &.is-right,
  &.is-left {
    top: calc(50% - 5px);
  }
  &.is-right {
    left: calc(0% - 5px);
    transform: rotate(135deg);
  }
  &.is-left {
    left: calc(100% - 5px);
    transform: rotate(-45deg);
  }
  &.is-bottom,
  &.is-top {
    left: calc(50% - 5px);
  }
  &.is-bottom {
    top: calc(0% - 5px);
    transform: rotate(-135deg);
  }
  &.is-top {
    top: calc(100% - 5px);
    transform: rotate(45deg);
  }
}
</style>
