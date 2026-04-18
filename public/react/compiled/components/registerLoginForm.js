var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import InputField from './inputField.js';
import { Login, Register } from '../../compiled/api.js';

var _window$ReactQuery = window.ReactQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;

/**
 * Check user input for login and register
 */

function checkInputEmpty(data) {
    var isEmpty = void 0;
    console.log(data);
    //.some return true if one thing passes to test equals the condition
    Object.values(data).some(function (value) {
        console.log(value);
        if (value === '' || value == undefined) {
            console.log('Got empty user input--------------');
            isEmpty = true;
            return isEmpty; // if find got empty input, return directly
        } else isEmpty = false;
    });
    return isEmpty;
}

// Register Form Component
function RegisterForm(props) {
    var _React$useState = React.useState('Singapore'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        selectedCountry = _React$useState2[0],
        setSelectedCountry = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        isDisabled = _React$useState4[0],
        setIsDisabled = _React$useState4[1];

    var _React$useState5 = React.useState({
        registerName: '',
        email: '',
        registerPass: '',
        confirmPass: '',
        country: selectedCountry
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        registerState = _React$useState6[0],
        setRegisterState = _React$useState6[1];

    function initPage() {
        enablePage();
        setIsDisabled(false); // re enable the input fields
        // clear form
        setRegisterState({
            registerName: '',
            email: '',
            registerPass: '',
            confirmPass: '',
            country: selectedCountry
        });
    }

    function UserRegister(e) {
        e.preventDefault();
        setIsDisabled(true);
        disablePage();

        if (checkInputEmpty(registerState)) {
            setIsDisabled(false);
            enablePage();
            alert('Please provide register data!');
        } else if (registerState.registerPass != registerState.confirmPass) {
            alert('Please provide same password!');
            setIsDisabled(false);
            enablePage();
        } else {
            console.log('here is the register data------------------------');
            console.log(JSON.stringify(registerState));

            Register(registerState).then(function (response) {
                if (response.errMsg) {
                    alert(response.errMsg);
                    initPage();
                } else {
                    alert(response.result + '\nPlease Login!');
                    // reset the register form
                    initPage();
                    window.location.href = '/registerLogin';
                }
            });
        }
    }

    return (
        // <!-- Start form sign up form -->
        React.createElement(
            'form',
            { 'class': 'sign-up-form' },
            React.createElement(
                'h2',
                { 'class': 'form-title' },
                'Sign up'
            ),
            props.fields.map(function (field) {
                return React.createElement(InputField, {
                    icon: field.icon,
                    type: field.type,
                    placeholder: field.placeholder,
                    id: field.id,
                    name: field.name,
                    value: registerState[field.id] || '',
                    setValue: function setValue(value) {
                        setRegisterState(Object.assign({}, registerState, _defineProperty({}, field.id, value)));
                    },
                    disabled: isDisabled
                });
            }),
            React.createElement(
                'div',
                { 'class': 'input-field' },
                React.createElement('i', { 'class': 'fa-solid fa-earth-asia' }),
                React.createElement(
                    'select',
                    {
                        id: 'country',
                        name: 'countires',
                        onChange: function onChange(e) {
                            setSelectedCountry(e.target.value);
                            setRegisterState(Object.assign({}, registerState, _defineProperty({}, e.target.id, e.target.value)));
                        },
                        value: selectedCountry
                    },
                    React.createElement(
                        'option',
                        { value: 'Singapore' },
                        'Singapore'
                    ),
                    React.createElement(
                        'option',
                        { value: 'China' },
                        'China'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Japan' },
                        'Japan'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Indonesia' },
                        'Indonesia'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Malaysia' },
                        'Malaysia'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Russia' },
                        'Russia'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Vietnam' },
                        'Vietnam'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Australia' },
                        'Australia'
                    ),
                    React.createElement(
                        'option',
                        { value: 'America' },
                        'America'
                    ),
                    React.createElement(
                        'option',
                        { value: 'Brazil' },
                        'Brazil'
                    )
                )
            ),
            React.createElement('input', {
                type: 'submit',
                'class': 'btn',
                value: 'Sign up',
                id: 'registerBtn',
                onClick: function onClick(e) {
                    return UserRegister(e);
                }
            })
        )
        // <!-- End of sign up form --></form>

    );
}

// Login Form Component
function LoginForm(props) {
    var _React$useState7 = React.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        isDisabled = _React$useState8[0],
        setIsDisabled = _React$useState8[1];

    var _React$useState9 = React.useState(false),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        rememberMe = _React$useState10[0],
        setRememberMe = _React$useState10[1];

    var _React$useState11 = React.useState({
        loginUserName: '',
        loginUserPass: '',
        rmbMeCheck: false
    }),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        loginState = _React$useState12[0],
        setLoginState = _React$useState12[1];

    function handleRemMeCheck() {
        setLoginState(Object.assign({}, loginState, {
            rmbMeCheck: !rememberMe
        }));
        setRememberMe(!rememberMe);
    }

    function initPage() {
        enablePage();
        setIsDisabled(false); // re enable the input fields
        // clear form
        setLoginState({
            loginUserName: '',
            loginUserPass: '',
            rmbMeCheck: false
        });
    }

    function UserLogin(e) {
        e.preventDefault();
        setIsDisabled(true);
        disablePage();

        if (checkInputEmpty(loginState)) {
            setIsDisabled(false); // enable the input fields
            enablePage(); // enable some buttons(eg. music control button)
            alert('Please provide login data!');
        } else {
            console.log('here is the login data------------------------');
            console.log(JSON.stringify(loginState));

            Login(loginState).then(function (response) {
                if (response.error) {
                    alert(response.error);
                    initPage();
                } else {
                    // when user is exist and the password entered is correct
                    alert('Login successfully!');

                    localStorage.setItem('accessToken', response.accessToken);
                    if (response.refreshToken) {
                        // set refresh token if it is in response
                        localStorage.setItem('refreshToken', response.refreshToken);
                    }
                    initPage();
                    window.location.href = '/home';
                }
            });
        }
    }

    return (
        // <!-- Start form sign in form -->
        React.createElement(
            'form',
            { 'class': 'sign-in-form' },
            React.createElement(
                'h2',
                { 'class': 'form-title' },
                'Sign in'
            ),
            props.fields.map(function (field) {
                return React.createElement(InputField, {
                    icon: field.icon,
                    type: field.type,
                    placeholder: field.placeholder,
                    id: field.id,
                    name: field.name,
                    value: loginState[field.id] || '',
                    setValue: function setValue(value) {
                        setLoginState(Object.assign({}, loginState, _defineProperty({}, field.id, value)));
                    },
                    disabled: isDisabled
                });
            }),
            React.createElement(
                'label',
                { id: 'rmbCheckBox' },
                React.createElement('input', {
                    type: 'checkbox',
                    id: 'rmbMeCheck',
                    value: rememberMe,
                    onChange: function onChange() {
                        return handleRemMeCheck();
                    },
                    disabled: isDisabled
                }),
                'Remember me'
            ),
            React.createElement(
                'button',
                {
                    id: 'forget-pass',
                    onClick: function onClick() {
                        return window.location.href = '/verifyEmail';
                    },
                    disabled: isDisabled
                },
                'Forget Password?'
            ),
            React.createElement('input', {
                type: 'submit',
                value: 'Login',
                'class': 'btn',
                id: 'loginBtn',
                onClick: function onClick(e) {
                    return UserLogin(e);
                }
            })
        )
        /* <!-- End of sign in form --> */

    );
}

//----------------------User InputFields start--------------------------------------------
var LoginFields = [{
    icon: 'fas fa-user',
    type: 'text',
    placeholder: 'Username',
    id: 'loginUserName',
    name: 'loginUserName'
}, {
    icon: 'fas fa-lock',
    type: 'password',
    placeholder: 'password',
    id: 'loginUserPass',
    name: 'loginUserPass'
}];

var RegisterFields = [{
    icon: 'fas fa-user',
    type: 'text',
    placeholder: 'Username',
    id: 'registerName',
    name: 'registerName'
}, {
    icon: 'fas fa-envelope',
    type: 'email',
    placeholder: 'Email',
    id: 'email',
    name: 'email'
}, {
    icon: 'fas fa-lock',
    type: 'password',
    placeholder: 'password',
    id: 'registerPass',
    name: 'registerPass'
}, {
    icon: 'fa-solid fa-circle-check',
    type: 'password',
    placeholder: 'Confirm Password',
    id: 'confirmPass',
    name: 'confirmPass'
}];
//----------------------User InputFields end----------------------------------------------

var queryClient = new QueryClient();
function RegisterLogin(props) {
    return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
            'div',
            { id: 'forms-root' },
            React.createElement(LoginForm, { fields: LoginFields }),
            React.createElement(RegisterForm, { fields: RegisterFields })
        )
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('.forms-container'));

    root.render(React.createElement(RegisterLogin, null));
});