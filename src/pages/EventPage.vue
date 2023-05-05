<template>
  <q-page class="row flex flex-block">
    <q-scroll-area :thumb-style="thumbStyle" class="col-grow">
      <event-list class="q-ma-md" />
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts" setup>
import { colors } from 'quasar';

import EventList from 'components/EventList.vue';

const { getPaletteColor } = colors;

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: getPaletteColor('primary'),
  width: '5px',
  opacity: '0.75',
};
</script>
