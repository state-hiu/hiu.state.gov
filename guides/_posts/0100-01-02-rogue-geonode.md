---
layout: guide
category: guides
title: "ROGUE GeoNode Set-up"
description: "This guide provides instructions for installing and managing a ROGUE GeoNode instance in a production environment.  You can find more information about ROGUE below and at [http://geoshape.org/](http://geoshape.org/).  Use the directions found at [http://geoshape.org/](http://geoshape.org/) for deploying a ROGUE GeoNode in a development environment."
version: 1.0
date: 2015-10-07
featured: true
keywords:
  - cybergis
  - geonode
---
# [Guides]({{ site.baseurl }}/guides) / [{{ page.title }} ({{ page.version }})]({{ site.baseurl }}{{ page.url | remove: '.html' }})

## Description

This guide provides instructions for installing and managing a ROGUE GeoNode instance in a production environment.  You can find information about installing a vanilla GeoNode without the advanced data editing and sharing technology at [http://geonode.org/](http://geonode.org/).  You can find more information about ROGUE below and at [http://geoshape.org/](http://geoshape.org/).  Use the directions found at [http://geoshape.org/](http://geoshape.org/) for deploying a ROGUE GeoNode in a development environment.

### Cheat Sheet
In case you've walked through the guide before and understand the installation process, there is a cheat sheet available for this guide at [https://github.com/state-hiu/cybergis-guides/blob/master/1.0/cybergis-guides-roguegeonode-cheatcheet-1.0.sh](https://github.com/state-hiu/cybergis-guides/blob/master/1.0/cybergis-guides-roguegeonode-cheatcheet-1.0.sh).  The cheat sheet contains the same exact steps in the guide.  It is designed for quick access and copy/paste into a shell.  You still should execute commands line by line.  The cheat sheet is not "executable".

### CyberGIS
The Humanitarian Information Unit has been developing a sophisticated geographic computing infrastructure referred to as the CyberGIS. The CyberGIS provides highly available, scalable, reliable, and timely geospatial services capable of supporting multiple concurrent projects.  The CyberGIS relies on primarily open source projects, such as PostGIS, GeoServer, GDAL, [GeoGig](http://geogig.org/), OGR, and OpenLayers.  The name CyberGIS is dervied from the term geospatial cyberinfrastructure.

### ROGUE
The Rapid Opensource Geospatial User-Driven Enterprise (ROGUE) Joint Capabilities Technology Demonstration (JCTD) is a two-year research & development project developing the technology for distributed geographic data creation and synchronization in a disconnected environement.  This new technology taken altogether is referred to as GeoSHAPE.  See [http://geoshape.org](http://geoshape.org) for more information.  HIU is leveraging the technology developed through ROGUE to build out the CyberGIS into a robust globally distributed infrastructure.

### Bugs

If you find any bugs, in the vanilla GeoNode, please submit them as issues to the GeoNode GitHub repo at [https://github.com/GeoNode/geonode/issues](https://github.com/GeoNode/geonode/issues).  If you find bugs, in the ROGUE GeoNode, please submit them as tickets to the rogue_geonode GitHub repo at: [https://github.com/ROGUE-JCTD/rogue_geonode/issues](https://github.com/ROGUE-JCTD/rogue_geonode/issues).  If you find any bugs with the 
guide itself, please submit them to this repo at [https://github.com/state-hiu/cybergis-guides/issues](https://github.com/state-hiu/cybergis-guides/issues).

## Provision

Before you begin the installation process, you'll need to provision a virtual or physical machine.  ROGUE GeoNode will run on [Amazon Web Services (AWS)](#aws-machines), [Vagrant](#vagrant-machines), and almost any type of virtual machine.

Most VMs, AMIs, boxes, etc. of Ubuntu 14.04.X won't be 100% up to date when provisioned.  Although not necessary, you should upgrade all your packages as soon as you SSH into the machine for the first time and before you begin the installation process.  In Ubuntu that is: `sudo apt-get update; sudo apt-get upgrade;`.

### AWS Machines
If you are provisioning an instance using Amazon Web Services, we recommend you use the baseline Ubuntu 14.04 LTS AMI managed by Ubuntu/Canonical.  You can lookup the most recent ami code on this page: [https://cloud-images.ubuntu.com/releases/trusty/release/](https://cloud-images.ubuntu.com/releases/trusty/release/).  Generally speaking, you should use the 64-bit EBS-SSD AMI for ROGUE GeoNode.

### Vagrant Machines

If you are installing ROGUE GeoNode on a Vagrant VM it is a good idea to assert the correct locale through the following code block.  Most other builds, such as the Amazon AWS Ubuntu images, do not need this step as they are configured properly.  See issue 985 for explanation at [https://github.com/GeoNode/geonode/issues/985](https://github.com/GeoNode/geonode/issues/985).

```
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

locale-gen en_US.UTF-8
dpkg-reconfigure locales
```

## Installation

Launching a ROGUE GeoNode only requires a few simple steps.  The installation process is relatively painless on a clean build and can be completed in less than 30 minutes.

These instructions were written for deployment on the Ubuntu operating system, but may work on other Linux variants.  The ROGUE build and these scripts are configured for Ubuntu 14.04 LTS.

You'll want to complete all the following command line calls as root (with login shell and enviornment).  Therefore, use `sudo su -` to become the root user.  Do not use `sudo su root`, as that will not provide the environment necessary.

You can **rerun** most steps, but not all, if a network connection drops, e.g., during installation of a Ruby GEM dependency.

Installation only requires 5 simple steps.  Most steps only require executing one command on the command line.  Steps 6 to 11 are optional, but help integration of GeoNode into existing geospatial workflows.

1. Install CyberGIS Scripts.  [[Jump]](#step-1)
2. Create ROGUE user account.  [[Jump]](#step-2)
3. Install RVM (Ruby Version Manager), Bundler, and GEMs.  [[Jump]](#step-3)
4. Initialize Database & Configure Server. [[Jump]](#step-4)
5. Install GEMs & Provision [[Jump]](#step-5)
6. Add external servers to baseline (GeoNodes, WMS, and TMS).  [[Jump]](#step-6)
7. Add GeoGig remotes to baseline (other ROGUE GeoNodes) (**CURRENTLY BROKEN DO NOT EXECUTE.  Use MapLoom instead**)
8. Add post-commit AWS [SNS](https://aws.amazon.com/sns/) hooks to repos.  [[Jump]](#step-8)
9. Add GeoGig sync cron jobs.  [[Jump]](#step-9)
10. Add OpenStreetMap (OSM) extracts.  [[Jump]](#step-10)
11. Add styles to baseline [[Jump]](#step-11)

### Known Issues
1.  This scipt is currently incompatible with the most recent GeoGig Web API implementation.  You can still add remotes manually through MapLoom.  **Do not execute step 6.**
2.  The SNS hooks are not added to any repository .geogig/hooks directories, since the Geoserver GeoGig hooks implementation is not executing properly.  However, step 7 does not break the installation and you'll be able to test AWS SNS from the command line.

### Step 1

The first step is install the CyberGIS scripts from the [cybergis-scripts](https://github.com/state-hiu/cybergis-scripts) GitHub repo. As root (`sudo su -`) execute the following commands.

```
apt-get update
apt-get install -y curl vim git
apt-get install -y build-essential # Only for Ubuntu 14.04
#apt-get install -y postgresql-client-common postgresql-client-9.1 # Only for Ubuntu 12.04
apt-get install -y postgresql-client-common postgresql-client-9.3 # Only for Ubuntu 14.04
apt-get install -y libgeos-dev libproj-dev
cd /opt
git clone https://github.com/state-hiu/cybergis-scripts.git cybergis-scripts.git
cp cybergis-scripts.git/profile/cybergis-scripts.sh /etc/profile.d/
```

### Step 2

Log out completely and log back in (or `source /etc/profile.d/cybergis-scripts.sh`).  Remember to become root again (`sudo su -`).  The CyberGIS scripts should now be in every user's path.  We now need to create an account to run GeoNode.  You don't execute any commands as the "rogue" user during installation.  Execute every command as root.

```
cybergis-script-rogue.sh prod user
```

### Step 3

You're still root right?  We now need to install RVM (Ruby Version Manager).  RVM is used to install Ruby GEM dependencies.  Chef also uses ruby to manage the integration of custom ROGUE components with a vanilla GeoNode.

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
cybergis-script-rogue.sh prod rvm
```

Next, install the Ruby GEM Bundler.  See [http://bundler.io/](http://bundler.io/) for more info.

```
cybergis-script-rogue.sh prod bundler
```

### Step 4

We now need to initialize a backend database service for GeoNode to store its catalog and feature data.  We'll then configure the chef configuration files.  GeoNode uses PostGIS to store its catalog and to store non-versioned geospatial data.  By default, GeoNode stores its catalog in the `geonode` database and stores features data in the `geonode_imports` database.  Importantly, GeoGig uses an embedded Berkeley Database.  Make sure to have your `geoserver_data` directory on a large volume, if you will be uploading rasters or large datasets into GeoGig repositories.

There are three different deployment paths enumerated below depending on how you set up your backend database: ([4a](#step-5a)) Amazon Web Sevices (AWS) Relational Databse Service (RDS), ([4b](#step-4b)) PostGIS on a separate instance as GeoNode, or ([4c](#step-4c)) PostGIS on the same instance than GeoNode.

#### Step 4a
In step 4a, you can install PostGIS on AWS RDS.  To install PostGIS ontop of a PostgreSQL AWS RDS instance take the following steps. 

First, you need to lanuch a PostgreSQL RDS instance.  You can follow the instructions found on the AWS website at [http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html).

It is **strongly recommended** for running GeoNode in a production environment that you enable "Multi AZ Deployment" for the backend PostGIS database.  This will increase availability and enable failover capability.  "Multi AZ Deployment" will increase the reliability of your geospatial services.  See the AWS documentation  [here](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) for more details.

Another consideration when using AWS RDS is  the maintenance and backup windows.  It is recommended to set these windows for when you expect there to be the lowest activity, such as really early Sunday morning.

Once you've deployed a PostgreSQL RDS instance, you only need to execute the one following command to initialize the database.  The command was built from AWS help docs found [here](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.html#Appendix.PostgreSQL.CommonDBATasks.PostGIS).  Execute this command from within the GeoNode instance.  Make sure you've configured the RDS DB security group to allow access from the GeoNode instance.  This command will initialize the `template_postgis` database.  Step 6 will actually build the `geonode` and `geonode_imports` database.

```
cybergis-script-postgis.sh prod install rds <host> 5432 postgres <password> template_postgis template0
```

The password variable should be encased in single quotes to ensure it is treated as a literal.  For example,

```
cybergis-script-postgis.sh prod install rds XXX.rds.amazonaws.com 5432 postgres 'd&^$%jfn' template_postgis template0
```

To confirm the template_postgis database was created correctly, you can log into the database from the shell with:

```
PGPASSWORD='XXX' psql --host=XXX.rds.amazonaws.com --port=5432 --username postgres --d=template_postgis
```

Run the `\list` command to check for databases and `\dn` to check for schemas.

Next, we need to configure our application server to use the RDS database.

Do not forget to include the fully qualified domain name (including subdomains) for the **fqdn** parameter, such as hiu-maps.net or example.com. Do not include a port, protocol, or context path.

```
cybergis-script-geoshape-configure.py
--env 'aws' \
--fqdn FQDN \
--db_host RDS_ENDPOINT \
--db_ip 'false' \
--db_port '5432' \
--db_pass RDS_PASSWORD \
--gs_data_url GS_DATA_URL  \
--gs_data_branch GS_DATA_BRANCH \
```

For example,

```
cybergis-script-geoshape-configure.py
--env 'aws' \
--fqdn 'example.com' \
--db_host 'XXX.rds.amazonaws.com' \
--db_ip 'false' \
--db_port '5432' \
--db_pass '123ABC' \
--gs_data_url 'https://github.com/state-hiu/geoserver_data.git'  \
--gs_data_branch 'master' \
```

**Important!!**  Before provisioning, we also need to slightly change `geoshape_external_db.json`.  Add `"recipe[rogue::database]"`, to `/opt/rogue-chef-repo/roles/geoshape_external_db.json` between geoshape_base and rogue.  This is a hotfix, until a RDS (database as a service) role is created.

#### Step 4b

**To Be Completed**

In step 4b, you can install the PostGIS backend on a separate virutal machine or instance.


Assuming the DB security group has allowed access from the ROGUE GeoNode instance.  Connect to the database instance.

```
psql --host=XXX.rds.amazonaws.com --port=5432 --username postgres --password
```

#### Step 4c

For basic installations where PostGIS and GeoNode are on the same instance also referred to as a standalone deployment, configure with the following command.

```
cybergis-script-geoshape-configure.py --fqdn FQDN
```

For example,

```
cybergis-script-geoshape-configure.py --fqdn example.com
```

### Step 5

Next, let's install GEM Dependencies.  The following command will run `bundle install` and `berks install` to download dependencies.  It will also download chef cookbooks to `/opt/chef-run/cookbooks`.

The one exception to using `bundle install` is that it will install libgecode-dev via `apt-get install` so it does not have to build from source, which takes an extremely long time.  The command is: `apt-get install -y libgecode-dev; USE_SYSTEM_GECODE=1 gem install dep-selector-libgecode -v '1.0.2'`.  If you customize your install and do not use the following line to install GEMs, be sure to run the `apt-get ...; USE_SYSTEM_GEOCODE=1 ...;` line **before** you run `bundle install`.

```
cybergis-script-rogue.sh prod gems
```

Finally, we can now provision our instance.  This will install all the custom ROGUE componenets and will take the most time to execute, at least 5 minutes... even on m3.xlarge AWS instances.  Chef will download and install all remaining dependencies before installing GeoNode itself.

```
cybergis-script-rogue.sh prod provision
```

After provisioning or updating templates, you might want to check the `/etc/hosts/` and `/var/lib/geonode/rogue_geonode/geoshape/local_settings.py`, so that they have the right configuration.

**GZIP Compression Issue**

GZIP is currently broken in GeoGig.  The ROGUE cookbook disables it by default (https://github.com/ROGUE-JCTD/rogue-cookbook/issues/29).  If you are using a different cookbook or initialization process, you may need to disable GZIP compression.  To do so, comment out the `GZIP Compression Filter` in `/var/lib/tomcat7/webapps/geoserver/WEB-INF/web.xml` and `/var/lib/geonode/rogue_geonode/geoserver_ext/src/main/webapp/WEB-INF/web.xml`.

After installation is complete, go to your GeoNode in a browser to confirm it installed properly.  The default user and password is admin and admin.  If installation was successful, continue to install baseline servers and remotes.

### Step 6

If you add external servers to the baseline, they'll, by default, appear in MapLoom.  Therefore, users will not need to manually add server urls for each map they create.  Server information is stored at the end of `/var/lib/geonode/rogue_geonode/rogue_geonode/settings.py`.

To add a GeoNode server, include the protocol, domain, and port, for example `cybergis-script-rogue.sh prod server geonode ExampleName http://example.com`.  The url parameter will be appended with `/geoserver/wms` automatically.  To include other providers of WMS services use the wms flag instead, for example `cybergis-script-rogue.sh prod server wms ExampleName http://example.com/geoserver/wms`.  To include TMS services, such as HIU NextView High-Resolution Commercial Satellite Imagery services, provide the path to the capabilities document, for example, `cybergis-script-rogue.sh prod server tms ExampleName http://hiu-maps.net/hot/1.0.0/`.

```
cybergis-script-rogue.sh prod server [geonode|wms|tms] <name> <url>
```
### Step 7

**Adding remotes from this script is currently broken.  Use MapLoom instead.  DO NOT EXECUTE**

You'll want to install remotes, next.  Remotes enable users to sync data among multiple ROGUE GeoNode instances.  You can add remotes using two commands.  The first command uses a url to the remote Geonode and remote repo name.  The second command uses a url to the repo directly.  The second command can be used once other implementations of the GeoGig Web API [http://geogig.org/docs/interaction/web-api.html](http://geogig.org/docs/interaction/web-api.html) are created.

To add a remote GeoNode use, 

```
cybergis-script-rogue.sh prod remote <user:password> <localRepoName> <localGeonodeURL> <remoteName> <remoteRepoName> <remoteGeoNodeURL> <remoteUser> <remotePassword>
```

To add a remote GeoGig repo (server agnostic),

```
cybergis-script-rogue.sh prod remote2 <user:password> <repoURL> <remoteName> <remoteURL> <remoteUser> <remotePassword>
```

You can confirm the remotes were added successfully, but executing the following command agains the GeoGig Web API.  You should see an xml output of all configured remotes. 

```
curl -u user:password 'http://example.com/geoserver/geogig/geonode:localRepoName/remote?list=true&verbose=true'
```

**Adding remotes from this script is currently broken.  Use MapLoom instead.  DO NOT EXECUTE**

### Step 8

To add Amazon Web Services (AWS) [Simple Notification Services](https://aws.amazon.com/sns/) (SNS) post-commit hooks to repositories, you need to first install the python bindings for the AWS api tools and configure GeoNode's AWS settings.  The python binds for the AWS api tools is called Boto (see: [https://github.com/boto/boto](https://github.com/boto/boto)).  To install the bindings run:

```
cybergis-script-rogue.sh prod aws
```

To add the relevant settings to the GeoNode settings.py file, run the following command.  You'll most likely need to wrap the sns_topic string with double or single quotes to correctly pass the arguments.

```
cybergis-script-rogue.sh prod sns <aws_access_key_id> <aws_secret_access_key> <sns_topic>
```

You can test SNS with the following code block.  You need to use GeoNode's python interpreter to correctly load the GeoNode settings from the command line.

```
export DJANGO_SETTINGS_MODULE=rogue_geonode.settings
/var/lib/geonode/bin/python /opt/cybergis-scripts.git/lib/rogue/post_commit_hook.py <commit_message>
```

### Step 9
Cron jobs can be set up to sync local and remote GeoGig repos.  This can be very useful when syncing large datasets in primarily one direction.  For example, pushing a large amount of data to a field office at 6am before staff arrive at work.  The script will also help organizations receive updates to their layers from others without having to share their own propriety information.  The script will only sync when there are no conflicts.  Support for automated notifications when the sync fails using AWS SNS will be implemented soon.  You can sync at a standard hourly, daily, weekly, or monthly interval using the following command.  You need to add a remote via MapLoom or step 7 (once the script is fixed) before hand.

You can execute a push, pull, or two-way (duplex) cron job.  The three options for direction are: `push, pull, and duplex`.

```
cybergis-script-rogue.sh prod cron <direction> <user> <password> <localRepoName> <remoteName> <authorname> <authoremail> [hourly|daily|weekly|monthly]
```

You can also sync with a custom interval using standard crontab syntax.  See the relevant wikipedia article for more information [http://en.wikipedia.org/wiki/Cron](http://en.wikipedia.org/wiki/Cron).

```
cybergis-script-rogue.sh prod cron2 <direction> <user> <password> <localRepoName> <remoteName> <authorname> <authoremail> <frequency>
```

The frequency variable should be encased in single quotes to ensure it is treated as a literal.  For example, the script below will execute a GeoGig sync every 5 minutes.

```
cybergis-script-rogue.sh prod cron2 pull admin admin 'geonode:incidents_repo' 'AWS' dummy dummy@example.com '*/5 * * * *'
```

The sync commands are added to the file in the cron.d directory at `/etc/cron.d/geogig_sync`.  The concurrent commands execute in order of when they were added.  You can double check that the commands executed properly, manually adds sync commands, remove commands, ior otherwise edit existing commands.  Be careful to not create duplicate cron jobs, as you'll remove a great benfit of GeoGig--it effectively uses network bandwith.

### Step 10

**Still a work in progress**

The first thing we need to do make sure we have a repository to store our OpenStreetMap (OSM) mappings.  You can clone directly from `cybergis-osm-mappings` or set up a fork.

```
cd /opt
git clone https://github.com/state-hiu/cybergis-osm-mappings.git cybergis-osm-mappings.git
#No build scripts yet but may be in the future.
#cp cybergis-osm-mappings.git/profile/cybergis-osm-mappings.sh /etc/profile.d/
```

### Step 11


The first thing we need to do make sure we have a repo of the CyberGIS styles on the file filesystem.  You can clone directly from `cybergis-styles`, set up a fork, or work with your own folder of styles.

```
cd /opt
git clone https://github.com/state-hiu/cybergis-styles.git cybergis-styles.git
```

Once you've downloaded a copy of the styles, we'll import them into GeoServer using a python wrapper for the REST interface.

```
cybergis-script-geoserver-import-styles.py --path /opt/cybergis-styles.git/styles --geoserver <GEOSERVER> --prefix "cybergis" --username <username --password <password>
```

Then run updatelayers, so the new styles are visible in GeoNode.

```
cd /var/lib/geonode/rogue_geonode
bin/python manage.py updatelayers
```
