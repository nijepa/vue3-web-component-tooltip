<template>
  <component
    :is="isAbbreviation ? 'abbr' : 'span'"
    :data-label="labelText"
    :aria-label="labelText"
    role="tooltip"
    :class="[
      hasPosition,
      hasSize,
      {
        'vue-custom-tooltip': isActive && labelText,
        'is-sticky': isSticky,
        'has-multiline': isMultiline,
        'is-underlined': isUnderlined || isAbbreviation,
      },
    ]"
    :style="[dynamicStyles, { cursor: isAbbreviation ? 'help' : 'pointer' }]"
  >
    <slot name="default"></slot>
  </component>
</template>

<script setup>
import { ref, computed, watch, useAttrs } from "vue";

// setting props
const props = defineProps({
  active: {
    type: Boolean,
    default: true,
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
    default: 'is-top',
    validator(value) {
      return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1
    },
  },
  size: {
    type: String,
    default: 'is-medium',
    validator(value) {
      return ['is-small', 'is-medium', 'is-large'].indexOf(value) > -1
    },
  },
  background: {
    type: String,
    default: '#fff'
  },
  color: {
    type: String,
    default: '#000'
  },
  font: {
    type: String,
    default: "'Open Sans', sans-serif"
  }
});
const labelText = ref(props.label || null)
const isActive = ref(props.active || true)
const isSticky = ref(props.sticky || false)
const isMultiline = ref(props.multiline || false)
const isUnderlined = ref(props.underlined || false)
const isAbbreviation = ref(props.abbreviation || false)
const hasPosition = ref(props.position || 'is-top')
const hasSize = ref(props.size || 'is-medium')
const back = ref(props.background)
const col = ref(props.color)
const font = ref(props.font)
// const dynamicStyles = computed(() => {
//   return {
//     '--vue-custom-tooltip-color':
//       $vueCustomTooltip && $vueCustomTooltip.hasOwnProperty('color')
//         ? $vueCustomTooltip.color
//         : null,
//     '--vue-custom-tooltip-background':
//       $vueCustomTooltip && $vueCustomTooltip.hasOwnProperty('background')
//         ? $vueCustomTooltip.background
//         : null,
//     '--vue-custom-tooltip-border-radius':
//       $vueCustomTooltip && $vueCustomTooltip.hasOwnProperty('borderRadius')
//         ? $vueCustomTooltip.borderRadius
//         : null,
//     '--vue-custom-tooltip-font-weight':
//       $vueCustomTooltip && $vueCustomTooltip.hasOwnProperty('fontWeight')
//         ? $vueCustomTooltip.fontWeight
//         : null,
//   }
// })
</script>
<!-- <script>
export default {
  name: 'VueCustomTooltip',
  props: {
    label: String,
    active: {
      type: Boolean,
      default: true,
    },
    sticky: Boolean, // Always showing
    multiline: Boolean, // Multiple lines
    underlined: Boolean,
    abbreviation: Boolean,
    position: {
      type: String,
      default: 'is-top',
      validator(value) {
        return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1
      },
    },
    size: {
      type: String,
      default: 'is-medium',
      validator(value) {
        return ['is-small', 'is-medium', 'is-large'].indexOf(value) > -1
      },
    },
  },
  mounted() {
    console.log(this.label)
  },
  data() {
    return {
      labelText: this.label || null,
      isActive: this.active || true,
      isSticky: this.sticky || false,
      isMultiline: this.multiline || false,
      isUnderlined: this.underlined || false,
      isAbbreviation: this.abbreviation || false,
      hasPosition: this.position || 'is-top',
      hasSize: this.size || 'is-medium',
    }
  },
  computed: {
    dynamicStyles() {
      return {
        '--vue-custom-tooltip-color':
          this.$vueCustomTooltip && this.$vueCustomTooltip.hasOwnProperty('color')
            ? this.$vueCustomTooltip.color
            : null,
        '--vue-custom-tooltip-background':
          this.$vueCustomTooltip && this.$vueCustomTooltip.hasOwnProperty('background')
            ? this.$vueCustomTooltip.background
            : null,
        '--vue-custom-tooltip-border-radius':
          this.$vueCustomTooltip && this.$vueCustomTooltip.hasOwnProperty('borderRadius')
            ? this.$vueCustomTooltip.borderRadius
            : null,
        '--vue-custom-tooltip-font-weight':
          this.$vueCustomTooltip && this.$vueCustomTooltip.hasOwnProperty('fontWeight')
            ? this.$vueCustomTooltip.fontWeight
            : null,
      }
    },
  },
  watch: {
    label: {
      handler(value) {
        this.labelText = value
      },
      immediate: true,
    },
    active: {
      handler(value) {
        this.isActive = value
      },
      immediate: true,
    },
    sticky: {
      handler(value) {
        this.isSticky = value
      },
      immediate: true,
    },
    multiline: {
      handler(value) {
        this.isMultiline = value
      },
      immediate: true,
    },
    underlined: {
      handler(value) {
        this.isUnderlined = value
      },
      immediate: true,
    },
    abbreviation: {
      handler(value) {
        this.isAbbreviation = value
      },
      immediate: true,
    },
    position: {
      handler(value) {
        this.hasPosition = value
      },
      immediate: true,
    },
    size: {
      handler(value) {
        this.hasSize = value
      },
      immediate: true,
    },
  },
}
</script> -->

