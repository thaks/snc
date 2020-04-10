import Vue from 'vue';
window.Vue = Vue;

let axios = require('axios');
window.axios = axios;

let jQuery = require('jquery');
window.$ = window.jQuery = jQuery;

require('./size-chart');
require('./thr-slider');
require('./components/embroidery-engraving');