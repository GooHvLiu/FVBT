<template>
  <div class="container page">
    <header class="page__header">
      <h1>{{ t('demo.title') }}</h1>
      <p>{{ t('demo.description') }}</p>
    </header>

    <section class="panel">
      <h2>{{ t('demo.basicTitle') }}</h2>
      <div class="row">
        <el-button type="primary">{{ t('demo.buttonPrimary') }}</el-button>
        <el-button>{{ t('demo.buttonDefault') }}</el-button>
        <el-tag type="success">{{ t('demo.tagStable') }}</el-tag>
        <el-tag type="warning">{{ t('demo.tagBeta') }}</el-tag>
      </div>
    </section>

    <section class="panel">
      <h2>{{ t('demo.formTitle') }}</h2>
      <el-form label-position="top" class="demo-form">
        <el-form-item :label="t('demo.formName')">
          <el-input v-model="form.name" :placeholder="t('demo.formNamePlaceholder')" clearable />
        </el-form-item>

        <el-form-item :label="t('demo.formEnabled')">
          <el-switch v-model="form.enabled" />
        </el-form-item>

        <el-form-item :label="t('demo.formDensity')">
          <el-select v-model="form.density" class="demo-form__select">
            <el-option
              v-for="item in densityOptions"
              :key="item.value"
              :label="t(item.labelKey)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </section>

    <section class="panel">
      <h2>{{ t('demo.feedbackTitle') }}</h2>
      <div class="row">
        <el-button @click="handleMessage">{{ t('demo.feedbackAction') }}</el-button>
        <el-button @click="dialogVisible = true">{{ t('demo.dialogAction') }}</el-button>
      </div>

      <el-dialog v-model="dialogVisible" :title="t('demo.dialogTitle')" width="420px">
        <p>{{ t('demo.dialogContent') }}</p>
        <template #footer>
          <el-button type="primary" @click="dialogVisible = false">
            {{ t('demo.dialogConfirm') }}
          </el-button>
        </template>
      </el-dialog>
    </section>

    <section class="panel">
      <div class="panel__head">
        <h2>{{ t('demo.requestTitle') }}</h2>
        <el-tag :type="isMock ? 'success' : 'info'" size="small">
          {{ isMock ? t('demo.requestMockBadge') : t('demo.requestRealBadge') }}
        </el-tag>
      </div>
      <p>{{ t('demo.requestDesc') }}</p>

      <div class="request-result">
        <el-skeleton v-if="loading" :rows="2" animated />

        <el-alert
          v-else-if="errorMessage"
          type="warning"
          :closable="false"
          :title="t('demo.requestEmpty')"
          :description="errorMessage"
          show-icon
        />

        <dl v-else-if="overview" class="stats">
          <div class="stats__item">
            <dt>{{ t('demo.requestPosts') }}</dt>
            <dd>{{ formatNumber(overview.posts, locale) }}</dd>
          </div>
          <div class="stats__item">
            <dt>{{ t('demo.requestTags') }}</dt>
            <dd>{{ formatNumber(overview.tags, locale) }}</dd>
          </div>
          <div class="stats__item">
            <dt>{{ t('demo.requestVisits') }}</dt>
            <dd>{{ formatNumber(overview.visits, locale) }}</dd>
          </div>
          <p class="stats__updated">
            {{ t('demo.requestUpdated', { date: formatDate(overview.updatedAt, locale) }) }}
          </p>
        </dl>
      </div>

      <div class="panel__foot">
        <p class="hint">{{ t('demo.requestHint') }}</p>
        <el-button :disabled="loading" @click="loadOverview">
          <el-icon><Refresh /></el-icon>
          {{ t('common.retry') }}
        </el-button>
      </div>
    </section>

    <section class="panel">
      <h2>{{ t('demo.i18nTitle') }}</h2>
      <p>
        {{
          t('demo.i18nDesc', {
            locale: localeLabel,
            date: sampleDate,
            number: sampleNumber,
          })
        }}
      </p>
    </section>

    <section class="panel">
      <h2>{{ t('demo.themeTitle') }}</h2>
      <p>{{ t('demo.themeDesc', { theme: themeLabel }) }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Refresh } from '@/components/icons'
import { demoService } from '@/api/services/demo'
import type { OverviewData } from '@/api/types'
import { localeMeta } from '@/config/locale'
import { useAppLocale } from '@/composables/useAppLocale'
import { useAppSeo } from '@/composables/useAppSeo'
import { useAppTheme } from '@/composables/useAppTheme'
import { formatDate, formatNumber } from '@/utils/format'
import { showMessage } from '@/utils/feedback'

type Density = 'compact' | 'default' | 'loose'

const { t, locale } = useI18n()
const { locale: routeLocale } = useAppLocale()
const { theme } = useAppTheme()

useAppSeo({ titleKey: 'seo.demoTitle', descriptionKey: 'demo.description' })

const isMock = import.meta.env.VITE_USE_MOCK === 'true'
const dialogVisible = ref(false)
const loading = ref(false)
const overview = ref<OverviewData | null>(null)
const errorMessage = ref('')

const form = reactive({
  name: '',
  enabled: true,
  density: 'default' as Density,
})

const densityOptions: Array<{ value: Density; labelKey: string }> = [
  { value: 'compact', labelKey: 'demo.densityCompact' },
  { value: 'default', labelKey: 'demo.densityDefault' },
  { value: 'loose', labelKey: 'demo.densityLoose' },
]

const localeLabel = computed(() => localeMeta[routeLocale.value].label)
const themeLabel = computed(() =>
  theme.value === 'dark' ? t('demo.themeDark') : t('demo.themeLight'),
)
const sampleDate = computed(() => formatDate(new Date(), locale.value))
const sampleNumber = computed(() => formatNumber(1234.5, locale.value))

async function loadOverview(): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    overview.value = await demoService.getOverview()
  } catch (error) {
    overview.value = null
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

function handleMessage(): void {
  showMessage(t('demo.feedbackMessage'), 'success')
}

onMounted(loadOverview)
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins.scss' as *;

.page {
  padding-block: 64px 80px;
}

.page__header {
  max-width: 720px;

  h1 {
    font-size: var(--fvbt-font-size-3xl);
  }

  p {
    margin-top: 14px;
    font-size: var(--fvbt-font-size-lg);
  }
}

.panel {
  @include card;

  margin-top: 24px;
  padding: 24px;

  h2 {
    font-size: var(--fvbt-font-size-xl);
  }

  > p {
    margin-top: 10px;
    font-size: var(--fvbt-font-size-sm);
  }
}

.panel__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.panel__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.demo-form {
  max-width: 420px;
  margin-top: 16px;
}

.demo-form__select {
  width: 100%;
}

.request-result {
  margin-top: 16px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;

  @include respond-below('sm') {
    grid-template-columns: 1fr;
  }
}

.stats__item {
  padding: 16px;
  border-radius: var(--fvbt-radius-sm);
  background-color: var(--fvbt-color-surface-muted);

  dt {
    color: var(--fvbt-color-text-muted);
    font-size: var(--fvbt-font-size-sm);
  }

  dd {
    margin: 6px 0 0;
    color: var(--fvbt-color-text);
    font-family: var(--fvbt-font-mono);
    font-size: var(--fvbt-font-size-xl);
  }
}

.stats__updated {
  grid-column: 1 / -1;
  color: var(--fvbt-color-text-muted);
  font-size: var(--fvbt-font-size-sm);
}

.hint {
  max-width: 620px;
  color: var(--fvbt-color-text-muted);
  font-size: var(--fvbt-font-size-sm);
}
</style>
