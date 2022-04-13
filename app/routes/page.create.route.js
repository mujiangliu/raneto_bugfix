
'use strict';

// Modules
var fs           = require('fs');
var get_filepath = require('../functions/get_filepath.js');

function route_page_create (config) {
  return function (req, res, next) {
    console.log(config.content_dir, req.body.category, req.body.name, '44444444')
    var filepath = get_filepath({
      content  : config.content_dir,
      category : req.body.category,
      filename : req.body.name + '.md'
    });

    fs.open(filepath, 'a', function (error, fd) {
      if (error) {
        return res.json({
          status  : 1,
          message : error
        });
      }
      fs.close(fd, function (error) {
        if (error) {
          return res.json({
            status  : 1,
            message : error
          });
        }
        res.json({
          status  : 0,
          message : config.lang.api.pageCreated
        });
      });
    });

  };
}

// Exports
module.exports = route_page_create;
