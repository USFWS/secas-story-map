## SECAS Story Map

This interactive story map highlights several conservation projects that fall under the Southeast Conservation Adaptation Strategy (SECAS).  This project is under active development.

## Development

To ease development we use npm scripts to compile JS with browserify/watchify, compile sass to css, optimize images, etc:

First, install the project dependencies:

`npm install`

To kick off the development server and all pre-requisite tasks:

`npm start`

The `dist` folder is the directory used to serve the app.

To build a production ready version of the app use:

`npm run build`

The optimized application is built into the `dist` folder, which you can copy onto your web server.

To publish a production ready demo to GitHub Pages:

`npm run publish:demo`

To visualize packages contributing to bundle file size:

`npm run inspect:bundle`

This task can help you uncover modules that are bloating your final javascript bundle size.

### Tasks

#### Images

Any image in the `app/images/project-photos` directory will be resized to create a 175px x 125px thumbnail image, which is used in the image gallery at the bottom of the screen and a 500px wide image for the infowindow that appears on the right side.  These files are copied to `dist/images/photos` for consumption by the application.  You can change the sizes of these images by editing `build/resize-images.js`.  This task includes a file watcher; any time you add a new image it will automatically run.

#### SVG

This task watches the `app/images/markers/` directory for any `svg` file.  It optimizes the svg using imagemin and imagemin-svgo.  Files are copied to `dist/images` for use in the application.  Any time you add a new svg this task will automatically run.

#### Project Data

Project data is stored as GeoJSON in the `app/data` directory.  One file represents the tabular data neccessary (stored in a Google sheet, downloaded as an CSV, converted to GeoJSON) to display markers on the map.  The other file represents the area of interest associated with that marker displayed as a polygon.  Both of these files are watched by the `npm start` task and minified to reduce file size.

### License

This project is in the Public Domain.

The United States Fish and Wildlife Service (FWS) GitHub project code is provided on an "as is" basis and the user assumes responsibility for its use. FWS has relinquished control
of the information and no longer has responsibility to protect the integrity, confidentiality, or availability of the information. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by FWS. The FWS seal and logo shall not be used in any manner to imply endorsement of any commercial product or activity by FWS or the United States Government.
