# Online Souffle Task

## Setting Up

- Install `nodejs` and `npm` (or `pnpm`)
- run `npm install` (or `pnpm install`)
- Run `gulp` to compile the `src` folder (output goes to `public/static/`)
- Copy the contents of `public` to your Apache server
- Make sure the file permissions are set properly
  - `chmod -R www-data .`
  - `chgrp -R www-data .`
- Visit `your-website.com/setup.php` to create the databases.
- Visit `your-website.com/` to start the experiment.
