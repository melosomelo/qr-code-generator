# QR Code Generator

This is a (not finished) simple QR Code generator written completely from scratch, by myself.

My objectives with this project were:

- Create something not related to web development.
- Learn how to setup a TypeScript workflow and publish a TypeScript library to npm.
- Get more familiar with Jest and testing in general.
- Implement a CI workflow.

## Capabilities

Since I wasn't looking to create a complete QR Code generator (maybe in the future), the capabilities of my generator are not the same as the [zxing](https://github.com/zxing/zxing) library, for example. To be more specific:

- Input data must be in in the [ISO/IEC 8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) character set (the default for QR Codes).
- Supported encoding modes are only numeric and alphanumeric.
