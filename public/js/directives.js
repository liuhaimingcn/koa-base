/* Directives */

var stylinkManageDirectives = angular.module('stylinkManageDirectives', []);

// 上传图片到七牛
stylinkManageDirectives.directive('uploadPic', function () {
  return {
    restrict: 'EA',
    scope: {
      picUrl: '=picUrl'
    },
    templateUrl: '/public/template/uploadPic.html',
    link: function (scope, element, attrs) {
      setTimeout(function() {
        element.find('#tinyboxId').html("<img width='640px' src=" + scope.picUrl +" /><script type='text/javascript'> var content2 = $('#tinyboxId').html(); T$('click_test2').onclick = function () { TINY.box.show(content2, 0, 0, 0, 1) };</script>");
      }, 500);

      scope.uploadId = attrs.uploadId;
      scope.$watch('uploadId', function () {
        Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: scope.uploadId,
          drop_element: 'container',
          max_file_size: '100mb',
          dragdrop: true,
          chunk_size: '4mb',
          uptoken_url: '/api/qiniu/uptoken',
          domain: '***',
          auto_start: true,
          init: {
            'FilesAdded': function (up, files) {
              plupload.each(files, function (file) {
                // 文件添加进队列后,处理相关的事情
              });
            },
            'BeforeUpload': function (up, file) {
              // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function (up, file) {
              // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function (up, file, info) {
              scope.picUrl = up.getOption('domain') + $.parseJSON(info).key;
              element.find('#tinyboxId').html("<img width='640px' src=" + scope.picUrl +" /><script type='text/javascript'> var content2 = $('#tinyboxId').html(); T$('click_test2').onclick = function () { TINY.box.show(content2, 0, 0, 0, 1) };</script>");
              scope.$apply();
            },
            'Error': function (up, err, errTip) {
              //上传出错时,处理相关的事情
              alert('上传失败！');
            },
            'UploadComplete': function () {
              alert('上传成功！');
              //队列文件处理完毕后,处理相关的事情
            }
          }
        });
      });
    }
  };
});

stylinkManageDirectives.directive('goClick', function ($location) {
  return function (scope, element, attrs) {
    var path;

    attrs.$observe('goClick', function (val) {
      path = val;
    });

    element.bind('click', function () {
      scope.$apply(function () {
        $location.url(path);
      });
    });
  };
});

stylinkManageDirectives.directive('openWindow', function ($window) {
  return function (scope, element, attrs) {
    var path;

    attrs.$observe('openWindow', function (val) {
      path = val;
    });

    element.bind('click', function () {
      if (path) {
        scope.$apply(function () {
          $window.open(path);
        });
      } else {
        alert('无效链接！');
      }
    });
  };
});

/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
stylinkManageDirectives.directive('ngReallyClick', [function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('click', function () {
        var message = attrs.ngReallyMessage;
        if (message && confirm(message)) {
          scope.$apply(attrs.ngReallyClick);
        }
      });
    }
  }
}]);