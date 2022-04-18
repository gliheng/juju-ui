import { onMounted, onUnmounted } from 'vue';

export function useScrollLock() {
  onMounted(() => {
    lock();
  });
  onUnmounted(() => {
    release();
  });
}

export function lock() {
  document.body.style.overflow = 'hidden';
}

export function release() {
  document.body.style.overflow = '';
}
