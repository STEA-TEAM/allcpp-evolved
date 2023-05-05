<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useSettingsStore } from 'stores/settings';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

const { locale } = useI18n();
const { applyDarkMode } = useSettingsStore();
const { language } = storeToRefs(useSettingsStore());

applyDarkMode();
locale.value = language.value;
</script>
