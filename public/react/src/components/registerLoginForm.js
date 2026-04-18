import InputField from './inputField.js';
import { Login, Register } from '../../compiled/api.js';

const { QueryClient, QueryClientProvider } = window.ReactQuery;

/**
 * Check user input for login and register
 */
function checkInputEmpty(data) {
    let isEmpty;
    console.log(data);
    //.some return true if one thing passes to test equals the condition
    Object.values(data).some((value) => {
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
    const [selectedCountry, setSelectedCountry] = React.useState('Singapore');
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [registerState, setRegisterState] = React.useState({
        registerName: '',
        email: '',
        registerPass: '',
        confirmPass: '',
        country: selectedCountry,
    });

    function initPage() {
        enablePage();
        setIsDisabled(false); // re enable the input fields
        // clear form
        setRegisterState({
            registerName: '',
            email: '',
            registerPass: '',
            confirmPass: '',
            country: selectedCountry,
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

            Register(registerState).then((response) => {
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
        <form class="sign-up-form">
            <h2 class="form-title">Sign up</h2>

            {props.fields.map((field) => (
                <InputField
                    icon={field.icon}
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                    name={field.name}
                    value={registerState[field.id] || ''}
                    setValue={(value) => {
                        setRegisterState({
                            ...registerState,
                            [field.id]: value,
                        });
                    }}
                    disabled={isDisabled}
                />
            ))}
            <div class="input-field">
                <i class="fa-solid fa-earth-asia"></i>
                <select
                    id="country"
                    name="countires"
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setRegisterState({
                            ...registerState,
                            [e.target.id]: e.target.value,
                        });
                    }}
                    value={selectedCountry}
                >
                    <option value="Singapore">Singapore</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Russia">Russia</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Australia">Australia</option>
                    <option value="America">America</option>
                    <option value="Brazil">Brazil</option>
                </select>
            </div>

            <input
                type="submit"
                class="btn"
                value="Sign up"
                id="registerBtn"
                onClick={(e) => UserRegister(e)}
            />
        </form>
        // <!-- End of sign up form --></form>
    );
}

// Login Form Component
function LoginForm(props) {
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [loginState, setLoginState] = React.useState({
        loginUserName: '',
        loginUserPass: '',
        rmbMeCheck: false,
    });
    function handleRemMeCheck() {
        setLoginState({
            ...loginState,
            rmbMeCheck: !rememberMe,
        });
        setRememberMe(!rememberMe);
    }

    function initPage() {
        enablePage();
        setIsDisabled(false); // re enable the input fields
        // clear form
        setLoginState({
            loginUserName: '',
            loginUserPass: '',
            rmbMeCheck: false,
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

            Login(loginState).then((response) => {
                if (response.error) {
                    alert(response.error);
                    initPage();
                } else {
                    // when user is exist and the password entered is correct
                    alert('Login successfully!');

                    localStorage.setItem('accessToken', response.accessToken);
                    if (response.refreshToken) {
                        // set refresh token if it is in response
                        localStorage.setItem(
                            'refreshToken',
                            response.refreshToken
                        );
                    }
                    initPage();
                    window.location.href = `/home`;
                }
            });
        }
    }

    return (
        // <!-- Start form sign in form -->
        <form class="sign-in-form">
            <h2 class="form-title">Sign in</h2>

            {props.fields.map((field) => (
                <InputField
                    icon={field.icon}
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                    name={field.name}
                    value={loginState[field.id] || ''}
                    setValue={(value) => {
                        setLoginState({
                            ...loginState,
                            [field.id]: value,
                        });
                    }}
                    disabled={isDisabled}
                />
            ))}

            <label id="rmbCheckBox">
                <input
                    type="checkbox"
                    id="rmbMeCheck"
                    value={rememberMe}
                    onChange={() => handleRemMeCheck()}
                    disabled={isDisabled}
                />
                Remember me
            </label>

            <button
                id="forget-pass"
                onClick={() => (window.location.href = `/verifyEmail`)}
                disabled={isDisabled}
            >
                Forget Password?
            </button>
            <input
                type="submit"
                value="Login"
                class="btn"
                id="loginBtn"
                onClick={(e) => UserLogin(e)}
            />
        </form>
        /* <!-- End of sign in form --> */
    );
}

//----------------------User InputFields start--------------------------------------------
const LoginFields = [
    {
        icon: 'fas fa-user',
        type: 'text',
        placeholder: 'Username',
        id: 'loginUserName',
        name: 'loginUserName',
    },
    {
        icon: 'fas fa-lock',
        type: 'password',
        placeholder: 'password',
        id: 'loginUserPass',
        name: 'loginUserPass',
    },
];

const RegisterFields = [
    {
        icon: 'fas fa-user',
        type: 'text',
        placeholder: 'Username',
        id: 'registerName',
        name: 'registerName',
    },
    {
        icon: 'fas fa-envelope',
        type: 'email',
        placeholder: 'Email',
        id: 'email',
        name: 'email',
    },
    {
        icon: 'fas fa-lock',
        type: 'password',
        placeholder: 'password',
        id: 'registerPass',
        name: 'registerPass',
    },
    {
        icon: 'fa-solid fa-circle-check',
        type: 'password',
        placeholder: 'Confirm Password',
        id: 'confirmPass',
        name: 'confirmPass',
    },
    // {
    //     icon: 'fa-solid fa-earth-asia',
    //     type: 'text',
    //     placeholder: 'Country',
    //     id: 'country',
    //     name: 'country',
    // },
];
//----------------------User InputFields end----------------------------------------------

const queryClient = new QueryClient();
function RegisterLogin(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <div id="forms-root">
                <LoginForm fields={LoginFields} />
                <RegisterForm fields={RegisterFields} />
            </div>
        </QueryClientProvider>
    );
}

window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(
        document.querySelector('.forms-container')
    );

    root.render(<RegisterLogin />);
});
