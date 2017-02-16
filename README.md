# Tachki React Web UI
## API

### AUTH
----
Sign up, sign in, recover password actions

**User login**

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


**User Registration** - Register new account. Upon successfull registration you'll receive SMS with an activation code

* **URL**

  /sign-in/

* **Method:**

  `POST`

* **Data Params**

  `phone=[integer]` <br />
  `password=[string]` *min_length=6*

* **Success Response:**

  * **Code:** 201 <br />
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "User with the phone number "1234567890" alraedy exists." }`


**User logout**

* **URL**

  /sign-out/

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 204 <br />
 

**User Activation** - Activate already created user with an activation code 

* **URL**

  /activate/

* **Method:**

  `POST`

* **Data Params**

  `code=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : "abracadabra", name : "Vasya", image: "http://server.com/user.image.jpg", balance: 12345 }`
 
* **Error Response:**

    * **Code:** 400 Bad Request <br />
      **Content:** `{ error : "Activation code is incorrect" }`

    OR
  
    * **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "User doesn't exist" }`

    OR
  
    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Incorrect authentication credentials." }`
  
    OR
  
    * **Code:** 403 FORBIDDEN <br />
      **Content:** `{ error : "Account has been suspended. Please reach out system administrator." }`
 

**Request new activation code**

* **URL**

  /resend-activation-code/

* **Method:**

  `POST`

* **Data Params**

  `phone=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
