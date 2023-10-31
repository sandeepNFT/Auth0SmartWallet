const axios = require("axios");

/**
 * https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/redirect-with-actions
 *
 * @param {object} event - https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/event-object
 * @param {object} api - https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object
 * @returns
 */

exports.onExecutePostLogin = async (event, api) => {
  try {
    if (event.user.email_verified === true) {
      //get frontend access token
      const data = JSON.stringify({
        "frontend_domain_url": event.secrets.AUTH0_ADMIN_FRONTEND_URL
      }); 
        
      // the url provided generates a access token which we store it in a variable .
      const config_access_token = {
        method: 'post',
        maxBodyLength: Infinity,
        url: event.secrets.FRONTEND_ACCESS_API,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };  
          
      //call the api to get the access token
      const response_access_token = await axios.request(config_access_token);    
           
      // stored the access token
      const access_token = response_access_token.data.token; 
      // const access_token = null; 
  
      //if !access_token then return error
      if(!access_token) {
        api.access.deny("Access token not found");
        return;
      }
          
      // login api to crete smart wallet address
      const wallet_data = JSON.stringify({
        "email": event.user.email, //email of the user logged in
        "login_type": "auth0" // by default it will be auth0
      });
           
      //the url makes the smart wallet in which we will pass access token in it .
      const config_wallet = {
        method: 'post',
        maxBodyLength: Infinity,
        url: event.secrets.LOGIN_API,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${access_token}`
        },
        data : wallet_data
      };
        
      //make a request to create smart wallet address
      const response_wallet = await axios.request(config_wallet); 
  
      //return the response
      return response_wallet.data.smartWalletAddress ;
          
    } else {
      api.access.deny("Email not verified");
      return;
    }
  
  } catch (error) {
    // console.error("An error occurred: ", error);
    api.access.deny("Something went wrong");
    return;
  }
};
