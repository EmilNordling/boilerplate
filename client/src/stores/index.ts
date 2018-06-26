import GuiStore from './GUIStore'
import AuthStore from './AuthStore'

const guiStore = new GuiStore();
const authStore = new AuthStore();

export { default as GuiStore } from './GUIStore';
export { default as AuthStore } from './AuthStore';

export {
  guiStore,
  authStore,
}

export default {
  guiStore,
  authStore,
}
