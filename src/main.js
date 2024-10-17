import 'src/lib/styles/global.css';
import 'src/lib/styles/fonts.css';
import 'src/lib/styles/ui.css';
import App from './App.svelte';

const app = new App({
    target: document.getElementById('app'),
});

export default app;
