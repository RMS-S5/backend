
require("dotenv").config();
var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS || "../../../google-credentials.json");

export default abstract class FireBaseService {
  private static  _admin = require("firebase-admin");

  static getInstance() {
    if (FireBaseService._admin.apps.length == 0) {
      FireBaseService._admin.initializeApp({
        credential: FireBaseService._admin.credential.cert(serviceAccount),
      });;
    }
    return this._admin;
  }
  

  static sendMessageToSingleDevice = async (_admin : any, message : any) => {
    _admin
      .messaging()
      .send(message)
      .then((response: any) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error: any) => {
        console.log("Error sending message:", error);
      });
  };

  static sendMessageToMultipleDevices: any = async (_admin : any,message : any) => {
    // Create a list containing up to 500 registration tokens.
    // These registration tokens come from the client FCM SDKs.
    // const registrationTokens = [
    //   "YOUR_REGISTRATION_TOKEN_1",
    //   // …
    //   "YOUR_REGISTRATION_TOKEN_N",
    // ];

    // const message = {
    //   data: { score: "850", time: "2:45" },
    //   tokens: registrationTokens,
    // };
    
    _admin
      .messaging()
      .sendMulticast(message)
      .then((response: any) => {
        console.log(response.successCount + " messages were sent successfully");
      });
  };

  static sendMessageToTopics: any = async (_admin : any, message : any) => {
    
    // Send a message to devices subscribed to the provided topic.
    _admin
      .messaging()
      .send(message)
      .then((response: any) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error: any) => {
        console.log("Error sending message:", error);
      });
  };

  
}
