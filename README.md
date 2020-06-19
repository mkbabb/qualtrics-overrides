# Qualtrics Overrides

This repository contains the various overrides and requisite files for the
Qualtrics surveys produced by the FI.

## Table of Contents

- [Qualtrics Overrides](#qualtrics-overrides)
  - [Table of Contents](#table-of-contents)
  - [TODO:](#todo)
  - [HTML](#html)
  - [Scripts](#scripts)
  - [Styles](#styles)

## TODO:

-   [ ] Change speedtest progression in qualtrics.

## HTML

Within [html](html/), the necessary HTML code for the individual speedtest
iframe is located. The requisite iframe ID is highlighted below: note, the
iframe ID here must match the iframe ID within the corresponding JavaScript.

![](docs/html.gif?raw=true "Example html usage")

## Scripts

Within [scripts](scripts/), housed are the custom scripts to be interpolated
into the individual survey questions. Of note, the _speedtest.js_ file is used
facilitate the communication between the outer-most survey element and the child
iframe element thereof.

Below is an example of how the custom JS may be called and thereby used in
Qualtrics. Notice the the iframeID variable, whereof's usage is stipulated by
the section regarding the HTML.

![](docs/js.gif?raw=true "Example js usage")

An integral facet used by the JS above is the notion of embedded data fields
within Qualtrics. Below is an example of where these aforesaid fields are
located, how they're added, and how they're deleted.

![](docs/embedded_data.gif?raw=true "Example embedded data usage")

Regarding embedded data, a typical speedtest execution is followed by a
concomitant [ipinfo](https://ipinfo.io/) API call: ipinfo returns a JSON object telemetry related to
an input IP address; for more information related to the ipinfo API, see:
<https://ipinfo.io/developers>. Qualtrics allows for the parsing and subsequent
setting of an arbitrary embedded data field thereon. An example is shown below:

![](docs/ip_info.gif?raw=true "Example ip info data usage")

## Styles

Within styles/, _base.css_ is the basal CSS template, used by all surveys. All
other files therein are used for their respective surveys; farm for farm, school
wifi for school wifi, etc..

The custom styles defined here are typically used in Qualtrics as such:

![](docs/external_css.jpg?raw=true "Example style usage")

Wherein, the custom CSS is called via the external CSS field.
