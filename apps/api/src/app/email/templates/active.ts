export type ActiveEmailTemplate = {
  secret: string;
  username: string;
  texts: string[];
};

export const active = ({ secret, username, texts }: ActiveEmailTemplate) => `
  <div style="width: 100%; background: #191B2F; padding: 20px; justify-content: center;">
    <h4 style="font-size: 20px; color: #7436E1; margin: 0px;text-align: center;font-weight: bold;">${username}</h4>
  </div>

  <div style="padding: 20px; width: 100%; margin: 0px auto; max-width: 600px;">
    <p>${texts[0]}</p>

    <br />

    <strong style="color: #54b7da;">${secret}</strong>

    <br />
    <br />
    <p>${texts[1]}<br /><br /></p>
    <p>${texts[2]}<br /><br /></p>
    <p style="color: #864fe5">
      <strong>${texts[4]}</strong>
    </p>
  </div>
`;
