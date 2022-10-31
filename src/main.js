import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './styles.css';
import './menu.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);


app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Checkbox', Checkbox);
app.component('Toast', Toast);
app.component('Menubar', Menubar);
app.component('Dialog', Dialog);
app.component('InputMask', InputMask);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Dropdown', Dropdown);
app.component('FileUpload', FileUpload);
app.component('Calendar', Calendar);
app.component('AutoComplete', AutoComplete);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.mount('#app');
