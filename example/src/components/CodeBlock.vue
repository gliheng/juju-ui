<template>
  <div class="code-block j-shadow-1">
    <div class="demo"><slot></slot></div>
    <transition name="j-expand">
      <div v-if="showCode" class="hljs">
        <j-button class="copy-btn" rounded flat icon="copy" @click="copy"/>
        <code ref="codeRef" v-html="html"></code>
      </div>
    </transition>
    <div class="btns">
      <j-button v-if="showCode" class="show-code-btn" flat icon="chevron-up-outline" @click="toggleCode">Hide</j-button>
      <j-button v-else class="show-code-btn" flat icon="code-sharp" @click="toggleCode">Show code</j-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { hooks } from 'juju-ui';
import hljs from 'highlight.js';

// This is from highlightjs-vue, it does not support vite with esm
// I had to copy it here

hljs.registerLanguage("vue", {
  subLanguage: "xml",
  contains: [
    hljs.COMMENT("<!--", "-->", {
      relevance: 10,
    }),
    {
      begin: /^(\s*)(<script>)/gm,
      end: /^(\s*)(<\/script>)/gm,
      subLanguage: "javascript",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(\s*)(<script lang=["']ts["']>)/gm,
      end: /^(\s*)(<\/script>)/gm,
      subLanguage: "typescript",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(\s*)(<style(\sscoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "css",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "scss",
      excludeBegin: true,
      excludeEnd: true,
    },
    {
      begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
      end: /^(\s*)(<\/style>)/gm,
      subLanguage: "stylus",
      excludeBegin: true,
      excludeEnd: true,
    },
  ]
});

// highlightVue(highlightjs);


export default defineComponent({
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'vue',
    },
  },
  setup(props) {
    let html = computed(() => {
      return hljs.highlight(props.code, {language: props.lang}).value;
    });
    let [showCode, toggleCode] = hooks.useSwitch();
    let codeRef = ref(null);

    function copy() {
      let node = codeRef.value;
      copyToClipboard(node.textContent);
    }

    return { html, codeRef, showCode, toggleCode, copy };
  },
});

function copyToClipboard(text) {
  if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    // Prevent scrolling to bottom of page in Microsoft Edge.
    textarea.style.position = "fixed"; 
    document.body.appendChild(textarea);
    textarea.select();
    try {
      // Security exception may be thrown by some browsers.
      return document.execCommand("copy");
    } catch (e) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  } else {
    navigator.clipboard.writeText(text)
  }
}

</script>

<style lang="scss">
@import 'highlight.js/scss/atom-one-dark.scss';
</style>

<style lang="scss" scoped>
.code-block {
  padding: 10px;
  padding-bottom: 0;
}
.hljs {
  margin-top: 10px;
  white-space: pre;
  padding: 10px;
  position: relative;
  .copy-btn {
    color: rgba(255,255,255,0.9);
    position: absolute;
    top: 0px;
    right: 0px;
  }
}
.demo {
  margin-bottom: 10px;
}
.btns {
  display: flex;
  border-top: 1px solid var(--background-color-1);
  .show-code-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>