cinemine
---
An open source media center and node manager controlled primarily by voice.

Runs on Node.js using Express, MongoDB, ffmpeg, VLC, Google Speech, and more.

Currently running on a Raspberry Pi for home media use.

Usage
---
Start probe with:
```
node probe.js
```
and add your probes' IP addresses to the array in `manager.js`. This will soon be accessed with a database, but for now is hard-coded.

Start manager with:
```
node manager.js
```
and access the manager's web interface at `localhost:4000`.