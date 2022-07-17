# Regression test for a charity donation site
The objective of this repo is to automate a regression test for a given task with visiual error occuring on mobile devices with screen resolution lower than 400 px wide

## Used technologies
Testing framework: Playwright with JavaScript

## How to run
Clone the repo and install it with:  
`npm install`  
then run it with:    
`npm test`

## Approach, challenges and improvement ideas
- The purpose of the test was to catch a visual error and the test has been simplified to accomodate that goal. If the test was to be used in an actual test suite additional validations would have to be added. Ideally each action (click, input, navigation etc.) would have a validation.
- The problem was to catch a visual error - clipped checkbox test which is not a trivial task. Since playwright is a relatively new tool it does not support viewport validation out of the box. After trying out solutions utlising elements' bounding boxes, ultilizing external libraries (Chai) I decided solve it with visiual comparison, which is supported by PlayWright out of the box.
- In the future, as playwright adds more funcitonalities, the visiual comparison should be replaced with a more UI change-proof solution (like checking intersecting elements or validating if elements overflow viewport) 
