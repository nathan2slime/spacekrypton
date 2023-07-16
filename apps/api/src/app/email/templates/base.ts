export const base = (child: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        font-family: 'Ubuntu Mono', monospace;
        color: white;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div
      style="
        border-radius: 40px;
        overflow: hidden;
        max-width: 700px;
        margin: 0px auto;
        background: #0a0317;
      "
    >
      ${child}
    </div>
  </body>
</html>
`;
