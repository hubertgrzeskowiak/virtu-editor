# Promised AngularJS wrapper for SweetAlert

AngularJS wrapper for [SweetAlert](t4t5.github.io/sweetalert/) built with Promises. Sweet Alert is a beautiful replacement for Javascript's "Alert".

## Dependencies
- Required:
	[AngularJS](https://github.com/angular/angular).
	[sweetalert](https://github.com/t4t5/sweetalert).

## Install
1. Download the files
	1. Bower
		1. `bower install --save angular-sweetalert-as-promised`
2. include the files in your app
	1. `Alert.min.js`
	2. `sweet-alert.js` OR `sweet-alert.min.js`
	3. `sweet-alert.css`
3. include the module in angular (i.e. in `app.js`) - `lgraziani.ngSweetAlert`

## Examples

### Simple

```js
SweetAlert.success({
	message: "Here's a message"
}).then(function () {
	// User closed alert
});

```

### With cancel

```js
SweetAlert.warning({
	message: "Are you sure?",
	text: "Your will not be able to recover this imaginary file!",
	showCancelButton: true,
	confirmButtonColor: "#DD6B55",
	confirmButtonText: "Yes, delete it!"
}).then(function () {
	// User accepted
}, function () {
	// User declined
});
```


## Documentation

- [http://tristanedwards.me/sweetalert](http://tristanedwards.me/sweetalert)
