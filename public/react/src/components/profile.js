import UserProfileForm from "./userProfileForm.js";
import { ProfilePic } from "./profilePic.js"
import { getUserDetails } from "../api.js";
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : `https://ades-host-server.herokuapp.com`;

    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;
const queryClient = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}}
});

function Profile(){
    
    const { data, isLoading, error } = useQuery(
        ['getUserDetails'], 
        () => getUserDetails()
        ,)
        console.log(data)
    return(
        
        ( isLoading ) ?
        <div class="loader"></div> :
        ( error ) ?
        <h1>{error.message}</h1>:
        <div>
        <ProfilePic
            url={data.result.pic_url}
        />
        <UserProfileForm
            username={data.result.username} 
            email={data.result.email} 
            country ={data.result.country} 
            password={data.result.password}   
        /></div>
        
        
    )
}

window.addEventListener('DOMContentLoaded', function() {
    const domContainer = document.querySelector(".profile");
    const root = ReactDOM.createRoot(domContainer);
    root.render(
        <QueryClientProvider client={queryClient}>
            <Profile/>
        </QueryClientProvider>
            )
})