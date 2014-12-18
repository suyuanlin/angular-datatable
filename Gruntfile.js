module.exports = function (grunt) {

    // 任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n' +
                    ';(function(){\n',
                footer: '\n})();'
            },
            build: {
                files: {
                    'dist/datatable.min.js': [
                        'src/**/*.js',
                        'src/application.js'
                    ]
                }
            }
        }
    });

    // 任务加载
    grunt.loadNpmTasks('grunt-contrib-uglify');
};