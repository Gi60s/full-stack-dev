---
title: AJAX and File Uploads
description: Communication with a server without requiring page reloads.
---

## AJAX

AJAX stands for Asynchronous JavaScript and XML. Essentially it's a way for the browser to make HTTP requests using JavaScript and is most often used for making REST API requests.

### Fetch

Currently the easiest way to use AJAX in the browser is the `fetch` function.

- [Fetch Browser Support](https://caniuse.com/fetch) - Doesn't support Internet Explorer or Opera Mini.
- [Fetch Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - Lots of great examples, including file upload.
- [Fetch Pollyfill](https://github.com/github/fetch) - If you want to use `fetch` in browser that do no support it then you'll eed to load a polyfill.

### CORS

Web browsers have specific security measures in place to protect users from malicious content (like viruses) from the internet.

One method for protecting uses is the SOP (Same Origin Policy) that prevents the webpage you are on from making AJAX requests to a server that does not match the same domain and port as the current web page.

CORS (Cross-Origin Resource Sharing) is a way to ease those security restrictions and allow you to make requests to another domain or port.

[Tutorial on How to Allow CORS](https://medium.com/javascript-in-plain-english/https-medium-com-shreyaaatiwari-handling-cors-cross-origin-resource-sharing-in-web-apps-166f670f508a)

## Request Bodies

HTTP methods like `POST` and `PUT` often include a body in the request.

A body is the best way to send large amounts of data because URL's and headers often have low limits on maximum size.

Whenever you include a request body you also want to specify the `Content-Type` header so that the server knows how to decode what you've sent. There are many content types, but here are a few:

**JSON**

For AJAX calls, JSON is the most common format for sending data. The content type used here is `application/json`.

**Form Data**

The content-type `application/x-www-form-urlencoded` is the default format that HTML forms use to upload data. It looks like a URL encoded query string but goes into the body.

An alternative format that forms can easily use is the `multipart/form-data` that is built to handle larger data bodies, like file uploads. It uses base64 encoding to encode file contents.

<question-answer q="What is a URL encoded query string?">

A URL can often have query string parameters that follow a `?` in the URL. The format is `param1=value1&param2=value2` to set parameter `param1` to `value1` and `param2` to `value2`. 

If the values contain characters that are not safe in the URL then they need to be encoded. For example, `1+1` encoded will equal `1%2B1`. The `+` has a hexidecimal binary code of `2B` and the `%` preceeds that to indicate an encoded character.

</question-answer>

**Binary Data**

You can also upload raw binary data. This uses the content type `application/octet-stream`. 

### File Uploads

The content type `multipart/form-data` can be used for sending data, but was built specifically for sending files.

Below is an example (taken from a [StackOverflow Answer](https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean/28380690#28380690)) of what the body looks like when sent.

The `boundary` is defined in the headers and used in the body to separate out the different content being sent in the body. Each boundary can use a different encoding.

The `Content-Disposition` tells the server what type of content is being sent within each boundary.

In NodeJS you can decode the `mutipart/form-data` content type using the [multer](https://www.npmjs.com/package/multer) package.

```
POST / HTTP/1.1
[[ Less interesting headers ... ]]
Content-Type: multipart/form-data; boundary=---------------------------735323031399963166993862150
Content-Length: 834

-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="text1"

text default
-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="text2"

aωb
-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="file1"; filename="a.txt"
Content-Type: text/plain

Content of a.txt.

-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="file2"; filename="a.html"
Content-Type: text/html

<!DOCTYPE html><title>Content of a.html.</title>

-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="file3"; filename="binary"
Content-Type: application/octet-stream

aωb
-----------------------------735323031399963166993862150--
```

### File Reader API

It is also possible to base64 encode the browser's uploaded files prior to sending using the [File Reader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader).

- This method is a bit complex but allows you to send a file as a JSON property.
- [File Reader API Browser Support](https://caniuse.com/filereader) - Doesn't support Internet Exporer or Opera Mini.
- Use a form to allow the user to select a file, then use the File Reader API to convert it to a base64 encoded string.

**Example**

The below example is from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL.

We have an HTML file that has a form with file input field. When a file is selected it triggers the `previewFile()` function that will read the file and get it's baseb4 encoded value. That base64 encoded value is used to set the image source which causes the image to display the file.

It would be easy to take that same base64 encoded value and send it via AJAX using a JSON structure and the `application/json` content type.

**HTML**

```html
<input type="file" onchange="previewFile()"><br>
<img src="" height="200" alt="Image preview...">
```

**JavaScript**

```js
function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
```