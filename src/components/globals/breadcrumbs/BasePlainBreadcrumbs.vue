<template>
  <div class="plain-breadcrumbs">
    <span
      class="breadcrumb__link-wrapper"
      v-for="(link, ind) in formattedLinks"
      :key="link"
    >
      <router-link
        class="breadcrumb__link"
        :to="link.to"
        :tabindex="link.isActive ? -1 : null"
      >
        {{ link.text }}
      </router-link>
      <span class="breadcrumb__icon" v-if="ind !== links.length - 1">
        <AngleRightIcon />
      </span>
    </span>
  </div>
</template>

<script>
import AngleRightIcon from '@/components/icons/AngleRightIcon.vue';
export default {
  components: {
    AngleRightIcon
  },
  props: {
    /**
     * @desc: An array of objects
     * @example: [{text: String, to: {}}, {}, {}]
     * @text: Text of the link that will be displayed on screen
     * @to: Same with 'to' options of <router-link :to={...}>
     */
    links: {
      type: Array,
      required: true
    }
  },
  computed: {
    formattedLinks() {
      return this.links.map((link) => {
        const IS_ACTIVE = link.to.name === this.$route.name;
        return Object.assign(link, { isActive: IS_ACTIVE });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.plain-breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  .breadcrumb {
    &__link-wrapper {
      display: flex;
      align-items: center;
    }
    &__link {
      font-weight: 700;
      outline: none;
      border-radius: 4px;
      transition: box-shadow-transition.$transition-easeInOutQuad;
      color: map.get(main.$secondary, 500);
      &:focus,
      &:hover {
        color: map.get(main.$primary, 500);
      }
      &:focus {
        @include box-shadow-primary.lightness(light, md);
      }

      // If link is on current page
      &.router-link-active.router-link-exact-active {
        cursor: text;
        text-decoration: none;
        color: map.get(text.$main, 700);
        &:focus {
          box-shadow: none;
        }
      }
    }
    &__icon {
      display: flex;
      width: 10px;
      margin-left: pixels.toRem(7);
      margin-right: pixels.toRem(7);
      :deep(svg) {
        display: block;
        width: 100%;
        height: 100%;
        path {
          fill: map.get(text.$main, 700);
        }
      }
    }
  }
}
</style>
