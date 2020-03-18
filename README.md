# qualtrics_overrides

This repository contains the various overrides and requisite files for the
Qualtrics surveys produced by the FI.

## Scripts

Within scripts, housed are the custom scripts to be interpolated into the
individual survey questions. Of note, the *speedtest.js* file is used facilitate
the communication between the outer-most survey element and the child iframe
element thereof.

Below is an example of how the custom JS may be called and thereby used in Qualtrics.

![](docs/qualtrics-example-js.gif?raw=true "Example style usage")

## Styles

Within styles, *base.css* is the basal CSS template, used by all surveys. All
other files therein are used for their respective surveys; farm for farm, school
wifi for school wifi, etc..

The custom styles defined here are typically used in Qualtrics as such:

![](docs/qualtrics-example-1.jpg?raw=true "Example style usage")

Wherein, the custom CSS is called via the external CSS field.
