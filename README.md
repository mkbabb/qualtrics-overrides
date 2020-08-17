# Qualtrics Overrides 🎨

This repo contains the various JavaScript, CSS, and HTML override files used in Qualtrics surveys at @TheFridayInstitute.

Each sub-directory within [src](src/) houses an individual survey's project files. Located there, too, are common JavaScript files shared between surveys, such as [`get-ip.ts`](src/get-ip.ts), plus an additional TypeScript definition file exposing the Qualtrics JavaScript API.

In particular, these overrides are used to serve the files necessary for running our speedtest implementation.

## Table of Contents

- [Qualtrics Overrides 🎨](#qualtrics-overrides-)
  - [Table of Contents](#table-of-contents)
  - [`qualtrics.d.ts`](#qualtricsdts)
  - [The Speedtest](#the-speedtest)
    - [Re-intro](#re-intro)
    - [HTML](#html)
    - [JavaScript (TypeScript)](#javascript-typescript)
      - [A Note on TypeScript](#a-note-on-typescript)
      - [`iframe` communicado](#iframe-communicado)
    - [CSS?](#css)

## `qualtrics.d.ts`

A TypeScript definition, or deceleration file, used to provide a certain level of type safety when using Qualtrics' JavaScript API. Currently, the entire API is represented, but proper comments describing their respective functionalities is lacking.

## The Speedtest

### Re-intro

The primary use case of this repo is to house files necessary for our embedded speedtest's operation. At a minimum, this requires one HTML survey element with JavaScript code injected therein. Optionally, a series of CSS overrides may be provided.

In addition to the HTML and JavaScript code, two sets of additional survey logic must be added to a given Qualtrics survey: a series of `embedded data` fields, and a one `web service call`.

### HTML

Within a project's `speedtest.html`, the necessary HTML for the individual speedtest
iframe is located. Note, the
iframe ID here must match the iframe ID within the corresponding JavaScript.

![](assets/html.gif?raw=true "Example html usage")

### JavaScript (TypeScript)

Within [scripts](scripts/), housed are the custom scripts to be interpolated
into the individual speedtest survey block.

#### A Note on TypeScript

Of important note is our usage of TypeScript throughout the entire codebase, rather than vanilla JavaScript: one must compile the `.ts` files down to native JavaScript code, and **only then** one may insert the generated `.js` files into Qualtrics.

An important consequence of this is the usage of a call to `Qualtrics.SurveyEngine` being aliased to `qs`: this is done in an effort to reduce the number of `@ts-ignore` comments that must be used to circumvent the TypeScript compiler's complaints.

Additionally, to prevent the TypeScript compiler from detecting namespace collisions, each `.ts` file **must** end in an `export` statement.

#### `iframe` Communicado

To facilitate communication between iframe and parent, we utilize the standard [`window.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage); perfect for our purposes, as we control both content domains.

Below is an example of how the custom JavaScript may be called and thereby used in
Qualtrics.

![](assets/js.gif?raw=true "Example js usage")

An integral facet used by the JS above is the notion of embedded data fields
within Qualtrics.

![](assets/embedded_data.gif?raw=true "Example embedded data usage")

Regarding embedded data, a typical speedtest execution is followed by an [ipinfo](https://ipinfo.io/) API call: ipinfo returns JSON object telemetry related to
an input IP address.

![](assets/ip_info.gif?raw=true "Example ip info data usage")

### CSS?

Within styles/, _base.css_ is the basal CSS template, used by all surveys. All
other files therein are used for their respective surveys; farm for farm, school
wifi for school wifi, etc..

The custom styles defined here are typically used in Qualtrics as such:

![](assets/external_css.jpg?raw=true "Example style usage")

Wherein, the custom CSS is called via the external CSS field.
