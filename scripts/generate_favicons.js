const fs = require("fs")
const favicons = require("favicons")

const OUTPUT_PATH = `../public/`

const source = "./src/assets/icon.svg", // Source image(s). `string`, `buffer` or array of `string`
  configuration = {
    // path: "../public", // Path for overriding default icons path. `string`
    appName: "classtimes", // Your application's name. `string`
    appShortName: "classtimes", // Your application's short_name. `string`. Optional. If not set, appName will be used
    appDescription: "Follow all your classes", // Your application's description. `string`
    developerName: "classtimes", // Your (or your developer's) name. `string`
    developerURL: "https://classtimes.app", // Your (or your developer's) URL. `string`
    // dir: "auto", // Primary text direction for name, short_name, and description
    lang: "en-US", // Primary language for name and short_name
    background: "#3D2D6B", // Background colour for flattened icons. `string`
    theme_color: "#3D2D6B", // Theme color user for example in Android's task switcher. `string`
    // appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
    // display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    // orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    // scope: "/", // set of URLs that the browser considers within your app
    // start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
    version: "1.0", // Your application's version string. `string`
    // logging: false, // Print logs to console? `boolean`
    // pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    // loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
      //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
      //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
      //
      android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
      yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    },
  },
  callback = function (error, response) {
    if (error) {
      console.log(error.message) // Error description e.g. "An unknown error has occurred"
      return
    }
    console.log(response.images) // Array of { name: string, contents: <buffer> }
    console.log(response.files) // Array of { name: string, contents: <string> }
    console.log(response.html) // Array of strings (html elements)

    // Check if tmp dir exists, if not create
    if (!fs.existsSync(`${__dirname}/${OUTPUT_PATH}`)) {
      fs.mkdirSync(`${__dirname}/${OUTPUT_PATH}`)
    }

    // Save images
    response.images.forEach((item) => {
      fs.writeFile(
        `${__dirname}/${OUTPUT_PATH}${item.name}`,
        item.contents,
        "binary",
        function (err) {
          if (err) throw err
          console.log(`${item.name} saved.`)
        }
      )
    })

    // Save files
    response.files.forEach((item) => {
      fs.writeFile(
        `${__dirname}/${OUTPUT_PATH}${item.name}`,
        item.contents,
        "binary",
        function (err) {
          if (err) throw err
          console.log(`${item.name} saved.`)
        }
      )
    })

    // Save HTML files
    fs.writeFile(
      `${__dirname}/${OUTPUT_PATH}index.html`,
      response.html,
      "binary",
      function (err) {
        if (err) throw err
        console.log("index.html saved.")
      }
    )
  }

favicons(source, configuration, callback)
