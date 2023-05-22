import { Request, Response } from "express";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";


const client = new OAuth2Client("685508486820-8nvol3gsgc43jj55bqscipokc3vvp8eu.apps.googleusercontent.com");

class GoogleLoginController {

  async handle(request: Request, response: Response) {
    console.log(request.body);
    const { tokenId } = request.body;
    console.log(tokenId);
    client.verifyIdToken({ idToken: tokenId, audience: "685508486820-8nvol3gsgc43jj55bqscipokc3vvp8eu.apps.googleusercontent.com" }).then(googleResponse => {
      const payload = googleResponse.getPayload();
      const email_verified = payload?.email_verified;
      const userId = payload?.sub;

      if (email_verified) {
        response.json({
          token: tokenId,
          userId
        });
      }
    })

  }
}

export default new GoogleLoginController();