<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSettingsStore } from 'stores/settings';

const { toggleDarkMode } = useSettingsStore();
const { darkMode, darkModeColor } = storeToRefs(useSettingsStore());
</script>

<template>
  <q-header bordered class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="$emit('click:leftMenu')" />
      <q-toolbar-title>
        <q-avatar>
          <img
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            alt="quasar-logo"
          />
        </q-avatar>
        Title
      </q-toolbar-title>
      <q-btn
        :color="darkModeColor[0]"
        dense
        :icon="
          darkMode === 'auto'
            ? 'hdr_auto'
            : darkMode
            ? 'dark_mode'
            : 'light_mode'
        "
        round
        :text-color="darkModeColor[1]"
        unelevated
        @click="toggleDarkMode"
      />
    </q-toolbar>
    <q-tabs align="left">
      <q-route-tab to="/page1" label="Page One" />
      <q-route-tab to="/page2" label="Page Two" />
      <q-route-tab to="/page3" label="Page Three" />
    </q-tabs>
  </q-header>
</template>

<style scoped></style>
