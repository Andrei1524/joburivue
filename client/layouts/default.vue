<template>
  <div>
    <AppNavbar />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="scss">
@import "./design/variables";

body {
  background: $white;
}
</style>
