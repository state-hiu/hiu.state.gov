Prototype of New hiu.state.gov (hiu.state.gov)
================

## Description

Prototype of the U.S. Department of State Humanitarian Information Unit's new public-facing website, hiu.state.gov.

## Installation

Site is tested and built using Ubuntu. To install locally, jekyll is required.

## Usage


If updated less (`src/less`) or javascript (`src/js/`), run gulp to update:

```
gulp
```

If you updated bootstrap variables (`src/less/bootstrap/variables.less`), re-compile the bootstrap.css with:

```
gulp bootstrap:compile
```

## Examples

TBD


### Search


#### The events page is depreciated at this time

### CSS

multiple libraries are used, however Sass/SCSS is mainly used along with bootstrap. Jekyll provides [built-in support for Sass](https://jekyllrb.com/docs/assets/). The Bootstrap partials are in the _sass directory. The main Sass/SCSS file is named main.scss and is in the css directory. Jekyll automatically processes it and puts it in the site's destination folder.


## Contributing

This website is currently in beta.  HIU is currently accepting pull requests for this repository.

## License
This project constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105.

However, because the project utilizes code licensed from contributors and other third parties, it therefore is licensed under the MIT License. http://opensource.org/licenses/mit-license.php. Under that license, permission is granted free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the conditions that any appropriate copyright notices and this permission notice are included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
