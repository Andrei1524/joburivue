<template>
  <div class="container my-0 py-2 bg-white min-w-full">
    <div class="navbar p-0 px-10">
      <div class="flex-1">
        <Logo @click="navigateTo('/')" />
      </div>

      <div class="hidden sm:flex space-x-6">
        <AppButton :text="$t('app.buttons.add_job')" />
        <AppButton
          v-if="!isAuthenticated()"
          @click="navigateTo('/login')"
          :text="$t('app.buttons.login_signup')"
        >
        </AppButton>
        <div v-if="isAuthenticated()" class="flex flex-row items-center">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn avatar">
              <span class="item-center pr-3">{{ user.value.name }}</span>
              <div class="w-10 rounded-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li @click="logout()"><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sm-block sm:hidden">
        <label
          @click="isMobileNavOpen = !isMobileNavOpen"
          tabindex="0"
          class="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <div
          v-show="isMobileNavOpen"
          @click="isMobileNavOpen = !isMobileNavOpen"
          class="menu menu-sm dropdown-content !fixed bg-basic-white min-h-full w-full left-0 top-[80px] z-[2] mobile-nav-bg-image"
        >
          <span
            class="py-2 cursor-pointer select-none bg-transparent font-light text-yankees-blue text-4xl text-right mt-4 mix-blend-luminosity backdrop-blur-sm bg-blue-400 mobile-nav-link"
            >{{ $t('app.buttons.add_job') }}</span
          >
          <span
            class="py-2 cursor-pointer select-none bg-transparent font-light text-yankees-blue text-4xl text-right mt-4 mix-blend-luminosity backdrop-blur-sm bg-blue-400 mobile-nav-link"
            @click="navigateTo('/login')"
          >
            {{ $t('app.buttons.login_signup') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, clearAuthStates } = useAuthStore();
const { $api } = useNuxtApp();

const isMobileNavOpen = ref(false);

async function logout() {
  try {
    await $api.AuthService.logout();
    clearAuthStates();
  } catch (error) {}
}
</script>

<style scoped>
.mobile-nav-link {
  color: #ffffff;
  padding-right: 12px;

  border-radius: 4px;
}

.mobile-nav-bg-image {
  background-image: url(https://media3.giphy.com/media/26xBFB9pA6Rjv2s7u/giphy.gif?cid=ecf05e470rhn5y4yvno010svtlc7ugtf06r5zw3o0c2992s4&ep=v1_gifs_search&rid=giphy.gif&ct=g);
  background-position: center;
  background-size: cover;
}
</style>
