<template>
  <transition name="wobble" appear mode="in-out">
    <div
      ref="tooltip"
      v-if="isActive"
      :class="[
        hasPosition,
        hasSize,
        hasShadow,
        {
          'cadooz-tooltip': isActive && labelText,
        },
      ]"
    >
      <span class="text">{{ labelText }}</span>
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
    </div>
  </transition>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, useAttrs } from "vue";
// setting props
const props = defineProps({
  active: {
    type: String,
    default: "false",
  },
  label: {
    type: String,
    default: "tooltip",
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
    default: "#000",
  },
  color: {
    type: String,
    default: "#fff",
  },
  font: {
    type: String,
    default: "'Open Sans', sans-serif",
  },
  fontsize: {
    type: String,
    default: "1em",
  },
  fontweight: {
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

const labelText = ref(props.label || null);
const isActive = ref(props.active === "true");
const hasPosition = ref(props.position || "is-top");
const hasSize = ref(props.size || "is-medium");
const hasBackground = ref(props.background);
const hasColor = ref(props.color);
const hasFont = ref(props.font);
const hasFontSize = ref(props.fontsize);
const hasFontWeight = ref(props.fontweight);
const hasRadius = ref(props.radius);
const top = ref(0);
const left = ref(0);
const clientWidth = ref(0);
const clientHeight = ref(0);
const tooltip = ref(null);

const hasShadow = computed(() =>
  props.shadow === "false" ? "" : "has-shadow"
);
const getText = (e) => {
  labelText.value = e.getAttribute("data-label") || props.label;
}

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
  };
};
const getWidth = () => {
  return hasSize.value === "is-medium"
    ? 200
    : hasSize.value === "is-small"
    ? 100
    : 300;
};
const getHeight = () => {
  clientHeight.value = tooltip.value?.offsetHeight + 10;
};
const getWeight = (e) => {
  clientWidth.value = getOffset(e).right - getOffset(e).left;
}

const getPosition = {
  "is-top": (e) => {
    top.value = `${getOffset(e).top - clientHeight.value}px`;
    left.value = `${
      getOffset(e).left + clientWidth.value / 2 - getWidth() / 2 - 10
    }px`;
  },
  "is-bottom": (e) => {
    top.value = `${getOffset(e).bottom + 10}px`;
    left.value = `${
      getOffset(e).left + clientWidth.value / 2 - getWidth() / 2 - 10
    }px`;
  },
  "is-left": (e) => {
    top.value = `${
      getOffset(e).top + (getOffset(e).bottom - getOffset(e).top) / 2 - 20
    }px`;
    left.value = `${getOffset(e).left - getWidth() - 25}px`;
  },
  "is-right": (e) => {
    top.value = `${
      getOffset(e).top + (getOffset(e).bottom - getOffset(e).top) / 2 - 20
    }px`;
    left.value = `${
      getOffset(e).left + (getOffset(e).right - getOffset(e).left) + 10
    }px`;
  },
};

const show = (e) => {
  isActive.value = true;
  nextTick(() => {
    getText(e)
    getHeight();
    getWeight(e);
    getPosition[hasPosition.value](e);
  });
};
const hide = () => {
  isActive.value = false;
};

onMounted(() => {
  let tooltips = document.querySelectorAll("[cadooz-tooltip]");
  tooltips.forEach((c) => {
    c.addEventListener("mouseover", function () {
      show(c);
    });
    c.addEventListener("mouseleave", function () {
      hide(c);
    });
  });
});
</script>
<style lang="scss">
$tooltip-color: v-bind(hasColor); // color
$tooltip-background: v-bind(hasBackground); // background color
$tooltip-radius: v-bind(hasRadius); // border radius
$tooltip-weight: v-bind(hasFontWeight); // font weight
$speed: 400ms; // animation speed
$small: 100px; // 140
$medium: 200px; // 250
$large: 300px; // 480
.cadooz-tooltip {
  position: fixed;
  z-index: 100;
  padding: 0.75em 0.5em;
  pointer-events: none;
  background: $tooltip-background;
  border-radius: $tooltip-radius;
  color: $tooltip-color;
  text-align: center;
  line-height: 1.3;
  letter-spacing: normal;
  text-transform: none;
  font-family: v-bind(hasFont);
  font-size: v-bind(hasFontSize);
  font-weight: $tooltip-weight;
  //transition: opacity $speed ease-in-out, visibility $speed ease-in-out;
  top: v-bind(top);
  left: v-bind(left);
  &.has-shadow {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
    filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 7px);
  }
  &.is-small {
    width: $small;
  }
  &.is-medium {
    width: $medium;
  }
  &.is-large {
    width: $large;
  }
}
.cadooz-tooltip__arrow {
  position: absolute;
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
.wobble-enter-active {
  animation: wobbles $speed ease;
}
.wobble-leave-active {
  animation: wobbles $speed reverse;
}
@keyframes wobbles {
  0% {
    transform: translateY(75px) scale(0.6, 0.2) skew(30deg, 20deg);
    opacity: 0;
  }
  100% {
    transform: translateY(0px) scale(1, 1) skew(0deg, 0deg);
    opacity: 1;
  }
}
</style>
