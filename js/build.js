({
    mainConfigFile: 'saltui.js',
    baseUrl: 'lib',

    optimize: 'uglify',
    generateSourceMaps: true,
    inlineText: true,
    useStrict: false,
    preserveLicenseComments: false,
    logLevel: 0, // 2

    uglify: {
        toplevel: false, // needed to not break shims
        ascii_only: true,
        // max_line_length: 1000,
    },

    name: '../saltui',
    out: 'saltui.min.js',
})
