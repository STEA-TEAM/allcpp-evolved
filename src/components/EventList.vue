<script lang="ts" setup>
import humanizeDuration from 'humanize-duration';
import { date } from 'quasar';
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useApi } from 'boot/axios';

import langMap from 'src/constants/langMap';
import { Event } from 'src/models/axios';

const api = useApi();
const { locale, t } = useI18n();

const colors = ['grey', 'green', 'blue', 'orange', 'purple', 'red'];
const events: Ref<Event[]> = ref([]);
const i18n = (relativePath) => {
  return t('components.EventList.' + relativePath);
};
const onLoad = async (index, done) => {
  const { total, list } = await api.getEvents(index, 10);
  events.value = events.value.concat(list);
  done(index * 10 >= total);
};
</script>

<template>
  <q-infinite-scroll @load="onLoad">
    <div class="row q-col-gutter-md">
      <div
        v-for="(event, eventIndex) in events"
        :key="eventIndex"
        class="col-12 col-md-6 col-lg-4 col-xl-3"
      >
        <q-card>
          <q-img
            v-ripple
            v-viewer
            :src="event.logoPicUrl"
            class="cursor-pointer"
          />
          <q-card-section
            v-ripple
            class="cursor-pointer justify-between"
            horizontal
          >
            <q-card-section>
              <div class="row items-center q-gutter-x-md">
                <q-badge :color="colors[event.typeId]">
                  {{ event.type }}
                </q-badge>
                <div class="row items-center q-gutter-x-xs">
                  <div class="text-primary">
                    {{ event.doujinshiNum }}
                  </div>
                  <div>
                    {{ i18n('labels.doujinshi') }}
                  </div>
                  <q-separator vertical />
                  <div class="text-primary">
                    {{ event.clubNum }}
                  </div>
                  <div>
                    {{ i18n('labels.club') }}
                  </div>
                </div>
              </div>
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
            <q-card-section class="q-gutter-y-sm">
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
                  i18n('labels.lasts') +
                  humanizeDuration(
                    date.addToDate(event.endTime, { days: 1 }) -
                      event.enterTime,
                    {
                      language: langMap[locale] ?? locale,
                      largest: 2,
                      units: ['d', 'h', 'm', 's', 'ms'],
                    }
                  )
                }}
              </div>
              <q-btn
                :label="i18n('labels.info')"
                color="primary"
                icon="info"
                no-caps
                outline
                rounded
                @click.prevent.stop
              />
            </q-card-section>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row">
              <q-chip
                v-for="(tagName, tagIndex) in event.tag"
                :key="tagIndex"
                :label="tagName"
                class="non-selectable cursor-pointer"
                @click.prevent.stop
              />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row justify-around">
            <q-btn
              :label="i18n('labels.wannaGo')"
              color="red"
              flat
              icon="favorite_border"
              no-caps
              rounded
            />
            <q-btn color="primary" flat icon="share" round />
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
