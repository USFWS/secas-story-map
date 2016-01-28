(function () {
  'use strict';

  var xhr = require('xhr');

  var spreadsheet = 'https://docs.google.com/spreadsheets/d/13FIjoE0x6VGYkxhp7YQpuzbTIEuFTn1AdoGeVlzDGeY/pub?gid=451142798&single=true&output=csv';

  // xhr.get(spreadsheet, function (err, res) {
  //   if (err) console.error(err);
  //   console.log(res);
  // });

  xhr.get('../app/data/projects.geo', function (err, res) {
    projects = JSON.parse(res.body);
    console.log(projects);
  });
})();
