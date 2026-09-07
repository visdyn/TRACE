# TRACE project page

Static GitHub Pages site adapted from [MotionGPT3](https://github.com/MotionGPT3/motiongpt3.github.io), itself based on the Nerfies academic website layout. Original Bulma and index styles are retained; TRACE additions are isolated in `static/css/trace.css` and `static/js/trace.js`.

Preview: `python3 -m http.server 8000 --directory project_page` from the parent research repository.

Publish the contents of this directory to a dedicated `visdyn/TRACE` repository. In Settings → Pages choose Deploy from a branch, `main`, `/ (root)`. The default project URL will be `https://visdyn.github.io/TRACE/`. All local asset URLs are relative and support a project subdirectory.

The three publication buttons intentionally have no destination. Replace each disabled button with an anchor once its actual URL is available. Update the provisional BibTeX after arXiv publication.

Paper excerpts and author information originate in `configs/project_page_content.json` in the parent research repository. Generation captions are copied from the corresponding mesh archive's `text` field. Understanding captions are the original model predictions. The site contains no upstream analytics or favicon.

Template attribution is retained in the footer. MotionGPT3's source footer identifies the website template as CC BY-SA 4.0; this does not assign that license to the research media or model.
