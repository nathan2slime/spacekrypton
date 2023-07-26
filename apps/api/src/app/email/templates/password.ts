import { envs } from '@kry/envs';

export type ActiveEmailTemplate = {
  secret: string;
  username: string;
  texts: string[];
};

export const password = ({ secret, username, texts }: ActiveEmailTemplate) => `
    <div style="width: 100%; background: #191B2F; padding: 20px; justify-content: center;">
      <h4 style="font-size: 20px; color: #7436E1; margin: 0px;text-align: center;font-weight: bold;">${texts[0]}, ${username}</h4>
    </div>
  
    <div style="padding: 20px; width: 100%; margin: 0px auto; max-width: 600px;">
      <p>${texts[1]}</p>
  
      <br />
  
      <a href="${envs.APP_URL}/auth/forgot-password?token=${secret}" style="color: #54b7da;"><strong>${texts[2]}</strong></a>
  
      <br />
      <p>${texts[3]} ${texts[4]}</p>

      <br />
      <p>
        <strong style="color: #864fe5">${texts[5]}</strong>
      </p>
    </div>
  `;
