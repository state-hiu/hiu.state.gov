Prototype of New hiu.state.gov (hiu.state.gov)
================

## Description

Prototype of the U.S. Department of State Humanitarian Information Unit's new public-facing website, hiu.state.gov.

## Installation

Installation instructions for Ubuntu 14.04.

```Shell
sudo apt-get install nginx
sudo mkdir /var/www
sudo chown -R vagrant:vagrant /var/www
# Edit /etc/nginx/sites-availble/default to listen to :8000 and point to /var/www
sudo /etc/init.d/nginx restart
###############
sudo su -
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
source /usr/local/rvm/scripts/rvm
rvm get stable
rvm list known
rvm install ruby-2.0.0-p353
rvm --default use ruby-2.0.0-p353
gem install jekyll
gem install redcarpet
###############
# Still as root (sudo su -)
apt-get install npm
ln -s /usr/bin/nodejs /usr/bin/node
exit
###############
# Back to regular user
cd ~/hiu.state.gov
npm install
sudo npm install -g gulp
###############
gulp
gulp bootstrap:compile
```

**Extensionless Permalinks**

```
# http://jekyllrb.com/docs/permalinks/#extensionless-permalinks
try_files $uri $uri.html $uri/ =404;
```

Also, see [http://rickharrison.me/how-to-remove-trailing-slashes-from-jekyll-urls-using-nginx](http://rickharrison.me/how-to-remove-trailing-slashes-from-jekyll-urls-using-nginx).

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

## Contributing

This prototype is still very much in alpha stage.  HIU is currently accepting pull requests for this repository.

## License
This project constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105.

However, because the project utilizes code licensed from contributors and other third parties, it therefore is licensed under the MIT License. http://opensource.org/licenses/mit-license.php. Under that license, permission is granted free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the conditions that any appropriate copyright notices and this permission notice are included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