<style>
/* Set defaults */
.vue-custom-tooltip {
  --vue-custom-tooltip-color: v-bind(col);
  --vue-custom-tooltip-background: v-bind(back);
  --vue-custom-tooltip-border-radius: 4px;
  --vue-custom-tooltip-font-weight: 400;
}
</style>

<style lang="scss">
// $tooltip-color = var(--vue-custom-tooltip-color, #fff) // default color
// $tooltip-background = var(--vue-custom-tooltip-background, #000) // default background color
// $tooltip-radius = var(--vue-custom-tooltip-border-radius, 100px) // default border radius
// $weight-normal = var(--vue-custom-tooltip-font-weight, 400) // default font weight
// $speed = 86ms
// $easing = ease-out
.vue-custom-tooltip {
	position: relative;
	display: inline-block;
	text-decoration-line: none !important;
	&.is-top {
		&:before {
			border-top: 5px solid #000;
			border-top: 5px solid var(--vue-custom-tooltip-background, #000);
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
			bottom: calc(100% + 2px);
		}
		&.has-multiline {
			&.is-small {
				&:after {
					width: 140px;
				}
			}
			&.is-medium {
				&:after {
					width: 250px;
					padding: 0.6rem 1.25rem 0.65rem;
				}
			}
			&.is-large {
				&:after {
					width: 480px;
					padding: 0.6rem 1rem 0.65rem;
				}
			}
		}
	}
	&.is-right {
		&:before {
			border-top: 5px solid transparent;
			border-right: 5px solid #000;
			border-right: 5px solid var(--vue-custom-tooltip-background, #000);
			border-bottom: 5px solid transparent;
			left: calc(100% + 2px);
		}
		&.has-multiline {
			&.is-small {
				&:after {
					width: 140px;
				}
			}
			&.is-medium {
				&:after {
					width: 250px;
					padding: 0.6rem 1.25rem 0.65rem;
				}
			}
			&.is-large {
				&:after {
					width: 480px;
					padding: 0.6rem 1rem 0.65rem;
				}
			}
		}
	}
	&.is-bottom {
		&:before {
			border-right: 5px solid transparent;
			border-bottom: 5px solid #000;
			border-bottom: 5px solid var(--vue-custom-tooltip-background, #000);
			border-left: 5px solid transparent;
			top: calc(100% + 2px);
		}
		&.has-multiline {
			&.is-small {
				&:after {
					width: 140px;
				}
			}
			&.is-medium {
				&:after {
					width: 250px;
					padding: 0.6rem 1.25rem 0.65rem;
				}
			}
			&.is-large {
				&:after {
					width: 480px;
					padding: 0.6rem 1rem 0.65rem;
				}
			}
		}
	}
	&.is-left {
		&:before {
			border-top: 5px solid transparent;
			border-bottom: 5px solid transparent;
			border-left: 5px solid #000;
			border-left: 5px solid var(--vue-custom-tooltip-background, #000);
			right: calc(100% + 2px);
		}
		&.has-multiline {
			&.is-small {
				&:after {
					width: 140px;
				}
			}
			&.is-medium {
				&:after {
					width: 250px;
					padding: 0.6rem 1.25rem 0.65rem;
				}
			}
			&.is-large {
				&:after {
					width: 480px;
					padding: 0.6rem 1rem 0.65rem;
				}
			}
		}
	}
	&.is-underlined {
		border-bottom: 1px dotted #000;
		border-bottom: 1px dotted var(--vue-custom-tooltip-background, #000);
		line-height: 1.2;
	}
	&:before {
		z-index: 889;
	}
	&:after {
		content: attr(data-label);
		color: #fff;
		color: var(--vue-custom-tooltip-color, #fff);
		background: #000;
		background: var(--vue-custom-tooltip-background, #000);
		width: auto;
		max-width: 100vw;
		padding: 0.35rem 0.75rem 0.45rem;
		border-radius: 100px;
		border-radius: var(--vue-custom-tooltip-border-radius, 100px);
		font-size: 0.85rem !important;
		font-weight: 400;
		font-weight: var(--vue-custom-tooltip-font-weight, 400);
		line-height: 1.3;
		letter-spacing: normal !important;
		text-transform: none;
		box-shadow: 0px 1px 2px 1px rgba(0,1,0,0.2);
		z-index: 888;
		white-space: nowrap;
	}
	&.has-multiline {
		&:after {
			display: block;
			padding: 0.5rem 0.75rem 0.65rem;
			text-align: center;
			line-height: 1.4;
			white-space: pre-wrap;
		}
	}
}
.vue-custom-tooltip.is-top:before,
.vue-custom-tooltip.is-top:after {
	top: auto;
	right: auto;
	bottom: calc(100% + 5px + 2px);
	left: 50%;
	transform: translateX(-50%);
}
.vue-custom-tooltip.is-right:before,
.vue-custom-tooltip.is-right:after {
	top: 50%;
	right: auto;
	bottom: auto;
	left: calc(100% + 5px + 2px);
	transform: translateY(-50%);
}
.vue-custom-tooltip.is-bottom:before,
.vue-custom-tooltip.is-bottom:after {
	top: calc(100% + 5px + 2px);
	right: auto;
	bottom: auto;
	left: 50%;
	transform: translateX(-50%);
}
.vue-custom-tooltip.is-left:before,
.vue-custom-tooltip.is-left:after {
	top: 50%;
	right: calc(100% + 5px + 2px);
	bottom: auto;
	left: auto;
	transform: translateY(-50%);
}
.vue-custom-tooltip:before,
.vue-custom-tooltip:after {
	position: absolute;
	content: '';
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
	transition: opacity 86ms ease-out, visibility 86ms ease-out;
}
.vue-custom-tooltip:after {
  content: attr(data-label);
  font-family: v-bind(font);
}
.vue-custom-tooltip:not([data-label='']):hover:before,
.vue-custom-tooltip:not([data-label='']):hover:after {
	opacity: 1;
	visibility: visible;
}
:disabled {
	.vue-custom-tooltip {
		pointer-events: none;
	}
}
.vue-custom-tooltip:not([data-label='']).is-sticky:before,
.vue-custom-tooltip:not([data-label='']).is-sticky:after {
	opacity: 1;
	visibility: visible;
}
</style>