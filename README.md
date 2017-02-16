# Tachki React Web UI
## API

### AUTH
----
Sign up, sign in, recover password actions

**User signin**

* **URL**

  /sign-in/

* **Method:**

  `POST`

* **Data Params**

  `phone=[integer]` <br />
  `password=[string]` *min_length=6*

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : "abracadabra", name : "Vasya", image: "http://server.com/user.image.jpg", balance: 12345 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Incorrect authentication credentials." }`

 OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ error : "Account has been suspended. Please reach out system administrator." }`

