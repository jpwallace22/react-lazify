## [0.4.1](https://github.com/jpwallace22/react-lazify/compare/v0.4.0...v0.4.1) (2023-05-25)


### Performance Improvements

* upgrade to VScode engine 1.78 ([c7381fa](https://github.com/jpwallace22/react-lazify/commit/c7381fa4f94933cfe71c355bc396c707efb616a4))

# [0.4.0](https://github.com/jpwallace22/react-lazify/compare/v0.3.1...v0.4.0) (2023-05-25)


### Bug Fixes

* `dynamic` changed to default import ([#13](https://github.com/jpwallace22/react-lazify/issues/13)) ([dd3ba3e](https://github.com/jpwallace22/react-lazify/commit/dd3ba3efc05b5949e8b9be457dcc2c1c985495c7))
* import path regex not specific enough ([7f769a3](https://github.com/jpwallace22/react-lazify/commit/7f769a30070823e0137c106e7aeec575625d051f))


### Features

* add loadable/next framework options ([#11](https://github.com/jpwallace22/react-lazify/issues/11)) ([54be333](https://github.com/jpwallace22/react-lazify/commit/54be333174d5487f9a1f5220a2e5f7c85c340260))
* import lazy component from jsx ([#5](https://github.com/jpwallace22/react-lazify/issues/5)) ([41dcafe](https://github.com/jpwallace22/react-lazify/commit/41dcafe78e1af1d0d762de44f2367fddb06274de))


### Performance Improvements

* **convertLineToLazy:** remove noop ([863c3be](https://github.com/jpwallace22/react-lazify/commit/863c3bee180d938d9f35e4e745b0c440397da896))

# Change Log

All **notable** changes to React Lazify extension will be documented in this file.

## [Todo]

- Add option to convert to lazy on auto import

## [Unreleased]

<br>

---

---

<br>

## [0.4.3] - Apr 17 2023

### Feature

- fix: `dynamic` imports now import as default

<br>
<br>

---

---

<br>

## [0.4.2] - Feb 05 2023

### Feature

- feat: add next/loadable options
- refactor: streamline options logic

<br>
<br>

---

---

<br>

## [0.4.1] - Jan 23 2023

### Fixed

- fix: import path regex specificity — thanks [@cjcartier](https://github.com/cjcartier)

<br>

---

---

<br>

## [0.4.0] - Jan 21 2023

### Added

- feat: add ability to covert to lazy import from components JSX
- test: increased test coverage to 99%
- cicd: added test coverage reporting to the pipeline

<br>

---

---

<br>

## [0.3.0] - Jan 16 2023

### Added

- Multiple line functionality with highlighting and cursor

### Fixed

- Blank import bug with Windows OS

<br>

---

---

<br>

## [0.2.0] - Jan 15 2023

### Added

- Ability to set allow default import (`React.lazy()`) through settings
- CI/CD pipeline tests for Windows, Mac & Linux

### Fixed

- Minor async bug that would duplicate imports

<br>

---

---

<br>

## [0.1.2] - Jan 13 2023

### Added

- Added bug report templates

### Fixed

- Previous release was missing key documentation

<br>

---

---

<br>

## [0.1.1] - Jan 13 2023

### Added

- Added standard key-binding of `ctrl+alt+cmd+l` for Lazify Command
- Official icon/logo of React Lazify

### Fixed

- Limit command to `.jsx/.tsx` files

### Changed

- README.md for clarification

<br>

---

---

<br>

## [0.1.0] - Jan 12 2023

Initial release of React Lazify
