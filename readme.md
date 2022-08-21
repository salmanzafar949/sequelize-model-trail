# Sequelize Model Trail


> Package that helps you track changes to your models, for auditing or versioning. See how a model looked at any stage in its life-cycle and also allows you to Record the user who created the version.


<!-- [![NPM](https://nodei.co/npm/sequelize-model-trail.png?downloads=true)](https://nodei.co/npm/sequelize-model-trail/) -->

[![node-version](https://img.shields.io/node/v/sequelize-model-trail.svg)](https://www.npmjs.org/package/sequelize-model-trail)
[![npm-version](https://img.shields.io/npm/v/sequelize-model-trail.svg)](https://www.npmjs.org/package/sequelize-model-trail)

[![GitHub release](https://img.shields.io/github/release/salmanzafar949/sequelize-model-trail.svg)](https://www.npmjs.org/package/sequelize-model-trail)
[![GitHub tag](https://img.shields.io/github/tag/salmanzafar949/sequelize-model-trail.svg)](https://www.npmjs.org/package/sequelize-model-trail)
[![GitHub commits](https://img.shields.io/github/commits-since/salmanzafar949/sequelize-model-trail/1.2.0.svg)]()
[![npm-downloads](https://img.shields.io/npm/dt/sequelize-model-trail.svg)](https://www.npmjs.org/package/sequelize-model-trail)

[![license](https://img.shields.io/github/license/salmanzafar949/sequelize-model-trail.svg)](https://github.com/salmanzafar949/sequelize-model-trail/blob/master/LICENSE)
![GitHub Sponsor](https://img.shields.io/github/sponsors/salmanzafar949?label=Sponsor&logo=GitHub)

## Table of Contents

- [Sequelize Model Trail](#sequelize-model-trail)
    - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Example](#example)
    - [User Tracking](#user-tracking)
    - [Contributing](#contributing)
    - [Author](#author)
    - [Upcoming Features](#Upcoming-features)
    - [Support](#support)
    - [Thanks](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```bash
npm install --save sequelize-model-trail
```

## Usage

Sequelize Model Trail assumes that you have already set up your Sequelize connection, for example, like this:
```javascript
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password');
```

then adding Sequelize Model Trail is as easy as:

```javascript
const ModelTrail = require('sequelize-model-trail').init(sequelize);
ModelTrail.enableAndLoadModelTrail();
```

which loads the Model Trail library, and the `enableAndLoadModelTrail()` method sets up a `revisions` table and Model.

*Note: You need to Pass userId as options if you want to enable user tracking*

## User Tracking

Currently, there is only one step to enable user tracking, ie, recording the user who created a particular revision.

```javascript
Model.update({
  /* ... */
}, {
  userId: user.id
}).then(() {
  /* ... */
});
```

## How data is stored

+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
| id | model | document                             | operation | documentId | createdAt           | updatedAt           | userId |
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
|  1 | users | {"id": [1, null], "name": ["Salman", null]} | create | 1      | 2022-08-22 01:17:34 | 2022-08-22 01:17:34 | NULL   |
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
|  2 | users | {"name": ["Salman Zafar", "Salman"]} | update    |          1 | 2022-08-22 01:20:10  | 2022-08-22 01:20:10 |   1   |
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+
|  3 | users | {}                                   | destroy   |          1 | 2022-08-22 01:21:30 | 2022-08-22 01:21:30 |    1   |
+----+-------+--------------------------------------+-----------+------------+---------------------+---------------------+--------+

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Author

© [Salman Zafar](https://github.com/salmanzafar949) – [@salmanzafar949](https://twitter.com/salmanzafar949) – nvangalenlast@gmail.com
Distributed under the MIT license. See ``LICENSE`` for more information.
[https://github.com/salmanzafar949/sequelize-model-trail](https://github.com/salmanzafar949/)

Contributors:
[https://github.com/salmanzafar949/sequelize-paper-trail/graphs/contributors](https://github.com/nielsgl/sequelize-model-trail/graphs/contributors)

## example
* [Example application](https://github.com/salmanzafar949/sequelize-model-trail-example)

## Upcoming features

- Specify Models for Model Trails 
- UUID
- CUSTOM MODEL/TABLE NAME
- CUSTOM OPTIONS

## Support
*If this project help you reduce time to develop, you can give me a cup of coffee :)*

Please use:
* GitHub's [issue tracker](https://github.com/salmanzafar949/sequelize-model-trail/issues)

* [Buy me a coffee](https://paypal.me/salmanzafar949)

## Thanks
This project was inspired by:
* [sequelize-paper-trail](https://github.com/nielsgl/sequelize-paper-trail)

## Happy Coding.!

