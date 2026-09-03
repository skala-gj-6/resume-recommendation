<script setup>
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'

const props = defineProps({
  modelValue: { type: Array, required: true },
})
const emit = defineEmits(['update:modelValue'])

const PRESETS = [600, 700, 800, 1000]

function update(index, patch) {
  const next = props.modelValue.map((q, i) => (i === index ? { ...q, ...patch } : q))
  emit('update:modelValue', next)
}

function add() {
  emit('update:modelValue', [...props.modelValue, { questionText: '', charLimit: 700 }])
}

function remove(index) {
  emit(
    'update:modelValue',
    props.modelValue.filter((_, i) => i !== index),
  )
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <span class="text-xs text-ink-muted">이 공고에는 등록된 문항이 없어 직접 입력합니다</span>
      <span class="text-xs text-ink-muted">{{ modelValue.length }}개</span>
    </div>

    <div v-for="(q, i) in modelValue" :key="i" class="border border-line rounded-md p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-ink-muted">문항 {{ i + 1 }}</span>
        <button
          v-if="modelValue.length > 1"
          type="button"
          class="border-0 bg-transparent text-xs text-ink-muted cursor-pointer p-0 hover:text-danger"
          @click="remove(i)"
        >
          삭제
        </button>
      </div>
      <Textarea
        :model-value="q.questionText"
        class="w-full mb-3"
        rows="2"
        placeholder="문항을 입력하세요"
        @update:model-value="(v) => update(i, { questionText: v })"
      />
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs text-ink-muted">목표 글자수</span>
        <button
          v-for="preset in PRESETS"
          :key="preset"
          type="button"
          class="px-2 py-1 rounded-md text-xs border cursor-pointer bg-transparent"
          :class="
            q.charLimit === preset ? 'border-accent text-accent' : 'border-line text-ink-muted'
          "
          @click="update(i, { charLimit: preset })"
        >
          {{ preset }}
        </button>
        <InputNumber
          :model-value="q.charLimit"
          class="w-24"
          :min="1"
          :max="5000"
          @update:model-value="(v) => update(i, { charLimit: v })"
        />
        <span class="text-xs text-ink-muted">자</span>
      </div>
    </div>

    <Button label="+ 문항 추가" severity="secondary" size="small" class="self-start" @click="add" />
  </div>
</template>
