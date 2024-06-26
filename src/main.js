import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";

import { loader } from "@guolao/vue-monaco-editor";
import * as monaco from "monaco-editor";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import IDEScreen from "./screens/IDEScreen.vue";
import VCDromScreen from "./screens/VCDromScreen.vue";

const routes = [
  {
    path: "/",
    component: IDEScreen,
  },
  {
    path: "/vcdrom/:id",
    component: VCDromScreen,
  },
];

const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(App);
app.use(VueMonacoEditorPlugin);
app.use(router)

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

app.mount("#app");
