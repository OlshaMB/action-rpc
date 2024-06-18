# action-rpc spec
A small http rpc that uses `action` search param to identify remote procedure, the rest of search params are used as remote procedure arguments, the body also has a purpose and is used to send data.
## Body vs search params
It is important to distinguish body and search params semantically: the purpose of search params is to describe the body, they are not to be used for sending data, the body should be used for data not the search params. For example:
```http
POST /?action=postForm&id=572b9c4e-63df-4b18-add3-d813a820ea0b
Content-Type: application/json
{
	"user": "amy",
}
```
Here we are not putting id into the body because it describes to which id the data belongs to and user is a json because it doesn't describe anything.
In case the procedure is small or it uses GET and doesn't require too much data, this rule can be broken, but then the body must be empty.
## Spec
The call in action-rpc is a simple http request:
- With GET or POST method.
- With url:
	- With search params containing action name.
	- The rest of the url can be anything.
- With headers
- With Content-Type header if there is a body.
- With request body containing data to be sent to the remote procedure.
## Examples
```http
GET /?action=getUser&id=amy
```

```http
POST /user?action=create&name=John
Content-Type: application/json
{
	"age": 30,
	"city": "New York",
}
```
