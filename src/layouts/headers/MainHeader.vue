<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'stores/settings';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { toggleDarkMode } = useSettingsStore();
const { darkMode, darkModeColor } = storeToRefs(useSettingsStore());

const i18n = (relativePath) => {
  return t('headers.MainHeader.' + relativePath);
};
</script>

<template>
  <q-header bordered class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat icon="menu" round @click="$emit('click:leftMenu')" />
      <q-toolbar-title>
        <q-avatar>
          <img
            alt="quasar-logo"
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
          />
        </q-avatar>
        {{ i18n('labels.title') }}
      </q-toolbar-title>
      <q-btn
        :color="darkModeColor[0]"
        :icon="
          darkMode === 'auto'
            ? 'hdr_auto'
            : darkMode
            ? 'dark_mode'
            : 'light_mode'
        "
        :text-color="darkModeColor[1]"
        dense
        round
        unelevated
        @click="toggleDarkMode"
      />
    </q-toolbar>
    <q-tabs align="left">
      <q-route-tab :label="i18n('labels.routes.home')" to="/home" />
      <q-route-tab :label="i18n('labels.routes.event')" to="/event" />
      <q-route-tab :label="i18n('labels.routes.discovery')" to="/discovery" />
    </q-tabs>
  </q-header>
</template>

<style scoped></style>
