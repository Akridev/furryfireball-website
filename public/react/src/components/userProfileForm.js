import { checkAccessToken } from "../api.js";
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');

export default function UserProfileForm(props){

    const [ username, setUsername ] = React.useState(props.username);
    const [ email, setEmail ] = React.useState(props.email);
    const [ country, setCountry ] = React.useState(props.country);
    const [ password, setPassword ] = React.useState(props.password);
    const [ checkinputPass, setCheckInputPass ] = React.useState("");
    const [ changePw, setChangePw ] = React.useState("");
    const [ backgroundColor, setBackgroundColor ] = React.useState("none");// set textbox background
    const [ passBg, setPassbg ] = React.useState(true); // disabled or enabled
    const [ inputPassBg, setInputPassBg ] = React.useState(false);
    const [ disable, setDisable ] = React.useState(false);
    const [ isChecking, setIsChecking ] = React.useState(false);
    const [ num, setNum ] = React.useState(0);
    function checkInputEmpty(data) {
        let isEmpty;
        //.some return true if one thing passes to test equals the condition
        Object.values(data).some((value) => {
            if (value == '' || value == undefined) {
                isEmpty = true;
            } else isEmpty = false;
        });
        return isEmpty;
    }
    function handleChangeUsername (event) {
        setUsername(event.target.value)
    }
    function handleChangeEmail (event) {
        setEmail(event.target.value)
    }
    function handleChangeCountry (event) {
        setCountry(event.target.value)
    }

    function handleChangePw(event){
        setChangePw(event.target.value)
    }
    function handleDisable(set){
        setDisable(set);
    }
    function handlePassBg(set){
        setPassbg(set)
    }
    function handleInputPassBg(set){
        setInputPassBg(set)
    }
    function handleIsChecking(set){
        setIsChecking(set)
    }
    function handleNum(set){
        setNum(set)
    }
    function handleCheckPass(event){
        setCheckInputPass(event.target.value)
        const check = { pass : event.target.value }
            //checking password (return true or false)
            handleIsChecking(true);
            setNum(num + 1);
            fetch(`${STORAGE_API_HOST}/checkPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                },
                body: JSON.stringify(check)
            })
            .then((response) => response.json())
            .then((response) => {
                if(response.error === "TokenExpiredError Not authorized"){
                    alert("Token is expired. Please re-login to check information");
                    localStorage.removeItem("accessToken");
                    window.location.href = '/';
                }
                checkAccessToken(response.accessToken);

                handleNum(num - 1)
                if(num != 0)
                    setIsChecking(false);
                //check is password is correct
                if (!response.check) {
                    setBackgroundColor("#F5898A")
                    handlePassBg(true)
                    handleInputPassBg(false);
                } else {
                    setBackgroundColor("#BFF589")
                    handlePassBg(false)
                    handleInputPassBg(true);
                }    
            })
            .catch((error) => {
                alert(error)
            })
            
    }

    function submitForm(event){
        let pw = '';
        let c;
        event.preventDefault();
        handleDisable(true);
        handlePassBg(true);
        //set pw value------------------------------
        if (changePassword.value === null || changePassword.value === '') {
            pw = password;
            c = 'notChange'
        } else {
            pw = changePw;
            c= 'change'
        }

        //set user info------------------------------
        const userInfo = {
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
            console.log("here")
            return;
        }
        // check pw -----------------------------------------
        const checkPasword = prompt('What is your orginal password?');
        //check if prompt is empty
        handlePassBg(true)
        if(checkPasword === "null" || checkPasword === null || checkPasword === "" ) {
            handleDisable(false);
            if(backgroundColor == "#F5898A" || backgroundColor == "none"){
                handlePassBg(true);
            }
            else
                handlePassBg(false);
            return;
        }
            //--------------------------
            //check if password is valid from prompt
            const check = {
                pass: checkPasword
            }
            fetch(`${STORAGE_API_HOST}/checkPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                },
                body: JSON.stringify(check)
            })
            .then((response) => response.json())
            .then((response) => {
                //if token is expired --------------------------
                if(response.error === "TokenExpiredError Not authorized"){
                    alert("Token is expired. Please re-login to check information");
                    localStorage.removeItem("accessToken");
                    window.location.href = '/';
                }
                //check access token
                checkAccessToken(response.accessToken);

                //if pw is valid ---> Allow updating user information
                if (response.check) {

                    //update user
                    fetch(`${STORAGE_API_HOST}/updateUser`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                        },
                        body: JSON.stringify(userInfo),
                    })
                        .then((response) => response.json())
                        .then((response) => {

                            //if token is expired ------------------------
                            if(response.error === "TokenExpiredError Not authorized"){
                                alert("Token is expired. Please re-login to update user information");
                                localStorage.removeItem("accessToken");
                                window.location.href = '/';
                            }

                            if(response.error)
                                alert(response.error);
                            else alert(response.message);

                            checkAccessToken(response.accessToken);

                        })
                        .catch((error) => {
                            alert(error);
                        })
                        .finally(() => {
                            document.location.reload();
                        });
            } else {
                alert('Wrong Password!');
                document.location.reload();
            }
                
            })
            .catch((error) => {
                alert(error)
            })
    }
    return(
        <form class="form" id="form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleChangeUsername} disabled={disable}/><br/><br/>

        <label for="email">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="text" id="email" name="email" value={email} onChange={handleChangeEmail} disabled={disable}/><br/><br/>

        <label for="country">Country:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="text" id="country" name="country" value={country} onChange={handleChangeCountry} disabled={disable}/><br/><br/>

        <label for="password">Password:&nbsp;</label>
        <input type="password" id="password" name="password" value={checkinputPass} onChange={handleCheckPass} style={{backgroundColor:backgroundColor, display:"inline-block"}} disabled={disable || inputPassBg}/>
        {
            isChecking &&
            <div class="loader" style={{height: "10px", width: "10px", display:"inline-block",border:"5px solid white",borderTop:"5px solid black", marginLeft:"10px"}}></div> 
        }
        <br/><br/> 
        <label for="changePassword">Change Password:</label>
        <input type="password" id="changePassword" name="changePassword" value={changePw} onChange={handleChangePw} disabled={passBg}/><br/><br/>

        <input type="submit" value="Submit" id="submit" onClick={submitForm}/>
    </form>
    )
}
