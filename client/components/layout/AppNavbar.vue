<template>
  <div class="container mx-auto py-2">
    <div class="navbar bg-base-100 p-0 px-10">
      <div class="flex-1">
        <Logo />
      </div>
      <div class="flex-none space-x-6">
        <AppPrimaryButton />

        <div class="flex flex-row items-center">
          <span class="item-center pr-3">Mandrican andrei</span>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
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
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
