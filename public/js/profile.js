const API_SERVER = process.env.API_SERVER;
import { hide } from "./game_js/popUp.js";
//-----------------------------------------------------
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : API_SERVER;

// -------------Getting tokens-----------------------
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let token;

        if (refreshToken != null && refreshToken != "") {
            token = refreshToken
        }
        else if (accessToken != null && accessToken != "") {
            token = accessToken
        }

window.addEventListener("DOMContentLoaded", function(){
    if(token === null || token === ""){
        window.location.href = "/"
    }
    else{
        let imgName;
        
        //----------------Getting id's from html---------------------------------------
        let backButton = document.querySelector('#back');
        let deleteAccount = document.querySelector('#deleteAccount');
        let password = document.querySelector('#password');
        let changePassword = document.querySelector('#changePassword'); 
        let popUpDiv = window.document.getElementById("popUpDiv")
        let blanket = window.document.getElementById("blanket")
        let button = document.querySelector("#button");
        //----------------------------------------------------------------------------
        const controls = [
            backButton,
            deleteAccount,
        ];
        //-------------Check if access token  is returned-----------
        function checkAccessToken(accessToken){
            if(accessToken != null && accessToken != ""){
                localStorage.setItem(
                'accessToken',
                accessToken
                );
            }
        }
        function disablePage() {
            controls.forEach((control) => (control.disabled = true));
        }

        function enablePage() {
            controls.forEach((control) => (control.disabled = false));
        }
        //------------------------------------------
        /*
        image.onclick = function () {
            console.log(picUrl);
            imageFile.click()
        }
        imageFile.onclick = function(){
        }*/
        //------------------------------------------
        backButton.onclick = function () {
            //return to home page
            window.location.href = '/home';
        };

        //fetch data when page is loaded
        disablePage();

        //-------------Start of deleting account
        deleteAccount.onclick = function (e) {
            disablePage();
            const checkPasword = prompt('What is your orginal password?');
            //check if prompt is empty ------------------------------
            if(checkPasword == "null" || checkPasword == null || checkPasword == "" ) {
                enablePage();
                if (changePassword.value == null || changePassword.value == '') {
                    password.disabled = false;
                } else {
                    password.disabled = true
                }
                return;
            }
            else{
            const check = {
                pass: checkPasword
            }
            //check password -------------------
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
                if(response){
                    if(response.error === "TokenExpiredError Not authorized"){
                        alert("Token is expired. Please re-login to delete account");
                        localStorage.removeItem("accessToken");
                        window.location.href = '/';
                    }

                    checkAccessToken(response.accessToken);

                    //delete account
                    fetch(`${STORAGE_API_HOST}/deleteUser`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + accessToken + " " + refreshToken,
                        },
                    })
                        .then((response) => response.json())
                        .then((response) => {

                            //token expired
                            if(response.error === "TokenExpiredError Not authorized"){
                                alert("Token is expired. Please re-login to delete account");
                                localStorage.removeItem("accessToken");
                                window.location.href = '/';
                            }
                            if(response.error){
                                alert(response.error);
                                return;
                            }
                            else alert(response.message);
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            window.location.href = '/home';
                        })
                        .catch((error) => {
                            alert('Unable to delete account');
                            document.location.reload();
                        })
                }
                else {
                alert('Wrong Password!');
                document.location.reload();

                }
            })
        };
        //-------------end of deleting account
    }
    blanket.onclick = function(){ 
        hide(popUpDiv)
    }
    window.hidePopUp = (popup)=>{
        hide(popup)
    }
    } //else
});

