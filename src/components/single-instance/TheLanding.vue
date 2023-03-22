<template>
  <section class="landing">
    <BasePatternBackground />
    <div class="container--sm">
      <nav class="landing__nav">
        <BasePlayfulLink class="nav__signup-link" :to="{ name: 'Signup' }">
          <template #text>Signup</template>
        </BasePlayfulLink>

        <BasePlayfulLink class="nav__login-link" :to="{ name: 'Login' }">
          <template #text>Login</template>
        </BasePlayfulLink>
      </nav>
      <div class="landing__main-content-outer">
        <div class="landing__main-content-inner">
          <span class="main-content__logo">
            <span class="logo__bg"></span>
            <img
              src="/assets/images/logos/logo-large.svg"
              alt="LightningCard's Logo"
            />
          </span>
          <div class="main-content__tagline">
            <h2 class="tagline__title">Flashcard Learning Made Easy</h2>
            <h3 class="tagline__sub-title">
              Master Any Topic with Our User-Friendly Flashcard App
            </h3>
            <BasePlayfulLink
              class="tagline__get-started-link"
              :to="{ name: 'CardCreationTest' }"
            >
              <template #text>Try it now</template>
            </BasePlayfulLink>
          </div>
        </div>
      </div>
    </div>
    <span class="landing__bottom-gradient"></span>
  </section>
</template>

<script>
import BasePatternBackground from '@/components/globals/backgrounds/BasePatternBackground.vue';
import BasePlayfulLink from '@/components/globals/links/BasePlayfulLink.vue';

export default {
  components: {
    BasePatternBackground,
    BasePlayfulLink
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/1-settings/css-properties/colors/text';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';
@use '../../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../../assets/scss/2-tools/mixins/css-properties/all-properties';
@use '../../assets/scss/4-layouts/containers';

// prettier-ignore
.landing {
  min-height: 100vh;
  position: relative;

  .container--sm {
    width: 90%;
  }

  &__main-content {
    &-outer {
      @include margin.top((
          xsm: 50
      ));
      @include all-properties.init((
          xsm: (
              height: 75vh,
              display: flex,
              justify-content: center,
              align-items: center
          ),
      ));
    }

    &-inner {
      @include all-properties.init((
          xsm: (
              display: flex,
              justify-content: center,
              flex-direction: column
          ),
          lg: (
              flex-direction: row
          )
      ));

      .main-content {
        &__logo {
          flex-shrink: 0;
          position: relative;
          z-index: 10;
          display: flex;
          @include width-and-height.set((
              xsm: (width: 60px),
              lg: (width: 150px)
          ));
          @include margin.right((
              lg: 150
          ));

          .logo__bg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(150px);
            width: 150%;
            aspect-ratio: 1;
            border-radius: 50%;
            z-index: -1;
            background-color: rgba(map.get(main.$primary, 600), 0.8);
          }

          > img {
            width: 100%;
          }
        }

        &__tagline {
          .tagline {
            &__title {
              font-weight: 800;
              color: transparent;
              background: linear-gradient(to right, map.get(main.$primary, 600), map.get(main.$primary, 900));
              background-clip: text;
              @include font-size.responsive((
                  xsm: map.get(major-second.$scale, 5),
                  430: map.get(major-second.$scale, 6),
                  lg: map.get(major-second.$scale, 7),
              ));
              @include margin.top((
                  xsm: 15,
                  430: 25
              ));
            }

            &__sub-title {
              font-weight: 800;
              color: map.get(text.$main, 400);
              @include margin.top((
                  xsm: 5
              ));
              @include font-size.responsive((
                  xsm: map.get(major-second.$scale, 3),
                  430: map.get(major-second.$scale, 4),
              ));
            }

            &__get-started-link {
              text-transform: capitalize;
              @include margin.top((
                  xsm: 15,
                  lg: 45,
              ));
              @include width-and-height.set((
                  xsm: (maxWidth: 100px),
                  lg: (maxWidth: 150px),
              ));
              @include font-size.responsive((
                  xsm: map.get(major-second.$scale, 3),
                  lg: map.get(major-second.$scale, 5),
              ));
            }
          }
        }
      }
    }
  }

  &__bottom-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(255, 255, 255, 7), rgba(255, 255, 255, 0))
  }

  &__nav {
    display: flex;
    justify-content: flex-end;
    @include padding.top((
        xsm: 25
    ));

    .nav__signup-link {
      background-color: map.get(main.$primary, 100);
      color: map.get(main.$primary, 600);
      @include margin.right((
          xsm: 15
      ));

      &:hover {
        background-color: darken(map.get(main.$primary, 100), 3%);
      }
    }

    .nav__signup-link,
    .nav__login-link{
      @include font-size.responsive((
          xsm: map.get(major-second.$scale, 2),
          lg: map.get(major-second.$scale, 3),
      ));
    }
  }
}
</style>
