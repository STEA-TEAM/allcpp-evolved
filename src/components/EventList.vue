<script lang="ts" setup>
import humanizeDuration from 'humanize-duration';
import { date } from 'quasar';
import { Ref, ref } from 'vue';
import { useApi } from 'boot/axios';
import { EventInfo } from 'src/models/axios';
import { useI18n } from 'vue-i18n';
import langMap from 'src/consts/langMap';

const api = useApi();
const { locale, t } = useI18n();
const i18n = (relativePath) => {
  return t('components.EventList.' + relativePath);
};

const events: Ref<EventInfo[]> = ref([]);

const onLoad = async (index, done) => {
  const { total, list } = await api.getEvents(index, 10);
  console.log(index * 10, total);
  console.log((list[0].enterTime - new Date()) / 1000 / 3600 / 24);
  events.value = events.value.concat(list);
  done(index * 10 >= total);
};
</script>

<template>
  <q-infinite-scroll :offset="150" @load="onLoad">
    <div class="row q-col-gutter-md">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="col-12 col-md-6 col-lg-4 col-xl-3"
      >
        <q-card>
          <q-img :src="event.logoPicUrl" />
          <q-card-section class="justify-between" horizontal>
            <q-card-section>
              <div class="text-h6">
                {{ event.name }}
              </div>
              <div class="text-body-2 text-weight-light">
                {{ event.enterAddress }}
              </div>
              <div class="text-body1">
                {{
                  i18n('labels.period') + event.enterTime.toLocaleDateString()
                }}
                ~
                {{ event.endTime.toLocaleDateString() }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-body-2 text-weight-light">
                {{
                  i18n('labels.start') +
                  humanizeDuration(event.enterTime - new Date(), {
                    language: langMap[locale] ?? locale,
                    largest: 2,
                    units: ['d', 'h', 'm', 's', 'ms'],
                  })
                }}
              </div>
              <div class="text-body-2 text-weight-light">
                {{
                  i18n("labels.lasts") +
                  humanizeDuration(date.addToDate(event.endTime, { days: 1 }) - event.enterTime, {
                    language: langMap[locale] ?? locale,
                    largest: 2,
                    units: ["d", "h", "m", "s", "ms"]
                  })
                }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<style scoped></style>
