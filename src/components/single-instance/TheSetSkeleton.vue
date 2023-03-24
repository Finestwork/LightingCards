<template>
  <div class="row">
    <div class="col-xsm-12 col-sm-6 col-md-4" v-for="n in 6" :key="n">
      <div class="flashcard-loader">
        <span class="loader__title">
          <ContentLoader
            viewBox="0 0 800 100"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="8" ry="8" width="800" height="90" />
          </ContentLoader>
        </span>
        <span class="loader__description">
          <ContentLoader
            viewBox="0 0 800 35"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="8" ry="8" width="800" height="35" />
          </ContentLoader>
        </span>

        <div class="loader__btn-group">
          <span class="loader__play-btn">
            <ContentLoader
              viewBox="0 0 150 35"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="0" y="0" rx="4" ry="4" width="150" height="35" />
            </ContentLoader>
          </span>
          <div class="loader__ghost-btn-wrapper">
            <span class="loader__ghost-btn" v-for="n in 3" :key="n">
              <ContentLoader
                viewBox="0 0 40 40"
                :speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <circle cx="20" cy="20" r="20" />
              </ContentLoader>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  components: {
    ContentLoader
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/text';
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';
@use '../../assets/scss/4-layouts/columns';

// prettier-ignore
.flashcard-loader {
  border-radius: 7px;
  border: 2px solid map.get(text.$main, 50);
  @include margin.bottom((
    xsm: 25
  ));
  @include padding.all-sides((
    xsm: 7
  ));
  .loader {
    &__title {
      display: flex;
      width: 60%;

      svg {
        display: block;
        width: 100%;
      }
    }
    &__description{
      display: flex;
      max-width: 500px;
      width: 90%;
    }
    &__btn-group{
      display: flex;
      justify-content: space-between;
      @include margin.top((
        xsm: 35
      ));
    }
    &__play-btn{
      display: flex;
      width: 100px;
    }
    &__ghost-btn-wrapper{
      display: flex;
    }
    &__ghost-btn{
      display: flex;
      width: 25px;
      @include margin.right((
        xsm: 7
      ));
      &:last-of-type{
        margin-right: 0;
      }
    }
  }
}
</style>
