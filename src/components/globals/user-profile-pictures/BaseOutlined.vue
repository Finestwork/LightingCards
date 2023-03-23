<template>
  <span class="outlined-profile-picture">
    <img :src="src" alt="User's profile" />
  </span>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/main';

.outlined-profile-picture {
  display: flex;
  width: 35px;
  height: 35px;
  position: relative;
  background-color: #0e2430;
  border-radius: 50%;
  &::before {
    content: '';
    width: 127%;
    height: 127%;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid map.get(main.$primary, 500);
  }
  > img {
    width: 100%;
  }
}
</style>
