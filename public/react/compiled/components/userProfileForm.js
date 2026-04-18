var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { checkAccessToken } from "../api.js";
var isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
var STORAGE_API_HOST = isLocalhost ? 'http://localhost:4000' : 'https://ades-host-server.herokuapp.com';

var accessToken = localStorage.getItem('accessToken');
var refreshToken = localStorage.getItem('refreshToken');

export default function UserProfileForm(props) {
    var _React$useState = React.useState(props.username),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        username = _React$useState2[0],
        setUsername = _React$useState2[1];

    var _React$useState3 = React.useState(props.email),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        email = _React$useState4[0],
        setEmail = _React$useState4[1];

    var _React$useState5 = React.useState(props.country),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        country = _React$useState6[0],
        setCountry = _React$useState6[1];

    var _React$useState7 = React.useState(props.password),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        password = _React$useState8[0],
        setPassword = _React$useState8[1];

    var _React$useState9 = React.useState(""),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        checkinputPass = _React$useState10[0],
        setCheckInputPass = _React$useState10[1];

    var _React$useState11 = React.useState(""),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        changePw = _React$useState12[0],
        setChangePw = _React$useState12[1];

    var _React$useState13 = React.useState("none"),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        backgroundColor = _React$useState14[0],
        setBackgroundColor = _React$useState14[1]; // set textbox background


    var _React$useState15 = React.useState(true),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        passBg = _React$useState16[0],
        setPassbg = _React$useState16[1]; // disabled or enabled


    var _React$useState17 = React.useState(false),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        inputPassBg = _React$useState18[0],
        setInputPassBg = _React$useState18[1];

    var _React$useState19 = React.useState(false),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        disable = _React$useState20[0],
        setDisable = _React$useState20[1];

    var _React$useState21 = React.useState(false),
        _React$useState22 = _slicedToArray(_React$useState21, 2),
        isChecking = _React$useState22[0],
        setIsChecking = _React$useState22[1];

    var _React$useState23 = React.useState(0),
        _React$useState24 = _slicedToArray(_React$useState23, 2),
        num = _React$useState24[0],
        setNum = _React$useState24[1];

    function checkInputEmpty(data) {
        var isEmpty = void 0;
        //.some return true if one thing passes to test equals the condition
        Object.values(data).some(function (value) {
            if (value == '' || value == undefined) {
                isEmpty = true;
            } else isEmpty = false;
        });
        return isEmpty;
    }
    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangeCountry(event) {
        setCountry(event.target.value);
    }

    function handleChangePw(event) {
        setChangePw(event.target.value);
    }
    function handleDisable(set) {
        setDisable(set);
    }
    function handlePassBg(set) {
        setPassbg(set);
    }
    function handleInputPassBg(set) {
        setInputPassBg(set);
    }
    function handleIsChecking(set) {
        setIsChecking(set);
    }
    function handleNum(set) {
        setNum(set);
    }
    function handleCheckPass(event) {
        setCheckInputPass(event.target.value);
        var check = { pass: event.target.value
            //checking password (return true or false)
        };handleIsChecking(true);
        setNum(num + 1);
        fetch(STORAGE_API_HOST + '/checkPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + " " + refreshToken
            },
            body: JSON.stringify(check)
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            if (response.error === "TokenExpiredError Not authorized") {
                alert("Token is expired. Please re-login to check information");
                localStorage.removeItem("accessToken");
                window.location.href = '/';
            }
            checkAccessToken(response.accessToken);

            handleNum(num - 1);
            if (num != 0) setIsChecking(false);
            //check is password is correct
            if (!response.check) {
                setBackgroundColor("#F5898A");
                handlePassBg(true);
                handleInputPassBg(false);
            } else {
                setBackgroundColor("#BFF589");
                handlePassBg(false);
                handleInputPassBg(true);
            }
        }).catch(function (error) {
            alert(error);
        });
    }

    function submitForm(event) {
        var pw = '';
        var c = void 0;
        event.preventDefault();
        handleDisable(true);
        handlePassBg(true);
        //set pw value------------------------------
        if (changePassword.value === null || changePassword.value === '') {
            pw = password;
            c = 'notChange';
        } else {
            pw = changePw;
            c = 'change';
        }

        //set user info------------------------------
        var userInfo = {
            username: username,
            email: email,
            country: country,
            password: pw,
            checking: c
        };

        //check if info have empty fields---------------------
        if (checkInputEmpty(userInfo)) {
            document.location.reload();
            alert('Empty field input!');
            handleDisable(false);
            console.log("here");
            return;
        }
        // check pw -----------------------------------------
        var checkPasword = prompt('What is your orginal password?');
        //check if prompt is empty
        handlePassBg(true);
        if (checkPasword === "null" || checkPasword === null || checkPasword === "") {
            handleDisable(false);
            if (backgroundColor == "#F5898A" || backgroundColor == "none") {
                handlePassBg(true);
            } else handlePassBg(false);
            return;
        }
        //--------------------------
        //check if password is valid from prompt
        var check = {
            pass: checkPasword
        };
        fetch(STORAGE_API_HOST + '/checkPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken + " " + refreshToken
            },
            body: JSON.stringify(check)
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            //if token is expired --------------------------
            if (response.error === "TokenExpiredError Not authorized") {
                alert("Token is expired. Please re-login to check information");
                localStorage.removeItem("accessToken");
                window.location.href = '/';
            }
            //check access token
            checkAccessToken(response.accessToken);

            //if pw is valid ---> Allow updating user information
            if (response.check) {

                //update user
                fetch(STORAGE_API_HOST + '/updateUser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken + " " + refreshToken
                    },
                    body: JSON.stringify(userInfo)
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {

                    //if token is expired ------------------------
                    if (response.error === "TokenExpiredError Not authorized") {
                        alert("Token is expired. Please re-login to update user information");
                        localStorage.removeItem("accessToken");
                        window.location.href = '/';
                    }

                    if (response.error) alert(response.error);else alert(response.message);

                    checkAccessToken(response.accessToken);
                }).catch(function (error) {
                    alert(error);
                }).finally(function () {
                    document.location.reload();
                });
            } else {
                alert('Wrong Password!');
                document.location.reload();
            }
        }).catch(function (error) {
            alert(error);
        });
    }
    return React.createElement(
        'form',
        { 'class': 'form', id: 'form' },
        React.createElement(
            'label',
            { 'for': 'username' },
            'Username:'
        ),
        React.createElement('input', { type: 'text', id: 'username', name: 'username', value: username, onChange: handleChangeUsername, disabled: disable }),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
            'label',
            { 'for': 'email' },
            'Email:\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0'
        ),
        React.createElement('input', { type: 'text', id: 'email', name: 'email', value: email, onChange: handleChangeEmail, disabled: disable }),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
            'label',
            { 'for': 'country' },
            'Country:\xA0\xA0\xA0\xA0'
        ),
        React.createElement('input', { type: 'text', id: 'country', name: 'country', value: country, onChange: handleChangeCountry, disabled: disable }),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
            'label',
            { 'for': 'password' },
            'Password:\xA0'
        ),
        React.createElement('input', { type: 'password', id: 'password', name: 'password', value: checkinputPass, onChange: handleCheckPass, style: { backgroundColor: backgroundColor, display: "inline-block" }, disabled: disable || inputPassBg }),
        isChecking && React.createElement('div', { 'class': 'loader', style: { height: "10px", width: "10px", display: "inline-block", border: "5px solid white", borderTop: "5px solid black", marginLeft: "10px" } }),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement(
            'label',
            { 'for': 'changePassword' },
            'Change Password:'
        ),
        React.createElement('input', { type: 'password', id: 'changePassword', name: 'changePassword', value: changePw, onChange: handleChangePw, disabled: passBg }),
        React.createElement('br', null),
        React.createElement('br', null),
        React.createElement('input', { type: 'submit', value: 'Submit', id: 'submit', onClick: submitForm })
    );
}