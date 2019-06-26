// Css bundle
import './index.scss';
import '../shared/js/util';
import '../shared/js/share';
import '../pages/main/main';

$.ajaxSetup({
  contentType: false,
  processData: false,
  dataType: 'json',
  crossDomain: true,
  // xhrFields: {
  //   withCredentials: window.apiRoot.indexOf('mockable') === -1,
  // },
});

window.$ = $;
