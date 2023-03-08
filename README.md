
# Text-capture-chrome-extension

A Chrome extension that, when enabled, captures text from an element of a webpage when clicked over. A visual feedback is also given when hovering over the element. The captured text can be sent to ChatGPT to make something new out of it!

# Steps to correctly run the extension
1. Clone this repo
2. Do npm install or yarn install
3. Now create a apiSecret.ts file in popup/components folder. This .ts file will have your ChatGPT apiKey.
4. do npm run build or yarn run build, this will create a dist folder.
5. Go to chrome://extensions
6. make sure developer mode is "ON".
7. click on "Load unpacked".
8. head over to the "dist" folder of this clone repo and select "dist" folder.
9. This will create an extension for you. Now use it 🎉.

# Note
If keyboard shortcuts are not automatically enabled, go to chrome://extensions/shortcuts , and use Ctrl+Shift+U for "Run content-script on the current page." field.